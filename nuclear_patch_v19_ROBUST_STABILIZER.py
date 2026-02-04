import os
import re

def robust_stabilizer_patch():
    file_list = "all_inspector_index_files.txt"
    if not os.path.exists(file_list): 
        print("File list not found.")
        return
    
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
};"""

    # Regex to find the inspect function block
    # It usually looks like:
    # export const inspect = (graph, options = {}) => {
    #     const store = new GraphStore(makeTerribleOptions(options));
    #     return new Graph("", new MutableGraphImpl(graph, store));
    # };
    inspect_pattern = re.compile(r'export const inspect = \(graph, options = \{\}\) => \{.*?\};', re.DOTALL)

    for path in paths:
        try:
            if not os.path.exists(path): continue
            with open(path, "r") as f:
                content = f.read()
            
            if "graphCache" in content:
                print(f"Skipping (already stabilized): {path}")
                continue

            new_content = inspect_pattern.sub(stabilized_inspect, content)
            
            if new_content != content:
                with open(path, "w") as f:
                    f.write(new_content)
                print(f"STABILIZED (Robust): {path}")
            else:
                print(f"Failed to match pattern in: {path}")
                # Fallback: look for generic export const inspect
                if "export const inspect = (graph, options = {}) =>" in content:
                    print(f"Attempting fallback for: {path}")
                    # Simple string replacement for the header line and a fixed block
                    # This is riskier but necessary if regex fails.
                    # We'll try to find the next };
                    start_idx = content.find("export const inspect = (graph, options = {}) =>")
                    end_idx = content.find("};", start_idx)
                    if start_idx != -1 and end_idx != -1:
                        new_content = content[:start_idx] + stabilized_inspect + content[end_idx + 2:]
                        with open(path, "w") as f:
                            f.write(new_content)
                        print(f"STABILIZED (Fallback): {path}")

        except Exception as e:
            print(f"Error stabilizing {path}: {e}")

if __name__ == "__main__":
    robust_stabilizer_patch()
