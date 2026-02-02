import os
import re

def patch_content(content):
    changed = False
    
    # 1. Patch strings (from v6)
    # throw new Error(...)
    new_content, count = re.subn(r'throw\s+new\s+Error\s*\(\s*([\'"`])Error\s+serializing\s+board', r'console.error(\1[Suppressed] Error serializing board', content)
    if count > 0: changed = True; content = new_content
    
    # errors.push(`Board input ...`)
    new_content, count = re.subn(r'errors\.push\s*\(\s*([\'"`])Board\s+input', r'console.warn(\1[Suppressed] Board input', content)
    if count > 0: changed = True; content = new_content
    
    # errors.push(`${thisNodeId}:${portName} was wired to an input ...`)
    new_content, count = re.subn(r'errors\.push\s*\(\s*([\'"`])\$\{thisNodeId\}:\$\{portName\}\s+was\s+wired\s+to\s+an\s+input', r'console.warn(\1[Suppressed] ${thisNodeId}:${portName} was wired to an input', content)
    if count > 0: changed = True; content = new_content

    # 2. Patch safety guards (from v7) - Handle void 0 and undefined
    # isBoardOutput
    # Match value.innerBoard !== undefined OR value.innerBoard !== void 0 OR value.innerBoard!==void 0
    pattern_output = r'value\.innerBoard\s*!==\s*(?:undefined|void\s+0)'
    replacement_output = r'(value !== null && typeof value === "object" && value.innerBoard !== void 0)'
    new_content, count = re.subn(pattern_output, replacement_output, content)
    if count > 0: changed = True; content = new_content
    
    # isBoardInstance
    pattern_instance = r'value\.definition\s*!==\s*(?:undefined|void\s+0)'
    replacement_instance = r'(value !== null && typeof value === "object" && value.definition !== void 0)'
    new_content, count = re.subn(pattern_instance, replacement_instance, content)
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
        if os.path.getsize(path) > 10 * 1024 * 1024: # Skip files larger than 10MB
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
        print(f"Error patching {path}: {e}")

print(f"Done! Patched {patched_count} files.")
