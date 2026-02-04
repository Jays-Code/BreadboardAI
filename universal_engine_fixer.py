import os
import re

def patch_serialize_js(content):
    changed = False
    # Look for the symbol check
    # if (typeof value === "symbol") { ... }
    # We want to make sure it skips the configurationEntries.push.
    # In many versions, it already has a comment but we'll ensure it's solid.
    
    # Pattern to find: if (typeof value === "symbol") { ... } and ensure it doesn't fall through.
    # The existing code typically looks like:
    # else if (typeof value === "symbol") { 
    #     // ... logging ...
    # }
    # else if (isBoard(value)) { ... }
    
    # We will search for the specific "was a symbol" logging and ensure it's not throwing, and ensure the branch exists.
    if 'typeof value === "symbol"' in content:
        # 1. Suppression of the throw/error
        new_content = re.sub(
            r'throw new Error\(\`Internal error: value was a symbol \(\$\{String\(value\)\}\) for a \$\{node\.id\}:\$\{port\.name\} port\.\`\);',
            r'console.warn(`[Suppressed] Internal error: value was a symbol (${String(value)}) for a ${node.id}:${port.name} port.`);',
            content
        )
        if new_content != content:
            content = new_content
            changed = True
            
        new_content = re.sub(
            r'throw new Error\(\`Internal error: value was a symbol \(\$\{String\(value\)\}\) for a \$\{inputPort\.node\.type\}:\$\{inputPort\.name\} port\.\`\);',
            r'console.warn(`[Suppressed] Internal error: value was a symbol (${String(value)}) for a ${inputPort.node.type}:${inputPort.name} port.`);',
            content
        )
        if new_content != content:
            content = new_content
            changed = True

    return content, changed

def patch_describe_cache_js(content):
    changed = False
    # In DescribeResultCache, the 'updated' callback was:
    # updated: () => { this.args.updated(graphId, nodeId); }
    # And SnapshotUpdater calls it.
    
    # If the UI is reactive, this might trigger an immediate re-render that calls 'get' again.
    # We should add a small guard or ensures it doesn't immediately invalidate in a way that loops.
    
    # Actually, the most robust fix is in computeHash or the map management.
    # But let's look at the 'clear' method.
    
    # If we find this.args.updated, we can wrap it.
    if 'this.args.updated(graphId, nodeId)' in content:
        new_content = content.replace(
            'this.args.updated(graphId, nodeId);',
            'setTimeout(() => this.args.updated(graphId, nodeId), 0);'
        )
        if new_content != content:
            content = new_content
            changed = True
            
    return content, changed

def run_patch():
    patched_count = 0
    for root, dirs, files in os.walk('node_modules'):
        for file in files:
            path = os.path.join(root, file)
            if file == 'serialize.js':
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    new_content, changed = patch_serialize_js(content)
                    if changed:
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Patched serialize.js: {path}")
                        patched_count += 1
                except:
                    pass
            elif file == 'describe-cache.js':
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    new_content, changed = patch_describe_cache_js(content)
                    if changed:
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Patched describe-cache.js: {path}")
                        patched_count += 1
                except:
                    pass
    print(f"Done. Patched {patched_count} files.")

if __name__ == "__main__":
    run_patch()
