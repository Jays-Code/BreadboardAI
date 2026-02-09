// Using native fetch from Node 20

async function test() {
    console.log("🚀 Testing Smart ID generation (no runId provided)...");
    const res1 = await fetch("http://127.0.0.1:3000/api/run-stream?slug=prompt-to-post&inputs=" + encodeURIComponent(JSON.stringify({ topic: "Test Topic" })));
    if (res1.ok) {
        console.log("✅ Request 1 sent.");
        // We can't easily wait for the SSE stream here without a lot of boilerplate,
        // but let's check the results directory.
    } else {
        console.error("❌ Request 1 failed.");
    }

    console.log("🚀 Testing provided runId correlation...");
    const customId = "custom-test-id-123";
    const res2 = await fetch("http://127.0.0.1:3000/api/run-stream?slug=prompt-to-post&inputs=" + encodeURIComponent(JSON.stringify({ topic: "Another Test", runId: customId })));
    if (res2.ok) {
        console.log("✅ Request 2 sent.");
    } else {
        console.error("❌ Request 2 failed.");
    }
}

test();
