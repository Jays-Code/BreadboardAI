import os

def fix_schema_differ():
    with open("schema_differ_files.txt", "r") as f:
        files = [line.strip() for line in f if line.strip()]

    clean_same_method = """    same() {
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

    for path in files:
        try:
            with open(path, "r") as f:
                content = f.read()

            # Find the start of same() and the start of diff()
            # This is safer than regex for balanced braces if we know the method names.
            start_marker = "same() {"
            end_marker = "diff() {"
            
            start_idx = content.find(start_marker)
            end_idx = content.find(end_marker)
            
            if start_idx != -1 and end_idx != -1 and start_idx < end_idx:
                new_content = content[:start_idx] + clean_same_method + "    " + content[end_idx:]
                with open(path, "w") as f:
                    f.write(new_content)
                print(f"Fixed & Patched: {path}")
            else:
                print(f"Failed to locate markers in {path}: start={start_idx}, end={end_idx}")

        except Exception as e:
            print(f"Error fixing {path}: {e}")

if __name__ == "__main__":
    fix_schema_differ()
