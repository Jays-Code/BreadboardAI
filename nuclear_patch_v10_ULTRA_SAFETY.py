import os
import re

def patch_content(content):
    changed = False
    
    # 1. Patch strings (from v6)
    new_content, count = re.subn(r'throw\s+new\s+Error\s*\(\s*([\'"`])Error\s+serializing\s+board', r'console.error(\1[Suppressed] Error serializing board', content)
    if count > 0: changed = True; content = new_content
    
    # 2. Patch safety guards (from v7)
    pattern_output = r'value\.innerBoard\s*!==\s*(?:undefined|void\s+0)'
    replacement_output = r'(value !== null && typeof value === "object" && value.innerBoard !== void 0)'
    new_content, count = re.subn(pattern_output, replacement_output, content)
    if count > 0: changed = True; content = new_content
    
    pattern_instance = r'value\.definition\s*!==\s*(?:undefined|void\s+0)'
    replacement_instance = r'(value !== null && typeof value === "object" && value.definition !== void 0)'
    new_content, count = re.subn(pattern_instance, replacement_instance, content)
    if count > 0: changed = True; content = new_content

    # 3. Patch unroll - Safe "type" in check
    pattern_unroll_check = r'("type"\s*in\s*value)'
    replacement_unroll_check = r'(value !== null && typeof value === "object" && \1)'
    new_content, count = re.subn(pattern_unroll_check, replacement_unroll_check, content)
    if count > 0: changed = True; content = new_content

    # 4. Patch describeOutput: toJSONSchema(unroll(port).type)
    # Matches minified and normal
    pattern_desc_out = r'toJSONSchema\s*\(\s*unroll\s*\(\s*port\s*\)\s*\.type\s*\)'
    replacement_desc_out = r'toJSONSchema((unroll(port) || {type:"string"}).type || "string")'
    new_content, count = re.subn(pattern_desc_out, replacement_desc_out, content)
    if count > 0: changed = True; content = new_content

    # 5. Patch describeInput: toJSONSchema(input.type)
    # Match toJSONSchema(input4.type) or toJSONSchema(input.type)
    pattern_desc_in = r'toJSONSchema\s*\(\s*(input[a-zA-Z0-9]*)\.type\s*\)'
    replacement_desc_in = r'toJSONSchema((\1 || {type:"string"}).type || "string")'
    new_content, count = re.subn(pattern_desc_in, replacement_desc_in, content)
    if count > 0: changed = True; content = new_content

    # 6. Ultra Safety: portMetadata title/description access
    # if (output.title) -> if (output && output.title)
    # if (output.description) -> if (output && output.description)
    new_content, count = re.subn(r'if\s*\(\s*output([a-zA-Z0-9]*)\.title\s*\)', r'if (output\1 && output\1.title)', content)
    if count > 0: changed = True; content = new_content
    new_content, count = re.subn(r'if\s*\(\s*output([a-zA-Z0-9]*)\.description\s*\)', r'if (output\1 && output\1.description)', content)
    if count > 0: changed = True; content = new_content

    return content, changed

files_to_check = []
search_dirs = ['node_modules', 'packages', 'tools']
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
            print(f"Patched: {path}")
            patched_count += 1
    except Exception as e:
        pass

print(f"Done! Patched {patched_count} files.")
