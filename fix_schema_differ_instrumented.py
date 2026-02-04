import os

def fix_schema_differ_with_logging():
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
            const isSame = s1 === s2;
            if (!isSame) {
                console.log("WATCHDOG: SchemaDiffer.same=false diff=" + s1.substring(0, 50) + "... vs " + s2.substring(0, 50) + "...");
                // Find first difference
                let i = 0;
                while (i < s1.length && i < s2.length && s1[i] === s2[i]) i++;
                console.log("WATCHDOG: Diff at char " + i + ": " + s1.substring(i, i+50) + " vs " + s2.substring(i, i+50));
            }
            return isSame;
        } catch (e) {
            return false;
        }
    }
"""

    for path in files:
        try:
            with open(path, "r") as f:
                content = f.read()

            start_marker = "same() {"
            end_marker = "diff() {"
            
            start_idx = content.find(start_marker)
            end_idx = content.find(end_marker)
            
            if start_idx != -1 and end_idx != -1 and start_idx < end_idx:
                new_content = content[:start_idx] + clean_same_method + "    " + content[end_idx:]
                with open(path, "w") as f:
                    f.write(new_content)
                print(f"Fixed & Instrumently Patched: {path}")
            else:
                print(f"Failed to locate markers in {path}: start={start_idx}, end={end_idx}")

        except Exception as e:
            print(f"Error fixing {path}: {e}")

if __name__ == "__main__":
    fix_schema_differ_with_logging()
