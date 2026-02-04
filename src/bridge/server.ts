import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { pathToFileURL } from 'url';
import { createLoader, invokeGraph } from "@google-labs/breadboard";
import { kit } from "@breadboard-ai/build";

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

// --- Generic Run Endpoint (Wait for completion) ---
app.post('/api/run', async (req, res) => {
    const { slug, inputs } = req.body;
    try {
        const boardPath = path.join(process.cwd(), 'public', 'api', `${slug}.json`);
        if (!fs.existsSync(boardPath)) return res.status(404).json({ error: `Board ${slug} not found` });
        const graph = JSON.parse(fs.readFileSync(boardPath, 'utf-8'));
        const loader = createLoader();
        const output = await invokeGraph({ graph }, inputs, {
            base: new URL(pathToFileURL(path.join(process.cwd(), 'public', 'api')).toString()),
            loader
        });
        res.json({ result: output });
    } catch (error) {
        res.status(500).json({ error: "Execution failed", details: String(error) });
    }
});

// --- Streaming Run Endpoint (SSE) ---
app.get('/api/run-stream', async (req, res) => {
    const { slug, inputs: inputsStr } = req.query;
    const inputs = inputsStr ? JSON.parse(inputsStr as string) : {};

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const sendEvent = (type: string, data: any) => {
        res.write(`event: ${type}\ndata: ${JSON.stringify(data)}\n\n`);
    };

    try {
        const boardPath = path.join(process.cwd(), 'public', 'api', `${slug}.json`);
        if (!fs.existsSync(boardPath)) {
            sendEvent('error', { message: `Board ${slug} not found` });
            return res.end();
        }

        const graph = JSON.parse(fs.readFileSync(boardPath, 'utf-8'));
        const { run } = await import("@google-labs/breadboard");

        // Kits: We need to import the custom kit defined in run_graph.mts or similar
        // For now, let's assume we can run without special kits or we add them here.
        // Importing them might be tricky since they are in .ts files.

        for await (const result of run({ graph }, { inputs })) {
            const { type, data } = result;
            if (type === "input") {
                // Should already be provided, but could be requested mid-run
                result.inputs = inputs;
            } else if (type === "output") {
                sendEvent('output', data);
            } else if (type === "beforehandler") {
                sendEvent('node-start', { id: data.node.id, type: data.node.type });
            } else if (type === "afterhandler") {
                sendEvent('node-end', { id: data.node.id, outputs: data.outputs });
            } else if (type === "error") {
                sendEvent('error', { message: data.error });
            }
        }
        sendEvent('done', {});
        res.end();
    } catch (error) {
        sendEvent('error', { message: String(error) });
        res.end();
    }
});

// --- Mind Link Endpoint (Legacy/Agent) ---
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
