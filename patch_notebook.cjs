const fs = require('fs');
const targetFile = 'g:\\My Drive\\CodingProjects\\BreadboardAI\\main.ipynb';

try {
    const rawData = fs.readFileSync(targetFile, 'utf8');
    const data = JSON.parse(rawData);

    // Patch Cell 3 (Index 2)
    const cell = data.cells[2];
    if (cell && cell.source) {
        let fullSource = cell.source.join('');

        // 1. Add Port Cleanup
        if (!fullSource.includes("fuser -k")) {
            fullSource = fullSource.replace(
                /print\("🚀 Launching servers\.\.\."\)/,
                'print("🚀 Cleaning up ports...")\n        get_ipython().system("fuser -k 3000/tcp 5173/tcp || true")\n        print("🚀 Launching servers...")'
            );
        }

        // 2. Ensure FORCE_CLEAN_INSTALL is present (sanity check/update)
        if (!fullSource.includes("FORCE_CLEAN_INSTALL")) {
            fullSource = fullSource.replace(
                /# 3\. Extract node_modules\n\s+if os\.path\.exists\('node_modules'\):/,
                '# 3. Extract node_modules\n        FORCE_CLEAN_INSTALL = False # Set to True to bypass ZIP and do clean npm install\n        if os.path.exists(\'node_modules\') and not FORCE_CLEAN_INSTALL:'
            );
        }

        cell.source = fullSource.split('\n').map((line, i, arr) => i === arr.length - 1 ? line : line + '\n');
    }

    fs.writeFileSync(targetFile, JSON.stringify(data, null, 1));
    console.log("Updated main.ipynb with port cleanup.");

} catch (err) {
    console.error("Patch failed: " + err.message);
    process.exit(1);
}
