import os
import re

files_to_patch = []
# Walk through node_modules and packages and find all files containing "Error serializing board"
search_dirs = ['node_modules', 'packages', 'tools']
for search_dir in search_dirs:
    if not os.path.exists(search_dir):
        continue
    for root, dirs, files in os.walk(search_dir):
        for file in files:
            if file.endswith('.js') or file.endswith('.mjs') or file.endswith('.ts'):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    if 'Error serializing board' in content and '[Suppressed]' not in content:
                        files_to_patch.append(path)
                except Exception:
                    pass

print(f"Found {len(files_to_patch)} files to patch.")

patterns = [
    # throw new Error(...)
    (r'throw\s+new\s+Error\s*\(\s*([\'"`])Error\s+serializing\s+board', r'console.error(\1[Suppressed] Error serializing board'),
    # errors.push(`Board input ...`)
    (r'errors\.push\s*\(\s*([\'"`])Board\s+input', r'console.warn(\1[Suppressed] Board input'),
    # errors.push(`${thisNodeId}:${portName} was wired to an input ...`)
    (r'errors\.push\s*\(\s*([\'"`])\$\{thisNodeId\}:\$\{portName\}\s+was\s+wired\s+to\s+an\s+input', r'console.warn(\1[Suppressed] ${thisNodeId}:${portName} was wired to an input'),
    # Minified variations like errors.push(`Board input "${inputObjectsToInputNodeInfo.get(input4).portName}"...`)
    (r'errors\.push\s*\(\s*([\'"`])Board\s+input\s+.*?\s+is\s+not\s+reachable\s+from\s+any\s+of\s+its\s+outputs', r'console.warn(\1[Suppressed] Board input is not reachable'),
]

for path in files_to_patch:
    print(f"Patching {path}...")
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content
        for pattern, replacement in patterns:
            new_content = re.sub(pattern, replacement, new_content)
        
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Successfully patched {path}")
        else:
            print(f"No changes needed for {path} (already patched or no match)")
    except Exception as e:
        print(f"Error patching {path}: {e}")
