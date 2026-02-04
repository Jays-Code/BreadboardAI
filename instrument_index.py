import os

path = "node_modules/@breadboard-ai/visual-editor/build/src/index.js"
if os.path.exists(path):
    with open(path, "r") as f:
        content = f.read()
    
    # Inject log at the very top
    if "[TRACE INDEX] START" not in content:
        content = "console.log('[TRACE INDEX] START');\n" + content
        # Inject log after imports (before the class definition)
        marker = "export class Main"
        if marker in content:
            content = content.replace(marker, "console.log('[TRACE INDEX] IMPORTS DONE');\nexport class Main")
            
        with open(path, "w") as f:
            f.write(content)
        print("Instrumented visual-editor index.js")
else:
    print("Could not find visual-editor index.js")
