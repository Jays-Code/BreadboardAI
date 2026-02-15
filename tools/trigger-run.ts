async function trigger() {
    console.log("🔗 Connecting to Bridge Server...");
    const payload = {
        slug: "repurpose-video",
        inputs: {
            youtube_url: "https://www.youtube.com/watch?v=XCXo2nW116I",
            style_profile: "Vibrant Fusion",
            runId: "simpsons-qa-rerun-final"
        }
    };

    console.log("🚀 Triggering run with payload:", JSON.stringify(payload, null, 2));

    try {
        const response = await fetch("http://localhost:3000/api/run", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        console.log("✅ Server Response:", JSON.stringify(result, null, 2));
    } catch (e) {
        console.error("❌ Failed to trigger run:", e);
    }
}

trigger().catch(console.error);
