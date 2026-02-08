
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';
import * as dotenv from "dotenv";

dotenv.config();

async function runTest() {
    console.log("🚀 Starting Full Workflow Test (Brain Stage)...");

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        console.error("❌ ERROR: No API Key found.");
        process.exit(1);
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Load Guidelines
    const guidelines = fs.readFileSync(path.resolve('content_guidelines.md'), 'utf-8');

    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash", // Using a stable fast model
        systemInstruction: `Use the following CONTENT GUIDELINES for all your responses:\n${guidelines}`
    });

    const topic = "Cities in the year 2100: Solarpunk Utopia";
    const tone = "Inspiring, high-energy, vibrant";

    console.log(`🤖 Requesting Visual Script for: "${topic}"...`);

    const prompt = `Act as a Motion Director. Transform this scene into a KINETIC Scene Composition JSON for Remotion.
    
    Scene Description: "A futuristic city covered in lush vertical gardens with maglev trains gliding between glass towers."
    Tone: "${tone}"
    Ambient Mood: "Solarpunk Sunlight"

    Design the scene as a MULTI-ASSET STAGE with modern social media aesthetics.
    
    Output strict JSON with this exact structure:
    {
      "background_color": "hex string",
      "layout_style": "fullscreen | split_vertical | montage_grid | polaroid_scatter",
      "typography_style": "word_pop | karaoke | cinematic_fade | box_highlight",
      "energy_level": "high | chill",
      "composition": [
        {
          "type": "image",
          "image_prompt": "highly detailed subject specific prompt.",
          "depth": number,
          "zIndex": number,
          "motion": { "type": "linear | ease", "start_pos": { "x": number, "y": number, "scale": number }, "end_pos": { "x": number, "y": number, "scale": number } }
        }
      ],
      "particles": "none | dust | sparks | bubbles",
      "camera_motion": "none | zoom_in | pan_left | snap_zoom | handheld",
      "transition_style": "fade | glitch | slide_up | none"
    }`;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
        const response = JSON.parse(cleaned);

        console.log("✅ AI OUTPUT RECEIVED:");
        console.log(JSON.stringify(response, null, 2));

        // Validation Checks
        const hasSnapZoom = response.camera_motion === 'snap_zoom';
        const hasModernLayout = ['fullscreen', 'split_vertical', 'montage_grid', 'polaroid_scatter'].includes(response.layout_style);
        const hasKineticText = ['word_pop', 'karaoke', 'cinematic_fade', 'box_highlight'].includes(response.typography_style);

        console.log("\n📊 VALIDATION REPORT:");
        console.log(`- Uses Modern Layout: ${hasModernLayout ? '✅' : '❌'}`);
        console.log(`- Uses Kinetic Text: ${hasKineticText ? '✅' : '❌'}`);
        console.log(`- Uses Advanced Camera: ${response.camera_motion !== 'none' ? '✅' : '❌'} (${response.camera_motion})`);

        if (hasModernLayout && hasKineticText) {
            console.log("\n✨ TEST PASSED: The AI is correctly utilizing the new aesthetic directives!");
        } else {
            console.log("\n⚠️ TEST PARTIAL: Some aesthetic parameters were missed.");
        }

    } catch (e) {
        console.error("❌ TEST FAILED:", e.message);
    }
}

runTest();
