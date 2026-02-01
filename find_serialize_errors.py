import os

def find_errors(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            if "is not reachable from any of its outputs" in content or "was wired to an input, but that input was not provided" in content:
                print(f"FOUND: {filepath}")
    except Exception:
        pass

def main():
    for root, dirs, files in os.walk('node_modules'):
        for file in files:
            if file.endswith('.js'):
                find_errors(os.path.join(root, file))

if __name__ == "__main__":
    main()
