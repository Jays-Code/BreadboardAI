
import graph, {
    directorFlowDef,
    copywriterFlowDef,
    visualArchitectFlowDef,
    assetSourcingFlowDef,
    voiceoverFlowDef,
    assemblerDef,
    rendererDef
} from "../boards/prompt-to-post.ts";
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
            visualArchitectFlow: visualArchitectFlowDef,
            assetSourcingFlow: assetSourcingFlowDef,
            voiceoverFlow: voiceoverFlowDef,
            assembler: assemblerDef,
            renderer: rendererDef
        }
    });

    console.log("Running Prompt-to-Post Graph...");

    const inputData = {
        topic: "The History of Spinach",
        tone: "Educational and slightly prehistoric"
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

        if (result.video_url) {
            const outputPath = path.resolve(process.cwd(), "output", "spinach_history.json");
            console.log("Video URL:", result.video_url);

            // --- Phase II: Visual QA Loop ---
            console.log("🔍 Triggering Visual QA Loop...");
            try {
                const qaResp = await fetch("http://localhost:3000/api/visual-qa", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        video_structure: result.video_structure,
                        runId: (result.video_url as string).split('/').pop()?.split('.')[0]
                    })
                });
                const qaResult = await qaResp.json();
                console.log("\n--- 🎬 VISUAL QA REPORT ---");
                console.log(`Score: ${qaResult.report.score}/100`);
                console.log(`Passed: ${qaResult.report.passed ? '✅ YES' : '❌ NO'}`);
                console.log(`Critique: ${qaResult.report.critique}`);
                console.log("Suggestions:");
                qaResult.report.improvement_suggestions.forEach((s: string) => console.log(` - ${s}`));
                console.log("---------------------------\n");

                // Merge QA report into final output
                (result as any).qa_report = qaResult.report;
            } catch (qaErr) {
                console.error("QA Loop failed:", qaErr);
            }

            console.log("Writing full output to:", outputPath);
            fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
            console.log("Done.");
        } else {
            console.error("Missing video_url in output", result);
        }

    } catch (error) {
        console.error("Error during graph execution:", error);
    }
}

run();
