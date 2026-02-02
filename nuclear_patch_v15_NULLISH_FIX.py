import os
import re

def patch_content(content):
    changed = False
    
    # Fix invalid LHS assignment caused by optional chaining with Nullish Coalescing
    # Pattern: Match "identifier?.prop... ??=" and replace with "identifier.prop... ??="
    
    # Regex Breakdown:
    # ([a-zA-Z0-9_$]+)  : The identifier before the ?.
    # \?\.              : The literal ?.
    # ([a-zA-Z0-9_$.\[\]'"]+) : The rest of the property path
    # \s*\?\?=          : The nullish coalescing assignment operator ??=
    
    pattern_lhs_nullish = r'([a-zA-Z0-9_$]+)\?\.([a-zA-Z0-9_$.\[\]\'"]+)\s*\?\?=' 
    
    def lhs_nullish_replacer(match):
        return match.group(0).replace('?.', '.')

    for _ in range(5):
        new_content, count = re.subn(pattern_lhs_nullish, lhs_nullish_replacer, content)
        if count > 0:
            changed = True
            content = new_content
        else:
            break
            
    # Also re-run the v14 fix for standard assignments just in case any were missed
    pattern_lhs_standard = r'([a-zA-Z0-9_$]+)\?\.([a-zA-Z0-9_$.\[\]\'"]+)\s*=[^=]' 
    def lhs_standard_replacer(match):
        # We replace ONLY the ?. relevant to the LHS
        return match.group(0).replace('?.', '.')

    for _ in range(5):
        new_content, count = re.subn(pattern_lhs_standard, lhs_standard_replacer, content)
        if count > 0:
            changed = True
            content = new_content
        else:
            break

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
            print(f"Fixed Nullish LHS: {path}")
            patched_count += 1
    except Exception as e:
        pass

print(f"Done! Fixed Nullish LHS in {patched_count} files.")
