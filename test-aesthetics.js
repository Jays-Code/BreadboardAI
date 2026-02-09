
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';
import * as dotenv from "dotenv";

dotenv.config();

async function runTest() {
    console.log("🚀 Starting Aesthetic Aesthetic Consistency Test...");

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        console.error("❌ ERROR: No API Key found.");
        process.exit(1);
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Load Guidelines
    const guidelines = fs.readFileSync(path.resolve('content_guidelines.md'), 'utf-8');

    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: `Use the following CONTENT GUIDELINES for all your responses:\n${guidelines}`
    });

    const testCases = [
        {
            topic: "Modern minimalist living room",
            tone: "Calm, sophisticated",
            style_profile: "Minimalist Studio",
            expected_energy: "chill",
            expected_camera: "zoom_in"
        },
        {
            topic: "Cyberpunk street race",
            tone: "Intense, neon",
            style_profile: "Vibrant Fusion",
            expected_energy: "high",
            expected_camera: "snap_zoom"
        }
    ];

    for (const test of testCases) {
        console.log(`\n🤖 Testing Style Profile: "${test.style_profile}" for topic: "${test.topic}"...`);

        const prompt = `Act as a Motion Director. Transform this scene into a KINETIC Scene Composition JSON for Remotion.
        
        Scene Description: "${test.topic}"
        Tone: "${test.tone}"
        Ambient Mood: "Dynamic"
        Style Profile: "${test.style_profile}"

        STRICT ADHERENCE REQUIRED: You MUST use the visual language (colors, motion, typography) defined for the "${test.style_profile}" profile in the Content Guidelines. Do not deviate.

        Design the scene as a MULTI-ASSET STAGE with modern social media aesthetics based on the style profile.
        
        Output strict JSON with this exact structure:
        {
          "background_color": "hex string",
          "layout_style": "string",
          "typography_style": "string",
          "energy_level": "string",
          "composition": [
            {
              "type": "image",
              "image_prompt": "string",
              "depth": number,
              "zIndex": number,
              "motion": { "type": "string", "start_pos": { "x": number, "y": number, "scale": number }, "end_pos": { "x": number, "y": number, "scale": number } }
            }
          ],
          "particles": "string",
          "camera_motion": "string",
          "transition_style": "string"
        }`;

        try {
            const result = await model.generateContent(prompt);
            const text = result.response.text();
            const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
            const response = JSON.parse(cleaned);

            console.log("✅ AI OUTPUT RECEIVED:");
            console.log(`- Layout: ${response.layout_style}`);
            console.log(`- Typography: ${response.typography_style}`);
            console.log(`- Energy: ${response.energy_level}`);
            console.log(`- Camera: ${response.camera_motion}`);

            // Validation Checks
            const energyMatch = response.energy_level === test.expected_energy;
            const cameraMatch = response.camera_motion === test.expected_camera;

            console.log("\n📊 VALIDATION REPORT:");
            console.log(`- Energy matches profile: ${energyMatch ? '✅' : '❌'} (Expected: ${test.expected_energy}, Got: ${response.energy_level})`);
            console.log(`- Camera matches profile: ${cameraMatch ? '✅' : '❌'} (Expected: ${test.expected_camera}, Got: ${response.camera_motion})`);

            if (energyMatch && cameraMatch) {
                console.log(`✨ TEST PASSED for ${test.style_profile}!`);
            } else {
                console.log(`⚠️ TEST PARTIAL for ${test.style_profile}: Some aesthetic parameters were mismatched.`);
            }

        } catch (e) {
            console.error("❌ TEST FAILED:", e.message);
        }
    }
}

runTest();
