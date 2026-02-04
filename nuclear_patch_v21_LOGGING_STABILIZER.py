import os
import re

def logging_stabilizer_patch():
    file_list = "all_inspector_index_files.txt"
    if not os.path.exists(file_list): return
    
    with open(file_list, "r") as f:
        paths = [line.strip() for line in f if line.strip()]

    # Add logging to see if it's hitting the cache
    stabilized_inspect = """const graphCache = new WeakMap();
export const inspect = (graph, options = {}) => {
    if (graphCache.has(graph)) {
        // console.log("WATCHDOG: inspect() CACHE HIT");
        return graphCache.get(graph);
    }
    console.log("WATCHDOG: inspect() CACHE MISS - NEW INSPECTOR");
    const store = new GraphStore(makeTerribleOptions(options));
    const result = new Graph("", new MutableGraphImpl(graph, store));
    graphCache.set(graph, result);
    return result;
};"""

    inspect_pattern = re.compile(r'export const inspect = \(graph, options = \{\}\) => \{.*?\};', re.DOTALL)
    memoized_marker = "const graphCache = new WeakMap();"

    for path in paths:
        try:
            if not os.path.exists(path): continue
            with open(path, "r") as f:
                content = f.read()
            
            # If it's already stabilized by v19, replace it with the logging version
            if memoized_marker in content:
                # Find the existing graphCache block and replace it
                # We'll just replace the whole block again using the same pattern if possible
                new_content = re.sub(r'const graphCache = new WeakMap\(\);.*?return result;.*?};', stabilized_inspect, content, flags=re.DOTALL)
            else:
                new_content = inspect_pattern.sub(stabilized_inspect, content)
            
            if new_content != content:
                with open(path, "w") as f:
                    f.write(new_content)
                print(f"STABILIZED (Logging): {path}")

        except Exception as e:
            print(f"Error stabilizing {path}: {e}")

if __name__ == "__main__":
    logging_stabilizer_patch()
