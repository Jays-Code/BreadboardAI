import os
import re

def patch_circuit_breaker(path):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already patched with circuit breaker
        if "Circuit Breaker" in content:
            print(f"Already patched with Circuit Breaker: {path}")
            return

        # Target the updated method
        # We look for the exact state left by the previous patch
        pattern = r'(updated\(graphId,\s*nodeId\)\s*\{\s*if\s*\(this\._lastDiffSame\)\s*\{\s*this\._lastDiffSame\s*=\s*false;\s*return;\s*\}\s*)(this\.mutable\.store\.dispatchEvent)'
        
        # If the previous patch isn't there exactly as expected (maybe formatting differs), fallback to a simpler anchor
        # But we know it IS there from the grep check.
        # The grep output was: if (this._lastDiffSame) { this._lastDiffSame = false; return; } this.mutable.store.dispatchEvent...
        # It might be on one line or multiple.
        
        # Let's construct a replacement that matches the method start and the dispatch event
        
        breaker_code = r"""
        if (!this._l) { this._l = Date.now(); this._c = 0; }
        if (Date.now() - this._l > 1000) { this._l = Date.now(); this._c = 0; }
        this._c++;
        if (this._c > 50) { if (this._c === 51) console.warn("[Circuit Breaker] Loop detected for " + nodeId + ". Throttling."); return; }
        """
        
        # We inject it right before dispatchEvent
        replacement = r'\1' + breaker_code + r'\2'
        
        new_content = re.sub(pattern, replacement, content)
        
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Applied Circuit Breaker to {path}")
        else:
            print(f"Could not apply patch to {path}. Pattern mismatch?")
            print("Content start:", content[:200]) # Debug

    except Exception as e:
        print(f"Error patching {path}: {e}")

if __name__ == "__main__":
    target = "node_modules/@google-labs/breadboard/dist/src/inspector/graph/node-describer-manager.js"
    patch_circuit_breaker(target)
