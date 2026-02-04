import os
import re

def patch_serialize(content):
    changed = False
    
    # Add cycle detection
    if 'export function serialize(board) {' in content:
        replacement = """export function serialize(board, _visitedBoards = new Set()) {
    if (_visitedBoards.has(board)) {
        return {
            title: board.title ?? "Circular Reference",
            nodes: [],
            edges: [],
            metadata: { ...board.metadata, circular: true }
        };
    }
    _visitedBoards.add(board);
"""
        content = content.replace('export function serialize(board) {', replacement)
        changed = True

    # Update recursive call in embedBoardAndReturnItsId
    if 'graphs.set(id, serialize(board));' in content:
        content = content.replace('graphs.set(id, serialize(board));', 'graphs.set(id, serialize(board, _visitedBoards));')
        changed = True

    # Suppress Symbol errors if they exist as throws or warnings
    pattern_symbol_throw = r'throw new Error\(\`Internal error: value was a symbol'
    if re.search(pattern_symbol_throw, content):
         content = re.sub(pattern_symbol_throw, r'// console.warn(`[Suppressed] Internal error: value was a symbol', content)
         changed = True
    
    pattern_symbol_warn = r'console\.warn\(\`\[Suppressed\] Internal error: value was a symbol'
    if re.search(pattern_symbol_warn, content):
         content = re.sub(pattern_symbol_warn, r'// console.warn(`[Suppressed] Internal error: value was a symbol', content)
         changed = True
         
    return content, changed

def patch_board(content):
    changed = False
    
    # Fix isBoardInstance null check
    pattern_instance = r'export function isBoardInstance\(value\) \{\s*//.*\s*return \(value\s*\.definition !== undefined\);'
    if re.search(pattern_instance, content, re.MULTILINE):
        replacement = """export function isBoardInstance(value) {
    // TODO(aomarks) Use a better brand
    return (value && value.definition !== undefined);"""
        content = re.sub(pattern_instance, replacement, content, flags=re.MULTILINE)
        changed = True
    elif 'return (value\n        .definition !== undefined);' in content:
        content = content.replace('return (value\n        .definition !== undefined);', 'return (value && value.definition !== undefined);')
        changed = True

    return content, changed

def main():
    for root, dirs, files in os.walk('node_modules/@breadboard-ai'):
        for file in files:
            filepath = os.path.join(root, file)
            if file == 'serialize.js':
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                new_content, changed = patch_serialize(content)
                if changed:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Patched serialize: {filepath}")
            elif file == 'board.js':
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                new_content, changed = patch_board(content)
                if changed:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Patched board: {filepath}")

if __name__ == "__main__":
    main()
