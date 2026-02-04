import { serialize } from "@breadboard-ai/build";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Helper to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const BOARDS_DIR = path.resolve(__dirname, "../boards");
const PUBLIC_API_DIR = path.resolve(process.cwd(), "public/api");

// Ensure output dir exists
if (!fs.existsSync(PUBLIC_API_DIR)) {
    fs.mkdirSync(PUBLIC_API_DIR, { recursive: true });
}

async function run() {
    console.log("🔍 Scanning for boards in:", BOARDS_DIR);

    if (!fs.existsSync(BOARDS_DIR)) {
        console.error("❌ Boards directory not found!");
        process.exit(1);
    }

    const files = fs.readdirSync(BOARDS_DIR).filter(f => f.endsWith(".ts") && !f.endsWith(".test.ts"));
    const boardsManifest = [];

    for (const file of files) {
        const filePath = path.join(BOARDS_DIR, file);
        console.log(`Processing ${file}...`);

        try {
            // Import the board module
            // We use a dynamic import with a timestamp to bust cache if needed, 
            // though for a script execution it shouldn't matter much.
            const module = await import(filePath);

            // Determine what to serialize. Expecting default export or a named export matching the file/board name roughly.
            // For now, let's assume valid boards export a GraphDescriptor or something serializable as default
            const board = module.default;

            if (!board) {
                console.warn(`⚠️  No default export found in ${file}. Skipping.`);
                continue;
            }

            // Serialize
            const bgl = serialize(board);
            const slug = file.replace(".ts", "");

            // Save individual BGL
            const outputFilename = `${slug}.json`;
            const outputPath = path.join(PUBLIC_API_DIR, outputFilename);
            fs.writeFileSync(outputPath, JSON.stringify(bgl, null, 2));

            // Add to manifest
            boardsManifest.push({
                slug,
                title: bgl.title || slug,
                description: bgl.description || "No description provided.",
                version: bgl.version || "0.0.1",
                url: `/api/${outputFilename}`
            });

            console.log(`✅ Saved ${outputFilename}`);

        } catch (err) {
            console.error(`❌ Error processing ${file}:`, err);
        }
    }

    // Save Manifest
    const manifestPath = path.join(PUBLIC_API_DIR, "boards.json");
    fs.writeFileSync(manifestPath, JSON.stringify(boardsManifest, null, 2));
    console.log(`\n🎉 Board serialization complete! Manifest saved to ${manifestPath}`);
    console.log(`Total boards: ${boardsManifest.length}`);
}

run();
