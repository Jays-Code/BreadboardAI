import os
import re

LOG_PREFIX = "WATCHDOG: "

def instrument_file(path, replacements):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        changed = False
        for pattern, replacement in replacements:
            if replacement.split('console.log')[0] in content: 
                 continue
            if re.search(pattern, content):
                content = re.sub(pattern, replacement, content)
                changed = True
        
        if changed:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Instrumented: {path}")

    except Exception as e:
        print(f"Error processing {path}: {e}")

def main():
    # 1. MutableGraph
    mutable_replacements = [
        (r'(constructor\(graph, store\) \{)', fr'\1 console.log("{LOG_PREFIX}MutableGraph CONSTRUCTOR");')
    ]

    # 2. DescribeResultCache
    describe_replacements = [
        (r'(constructor\(args\) \{)', fr'\1 console.log("{LOG_PREFIX}DescribeResultCache CONSTRUCTOR");')
    ]

    # 3. SnapshotUpdater
    # We already instrumented methods, let's add constructor
    snapshot_replacements = [
        (r'(constructor\(args\) \{)', fr'\1 console.log("{LOG_PREFIX}SnapshotUpdater CONSTRUCTOR");')
    ]

    for root, dirs, files in os.walk("node_modules"):
        for file in files:
            path = os.path.join(root, file)
            
            if "mutable-graph.js" in file:
                instrument_file(path, mutable_replacements)
            elif "describe-cache.js" in file and "inspector/graph" in path:
                instrument_file(path, describe_replacements)
            elif "snapshot-updater.js" in file:
                instrument_file(path, snapshot_replacements)

if __name__ == "__main__":
    main()
