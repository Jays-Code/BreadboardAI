
import graph, {
    directorFlowDef,
    copywriterFlowDef,
    visualArchitectFlowDef,
    assetSourcingFlowDef,
    voiceoverFlowDef,
    assemblerDef,
    rendererDef
} from "../boards/prompt-to-post.js";
import { serialize, kit } from "@breadboard-ai/build";
import { invokeGraph, run } from "@google-labs/breadboard";
import fs from "fs";
import path from "path";

async function main() {
    console.log("Running Prompt-to-Post Graph...");

    const inputData: any = {
        topic: "The History of Spinach",
        tone: "Educational and slightly prehistoric"
    };

    console.log("Initial Input:", inputData);

    try {
        const boardToSerialize = (graph as any).default ?? graph;
        const bgl = serialize(boardToSerialize);
        console.log("Graph serialized successfully.");

        let currentResult: any = null;
        let attempts = 0;
        const MAX_ATTEMPTS = 2;

        const customKit = await kit({
            title: "Custom Agent Kit",
            description: "Bridge communication kit",
            url: "bundle:custom-kit",
            components: {
                directorFlow: directorFlowDef,
                copywriterFlow: copywriterFlowDef,
                visualArchitectFlow: visualArchitectFlowDef,
                assetSourcingFlow: assetSourcingFlowDef,
                voiceoverFlow: voiceoverFlowDef,
                assembler: assemblerDef,
                renderer: rendererDef
            }
        }) as any;

        while (attempts < MAX_ATTEMPTS) {
            attempts++;
            console.log(`\n--- 🚀 EXECUTION PASS ${attempts}/${MAX_ATTEMPTS} ---`);

            currentResult = await invokeGraph(
                { graph: bgl },
                inputData,
                { kits: [customKit] }
            );

            if (!currentResult.video_url) {
                console.error("Missing video_url in output. Result:", currentResult);
                break;
            }

            console.log("Video URL:", currentResult.video_url);

            // --- Phase III: Visual QA Loop (The Critic) ---
            console.log("🔍 Triggering Visual QA Loop...");
            try {
                const qaResp = await fetch("http://localhost:3000/api/visual-qa", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        video_structure: currentResult.video_structure,
                        runId: (currentResult.video_url as string).split('/').pop()?.split('.')[0]
                    })
                });
                const qaResult = await qaResp.json();
                console.log("\n--- 🎬 VISUAL QA REPORT ---");
                console.log(`Score: ${qaResult.report.score}/100`);
                console.log(`Passed: ${qaResult.report.passed ? '✅ YES' : '❌ NO'}`);
                console.log(`Critique: ${qaResult.report.critique}`);

                // Merge QA report into final output
                currentResult.qa_report = qaResult.report;

                // CHECK: Should we refine?
                if (qaResult.report.score < 80 && attempts < MAX_ATTEMPTS) {
                    console.log("\n⚠️ QUALITY BELOW THRESHOLD. TRIGGERING REFINEMENT PASS...");
                    inputData.visual_critique = `${qaResult.report.critique}\n\nKey areas to fix: ${qaResult.report.improvement_suggestions.join(", ")}`;
                    continue;
                } else {
                    console.log("\n✅ QUALITY SATISFACTORY OR MAX ATTEMPTS REACHED.");
                    break;
                }
            } catch (qaErr) {
                console.error("QA Loop failed:", qaErr);
                break;
            }
        }

        const outputPath = path.resolve(process.cwd(), "output", "spinach_history.json");
        console.log("Writing final output to:", outputPath);
        fs.writeFileSync(outputPath, JSON.stringify(currentResult, null, 2));
        console.log("Done.");

    } catch (error) {
        console.error("Error during graph execution:", error);
    }
}

main();
