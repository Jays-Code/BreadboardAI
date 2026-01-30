import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const app = express();
const PORT = 3000;

// Paths for the "Mind Link"
const BRAIN_DIR = path.resolve(process.cwd(), '.agent', 'brain');
const REQUESTS_FILE = path.join(BRAIN_DIR, 'requests.json');
const RESPONSES_FILE = path.join(BRAIN_DIR, 'responses.json');

// Ensure brain dir exists
if (!fs.existsSync(BRAIN_DIR)) {
    fs.mkdirSync(BRAIN_DIR, { recursive: true });
}

// Initialize files if they don't exist
if (!fs.existsSync(REQUESTS_FILE)) fs.writeFileSync(REQUESTS_FILE, '[]');
if (!fs.existsSync(RESPONSES_FILE)) fs.writeFileSync(RESPONSES_FILE, '[]');

app.use(bodyParser.json());

app.post('/generate', async (req, res) => {
    const { task, persona, model } = req.body;
    const requestId = crypto.randomUUID();

    console.log(`[${requestId}] Received Request: ${task.substring(0, 50)}...`);

    // 1. Write Request to Queue
    try {
        const requests = JSON.parse(fs.readFileSync(REQUESTS_FILE, 'utf-8'));
        requests.push({
            id: requestId,
            timestamp: new Date().toISOString(),
            status: 'pending',
            task,
            persona,
            model
        });
        fs.writeFileSync(REQUESTS_FILE, JSON.stringify(requests, null, 2));
    } catch (error) {
        console.error("Error writing request:", error);
        return res.status(500).json({ error: "Failed to queue request via Mind Link" });
    }

    // 2. Poll for Response (The Synapse)
    // We prefer a simple polling loop here over file watchers for stability in Docker/Workspaces
    const POLL_INTERVAL_MS = 1000;
    const TIMEOUT_MS = 60000 * 2; // 2 minutes timeout for the Agent to think
    let elapsed = 0;

    console.log(`[${requestId}] Queued. Waiting for Antigravity Brain...`);

    const interval = setInterval(() => {
        elapsed += POLL_INTERVAL_MS;

        try {
            if (fs.existsSync(RESPONSES_FILE)) {
                // In a real high-concurrency scenario, careful locking would be needed.
                // For this single-user agent loop, simple read is fine.
                const responses = JSON.parse(fs.readFileSync(RESPONSES_FILE, 'utf-8'));
                // Find response for THIS specific request ID
                const matchIndex = responses.findIndex((r: any) => r.id === requestId);

                if (matchIndex !== -1) {
                    const match = responses[matchIndex];
                    clearInterval(interval);

                    // Optional: Clean up handled response? 
                    // For audit log purposes, we might leave it or move it to 'history'.
                    // For now, let's leave it.

                    console.log(`[${requestId}] Brain responded! Sending back to Breadboard.`);
                    return res.json({ response: match.response });
                }
            }
        } catch (err) {
            console.error("Error reading responses:", err);
        }

        if (elapsed > TIMEOUT_MS) {
            clearInterval(interval);
            console.log(`[${requestId}] Timeout waiting for Brain.`);
            return res.status(504).json({ error: "Antigravity Brain timed out (is the agent loop running?)" });
        }
    }, POLL_INTERVAL_MS);
});

app.listen(PORT, () => {
    console.log(`Antigravity Mind Link active on port ${PORT}`);
    console.log(`Monitoring queues in: ${BRAIN_DIR}`);
});
