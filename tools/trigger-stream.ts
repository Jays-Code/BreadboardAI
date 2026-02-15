import http from 'http';

async function triggerStream() {
    console.log("🔗 Connecting to Bridge Server (Streaming)...");
    const inputs = {
        youtube_url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
        style_profile: "Vibrant Fusion",
        runId: "zoo-qa-test"
    };

    const url = `http://localhost:3000/api/run-stream?slug=repurpose-video&inputs=${encodeURIComponent(JSON.stringify(inputs))}`;

    console.log("🚀 GET", url);

    const req = http.get(url, (res) => {
        let currentEvent = "";
        res.on('data', (chunk) => {
            const lines = chunk.toString().split('\n');
            for (const line of lines) {
                if (line.startsWith('event: ')) {
                    currentEvent = line.substring(7).trim();
                } else if (line.startsWith('data: ')) {
                    const data = line.substring(6).trim();
                    console.log(`[SSE:${currentEvent}]`, data);
                } else if (line.trim() === "") {
                    // end of event
                } else {
                    console.log("[RAW]", line);
                }
            }
        });

        res.on('end', () => {
            console.log("\n🏁 Stream ended.");
        });
    });

    req.on('error', (e) => {
        console.error("❌ Stream failed:", e);
    });
}

triggerStream().catch(console.error);
