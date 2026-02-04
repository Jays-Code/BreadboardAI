import os
import re

def fix_describer_imports():
    file_list = "all_describer_manager_files.txt"
    if not os.path.exists(file_list):
        # Refresh the list if it doesn't exist
        os.system('find node_modules -name "node-describer-manager.js" > all_describer_manager_files.txt')
    
    with open("all_describer_manager_files.txt", "r") as f:
        paths = [line.strip() for line in f if line.strip()]

    for path in paths:
        try:
            if not os.path.exists(path): continue
            with open(path, "r") as f:
                content = f.read()
            
            # 1. Fix the double import from utils
            # If we see: import { SchemaDiffer, UpdateEvent } from "@breadboard-ai/utils";
            # Change to: import { SchemaDiffer } from "@breadboard-ai/utils";
            # And add: import { UpdateEvent } from "./event.js";
            
            bad_import = 'import { SchemaDiffer, UpdateEvent } from "@breadboard-ai/utils";'
            if bad_import in content:
                new_import = 'import { SchemaDiffer } from "@breadboard-ai/utils";\nimport { UpdateEvent } from "./event.js";'
                content = content.replace(bad_import, new_import)
            
            # 2. Also check for cases where UpdateEvent is already being imported relatively but our patch might have added it to utils
            # (Though our regex patch v17 specifically added it to utils)
            
            # Ensure the relative path is correct (it's in the same directory)
            if 'import { UpdateEvent } from "../event.js";' in content:
                content = content.replace('import { UpdateEvent } from "../event.js";', 'import { UpdateEvent } from "./event.js";')

            with open(path, "w") as f:
                f.write(content)
            print(f"FIXED IMPORTS: {path}")

        except Exception as e:
            print(f"Error fixing {path}: {e}")

if __name__ == "__main__":
    fix_describer_imports()
