import fs from "fs";
import path from "path";
import { serialize } from "@breadboard-ai/build";

// Resolve paths
const rootDir = process.cwd();
const boardsDir = path.join(rootDir, "src/boards");
const editorPublicBoardsDir = path.join(rootDir, "tools/editor/public/boards");
const manifestFile = path.join(rootDir, "tools/editor/src/assets/boards-manifest.json");

async function sync() {
    console.log("Syncing boards...");

    if (!fs.existsSync(editorPublicBoardsDir)) {
        fs.mkdirSync(editorPublicBoardsDir, { recursive: true });
    }

    const files = fs.readdirSync(boardsDir).filter(f => f.endsWith(".ts"));
    const manifest: any[] = [];

    for (const file of files) {
        const boardName = path.basename(file, ".ts");
        const boardPath = path.join(boardsDir, file);

        console.log(`Processing ${boardName}...`);

        try {
            // Dynamically import the board
            // We use file:// prefix for absolute paths in ESM if needed, 
            // but tsx usually handles absolute paths fine.
            const boardModule = await import(boardPath);
            const boardInstance = boardModule.default ?? boardModule;

            // Serialize to BGL
            const bgl = serialize(boardInstance);

            // Write to public folder
            const bglFileName = `${boardName}.bgl.json`;
            fs.writeFileSync(path.join(editorPublicBoardsDir, bglFileName), JSON.stringify(bgl, null, 2));

            // Add to manifest
            manifest.push({
                title: bgl.title ?? boardName,
                url: `/boards/${bglFileName}`,
                version: bgl.version ?? "1.0.0"
            });

            console.log(`Successfully synced ${boardName}`);
        } catch (error) {
            console.error(`Error syncing ${boardName}:`, error);
        }
    }

    // Write manifest
    fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2));
    console.log(`Manifest updated at ${manifestFile}`);
}

sync().catch(console.error);
