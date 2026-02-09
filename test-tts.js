async function testTTS() {
    console.log("Testing Free TTS Endpoint...");
    try {
        const response = await fetch("http://127.0.0.1:3000/generate-audio", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: "This is a test of the free Text to Speech system using Google Translate."
            })
        });

        const data = await response.json();
        console.log("Response:", JSON.stringify(data, null, 2));

        if (data.url && !data.error) {
            console.log("✅ SUCCESS: Audio URL received.");
        } else {
            console.log("❌ FAILED: Unexpected response.");
        }
    } catch (error) {
        console.error("❌ ERROR:", error.message);
    }
}

testTTS();
