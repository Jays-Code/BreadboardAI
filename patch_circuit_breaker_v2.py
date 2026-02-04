import os

def patch_robust(path):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        new_lines = []
        patched = False
        
        circuit_breaker = [
            "        // CIRCUIT BREAKER INJECTION\n",
            "        if (!this._l) { this._l = Date.now(); this._c = 0; }\n",
            "        if (Date.now() - this._l > 1000) { this._l = Date.now(); this._c = 0; }\n",
            "        this._c++;\n",
            "        if (this._c > 50) { return; }\n"
        ]

        for line in lines:
            new_lines.append(line)
            if "updated(graphId, nodeId) {" in line and not patched:
                # Inject right after method signature
                new_lines.extend(circuit_breaker)
                patched = True
                print("Injected circuit breaker code.")
        
        if patched:
            with open(path, 'w', encoding='utf-8') as f:
                f.writelines(new_lines)
            print(f"Patched {path}")
        else:
            print(f"Could not find method signature in {path}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    patch_robust("node_modules/@google-labs/breadboard/dist/src/inspector/graph/node-describer-manager.js")
