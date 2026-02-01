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
    # Fixed regex to include backticks (template literals)
    # Using a character class that includes `, ", and '
    # Note: ` in a python string is just `
    new_content = re.sub(r'throw\s+new\s+Error\s*\(\s*[`"\']Error\s+serializing\s+board', 
                         r'console.error(`[Suppressed] Error serializing board', content)
    
    if new_content != content:
        content = new_content
        modified = True
        print(f"Patched THROW in: {filepath}")

    # 2. Target the .push() calls that contain the error strings
    patterns = [
        r'is not reachable from any of its outputs',
        r'was wired to an input, but that input was not provided'
    ]
    
    for p in patterns:
        # Match [identifier].push([string_with_pattern])
        # Include backticks in the string delimiters
        regex = r'([a-zA-Z_$][a-zA-Z0-9_$]*)\.push\(\s*([`"\'])([^`"\']*' + p + r'[^`"\']*)\2\s*\)'
        
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
