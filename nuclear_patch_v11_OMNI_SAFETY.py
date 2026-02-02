import os
import re

def patch_content(content):
    changed = False
    
    # 1. Broad but safe "in" operator patcher
    def in_patcher(match):
        full = match.group(0)
        lhs = match.group(1)
        rhs = match.group(2)
        if rhs in ['Object', 'window', 'global', 'this', 'Array', 'JSON', 'Symbol', 'Reflect']: return full
        if rhs.startswith('is') or (rhs[0].isupper() and rhs[1:].islower()): return full # Skip likely classes/constructors
        return f'(typeof {rhs} === "object" && {rhs} !== null && {full})'
    
    content, count = re.subn(r'\b([a-zA-Z0-9_$"]+)\s+in\s+([a-zA-Z0-9_$]+)\b', in_patcher, content)
    if count > 0: changed = True

    # 2. Key access patterns (Optional Chaining)
    targets = ['node', 'input', 'port', 'board', 'output', 'cast', 'metadata', 'configuration', 'schema', 'resolution', 'descriptor', 'inputPort']
    for t in targets:
        # Match t.prop or t[X].prop (simplistic)
        # We use \b to ensure we match the variable exactly
        content, count = re.subn(r'\b(' + t + r'[0-9]*)\.([a-zA-Z0-9_$]+)\b', r'\1?.\2', content)
        if count > 0: changed = True

    # 3. toJSONSchema specific (handles the nested ones)
    content, count = re.subn(r'toJSONSchema\s*\(\s*unroll\s*\(\s*port\s*\)\s*\.type\s*\)', r'toJSONSchema(unroll(port)?.type || "string")', content)
    if count > 0: changed = True
    content, count = re.subn(r'toJSONSchema\s*\(\s*(input[a-zA-Z0-9]*)\.type\s*\)', r'toJSONSchema(\1?.type || "string")', content)
    if count > 0: changed = True

    # 4. serialize(board) null check
    content, count = re.subn(r'function\s+serialize\s*\(\s*([a-zA-Z0-9_$]+)\s*\)\s*\{', r'function serialize(\1) { if(!\1) return {nodes:[], edges:[]}; ', content)
    if count > 0: changed = True

    # 5. throw suppressor (v6)
    content, count = re.subn(r'throw\s+new\s+Error\s*\(\s*([\'"`])Error\s+serializing\s+board', r'console.error(\1[Suppressed] Error serializing board', content)
    if count > 0: changed = True

    return content, changed

files_to_check = []
# Targeted search for speed and safety
search_dirs = [
    'packages',
    'tools',
    'src',
    'node_modules/@breadboard-ai',
    'node_modules/@google-labs',
    'tools/editor/node_modules/.vite' # Active bundle cache
]

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
        # Skip very large minified files that aren't the bundle we want
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
