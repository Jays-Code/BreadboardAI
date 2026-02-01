
import graph from "./graphs/prompt-to-post";
import fs from "fs";
import path from "path";

async function run() {
    console.log("Running Prompt-to-Post Graph...");

    const input = {
        topic: "The 3 key elements of early House Music",
        tone: "Energetic and educational"
    };

    console.log("Input:", input);

    // Run the board
    const result = await graph.invoke(input);

    console.log("Graph Execution Complete!");
    console.log("Social Caption:", result.social_caption);

    const outputPath = path.resolve(process.cwd(), "house_music_history.json");
    console.log("Writing output to:", outputPath);

    fs.writeFileSync(outputPath, JSON.stringify(result.video_structure, null, 2));
    console.log("Done.");
}

run().catch(console.error);
