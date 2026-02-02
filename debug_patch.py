import os
import re

path = 'node_modules/@google-labs/breadboard/dist/src/board.js'
if not os.path.exists(path):
    print(f"Path {path} does not exist. Trying @breadboard-ai/build path...")
    path = 'node_modules/@breadboard-ai/build/dist/internal/board/board.js'

if not os.path.exists(path):
    print(f"Path {path} does not exist either.")
    exit(1)

print(f"Checking file: {path}")
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

pattern_output = r'return\s+value\.innerBoard\s*!==\s*undefined;'
match = re.search(pattern_output, content)
if match:
    print(f"MATCH FOUND: {match.group(0)}")
else:
    print("NO MATCH FOUND.")
    # Print the lines around isBoardOutput to see what it looks like
    print("File content around isBoardOutput:")
    lines = content.split('\n')
    found_func = False
    for i, line in enumerate(lines):
        if 'function isBoardOutput' in line:
            found_func = True
            print(f"Line {i}: {line}")
            for k in range(1, 4):
                if i + k < len(lines):
                    print(f"Line {i+k}: {lines[i+k]}")
    if not found_func:
        print("Function isBoardOutput not found in file.")
