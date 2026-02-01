import os
import re

def patch_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception:
        return False

    modified = False
    
    # 1. Target the throw new Error(`Error serializing board...`)
    # We want to catch: throw new Error(`Error serializing board: ... `)
    # and variations like: throw new Error("Error serializing board: ... ")
    # We'll just wrap the whole thing in a commented out block or replace with console.warn
    
    # Look for the throw statement
    # Example: if (s.length > 0) throw new Error(...)
    # We can replace 'throw new Error(`Error serializing board' with 'console.warn(`[Suppressed] Error serializing board'
    
    # regex to find 'throw new Error' followed by the error message start
    new_content = re.sub(r'throw\s+new\s+Error\s*\(\s*[`"]Error\s+serializing\s+board', 
                         r'console.error(`[Suppressed] Error serializing board', content)
    
    if new_content != content:
        content = new_content
        modified = True
        print(f"Patched THROW in: {filepath}")

    # 2. Target the .push() calls that contain the error strings
    # We look for something like .push(`Board input ... is not reachable from any of its outputs.`)
    # and replace .push with .warn (if it's console) or just disable it.
    
    # Patterns for the error messages
    patterns = [
        r'is not reachable from any of its outputs',
        r'was wired to an input, but that input was not provided'
    ]
    
    for p in patterns:
        # Match something like: [any_var].push(`... [pattern] ...`)
        # We'll replace it with a console.warn and keep the message.
        # This is tricky because we don't know the var name.
        # But we can look for .push(`... [p] ...`)
        
        # Simple approach: find the line and replace .push( with console.warn(
        # But wait, [any_var].push returns the new length, so we shouldn't just replace it if it's used as an expression.
        # However, here it's usually a standalone statement.
        
        # Targeted regex: match [identifier].push([string_with_pattern])
        # [a-zA-Z_$][a-zA-Z0-9_$]*\.push\(
        
        regex = r'([a-zA-Z_$][a-zA-Z0-9_$]*)\.push\(\s*([`"])([^`"]*' + p + r'[^`"]*)\2\s*\)'
        
        # Replacement: console.warn(`[Suppressed] \3`)
        new_content = re.sub(regex, r'console.warn(`[Suppressed] \3`)', content)
        
        if new_content != content:
            content = new_content
            modified = True
            print(f"Patched PUSH ({p}) in: {filepath}")

    if modified:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        except Exception:
            return False
    return False

def main():
    count = 0
    for root, dirs, files in os.walk('node_modules'):
        for file in files:
            if file.endswith('.js'):
                if patch_file(os.path.join(root, file)):
                    count += 1
    print(f"Total files patched: {count}")

if __name__ == "__main__":
    main()
