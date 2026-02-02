import os

def find_errors(filepath):
    try:
        # Check if it's a file first
        if not os.path.isfile(filepath):
            return
        # Binary files can be skipped, but we'll try to read text files
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            if "is not reachable from any of its outputs" in content or "was wired to an input, but that input was not provided" in content or "Error serializing board" in content:
                print(filepath)
    except Exception:
        pass

def main():
    # Only search @breadboard-ai and @google-labs to keep it fast
    target_dirs = [
        'node_modules/@breadboard-ai',
        'node_modules/@google-labs'
    ]
    for target in target_dirs:
        if not os.path.exists(target):
            continue
        for root, dirs, files in os.walk(target):
            for file in files:
                find_errors(os.path.join(root, file))

if __name__ == "__main__":
    main()
