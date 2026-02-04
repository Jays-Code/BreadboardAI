import os
import re

def patch_schema_differ():
    target_files = []
    # Find all schema-differ.js files
    for root, dirs, files in os.walk("node_modules"):
        for file in files:
            if file == "schema-differ.js":
                target_files.append(os.path.join(root, file))

    if not target_files:
        print("No schema-differ.js files found!")
        return

    # Stable Stringify Implementation
    stable_stringify_fn = """
    same() {
        // STABLE DEEP EQUALITY PATCH
        const stableStringify = (obj) => {
            if (obj === null || typeof obj !== 'object') return JSON.stringify(obj);
            if (Array.isArray(obj)) return '[' + obj.map(stableStringify).join(',') + ']';
            const keys = Object.keys(obj).sort();
            return '{' + keys.map(k => JSON.stringify(k) + ':' + stableStringify(obj[k])).join(',') + '}';
        };
        try {
            const s1 = stableStringify(this.existing);
            const s2 = stableStringify(this.incoming);
            const result = s1 === s2;
            if (!result) {
                // console.warn("[SchemaDiffer] Change detected", s1.length, s2.length);
            }
            return result;
        } catch (e) {
            return false;
        }
    }
    """

    for path in target_files:
        try:
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()

            if "STABLE DEEP EQUALITY PATCH" in content:
                print(f"Already patched: {path}")
                continue

            # Target the same() method
            # Usually looks like: same() { return this.existing === this.incoming; }
            # Or similar with transpilation.
            
            new_content = re.sub(r'same\s*\(\)\s*\{[^\}]*\}', stable_stringify_fn, content)
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Patched: {path}")
            else:
                # Try a broader match if the previous failed (e.g. if it has more complex body)
                # This is riskier but necessary if first one fails.
                print(f"Could not find exact same() pattern in {path}, attempting broader match...")
                # Looking for same() { ... } with balanced braces is hard in regex.
                # Let's try simple replacement of the common transpiled forms.
                if "same()" in content:
                    # Very simple replacement for common dist versions
                    parts = content.split("same()")
                    if len(parts) > 1:
                        # Reconstruct with the new function
                        # We need to be careful about where the old function ends.
                        # Most of these are short.
                        print(f"Manual string split replacement for {path}")
                        # This is getting complex, let's just use a more literal regex for the known version
                        # same() {
                        #     return this.existing === this.incoming;
                        # }
                        new_content = re.sub(r'same\(\)\s*\{\s*return\s*this\.existing\s*===\s*this\.incoming;\s*\}', stable_stringify_fn, content)
                        if new_content != content:
                            with open(path, 'w', encoding='utf-8') as f:
                                f.write(new_content)
                            print(f"Patched (Literal): {path}")
                        else:
                            print(f"STILL could not patch {path}")

        except Exception as e:
            print(f"Error patching {path}: {e}")

if __name__ == "__main__":
    patch_schema_differ()
