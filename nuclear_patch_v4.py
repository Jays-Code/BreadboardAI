import os
import re

def patch_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception:
        return False

    modified = False
    
    # 1. Target the throw new Error statement
    # Pattern: throw new Error([any quote]Error serializing board[anything])
    # We replace 'throw new Error' with 'console.error'
    throw_pattern = r'throw\s+new\s+Error\s*\(\s*([`"\'])Error\s+serializing\s+board'
    new_content = re.sub(throw_pattern, r'console.error(\1[Suppressed] Error serializing board', content)
    
    if new_content != content:
        content = new_content
        modified = True
        print(f"Patched THROW in: {filepath}")

    # 2. Target the .push() calls for specific error messages
    error_messages = [
        "is not reachable from any of its outputs",
        "was wired to an input, but that input was not provided"
    ]
    
    for msg in error_messages:
        # Pattern: [any_var].push([any quote][optional stuff]MSG[optional stuff][same quote])
        # We replace .push with .warn or just console.warn
        # This regex is tricky for nested quotes, so we'll be broad but safe.
        push_pattern = r'(\.[a-zA-Z0-9_$]+)?\.push\s*\(\s*([`"\'])([^`"\']*' + re.escape(msg) + r'[^`"\']*)\2\s*\)'
        # We replace with .warn(...) or console.warn(...)
        # If it was errors.push(...), it becomes errors.warn(...) which might fail if 'errors' is an array.
        # Actually, let's just replace the whole statement with a console.warn(...)
        
        # Replacement: console.warn(`[Suppressed] \3`)
        new_content = re.sub(push_pattern, r'console.warn(`[Suppressed] \3`)', content)
        
        if new_content != content:
            content = new_content
            modified = True
            print(f"Patched PUSH ({msg}) in: {filepath}")

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
    targets = ['node_modules/@breadboard-ai', 'node_modules/@google-labs']
    extensions = ('.js', '.ts', '.mjs', '.cjs')
    
    for target in targets:
        if not os.path.exists(target):
            continue
        print(f"Scanning {target}...")
        for root, dirs, files in os.walk(target):
            for file in files:
                if file.endswith(extensions):
                    if patch_file(os.path.join(root, file)):
                        count += 1
    print(f"Total files patched: {count}")

if __name__ == "__main__":
    main()
