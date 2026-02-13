const fs = require('fs');
const targetFile = 'g:\\My Drive\\CodingProjects\\BreadboardAI\\main.ipynb';

try {
    const rawData = fs.readFileSync(targetFile, 'utf8');
    const data = JSON.parse(rawData);

    // 1. ROBUST LAUNCH CELL (Index 2)
    const robustLaunchCell = {
        "cell_type": "code",
        "execution_count": null,
        "metadata": {},
        "outputs": [],
        "source": [
            "# 3. ROBUST LAUNCH CELL (Local Copy Strategy)\n",
            "import os\n",
            "import time\n",
            "import shutil\n",
            "import subprocess\n",
            "from google.colab import output\n",
            "\n",
            "if IN_COLAB:\n",
            "    print(\"✨  Initializing Fast Local Environment...\")\n",
            "    \n",
            "    # Paths\n",
            "    drive_root = '/content/drive/MyDrive/CodingProjects/BreadboardAI'\n",
            "    local_root = '/content/app'\n",
            "    zip_file = os.path.join(drive_root, 'node_modules.zip')\n",
            "    \n",
            "    # verify drive mount\n",
            "    if not os.path.exists(drive_root):\n",
            "        print(f\"❌ Error: Drive path '{drive_root}' not found.\")\n",
            "    else:\n",
            "        # 1. Create Local Workspace\n",
            "        if not os.path.exists(local_root):\n",
            "            os.makedirs(local_root)\n",
            "            print(f\"📂 Created local workspace: {local_root}\")\n",
            "        \n",
            "        os.chdir(local_root)\n",
            "\n",
            "        # 2. Cleanup Old Logs (Safe)\n",
            "        if os.path.exists('server_log.txt'): os.remove('server_log.txt')\n",
            "        if os.path.exists('vite_log.txt'): os.remove('vite_log.txt')\n",
            "\n",
            "        # 3. Extract node_modules\n",
            "        if os.path.exists('node_modules'):\n",
            "            print(\"⚡ Local node_modules already exists. Skipping unzip.\")\n",
            "        elif os.path.exists(zip_file):\n",
            "            print(\"📦 Found node_modules.zip. Extracting to local VM (Fast IO)...\")\n",
            "            start_zip = time.time()\n",
            "            shutil.copy(zip_file, '/content/node_modules.zip')\n",
            "            !unzip -q /content/node_modules.zip -d {local_root}\n",
            "            print(f\"✅ Extracted in {round(time.time() - start_zip, 1)}s\")\n",
            "        else:\n",
            "            print(\"⚠️  node_modules.zip NOT FOUND. Performing Clean Linux Install...\")\n",
            "            shutil.copy(os.path.join(drive_root, 'package.json'), local_root)\n",
            "            if os.path.exists('package-lock.json'): os.remove('package-lock.json')\n",
            "            !npm install --no-audit --no-fund > npm_install.log 2>&1\n",
            "\n",
            "        # 4. Copy Source Code (Avoid Symlink Trap)\n",
            "        print(\"📂 Refreshing local source code (Copying from Drive)...\")\n",
            "        for item in ['src', 'public', 'vite.config.ts', 'tsconfig.json', 'package.json']:\n",
            "            src_path = os.path.join(drive_root, item)\n",
            "            dst_path = os.path.join(local_root, item)\n",
            "            if os.path.exists(dst_path) or os.path.islink(dst_path):\n",
            "                if os.path.isdir(dst_path) and not os.path.islink(dst_path):\n",
            "                    shutil.rmtree(dst_path)\n",
            "                else:\n",
            "                    os.remove(dst_path)\n",
            "            if os.path.isdir(src_path):\n",
            "                shutil.copytree(src_path, dst_path)\n",
            "            else:\n",
            "                shutil.copy2(src_path, dst_path)\n",
            "        \n",
            "        # 5. Final Setup Checklist\n",
            "        print(\"🔧 Finishing local setup...\")\n",
            "        get_ipython().system(\"chmod +x \" + local_root + \"/node_modules/.bin/*\")\n",
            "\n",
            "        # Avoid resolution conflicts\n",
            "        drive_node_modules = os.path.join(drive_root, 'node_modules')\n",
            "        if os.path.exists(drive_node_modules):\n",
            "            print(\"⚠️  Ensuring Drive node_modules doesn't conflict...\")\n",
            "            try: os.rename(drive_node_modules, os.path.join(drive_root, 'node_modules_win'))\n",
            "            except: pass\n",
            "        \n",
            "        # Ensure Linux Rollup Dependency\n",
            "        rollup_linux_path = os.path.join(local_root, 'node_modules', '@rollup', 'rollup-linux-x64-gnu')\n",
            "        if not os.path.exists(rollup_linux_path):\n",
            "            print(\"🔧 Installing missing Linux dependency...\")\n",
            "            get_ipython().system(\"npm install -D @rollup/rollup-linux-x64-gnu --no-save --no-audit > rollup_fix.log 2>&1\")\n",
            "\n",
            "        # 6. Launch Servers\n",
            "        print(\"🚀 Launching servers...\")\n",
            "        os.environ['NODE_PATH'] = os.path.join(local_root, 'node_modules')\n",
            "        \n",
            "        get_ipython().system_raw(f'NODE_PATH={local_root}/node_modules {local_root}/node_modules/.bin/tsx --preserve-symlinks src/bridge/server.ts > server_log.txt 2>&1 &')\n",
            "        get_ipython().system_raw(f'NODE_PATH={local_root}/node_modules {local_root}/node_modules/.bin/vite --port 5173 --host > vite_log.txt 2>&1 &')\n",
            "        \n",
            "        # Health Check\n",
            "        print(\"⏳ Waiting for servers...\")\n",
            "        success_api, success_vite = False, False\n",
            "        for i in range(25):\n",
            "            time.sleep(1)\n",
            "            if not success_api and os.path.exists('server_log.txt'):\n",
            "                if \"active on port 3000\" in open('server_log.txt').read(): \n",
            "                    success_api = True; print(\"✅ API Server Ready\")\n",
            "            if not success_vite and os.path.exists('vite_log.txt'):\n",
            "                if \"Network:\" in open('vite_log.txt').read(): \n",
            "                    success_vite = True; print(\"✅ Vite Ready\")\n",
            "            if success_api and success_vite: break\n",
            "        \n",
            "        if not (success_api and success_vite):\n",
            "            print(\"⚠️  Partial failure. Logs:\")\n",
            "            !tail -n 12 server_log.txt\n",
            "            print(\"---\")\n",
            "            !tail -n 12 vite_log.txt\n",
            "        else:\n",
            "            from IPython.display import HTML, display\n",
            "            display(HTML(\"\"\"\n",
            "            <div style=\"background: #1e1e1e; padding: 15px; border-radius: 8px; border: 1px solid #333; margin-top: 10px;\">\n",
            "                <div style=\"display: flex; gap: 10px;\">\n",
            "                    <button onclick=\"google.colab.kernel.proxyPort(5173, {'cache': true}).then(url => window.open(url, '_blank'))\" \n",
            "                            style=\"background: #4CAF50; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; font-weight: bold;\">🚀 Open Frontend</button>\n",
            "                    <button onclick=\"google.colab.kernel.proxyPort(3000, {'cache': true}).then(url => window.open(url, '_blank'))\" \n",
            "                            style=\"background: #2196F3; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; font-weight: bold;\">🔌 Open API</button>\n",
            "                </div>\n",
            "            </div>\n",
            "            \"\"\"))\n",
            "            output.serve_kernel_port_as_window(5173)\n",
            "            output.serve_kernel_port_as_window(3000)"
        ]
    };

    // 2. SAVE STATE CELL (Index 3)
    const saveStateCell = {
        "cell_type": "code",
        "execution_count": null,
        "metadata": {},
        "outputs": [],
        "source": [
            "# 4. SAVE STATE (Run Once to Cache)\n",
            "import os\n",
            "import shutil\n",
            "drive_root = '/content/drive/MyDrive/CodingProjects/BreadboardAI'\n",
            "local_node_modules = '/content/app/node_modules'\n",
            "zip_dest_base = os.path.join(drive_root, 'node_modules')\n",
            "if os.path.exists(local_node_modules):\n",
            "    print(f\"📦 Zipping {local_node_modules} to Drive...\")\n",
            "    shutil.make_archive(zip_dest_base, 'zip', local_node_modules)\n",
            "    print(f\"✅ Saved cache to {zip_dest_base}.zip\")\n",
            "else:\n",
            "    print(\"❌ No node_modules found to save.\")"
        ]
    };

    // 3. APPLY UPDATES
    data.cells[2] = robustLaunchCell;

    const isCell3SaveState = data.cells.length > 3 && data.cells[3].source[0] && data.cells[3].source[0].includes("# 4. SAVE STATE");
    if (!isCell3SaveState) {
        data.cells.splice(3, 0, saveStateCell);
    } else {
        data.cells[3] = saveStateCell;
    }

    // CRITICAL: Ensure no trailing newline in the source array of any cell
    // We trim each string to be sure no hidden chars or accidental \n exist at the very end.
    data.cells.forEach(cell => {
        if (cell.source && cell.source.length > 0) {
            const lastIndex = cell.source.length - 1;
            // Remove exactly one \n if it exists at the end of the last line
            if (cell.source[lastIndex].endsWith('\n')) {
                cell.source[lastIndex] = cell.source[lastIndex].slice(0, -1);
            }
        }
    });

    fs.writeFileSync(targetFile, JSON.stringify(data, null, 1));
    console.log("Applied Smart Launch optimization.");

} catch (err) {
    console.error("Patch failed: " + err.message);
    process.exit(1);
}
