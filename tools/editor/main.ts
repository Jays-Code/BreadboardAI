console.log('[Main] SCRIPT STARTING');
import { Main } from "@breadboard-ai/visual-editor";

async function run() {
    console.log('[Main] Minimal run started');
    try {
        const config = {
            version: "1.0.0-local",
            gitCommitHash: "local",
        };
        console.log('[Main] Creating Main instance...');
        const main = new Main(config);
        document.body.appendChild(main);
        console.log('[Main] Main appended.');
    } catch (e) {
        console.error('[Main] Error:', e);
    }
}

run();
