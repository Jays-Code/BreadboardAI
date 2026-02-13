const fs = require('fs');
const path = require('path');

const targetFile = 'g:\\My Drive\\CodingProjects\\BreadboardAI\\main_v2.ipynb';

try {
    if (fs.existsSync(targetFile)) {
        let content = fs.readFileSync(targetFile, 'utf8');
        // Target the specific python list string
        const oldList = "['src', 'public', 'vite.config.ts', 'tsconfig.json', 'package.json']";
        const newList = "['src', 'ui', 'public', 'vite.config.ts', 'tsconfig.json', 'package.json']";

        if (content.includes(oldList)) {
            content = content.replace(oldList, newList);
            fs.writeFileSync(targetFile, content, 'utf8');
            console.log("Successfully added 'ui' to sync list in main_v2.ipynb");
        } else if (content.includes("'ui'")) {
            console.log("'ui' folder already in sync list.");
        } else {
            console.error("Could not find sync list to patch.");
        }
    } else {
        console.error("main_v2.ipynb not found");
    }
} catch (e) {
    console.error("Error patching:", e);
}
