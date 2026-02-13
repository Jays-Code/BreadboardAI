const fs = require('fs');
const path = require('path');

const notebookPath = 'g:/My Drive/CodingProjects/BreadboardAI/BreadboardAI_Launcher.ipynb';

try {
    const notebook = JSON.parse(fs.readFileSync(notebookPath, 'utf8'));

    // 1. Optimize Step 1: Initialization
    notebook.cells.forEach(cell => {
        if (cell.source.some(line => line.includes("# 1. RESET & MOUNT"))) {
            cell.source = [
                "# 1. INITIALIZE & MOUNT\n",
                "import os, shutil\n",
                "from google.colab import drive\n",
                "\n",
                "print(\"[1/4] Mounting Google Drive...\")\n",
                "try:\n",
                "    drive.mount('/content/drive', force_remount=True)\n",
                "except: pass\n",
                "\n",
                "APP_ROOT = '/content/app'\n",
                "DRIVE_ROOT = '/content/drive/MyDrive/CodingProjects/BreadboardAI'\n",
                "\n",
                "print(\"[2/4] Checking workspace...\")\n",
                "if not os.path.exists(APP_ROOT):\n",
                "    os.makedirs(APP_ROOT)\n",
                "    print(\"[INFO] Created fresh workspace.\")\n",
                "else:\n",
                "    print(\"[INFO] Workspace already exists. Skipping deep clean.\")\n",
                "# Pro Tip: To force a deep clean, run: !rm -rf /content/app"
            ];
        }

        // 2. Optimize Step 2: Dependencies
        if (cell.source.some(line => line.includes("# 2. INSTALL DEPENDENCIES"))) {
            cell.source = [
                "# 2. INSTALL DEPENDENCIES\n",
                "import os, shutil, subprocess\n",
                "os.chdir(APP_ROOT)\n",
                "\n",
                "print(\"[3/4] Syncing package.json...\")\n",
                "shutil.copy2(os.path.join(DRIVE_ROOT, 'package.json'), APP_ROOT)\n",
                "\n",
                "# Only install if node_modules is missing\n",
                "if not os.path.exists('node_modules'):\n",
                "    print(\"[TASK] Installing dependencies (First time setup - may take 2 mins)... \")\n",
                "    subprocess.run(['npm', 'install', '--no-audit', '--no-fund', '--silent'], check=True)\n",
                "    print(\"[TASK] Patching missing dependencies (Mermaid)...\")\n",
                "    subprocess.run(['npm', 'install', 'mermaid', '--save', '--no-audit', '--no-fund', '--silent'], check=True)\n",
                "    print(\"[SUCCESS] Dependencies installed.\")\n",
                "else:\n",
                "    print(\"[INFO] node_modules found. Skipping installation.\")"
            ];
        }
    });

    fs.writeFileSync(notebookPath, JSON.stringify(notebook, null, 1));
    console.log("Successfully optimized launcher for 'Run All' speed.");

} catch (error) {
    console.error("Error optimizing notebook:", error);
}
