import graph, {
    directorFlowDef,
    copywriterFlowDef,
    visualArchitectFlowDef,
    assetSourcingFlowDef,
    voiceoverFlowDef,
    musicSourcingFlowDef,
    assemblerDef,
    rendererDef
} from "../boards/prompt-to-post.js";
import { kit } from "@breadboard-ai/build";
import { invokeGraph } from "@google-labs/breadboard";
import fs from "fs";
import path from "path";
import crypto from "crypto";

async function main() {
    console.log("🚀 Running Upgraded Prompt-to-Post Graph...");

    const runId = `test-robotics-${crypto.randomUUID().substring(0, 8)}`;
    const inputData: any = {
        topic: "The Future of AI Robotics",
        tone: "Cinematic and slightly optimistic",
        style_profile: "Vibrant Fusion",
        runId: runId
    };

    console.log("Input:", JSON.stringify(inputData, null, 2));

    try {
        const boardToSerialize = (graph as any).default ?? graph;

        const customKit = await kit({
            title: "Custom Agent Kit",
            description: "Bridge communication kit",
            url: "bundle:custom-kit",
            components: {
                directorFlow: directorFlowDef,
                copywriterFlow: copywriterFlowDef,
                visualArchitectFlow: visualArchitectFlowDef,
                assetSourcingFlow: assetSourcingFlowDef,
                musicSourcingFlow: musicSourcingFlowDef,
                voiceoverFlow: voiceoverFlowDef,
                assembler: assemblerDef,
                renderer: rendererDef
            }
        }) as any;

        let attempts = 0;
        const MAX_ATTEMPTS = 1;

        while (attempts < MAX_ATTEMPTS) {
            attempts++;
            console.log(`\n--- 🎬 EXECUTION PASS ${attempts}/${MAX_ATTEMPTS} ---`);

            const result: any = await invokeGraph(
                boardToSerialize,
                inputData,
                { kits: [customKit] }
            );

            if (!result.video_url) {
                console.error("❌ Execution failed. Result:", JSON.stringify(result, null, 2));
                break;
            }

            console.log("✅ Video Produced:", result.video_url);
            console.log("📊 Structure:", JSON.stringify(result.video_structure, null, 2));

            // --- Phase III: Visual QA Loop (Optional for this test) ---
            console.log("\n🔍 Triggering Quality Review...");
            const qaResp = await fetch("http://localhost:3000/api/visual-qa", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    video_structure: result.video_structure,
                    runId: runId
                })
            });
            const qaResult = await qaResp.json();
            console.log("\n--- 📺 CRITIC REPORT ---");
            console.log(`Score: ${qaResult.report.score}/100`);
            console.log(`Critique: ${qaResult.report.critique}`);
        }

        console.log("\n🏁 Done.");

    } catch (error) {
        console.error("❌ CRITICAL ERROR:", error);
    }
}

main();
