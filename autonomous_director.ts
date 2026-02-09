
import crypto from 'crypto';

// Configuration
const API_BASE = "http://127.0.0.1:3000";
const BOARD_SLUG = "prompt-to-post"; // The board filename without .json

// Interfaces
interface VideoStructure {
    video_title_internal: string;
    estimated_total_duration: number;
    scenes: any[];
    topic?: string;
    tone?: string;
    style_profile?: string;
}

interface QAReport {
    score: number;
    passed: boolean;
    critique: string;
    improvement_suggestions: string[];
}

async function runBoard(inputs: any) {
    console.log(`🎬 [Director] Action! Running board with inputs:`, inputs);
    try {
        const response = await fetch(`${API_BASE}/api/run`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                slug: BOARD_SLUG,
                inputs: inputs
            })
        });

        if (!response.ok) {
            throw new Error(`Board run failed: ${response.statusText}`);
        }

        const result: any = await response.json();
        return result.result; // The output object from the board
    } catch (error) {
        console.error("❌ Board Execution Error:", error);
        throw error;
    }
}

async function runVisualQA(videoStructure: VideoStructure, runId: string): Promise<QAReport> {
    console.log(`🧐 [Director] Requesting Visual QA for Run ID: ${runId}...`);
    try {
        const response = await fetch(`${API_BASE}/api/visual-qa`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                video_structure: videoStructure,
                runId: runId
            })
        });

        if (!response.ok) {
            throw new Error(`QA Request failed: ${response.statusText}`);
        }

        const result: any = await response.json();
        return result.report;
    } catch (error) {
        console.error("❌ QA Request Error:", error);
        throw error;
    }
}

async function main() {
    // 1. Parse Arguments
    const args = process.argv.slice(2);
    const topic = args[0] || "Foundations of Creative AI";
    const styleProfile = args[1] || "Vibrant Fusion";

    console.log(`\n🤖 AUTONOMOUS DIRECTOR STARTED`);
    console.log(`--------------------------------`);
    console.log(`Topic: "${topic}"`);
    console.log(`Style: "${styleProfile}"`);

    // 2. Initialize Run
    const runId = `auto-${crypto.randomUUID().substring(0, 8)}`;
    console.log(`Run ID: ${runId}\n`);

    // --- PASS 1: The Draft ---
    console.log(`\n📡 STARTING PASS 1 (The Draft)...`);
    const pass1Inputs = {
        topic: topic,
        tone: "Inspirational and Educational",
        style_profile: styleProfile,
        visual_critique: "", // No critique yet
        runId: runId
    };

    const pass1Output = await runBoard(pass1Inputs);
    const videoStructure = pass1Output.video_structure;

    if (!videoStructure) {
        console.error("❌ Failed to get video structure from Pass 1");
        process.exit(1);
    }

    console.log(`✅ Pass 1 Complete. Video Title: "${videoStructure.video_title_internal}"`);

    // --- CRITIQUE ---
    console.log(`\n🔍 REVIEWING DAILIES (QA)...`);
    const qaReport = await runVisualQA(videoStructure, runId);

    console.log(`\n📊 QA REPORT:`);
    console.log(`   Score: ${qaReport.score}/100`);
    console.log(`   Passed: ${qaReport.passed}`);
    console.log(`   Critique: "${qaReport.critique.substring(0, 100)}..."`);

    // --- DECISION GATE ---
    if (qaReport.score >= 75) {
        console.log(`\n✨ EXCELLENT! The draft meets our standards. (Score: ${qaReport.score})`);
        console.log(`🚀 Sending to Final Render... (Already handled by board)`);
        console.log(`👉 Video URL: ${pass1Output.video_url}`);
        process.exit(0);
    }

    // --- PASS 2: The Director's Cut ---
    console.log(`\n⚠️ QUALITY THRESHOLD MISSED (< 75). INITIATING DIRECTOR'S CUT...`);
    console.log(`   Feedback: ${qaReport.critique}`);

    const pass2Inputs = {
        ...pass1Inputs,
        visual_critique: `PREVIOUS SCORE: ${qaReport.score}/100. IMPROVE THIS: ${qaReport.critique}`
    };

    console.log(`\n📡 STARTING PASS 2 (Refinement)...`);
    const pass2Output = await runBoard(pass2Inputs);
    const videoStructure2 = pass2Output.video_structure;

    console.log(`✅ Pass 2 Complete. New Video URL: ${pass2Output.video_url}`);

    // Final check (optional, but let's just output the result of Pass 2)
    console.log(`\n🏁 PRODUCTION WRAPPED.`);
}

main().catch(err => {
    console.error("Fatal Error:", err);
    process.exit(1);
});
