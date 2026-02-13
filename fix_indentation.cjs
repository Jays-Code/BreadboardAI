const fs = require('fs');
const targetFile = 'g:\\My Drive\\CodingProjects\\BreadboardAI\\main.ipynb';

try {
    const rawData = fs.readFileSync(targetFile, 'utf8');
    const data = JSON.parse(rawData);

    // Patch Cell 3 (Index 2)
    const cell = data.cells[2];
    if (cell && cell.source) {
        let lines = cell.source;

        // Find the line index where the broken patch starts
        // Looking for "# Attempt to print direct URLs for easier access"
        let brokenIndex = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes("# Attempt to print direct URLs for easier access")) {
                brokenIndex = i;
                break;
            }
        }

        if (brokenIndex !== -1) {
            console.log("Found broken patch at line " + brokenIndex);
            // Indent the next 10 lines (comment, try, 6 lines of body, except, except-body)
            // Lines are: index, index+1 (try), +2 (from), +3 (print), +4 (furl), +5 (apiurl), +6 (printf), +7 (printa), +8 (except), +9 (print)
            for (let i = brokenIndex; i < brokenIndex + 10; i++) {
                if (lines[i] && !lines[i].startsWith("            ")) {
                    lines[i] = "    " + lines[i];
                }
            }
        }
    }

    fs.writeFileSync(targetFile, JSON.stringify(data, null, 1));
    console.log("Fixed indentation in main.ipynb.");

} catch (err) {
    console.error("Patch failed: " + err.message);
    process.exit(1);
}
