import os
import re

def total_recall_revert():
    # 1. Purge graphCache from all inspector/index.js files
    # We find all files named index.js that contain graphCache
    os.system('grep -rl "graphCache" node_modules > graph_cache_files.txt')
    if os.path.exists("graph_cache_files.txt"):
        with open("graph_cache_files.txt", "r") as f:
            paths = [line.strip() for line in f if line.strip()]
        
        orig_inspect = """export const inspect = (graph, options = {}) => {
    const store = new GraphStore(makeTerribleOptions(options));
    return new Graph("", new MutableGraphImpl(graph, store));
};"""

        # Robust regex for the whole block we injected
        # const graphCache = new WeakMap();
        # export const inspect = (graph, options = {}) => {
        #     if (graphCache.has(graph)) {
        #         return graphCache.get(graph);
        #     }
        #     const store = new GraphStore(makeTerribleOptions(options));
        #     const result = new Graph("", new MutableGraphImpl(graph, store));
        #     graphCache.set(graph, result);
        #     return result;
        # };
        
        pattern = re.compile(r'const graphCache = new WeakMap\(\);.*?export const inspect = \(graph, options = \{\}\) => \{.*?return result;.*?};', re.DOTALL)

        for path in paths:
            try:
                with open(path, "r") as f:
                    content = f.read()
                
                if "graphCache" in content:
                    new_content = pattern.sub(orig_inspect, content)
                    # If regex fails, try a simpler replacement
                    if new_content == content:
                         start_idx = content.find("const graphCache = new WeakMap();")
                         end_idx = content.find("};", start_idx) # Find the end of the inspect function
                         if start_idx != -1 and end_idx != -1:
                             new_content = content[:start_idx] + orig_inspect + content[end_idx+2:]

                    if new_content != content:
                        with open(path, "w") as f:
                            f.write(new_content)
                        print(f"REVERTED Inspector (Recursive): {path}")
            except Exception as e:
                print(f"Error reverting {path}: {e}")

    # 2. Purge SchemaDiffer from all mutable-graph.js files
    os.system('grep -rl "new SchemaDiffer(this.graph, graph).same()" node_modules > mutable_graph_idemp_files.txt')
    if os.path.exists("mutable_graph_idemp_files.txt"):
        with open("mutable_graph_idemp_files.txt", "r") as f:
            paths = [line.strip() for line in f if line.strip()]
            
        for path in paths:
            try:
                with open(path, "r") as f:
                    content = f.read()
                
                # Remove the idempotency check
                content = re.sub(r'if \(this.graph && new SchemaDiffer\(this.graph, graph\).same\(\)\) \{.*?\}', '', content, flags=re.DOTALL)
                # Remove SchemaDiffer from imports
                content = content.replace(", SchemaDiffer", "")
                
                with open(path, "w") as f:
                    f.write(content)
                print(f"REVERTED MutableGraph (Recursive): {path}")
            except Exception as e:
                print(f"Error reverting {path}: {e}")

if __name__ == "__main__":
    total_recall_revert()
