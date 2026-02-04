import os

def rebuild_idempotency_patch():
    file_list = "all_mutable_graph_files.txt"
    if not os.path.exists(file_list): return
    
    with open(file_list, "r") as f:
        paths = [line.strip() for line in f if line.strip()]

    # We need to add SchemaDiffer to the import from @breadboard-ai/utils
    # and then add the check to rebuild()

    for path in paths:
        try:
            if not os.path.exists(path): continue
            with open(path, "r") as f:
                content = f.read()
            
            if "new SchemaDiffer(this.graph, graph).same()" in content:
                print(f"Skipping (already idempotent): {path}")
                continue

            # 1. Update imports
            # Look for: import { ..., ... } from "@breadboard-ai/utils";
            import_marker = '} from "@breadboard-ai/utils";'
            if import_marker in content and "SchemaDiffer" not in content:
                content = content.replace(import_marker, ', SchemaDiffer ' + import_marker)

            # 2. Update rebuild method
            marker = "rebuild(graph) {"
            idx = content.find(marker)
            if idx != -1:
                # Inject idempotency check
                idempotency_check = """
        if (this.graph && new SchemaDiffer(this.graph, graph).same()) {
            return;
        }"""
                # Find the line after the imperative graph check if it exists
                imperative_check = "graph = toDeclarativeGraph(graph);"
                imp_idx = content.find(imperative_check, idx)
                if imp_idx != -1:
                    insert_pos = imp_idx + len(imperative_check)
                else:
                    insert_pos = idx + len(marker)
                
                content = content[:insert_pos] + idempotency_check + content[insert_pos:]
                
                with open(path, "w") as f:
                    f.write(content)
                print(f"IDEMPOTENT: {path}")

        except Exception as e:
            print(f"Error patching {path}: {e}")

if __name__ == "__main__":
    rebuild_idempotency_patch()
