import { Main } from "@breadboard-ai/visual-editor";
import { SettingsStore } from "@breadboard-ai/shared-ui/data/settings-store.js";

async function run() {
    try {
        const config = {
            version: "1.0.0-local",
            gitCommitHash: "local",
            settings: SettingsStore.instance(),
        };
        const main = new Main(config);
        document.body.appendChild(main);
    } catch (e) {
        console.error('[Main] Error:', e);
    }
}

run();
