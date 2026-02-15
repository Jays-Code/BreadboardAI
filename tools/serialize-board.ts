import fs from "fs";
import path from "path";
import { serialize } from "@breadboard-ai/build";
import board from "../src/boards/repurpose-video.js";

async function run() {
    console.log("📦 Serializing repurpose-video board...");
    try {
        const graph = serialize(board);
        const outPath = path.resolve(process.cwd(), "public", "api", "repurpose-video.json");

        // Ensure directory exists
        const dir = path.dirname(outPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(outPath, JSON.stringify(graph, null, 2));
        console.log(`✅ Serialized to ${outPath}`);
    } catch (e) {
        console.error("Serialization failed:", e);
    }
}

run().catch(console.error);
