async function verifyPipeline() {
    console.log("🚀 Starting Pipeline Verification...");

    const baseUrl = "http://127.0.0.1:3000";

    // 1. Test TTS with Timestamps
    console.log("\n--- Testing TTS with Timestamps ---");
    try {
        const ttsRes = await fetch(`${baseUrl}/generate-audio`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: "Hello world, this is a test of the engaging pipeline." })
        });
        const ttsData = await ttsRes.json();
        console.log("TTS Data:", JSON.stringify(ttsData, null, 2));
        if (ttsData.timestamps && ttsData.timestamps.length > 0) {
            console.log("✅ SUCCESS: Timestamps received.");
        } else {
            console.log("❌ FAILED: No timestamps found.");
        }
    } catch (e) {
        console.error("❌ ERROR (TTS):", e.message);
    }

    // 2. Test Music Generation
    console.log("\n--- Testing Music Generation ---");
    try {
        const musicRes = await fetch(`${baseUrl}/api/generate-music`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mood: "cinematic", topic: "Space Exploration" })
        });
        const musicData = await musicRes.json();
        console.log("Music Data:", JSON.stringify(musicData, null, 2));
        if (musicData.url && musicData.url.startsWith("http")) {
            console.log("✅ SUCCESS: Background music URL received.");
        } else {
            console.log("❌ FAILED: Invalid music response.");
        }
    } catch (e) {
        console.error("❌ ERROR (Music):", e.message);
    }

    // 3. Test Image Enhancement
    console.log("\n--- Testing Image Enhancement ---");
    try {
        const imgRes = await fetch(`${baseUrl}/generate-image`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: "A futuristic city in the clouds" })
        });
        const imgData = await imgRes.json();
        console.log("Image Data:", JSON.stringify(imgData, null, 2));
        if (imgData.url && imgData.url.includes("pollinations")) {
            console.log("✅ SUCCESS: Enhanced image URL received.");
        } else {
            console.log("❌ FAILED: Invalid image response.");
        }
    } catch (e) {
        console.error("❌ ERROR (Image):", e.message);
    }

    console.log("\n🏁 Verification Complete.");
}

verifyPipeline();
