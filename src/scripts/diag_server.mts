import express from 'express';
import { createLoader } from "@google-labs/breadboard";
import { kit } from "@breadboard-ai/build";

console.log("Starting diagnostic...");

const app = express();
const PORT = 3001; // Use different port

app.get('/status', (req, res) => {
    res.json({ status: "ok" });
});

try {
    console.log("Testing Breadboard imports...");
    console.log("createLoader type:", typeof createLoader);
    console.log("kit type:", typeof kit);

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Diagnostic server listening on port ${PORT}`);
    });

    // Keep alive for 10 seconds
    setTimeout(() => {
        console.log("Diagnostic timeout reached. Exiting.");
        process.exit(0);
    }, 10000);
} catch (e) {
    console.error("Diagnostic error:", e);
    process.exit(1);
}
