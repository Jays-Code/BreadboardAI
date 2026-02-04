import os
import re

def apply_circuit_breaker():
    target_files = []
    # Find all node-describer-manager.js files
    for root, dirs, files in os.walk("."):
        for file in files:
            if file == "node-describer-manager.js":
                target_files.append(os.path.join(root, file))

    if not target_files:
        print("No target files found!")
        return

    # Regex to find the updated method with any arguments
    # Matches 'updated(' followed by args and ') {'
    pattern = re.compile(r'updated\s*\([^\)]*\)\s*\{')

    for path in target_files:
        try:
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()

            if "CIRCUIT BREAKER INJECTION" in content:
                print(f"Already patched: {path}")
                continue

            match = pattern.search(content)
            if match:
                signature = match.group(0)
                print(f"Patching {signature} in {path}")
                
                injection = signature + """
            // CIRCUIT BREAKER INJECTION
            if (!this._l) { this._l = Date.now(); this._c = 0; }
            if (Date.now() - this._l > 1000) { this._l = Date.now(); this._c = 0; }
            this._c++;
            if (this._c > 50) { 
                if (this._c === 51) console.warn("Breadboard Throttle Active");
                return; 
            }
                """
                new_content = content.replace(signature, injection)
                
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Successfully Patched: {path}")
            else:
                print(f"Could not find 'updated' method signature in {path}")

        except Exception as e:
            print(f"Error patching {path}: {e}")

if __name__ == "__main__":
    apply_circuit_breaker()
