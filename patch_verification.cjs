const fs = require('fs');

const targetFile = 'g:\\My Drive\\CodingProjects\\BreadboardAI\\verification.ipynb';

try {
    if (fs.existsSync(targetFile)) {
        let content = fs.readFileSync(targetFile, 'utf8');
        const oldText = "Rerun the 'LAUNCH' cell in main_v2.ipynb.";
        const newText = "Rerun the 'SYNC FILES' and 'LAUNCH & LINK' cells in BreadboardAI_Launcher.ipynb.";

        if (content.includes(oldText)) {
            content = content.replace(oldText, newText);
            fs.writeFileSync(targetFile, content, 'utf8');
            console.log("Successfully updated verification instructions.");
        } else {
            console.log("Could not find text to patch.");
        }
    } else {
        console.error("verification.ipynb not found");
    }
} catch (e) {
    console.error("Error patching:", e);
}
