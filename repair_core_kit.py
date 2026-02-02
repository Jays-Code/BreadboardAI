import os
import re

search_dirs = ["node_modules"]

def repair_code_js(file_path):
    print(f"Repairing {file_path}")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Fix corrupted inputs/outputs line
    # Match any 'inputs = inputs || node_modules/...; outputs = outputs || node_modules/...;'
    corrupted_pattern = r'inputs = inputs \|\| node_modules/.*?;\s*outputs = outputs \|\| node_modules/.*?;'
    new_content = re.sub(corrupted_pattern, 'inputs = inputs || {}; outputs = outputs || {};', content)
    
    # 2. Ensure serializeFunction safety (in case it's still broken elsewhere)
    serialize_pattern = r'let code = handlerFn\.toString\(\);'
    new_content = re.sub(serialize_pattern, 'let code = handlerFn ? handlerFn.toString() : "() => {}";', new_content)
    
    # 3. Ensure inputs/outputs defaulting if not present at all
    # Find line: const id = inputs.$id;
    id_pattern = r'(?<!inputs = inputs \|\| {}; outputs = outputs \|\| {}; )const id = inputs\.\$id;'
    if 'const id = inputs.$id;' in new_content and 'inputs = inputs || {};' not in new_content:
        new_content = new_content.replace('const id = inputs.$id;', 'inputs = inputs || {}; outputs = outputs || {}; const id = inputs.$id;')

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def repair_board_js(file_path):
    # Ensure current safety patches are correct and not mangled
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    changed = False
    
    # value.innerBoard safety
    if 'return value.innerBoard !== undefined;' in content:
        content = content.replace('return value.innerBoard !== undefined;', 'return (value && value.innerBoard !== undefined);')
        changed = True
    
    # value.definition safety
    if 'return (value.definition !== undefined);' in content:
        content = content.replace('return (value.definition !== undefined);', 'return (value && value.definition !== undefined);')
        changed = True

    # unroll safety
    if 'if ("type" in value)' in content:
        content = content.replace('if ("type" in value)', 'if (value && "type" in value)')
        changed = True

    # describeOutput safety
    if 'toJSONSchema(unroll(port).type)' in content:
        content = content.replace('toJSONSchema(unroll(port).type)', 'toJSONSchema(unroll(port)?.type || "unknown")')
        changed = True

    if changed:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def repair_serialize_js(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    changed = False
    if 'else if ("node" in port)' in content:
        content = content.replace('else if ("node" in port)', 'else if (port && "node" in port)')
        changed = True
    
    if changed:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

files_repaired = 0
for search_dir in search_dirs:
    for root, dirs, files in os.walk(search_dir):
        for file in files:
            file_path = os.path.join(root, file)
            if file == 'code.js':
                if repair_code_js(file_path):
                    files_repaired += 1
            elif file == 'board.js':
                if repair_board_js(file_path):
                    files_repaired += 1
            elif file == 'serialize.js':
                if repair_serialize_js(file_path):
                    files_repaired += 1

print(f"Total files repaired: {files_repaired}")
