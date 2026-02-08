
import { runGraph } from "@google-labs/breadboard";
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
import fs from "fs";
import path from "path";

async function verify() {
    console.log("=== 🔍 FINAL AESTHETICS VERIFICATION: Solarpunk ===");

    const inputData = {
        topic: "Solarpunk: A Vision for a Sustainable Future",
        tone: "Inspiring, vibrant, and high-energy"
    };

    try {
        const boardToSerialize = (graph as any).default ?? graph;
        const bgl = serialize(boardToSerialize);

        const customKit = await kit({
            title: "Custom Agent Kit",
            description: "Bridge communication kit",
            url: "bundle:custom-kit",
            version: "0.0.1",
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

        console.log("🚀 Running Graph Evolution...");
        const runner = runGraph({ graph: bgl }, { kits: [customKit] });
        let outputs: any = {};
        let pass = true;

        for await (const result of runner) {
            const { type, data } = result;

            if (type === 'input') {
                console.log(`   [Input Required] Providing: ${Object.keys(inputData).join(", ")}`);
                await result.inputs(inputData);
            } else if (type === 'output') {
                console.log(`   [Output Generated] Keys: ${Object.keys(data.outputs).join(", ")}`);
                outputs = { ...outputs, ...data.outputs };
            } else if (type === 'nodestart') {
                console.log(`   [Node Start] ${data.node.id} (${data.node.type})`);
            } else if (type === 'nodeend') {
                console.log(`   [Node End] ${data.node.id}`);
            } else if (type === 'error') {
                console.error(`   ❌ [Error] ${data.error}`);
                pass = false;
            }
        }

        console.log("\n--- 🎬 EXECUTION RESULT ---");
        console.log("Result Keys:", Object.keys(outputs));

        const structure = outputs.video_structure as any;
        if (!structure) {
            console.error("❌ Final result does not contain 'video_structure'.");
            console.log("Full Result:", JSON.stringify(outputs, null, 2));
            pass = false;
        } else {
            console.log(`Video Title: ${structure.video_title_internal || 'N/A'}`);
        }
        const scenes = structure.scenes || [];

        scenes.forEach((scene: any, i: number) => {
            console.log(`\n[Scene ${i + 1}] ${scene.arc_phase}`);
            const script = scene.visual_script;

            if (!script) {
                console.error("❌ MISSING VISUAL SCRIPT");
                pass = false;
                return;
            }

            console.log(`- Layout: ${script.layout_style}`);
            console.log(`- Typography: ${script.typography_style}`);
            console.log(`- Energy: ${script.energy_level}`);
            console.log(`- Background: ${script.background_color}`);

            // Check for new parameters
            const expectedLayouts = ['fullscreen', 'split_vertical', 'montage_grid', 'polaroid_scatter'];
            const expectedTypo = ['word_pop', 'karaoke', 'cinematic_fade', 'box_highlight'];

            if (!expectedLayouts.includes(script.layout_style)) {
                console.warn(`⚠️ Unexpected layout style: ${script.layout_style}`);
            }
            if (!expectedTypo.includes(script.typography_style)) {
                console.warn(`⚠️ Unexpected typography style: ${script.typography_style}`);
            }

            if (script.sfx_triggers && script.sfx_triggers.length > 0) {
                console.log(`- SFX Triggers: ${script.sfx_triggers.length} detected`);
            } else {
                console.warn("- SFX Triggers: None detected in this scene");
            }
        });

        if (pass) {
            console.log("\n✅ LOGIC PASS SUCCESSFUL: AI is generating modern aesthetic parameters.");
        } else {
            console.log("\n❌ LOGIC PASS FAILED.");
        }

        // Save to verify_result.json
        fs.writeFileSync("verify_result.json", JSON.stringify(outputs, null, 2));

    } catch (err) {
        console.error("Verification failed:", err);
    }
}

verify();
