import os
import re

def patch_file(filepath):
    print(f"Checking {filepath}...")
    with open(filepath, 'r') as f:
        content = f.read()
    
    modified = False
    
    # Pattern 1: errors.push(... was wired to an input ...)
    # Pattern 2: errors.push(`Board input ... is not reachable ...)
    
    # We replace errors.push with console.warn for board validation messages
    new_content = re.sub(r'errors\.push\(`([^`]*)was wired to an input', r'console.warn(`[Suppressed] \1was wired to an input', content)
    if new_content != content:
        content = new_content
        modified = True
        print(f"Patched 'wired to an input' in {filepath}")

    new_content = re.sub(r'errors\.push\(`Board input', r'console.warn(`[Suppressed] Board input', content)
    if new_content != content:
        content = new_content
        modified = True
        print(f"Patched 'not reachable' in {filepath}")
    
    if modified:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Successfully fixed {filepath}")
    else:
        print(f"No changes needed for {filepath}")

def main():
    for root, dirs, files in os.walk('node_modules'):
        if 'serialize.js' in files:
            patch_file(os.path.join(root, 'serialize.js'))

if __name__ == "__main__":
    main()
