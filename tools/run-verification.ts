import { createHarness } from "@google-labs/breadboard";
import board from "../src/boards/repurpose-video.js";

async function run() {
    console.log("🚀 Starting Simpsons QA Verification Run...");

    // Serialize the Build API board to a JSON graph
    const graph = await board.serialize();

    const inputs = {
        youtube_url: "https://www.youtube.com/watch?v=XCXo2nW116I",
        runId: "simpsons-qa-rerun-" + Date.now(),
        style_profile: "Vibrant Fusion"
    };

    console.log("Inputs:", JSON.stringify(inputs, null, 2));

    try {
        const harness = createHarness({ url: "repurpose-video", runner: graph });
        for await (const result of harness.run(inputs)) {
            if (result.type === "output") {
                console.log("\n✅ Board Output Received:");
                console.log(JSON.stringify(result.data.outputs, null, 2));
            } else if (result.type === "error") {
                console.error("\n❌ Board Error:", result.data.error);
            } else if (result.type === "nodeend") {
                // Log important intermediates if they exist
                const outputs = result.data.outputs as any;
                if (outputs) {
                    if (outputs.status) console.log(`[Node: ${result.data.node.id}] Status: ${outputs.status}`);
                    if (outputs.critique) console.log(`   Critique: ${outputs.critique}`);
                }
            }
        }
        console.log("\n🏁 Run Completed.");
    } catch (e) {
        console.error("Failed to execute board:", e);
    }
}

run();
