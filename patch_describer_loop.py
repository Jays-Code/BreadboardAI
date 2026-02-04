import os
import re

def patch_node_describer_manager(path):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        changed = False
        
        # Patch willUpdate to track changes
        pattern_will = r'(if\s*\(\s*inputsDiffer\.same\(\)\s*&&\s*outputsDiffer\.same\(\)\s*&&\s*sameMetadata\(previous,\s*current\)\s*\)\s*\{\s*return;\s*\})'
        if re.search(pattern_will, content):
            # Check if already patched
            if 'this._lastDiffSame = true' not in content:
                # We replace the if block with one that sets the flag, AND append the false setting after it
                # Since the original just returns, we need to be careful where we insert the false.
                # The original code ends the function after the if (implicitly returning undefined).
                # So we can replace the matching block with "block that sets true and returns" 
                # AND add "this._lastDiffSame = false;" after it.
                
                replacement = r'if (inputsDiffer.same() && outputsDiffer.same() && sameMetadata(previous, current)) { this._lastDiffSame = true; return; } this._lastDiffSame = false;'
                new_content = re.sub(pattern_will, replacement, content)
                if new_content != content:
                    content = new_content
                    changed = True
                    print("Patched willUpdate logic")

        # Patch updated to check the flag
        pattern_updated = r'(updated\(graphId,\s*nodeId\)\s*\{\s*)(this\.mutable\.store\.dispatchEvent)'
        if re.search(pattern_updated, content):
            if 'if (this._lastDiffSame)' not in content:
                replacement = r'\1if (this._lastDiffSame) { this._lastDiffSame = false; return; } \2'
                new_content = re.sub(pattern_updated, replacement, content)
                if new_content != content:
                    content = new_content
                    changed = True
                    print("Patched updated logic")

        if changed:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Successfully patched {path}")
        else:
            print(f"No changes needed for {path}")
            
    except Exception as e:
        print(f"Error patching {path}: {e}")

if __name__ == "__main__":
    target_path = "node_modules/@google-labs/breadboard/dist/src/inspector/graph/node-describer-manager.js"
    if os.path.exists(target_path):
        patch_node_describer_manager(target_path)
    else:
        print("Target file not found!")
