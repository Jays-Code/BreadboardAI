import os
import re

def patch_content(content):
    changed = False
    
    # 1. Fix LHS optional chaining Assignment (Fatal syntax error)
    # Match: X?.Y = 
    new_content, count = re.subn(r'\b([a-zA-Z0-9_$]+)\?\.([a-zA-Z0-9_$]+)\s*=', r'\1.\2 =', content)
    if count > 0: changed = True; content = new_content

    # 2. Fix the "in" string literal mess created by v11
    # Pattern: "(typeof OBJ === "object" && OBJ !== null && PROP" in OBJ)
    pattern_mess = r'"\(typeof\s+([a-zA-Z0-9_$]+)\s*===\s*"object"\s*&&\s*\1\s*!==\s*null\s*&&\s*([a-zA-Z0-9_$]+)"\s*in\s*(\1)\)'
    replacement_mess = r'"\2" in \1'
    for _ in range(15): # Deeply nested safety
        new_content, count = re.subn(pattern_mess, replacement_mess, content)
        if count > 0: changed = True; content = new_content
        else: break

    # 3. Clean up nested guards (Flattening redundant checks)
    # Variation 1: (val !== null && typeof val === "object" && (val !== null ...))
    pattern_nested1 = r'\(([a-zA-Z0-9_$]+)\s*!==?\s*null\s*&&\s*typeof\s*\1\s*===\s*"object"\s*&&\s*\(\1\s*!==?\s*null\s*&&\s*typeof\s*\1\s*===\s*"object"\s*&&\s*(.+?)\)\)'
    # Variation 2: (typeof val === "object" && val !== null && (typeof val === "object" ...))
    pattern_nested2 = r'\(typeof\s+([a-zA-Z0-9_$]+)\s*===\s*"object"\s*&&\s*\1\s*!==\s*null\s*&&\s*\(typeof\s*\1\s*===\s*"object"\s*&&\s*\1\s*!==\s*null\s*&&\s*(.+?)\)\)'
    
    for _ in range(15):
        c1 = 0; c2 = 0
        new_content, c1 = re.subn(pattern_nested1, r'(\1 !== null && typeof \1 === "object" && \2)', content)
        content = new_content
        new_content, c2 = re.subn(pattern_nested2, r'(typeof \1 === "object" && \1 !== null && \2)', content)
        content = new_content
        if c1 + c2 > 0: changed = True
        else: break

    # 4. Final safety for "in" operator (The RIGHT way)
    # Ensure it doesn't match string literals and handles them correctly if it does
    # We want (typeof value === "object" && value !== null && "prop" in value)
    # but without breaking existing strings.
    
    return content, changed

files_to_check = []
search_dirs = ['node_modules', 'packages', 'tools', 'src']
for search_dir in search_dirs:
    if not os.path.exists(search_dir):
        continue
    for root, dirs, files in os.walk(search_dir):
        for file in files:
            if file.endswith('.js') or file.endswith('.mjs') or file.endswith('.ts'):
                files_to_check.append(os.path.join(root, file))

print(f"Checking {len(files_to_check)} files...")
patched_count = 0
for path in files_to_check:
    try:
        if os.path.getsize(path) > 15 * 1024 * 1024: 
            continue
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        new_content, changed = patch_content(content)
        if changed:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed: {path}")
            patched_count += 1
    except Exception as e:
        pass
print(f"Done! Cleaned {patched_count} files.")
