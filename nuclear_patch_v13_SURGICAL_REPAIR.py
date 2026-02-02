import os
import re

def patch_content(content):
    changed = False
    
    # 1. Fix the "in" mess (Broken string literals)
    # Pattern 1: Leading quote mess
    pattern_mess1 = r'"\(typeof\s+([a-zA-Z0-9_$]+)\s*===\s*"object"\s*&&\s*\1\s*!==\s*null\s*&&\s*([a-zA-Z0-9_$]+)"\s*in\s*(\1)\)'
    # Pattern 2: Inner mess without leading quote
    pattern_mess2 = r'\(typeof\s+([a-zA-Z0-9_$]+)\s*===\s*"object"\s*&&\s*\1\s*!==\s*null\s*&&\s*([a-zA-Z0-9_$]+)"\s*in\s*(\1)\)'
    
    for _ in range(10):
        c1 = 0; c2 = 0
        new_content, c1 = re.subn(pattern_mess1, r'("\2" in \1)', content)
        content = new_content
        new_content, c2 = re.subn(pattern_mess2, r'("\2" in \1)', content)
        content = new_content
        if c1 + c2 > 0: changed = True
        else: break

    # 2. Cleanup residual wreckage
    # Fix ""prop" in ident"
    content, count = re.subn(r'""([a-zA-Z0-9_$]+)"\s*in\s*([a-zA-Z0-9_$]+)"', r'("\1" in \2)', content)
    if count > 0: changed = True

    # 3. Fix LHS syntax errors (Optional chain on assignment)
    # Match any optional chain before an equals sign
    content, count = re.subn(r'\b([a-zA-Z0-9_$]+)\?\.([a-zA-Z0-9_$]+)\s*=', r'\1.\2 =', content)
    if count > 0: changed = True

    return content, changed

files_to_check = []
search_dirs = ['node_modules', 'packages', 'tools', 'src']
for search_dir in search_dirs:
    if not os.path.exists(search_dir): continue
    for root, dirs, files in os.walk(search_dir):
        for file in files:
            if file.endswith('.js') or file.endswith('.mjs') or file.endswith('.ts'):
                files_to_check.append(os.path.join(root, file))

print(f"Checking {len(files_to_check)} files...")
patched_count = 0
for path in files_to_check:
    try:
        if os.path.getsize(path) > 15 * 1024 * 1024: continue
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        new_content, changed = patch_content(content)
        if changed:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Surgically Fixed: {path}")
            patched_count += 1
    except Exception as e:
        pass
print(f"Done! Repaired {patched_count} files.")
