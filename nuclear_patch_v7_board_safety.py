import os
import re

files_to_patch = []
# Walk through node_modules and packages and find all board.js files
search_dirs = ['node_modules', 'packages', 'tools']
for search_dir in search_dirs:
    if not os.path.exists(search_dir):
        continue
    for root, dirs, files in os.walk(search_dir):
        for file in files:
            if file == 'board.js' or file == 'board.mjs':
                path = os.path.join(root, file)
                files_to_patch.append(path)

print(f"Found {len(files_to_patch)} files to check for unsafe guards.")

# Unsafe isBoardInstance:
# export function isBoardInstance(value) {
#     return (value.definition !== undefined);
# }

# Unsafe isBoardOutput:
# export function isBoardOutput(value) {
#     return value.innerBoard !== undefined;
# }

for path in files_to_patch:
    print(f"Checking {path}...")
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content
        
        # Patch isBoardInstance
        is_board_instance_pattern = r'export\s+function\s+isBoardInstance\s*\(\s*value\s*\)\s*\{\s*return\s*\(\s*value\s*\.definition\s*!==\s*undefined\s*\);\s*\}'
        is_board_instance_replacement = 'export function isBoardInstance(value) {\n    return (value !== null && typeof value === "object" && value.definition !== undefined);\n}'
        new_content = re.sub(is_board_instance_pattern, is_board_instance_replacement, new_content)

        # Patch isBoardOutput
        is_board_output_pattern = r'export\s+function\s+isBoardOutput\s*\(\s*value\s*\)\s*\{\s*return\s+value\s*\.innerBoard\s*!==\s*undefined\s*;\s*\}'
        is_board_output_replacement = 'export function isBoardOutput(value) {\n    return (value !== null && typeof value === "object" && value.innerBoard !== undefined);\n}'
        new_content = re.sub(is_board_output_pattern, is_board_output_replacement, new_content)

        # Also handle versions without the extra newline or slightly different spacing
        new_content = re.sub(r'return\s*\(value\.definition\s*!==\s*undefined\);', r'return (value !== null && typeof value === "object" && value.definition !== undefined);', new_content)
        new_content = re.sub(r'return\s*value\.innerBoard\s*!==\s*undefined;', r'return (value !== null && typeof value === "object" && value.innerBoard !== undefined);', new_content)

        if new_content != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Successfully patched {path}")
        else:
            print(f"No changes needed for {path}")
    except Exception as e:
        print(f"Error patching {path}: {e}")
