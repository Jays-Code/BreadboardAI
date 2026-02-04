import os

def stabilizer_patch():
    file_list = "all_inspector_index_files.txt"
    if not os.path.exists(file_list): return
    
    with open(file_list, "r") as f:
        paths = [line.strip() for line in f if line.strip()]

    stabilized_inspect = """const graphCache = new WeakMap();
export const inspect = (graph, options = {}) => {
    if (graphCache.has(graph)) {
        return graphCache.get(graph);
    }
    const store = new GraphStore(makeTerribleOptions(options));
    const result = new Graph("", new MutableGraphImpl(graph, store));
    graphCache.set(graph, result);
    return result;
};
"""

    for path in paths:
        try:
            with open(path, "r") as f:
                content = f.read()
            
            # Look for the inspect function
            marker = "export const inspect = (graph, options = {}) => {"
            if marker in content and "graphCache" not in content:
                # Find the end of the function (assuming it fits our expected pattern)
                # It's usually exactly these lines:
                # export const inspect = (graph, options = {}) => {
                #     const store = new GraphStore(makeTerribleOptions(options));
                #     return new Graph("", new MutableGraphImpl(graph, store));
                # };
                
                # We'll just replace the whole block if possible.
                old_block_end = "};"
                idx = content.find(marker)
                end_idx = content.find(old_block_end, idx)
                if idx != -1 and end_idx != -1:
                    new_content = content[:idx] + stabilized_inspect + content[end_idx + 2:]
                    with open(path, "w") as f:
                        f.write(new_content)
                    print(f"STABILIZED: {path}")
            
        except Exception as e:
            print(f"Error stabilizing {path}: {e}")

if __name__ == "__main__":
    stabilizer_patch()
