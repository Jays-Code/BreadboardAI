import os
import re

LOG_PREFIX = "WATCHDOG: "

def instrument_file(path, replacements):
    """
    Applies a list of regex replacements to a file.
    replacements is a list of (pattern, replacement_template) tuples.
    """
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            original_content = content
        
        changed = False
        for pattern, replacement in replacements:
            # Check if we already instrumented this
            if replacement.split('console.log')[0] in content: 
                 # This check is weak if multiple replacements look similar, but good enough for now
                 continue
            
            if re.search(pattern, content):
                content = re.sub(pattern, replacement, content)
                changed = True
        
        if changed and content != original_content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Instrumented: {path}")
        elif changed:
             print(f"Skipped (already instrumented or no change): {path}")
        else:
            print(f"No match found for patterns in: {path}")

    except Exception as e:
        print(f"Error processing {path}: {e}")

def main():
    # 1. SnapshotUpdater
    # Location: node_modules/@breadboard-ai/utils/dist/src/snapshot-updater.js
    snapshot_replacements = [
        (r'(async latest\(\) \{)', fr'\1 console.log("{LOG_PREFIX}SnapshotUpdater.latest");'),
        (r'(refresh\(\) \{)', fr'\1 console.log("{LOG_PREFIX}SnapshotUpdater.refresh");'),
        # Log when the callback happens
        (r'(this\.args\.updated\?\. \(latest\);)', fr'console.log("{LOG_PREFIX}SnapshotUpdater triggering args.updated"); \1')
    ]
    
    # 2. DescribeResultCache
    # Location: node_modules/@google-labs/breadboard/dist/src/inspector/graph/describe-cache.js
    describe_cache_replacements = [
        (r'(get\(id, graphId\) \{)', fr'\1 console.log("{LOG_PREFIX}DescribeResultCache.get id=" + id + " graphId=" + graphId);'),
        (r'(update\(affectedNodes\) \{)', fr'\1 console.log("{LOG_PREFIX}DescribeResultCache.update count=" + affectedNodes.length);'),
        # Instrument the closure callbacks
        (r'(initial: \(\) => this\.args\.initial\(graphId, nodeId\),)', fr'initial: () => {{ console.log("{LOG_PREFIX}Cache.initial callback"); return this.args.initial(graphId, nodeId); }},'),
        (r'(updated: \(\) => \{)', fr'\1 console.log("{LOG_PREFIX}Cache.updated callback graphId=" + graphId + " nodeId=" + nodeId);')
    ]

    # 3. NodeDescriberManager
    # Location: node_modules/@google-labs/breadboard/dist/src/inspector/graph/node-describer-manager.js
    node_describer_replacements = [
        (r'(updated\(graphId, nodeId\) \{)', fr'\1 console.log("{LOG_PREFIX}NodeDescriberManager.updated graphId=" + graphId + " nodeId=" + nodeId);'),
        (r'(willUpdate\(previous, current\) \{)', fr'\1 console.log("{LOG_PREFIX}NodeDescriberManager.willUpdate");')
    ]

    # Find and instrument files
    for root, dirs, files in os.walk("node_modules"):
        for file in files:
            path = os.path.join(root, file)
            
            if "snapshot-updater.js" in file:
                instrument_file(path, snapshot_replacements)
            elif "describe-cache.js" in file and "inspector/graph" in path: # Be specific to inspector/graph
                instrument_file(path, describe_cache_replacements)
            elif "node-describer-manager.js" in file:
                instrument_file(path, node_describer_replacements)

if __name__ == "__main__":
    main()
