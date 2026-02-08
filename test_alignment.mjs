// Native fetch is available in Node 18+

async function testQAAlignment() {
    const runId = `test-run-${Date.now()}`;
    const video_structure = {
        video_title_internal: "The Mystery of Black Holes",
        topic: "Black Holes and Spacetime",
        tone: "Scientific and Dramatic",
        estimated_total_duration: 15,
        scenes: [
            {
                scene_id: 1,
                concept_description: "A swirling vortex of light and darkness",
                key_takeaway: "Black holes are regions of space where gravity is so strong that nothing can escape.",
                duration_sec: 5
            }
        ]
    };

    console.log("Testing /api/visual-qa alignment...");
    // Note: This might fail if no actual images are present in public/qa/runId
    // But we want to see the prompt in bridge.log if possible, or check server response if it reaches Gemini
    try {
        const response = await fetch("http://localhost:3000/api/visual-qa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ runId, video_structure })
        });
        const result = await response.json();
        console.log("Visual QA Response:", JSON.stringify(result, null, 2));
    } catch (e) {
        console.log("Visual QA failed (likely no frames):", e.message);
    }

    console.log("\nTesting /api/analyze-video alignment...");
    try {
        const response = await fetch("http://localhost:3000/api/analyze-video", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ runId, video_structure })
        });
        const result = await response.json();
        console.log("Analyze Video Response:", JSON.stringify(result, null, 2));
    } catch (e) {
        console.log("Analyze Video failed (likely no file):", e.message);
    }
}

testQAAlignment();
