import os
import re

def patch_content(content):
    changed = False
    
    # Fix invalid LHS assignment caused by optional chaining
    # Pattern: Match "identifier?.prop... =" and replace with "identifier.prop... ="
    # We loop to handle multiple ?. in one LHS if necessary, though unlikely to be complex
    
    # Regex Breakdown:
    # ([a-zA-Z0-9_$]+)  : The identifier before the ?.
    # \?\.              : The literal ?.
    # ([a-zA-Z0-9_$.\[\]'"]+) : The rest of the property path (including dots, brackets)
    # \s*=              : The assignment operator
    
    pattern_lhs = r'([a-zA-Z0-9_$]+)\?\.([a-zA-Z0-9_$.\[\]\'"]+)\s*=[^=]' 
    # [^=] check ensures we don't match == or === comparisons where ?. IS valid
    
    def lhs_replacer(match):
        # We just remove the ? from the match, keeping everything else
        return match.group(0).replace('?.', '.')

    for _ in range(5):
        new_content, count = re.subn(pattern_lhs, lhs_replacer, content)
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
        # Skip huge files
        if os.path.getsize(path) > 15 * 1024 * 1024: 
            continue
            
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content, changed = patch_content(content)
        
        if changed:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed LHS: {path}")
            patched_count += 1
    except Exception as e:
        pass

print(f"Done! Fixed LHS in {patched_count} files.")
