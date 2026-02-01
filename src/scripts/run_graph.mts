
import graph, { directorFlowDef, copywriterFlowDef, captionerFlowDef, assemblerDef } from "../boards/prompt-to-post.ts";
import { serialize, kit } from "@breadboard-ai/build";
import { invokeGraph } from "@google-labs/breadboard";
import fs from "fs";
import path from "path";

async function run() {
    console.log("Initializing Custom Kit...");
    // Create a Kit containing our custom node definitions
    // Note: kit() is async in the build API!
    const customKit = await kit({
        title: "Custom Agent Kit",
        description: "Kit containing custom handlers for proper graph execution",
        url: "npm:custom-agent-kit",
        version: "1.0.0",
        components: {
            directorFlow: directorFlowDef,
            copywriterFlow: copywriterFlowDef,
            captionerFlow: captionerFlowDef,
            assembler: assemblerDef
        }
    });

    console.log("Running Prompt-to-Post Graph...");

    const inputData = {
        topic: "The 3 key elements of early House Music",
        tone: "Energetic and educational"
    };

    console.log("Input:", inputData);

    try {
        // 1. Serialize the board to BGL
        // Handle potential default export wrapping
        const boardToSerialize = (graph as any).default ?? graph;
        const bgl = serialize(boardToSerialize);
        console.log("Graph serialized successfully.");

        // 2. Run the graph using invokeGraph, passing our custom kit handlers
        const result = await invokeGraph(
            { graph: bgl },
            inputData,
            { kits: [customKit] }
        );

        console.log("Graph Execution Complete!");
        // The output might be named differently depending on graph structure.
        // Let's log the whole result to be sure found keys.
        console.log("Result keys:", Object.keys(result));
        console.log("Social Caption:", result.social_caption);

        if (result.video_structure) {
            const outputPath = path.resolve(process.cwd(), "output", "house_music_history.json");
            console.log("Writing output to:", outputPath);
            fs.writeFileSync(outputPath, JSON.stringify(result.video_structure, null, 2));
            console.log("Done.");
        } else {
            console.error("Missing video_structure in output", result);
        }

    } catch (error) {
        console.error("Error during graph execution:", error);
    }
}

run();
