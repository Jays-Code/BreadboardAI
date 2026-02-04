import os

def massive_throttle_patch():
    file_list = "all_describer_manager_files.txt"
    if not os.path.exists(file_list): return
    
    with open(file_list, "r") as f:
        paths = [line.strip() for line in f if line.strip()]

    throttle_patch = """    updated(event) {
        if (!this._l) { this._l = Date.now(); this._c = 0; }
        if (Date.now() - this._l > 1000) { this._l = Date.now(); this._c = 0; }
        this._c++;
        if (this._c > 1) { 
            if (this._c === 2) console.warn("WATCHDOG: MASSIVE THROTTLE ACTIVE (1/sec)");
            return; 
        }
"""

    for path in paths:
        try:
            if not os.path.exists(path): continue
            with open(path, "r") as f:
                content = f.read()
            
            # Replace existing throttle if present, or inject at start of updated(event)
            marker = "updated(event) {"
            if marker in content:
                # If we already have a throttle, we need to find its range and replace it
                # or just look for the logic we injected before.
                if "this._l = Date.now()" in content:
                    # Generic removal of the previous block
                    # We'll just look for our specific warn string if possible
                    # Or just replace the whole function if possible.
                    pass 

                # Simple injection/overwrite strategy
                idx = content.find(marker)
                # We'll try to find the next few lines and replace them
                # But safer to just look for the closing brace if we know the function.
                # For now, we'll use a string replacement that targets the previous throttle.
                
                # Previous throttle had: if (this._c > 50)
                if "if (this._c > 50)" in content:
                    content = content.replace("if (this._c > 50)", "if (this._c > 1)")
                    content = content.replace("this._c === 51", "this._c === 2")
                    content = content.replace("Breadboard Throttle Active", "MASSIVE THROTTLE ACTIVE (1/sec)")
                else:
                    # Inject for the first time
                    content = content[:idx + len(marker)] + throttle_patch + content[idx + len(marker):]

                with open(path, "w") as f:
                    f.write(content)
                print(f"MASSIVE THROTTLE: {path}")

        except Exception as e:
            print(f"Error throttling {path}: {e}")

if __name__ == "__main__":
    massive_throttle_patch()
