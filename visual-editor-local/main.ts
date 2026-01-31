import * as StringsHelper from "@breadboard-ai/shared-ui/strings/helper.js";
import en_US from "@breadboard-ai/shared-ui/strings/en_US/index.js";
import { Main } from "@breadboard-ai/visual-editor";
import { SettingsStore } from "@breadboard-ai/shared-ui/data/settings-store.js";

async function run() {
    // 1. Initialize strings with the English pack
    await StringsHelper.initFrom(en_US);

    // 2. Clear any technical globals that might interfere
    // (They are defined in vite.config.ts via define, so they are available globally)

    // 3. Initialize Settings
    const settings = SettingsStore.instance();
    await settings.restore();

    // 4. Create the main app instance
    // We pass the settings and the language pack info
    const config = {
        settings,
        version: "1.0.0-local",
        gitCommitHash: "local",
    };

    const main = new Main(config);

    // 5. Add to page
    document.body.appendChild(main);

    // Disable context menu as the editor uses its own
    window.oncontextmenu = (evt) => evt.preventDefault();
}

run().catch(console.error);
