const fs = require('fs');
const targetFile = 'g:\\My Drive\\CodingProjects\\BreadboardAI\\main.ipynb';

try {
    const rawData = fs.readFileSync(targetFile, 'utf8');
    const data = JSON.parse(rawData);

    // Patch Cell 3 (Index 2 in 0-indexed array)
    const cell = data.cells[2];
    if (cell && cell.source) {
        let fullSource = cell.source.join('');

        // 1. Force use of npx for smoother binary path resolution
        fullSource = fullSource.replace(
            /get_ipython\(\)\.system_raw\(f'NODE_PATH=\{local_root\}\/node_modules \{local_root\}\/node_modules\/\.bin\/tsx --preserve-symlinks src\/bridge\/server.ts > server_log.txt 2>&1 &'\)/,
            "get_ipython().system_raw(f'cd {local_root} && npx tsx src/bridge/server.ts > server_log.txt 2>&1 &')"
        );

        fullSource = fullSource.replace(
            /get_ipython\(\)\.system_raw\(f'NODE_PATH=\{local_root\}\/node_modules \{local_root\}\/node_modules\/\.bin\/vite --port 5173 --host > vite_log.txt 2>&1 &'\)/,
            "get_ipython().system_raw(f'cd {local_root} && npx vite --port 5173 --host > vite_log.txt 2>&1 &')"
        );

        // 2. Extra Safety: Ensure server_log is purged properly
        if (!fullSource.includes("if os.path.exists('server_log.txt'): os.remove('server_log.txt')")) {
            fullSource = fullSource.replace(
                /# 2\. Cleanup Old Logs \(Safe\)/,
                '# 2. Cleanup Old Logs (Safe)\n        if os.path.exists("server_log.txt"): os.remove("server_log.txt")\n        if os.path.exists("vite_log.txt"): os.remove("vite_log.txt")'
            );
        }

        cell.source = fullSource.split('\n').map((line, i, arr) => i === arr.length - 1 ? line : line + '\n');
    }

    fs.writeFileSync(targetFile, JSON.stringify(data, null, 1));
    console.log("Patched main.ipynb to use npx.");

} catch (err) {
    console.error("Patch failed: " + err.message);
    process.exit(1);
}
