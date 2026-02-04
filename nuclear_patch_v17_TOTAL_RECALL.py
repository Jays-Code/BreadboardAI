import os

def nuclear_patch():
    file_lists = {
        "all_schema_differ_files.txt": "SchemaDiffer",
        "all_describer_manager_files.txt": "NodeDescriberManager",
        "all_snapshot_updater_files.txt": "SnapshotUpdater",
        "all_mutable_graph_files.txt": "MutableGraphImpl"
    }

    schema_patch = """    same() {
        const stableStringify = (obj) => {
            if (obj === null || typeof obj !== "object") return JSON.stringify(obj);
            if (Array.isArray(obj)) return "[" + obj.map(stableStringify).join(",") + "]";
            const keys = Object.keys(obj).sort();
            return "{" + keys.map(k => JSON.stringify(k) + ":" + stableStringify(obj[k])).join(",") + "}";
        };
        try {
            const s1 = stableStringify(this.existing);
            const s2 = stableStringify(this.incoming);
            return s1 === s2;
        } catch (e) {
            return false;
        }
    }
"""

    throttle_patch = """    updated(event) {
        if (!this._l) { this._l = Date.now(); this._c = 0; }
        if (Date.now() - this._l > 1000) { this._l = Date.now(); this._c = 0; }
        this._c++;
        if (this._c > 50) { 
            if (this._c === 51) console.warn("WATCHDOG: Breadboard Throttle Active");
            return; 
        }
"""

    for list_file, class_name in file_lists.items():
        if not os.path.exists(list_file): continue
        with open(list_file, "r") as f:
            paths = [line.strip() for line in f if line.strip()]
        
        for path in paths:
            try:
                with open(path, "r") as f:
                    content = f.read()
                
                new_content = content
                if class_name == "SchemaDiffer":
                    # Replace same() { ... } with patch
                    start = content.find("same() {")
                    end = content.find("diff() {")
                    if start != -1 and end != -1 and start < end:
                        new_content = content[:start] + schema_patch + "    " + content[end:]
                
                elif class_name == "NodeDescriberManager":
                    # Inject throttle at start of updated(event) {
                    marker = "updated(event) {"
                    idx = content.find(marker)
                    if idx != -1 and "this._l = Date.now()" not in content:
                        new_content = content[:idx + len(marker)] + throttle_patch + content[idx + len(marker):]

                elif class_name == "SnapshotUpdater":
                    marker = "constructor(args) {"
                    idx = content.find(marker)
                    if idx != -1 and "WATCHDOG" not in content:
                        new_content = content[:idx + len(marker)] + " console.log('WATCHDOG: SnapshotUpdater CONSTRUCTOR'); " + content[idx + len(marker):]
                    
                    marker_ref = "refresh() {"
                    idx_ref = content.find(marker_ref)
                    if idx_ref != -1 and "WATCHDOG" not in content[idx_ref:idx_ref+100]:
                        new_content = new_content.replace(marker_ref, marker_ref + " console.log('WATCHDOG: SnapshotUpdater.refresh'); ")

                elif class_name == "MutableGraphImpl":
                    marker = "constructor(graph, store) {"
                    idx = content.find(marker)
                    if idx != -1 and "WATCHDOG" not in content:
                        new_content = content[:idx + len(marker)] + " console.log('WATCHDOG: MutableGraph CONSTRUCTOR'); " + content[idx + len(marker):]

                if new_content != content:
                    with open(path, "w") as f:
                        f.write(new_content)
                    print(f"NUCLEAR Patched: {path}")

            except Exception as e:
                print(f"Error patching {path}: {e}")

if __name__ == "__main__":
    nuclear_patch()
