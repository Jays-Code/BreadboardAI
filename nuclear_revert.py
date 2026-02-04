import os
import re

def nuclear_revert():
    # 1. Revert inspector/index.js (inspect function)
    index_list = "all_inspector_index_files.txt"
    if os.path.exists(index_list):
        with open(index_list, "r") as f:
            paths = [line.strip() for line in f if line.strip()]
        
        orig_inspect = """export const inspect = (graph, options = {}) => {
    const store = new GraphStore(makeTerribleOptions(options));
    return new Graph("", new MutableGraphImpl(graph, store));
};"""

        pattern = re.compile(r'const graphCache = new WeakMap\(\);.*?export const inspect = \(graph, options = \{\}\) => \{.*?return result;.*?};', re.DOTALL)

        for path in paths:
            try:
                if not os.path.exists(path): continue
                with open(path, "r") as f:
                    content = f.read()
                
                if "graphCache" in content:
                    new_content = pattern.sub(orig_inspect, content)
                    if new_content != content:
                        with open(path, "w") as f:
                            f.write(new_content)
                        print(f"REVERTED Inspector: {path}")
            except Exception as e:
                print(f"Error reverting {path}: {e}")

    # 2. Revert mutable-graph.js (rebuild and imports)
    graph_list = "all_mutable_graph_files.txt"
    if os.path.exists(graph_list):
        with open(graph_list, "r") as f:
            paths = [line.strip() for line in f if line.strip()]
        
        for path in paths:
            try:
                if not os.path.exists(path): continue
                with open(path, "r") as f:
                    content = f.read()
                
                if "new SchemaDiffer(this.graph, graph).same()" in content:
                    # Remove the idempotency check
                    content = re.sub(r'if \(this.graph && new SchemaDiffer\(this.graph, graph\).same\(\)\) \{.*?\}', '', content, flags=re.DOTALL)
                    # Remove SchemaDiffer from imports if possible
                    content = content.replace(", SchemaDiffer", "")
                    
                    with open(path, "w") as f:
                        f.write(content)
                    print(f"REVERTED MutableGraph: {path}")
            except Exception as e:
                print(f"Error reverting {path}: {e}")

if __name__ == "__main__":
    nuclear_revert()
