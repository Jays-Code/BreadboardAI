/**
 * Prompt-to-Post Content Director Graph
 * Refactored for Breadboard 0.35.0 (Build API)
 * Utilizing pure defineNodeType for bridge communication.
 */
import { board, input, output, defineNodeType, array, object } from "@breadboard-ai/build";

// --- 1. Inputs ---
const topic = input({
    title: "Topic",
    description: "The main topic for the content generation",
    default: "The History of House Music"
});

const tone = input({
    title: "Tone",
    description: "The desired tone for the content",
    default: "Educational and upbeat"
});

const visual_critique = input({
    title: "Visual Critique",
    description: "Feedback from the Visual QA Critic to improve the visuals in a second pass",
    default: ""
});

// --- 2. Director Stage ---
/**
 * Communicates with the Antigravity Bridge to generate a video outline.
 */
export const directorFlowDef = defineNodeType({
    name: "directorFlow",
    metadata: {
        title: "Director",
        description: "The 'brain' of the board; coordinates logic and directs other components."
    },
    inputs: {
        topic: { type: "string" },
        tone: { type: "string" }
    },
    outputs: {
        scenes: { type: array(object({})) },
        total_duration: { type: "number" },
        title: { type: "string" },
        ambient_mood: { type: "string" }
    },
    invoke: async ({ topic, tone }) => {
        console.log(`[Director] Generating arc for topic: ${topic}`);
        const response = await fetch("http://127.0.0.1:3000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                task: `Create a video script for the topic: ${topic} with tone: ${tone}.
                Follow a NARRATIVE ARC structure across exactly 4 scenes:
                1. THE HOOK: Grab attention with a striking fact or problem.
                2. THE JOURNEY: Develop the story, provide evidence or history.
                3. THE CLIMAX: The core insight, solution, or big reveal.
                4. THE OUTRO: Summary and conclusion.

                Output strict JSON with the following structure:
                {
                  "video_title_internal": "string",
                  "ambient_mood": "string summarizing the color/visual vibe (e.g. prehistoric earthy, neon futuristic)",
                  "estimated_total_duration": number,
                  "scenes": [
                    {
                      "scene_id": number,
                      "arc_phase": "hook | journey | climax | outro",
                      "concept_description": "visual description",
                      "key_takeaway": "the spoken narrative text (sentence)",
                      "duration_sec": number
                    }
                  ]
                }
                The total duration MUST NOT exceed 25 seconds. Each scene should be 5-7 seconds.`,
                persona: "Director",
                model: "antigravity-bridge"
            })
        });
        const result = await response.json();
        const data = result.response;
        return {
            scenes: data.scenes || [],
            total_duration: data.estimated_total_duration || 0,
            title: data.video_title_internal || "Untitled",
            ambient_mood: data.ambient_mood || "neutral",
            topic: topic,
            tone: tone
        };
    }
});
const directorFlow = directorFlowDef({ topic, tone });

// --- 3. Scene Copywriter Stage ---
/**
 * Processes each scene to add overlay text using the Antigravity Bridge.
 */
export const copywriterFlowDef = defineNodeType({
    name: "copywriterFlow",
    metadata: {
        title: "Copywriter",
        description: "Drafting engine that writes high-quality scripts or long-form content."
    },
    inputs: {
        scenes: { type: array(object({})) },
        tone: { type: "string" }
    },
    outputs: {
        scenesWithText: { type: array(object({})) }
    },
    invoke: async ({ scenes, tone }) => {
        console.log(`[Copywriter] Condensing overlay text for ${Array.isArray(scenes) ? scenes.length : 0} scenes...`);
        console.log(`   Tone: ${tone}`);
        const scenesArray = scenes as any[];
        const results = await Promise.all(scenesArray.map(async (scene) => {
            const response = await fetch("http://127.0.0.1:3000/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    task: `Write the overlay text for a video scene based on this key point: "${scene.key_takeaway}". 
                    Condense it into punchy, impactful on-screen text. Maximum 7 words. 
                    Follow the Remotion Prompt Engineering Guidelines: use specified terminology if needed, and ensure text is suitable for a 30s high-energy edit.
                    Output only the text string.`,
                    persona: "Copywriter",
                    model: "antigravity-bridge"
                })
            });
            const result = await response.json();
            return { ...scene, overlay_text: result.response };
        }));
        return { scenesWithText: results };
    }
});
const copywriterFlow = copywriterFlowDef({ scenes: directorFlow.outputs.scenes, tone: tone });

// --- 4. Visual Architect Stage ---
/**
 * Transforms descriptions into detailed Visual Scripts for Remotion.
 */
export const visualArchitectFlowDef = defineNodeType({
    name: "visualArchitectFlow",
    metadata: {
        title: "Visual Architect Flow",
        description: "Acts as a Motion Designer, defining the visual style, animations, and assets for each scene."
    },
    inputs: {
        scenes: { type: array(object({})) },
        tone: { type: "string" },
        ambient_mood: { type: "string" },
        critique: { type: "string" }
    },
    outputs: {
        scenesWithVisuals: { type: array(object({})) }
    },
    invoke: async ({ scenes, tone, ambient_mood, critique }) => {
        console.log(`[VisualArchitect] Directing kinetic motion for ${Array.isArray(scenes) ? scenes.length : 0} scenes...`);
        console.log(`   Ambient Mood: ${ambient_mood}, Tone: ${tone}`);
        const scenesArray = scenes as any[];
        const results = [];
        for (const scene of scenesArray) {
            console.log(`   🎨 Designing Scene ${scene.scene_id}: ${scene.arc_phase}`);
            const response = await fetch("http://127.0.0.1:3000/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    task: `Act as a Motion Director. Transform this scene description into a KINETIC Scene Composition JSON for Remotion.
                    
                    Description: "${scene.concept_description}"
                    Tone: "${tone}"
                    Ambient Mood: "${ambient_mood}"
                    ${critique ? `IMPORTANT CRITIQUE TO FIX: "${critique}"` : ""}

                    Design the scene as a MULTI-ASSET STAGE:
                    1. Background: The environmental vibe (color/mood or video).
                    2. Composition: An array of elements (sprites) that move.
                       - Each sprite needs a 'type' ('image' or 'video').
                       - Each sprite needs a 'depth' (0.5 for mid, 1.0 for fore).
                       - Each sprite needs a 'motion' object with start_pos and end_pos (x/y as percentages of stage, scale 0.5 to 1.5).

                    Output strict JSON with this exact structure:
                    {
                      "background_color": "hex string",
                      "layout_style": "fullscreen | split_vertical | montage_grid | polaroid_scatter",
                      "typography_style": "word_pop | karaoke | cinematic_fade | box_highlight",
                      "energy_level": "high | chill",
                      "composition": [
                        {
                          "type": "image | video",
                          "image_prompt": "highly detailed subject specific prompt. For video, describe the motion/scene clearly.",
                          "depth": number (0.5 to 1.0),
                          "zIndex": number,
                          "motion": {
                            "type": "linear | ease",
                            "start_pos": { "x": number, "y": number, "scale": number },
                            "end_pos": { "x": number, "y": number, "scale": number }
                          }
                        }
                      ],
                      "particles": "none | dust | sparks | bubbles",
                      "camera_motion": "none | zoom_in | pan_left | snap_zoom | handheld",
                      "transition_style": "fade | glitch | slide_up | none",
                      "sfx_triggers": []
                    }
                    Detailed Implementation Instructions:
                    - Use 'type: video' for background plates if the scene would benefit from cinematic motion (e.g., drone shots, space nebula, flowing water).
                    - Use 'snap_zoom' for high-energy hooks.
                    - Set 'transition_style' to 'glitch' for tech/energetic tones.
                    - Mix multiple sprites in 'composition' to create depth and action.
                    - Ensure the compositions are DYNAMIC. No static scenes.
                    - DO NOT include 'sfx_triggers' unless you have a specifically provided valid URL. Do not use placeholder URLs.
                    For 'montage_grid', provide exactly 3 images/videos. For 'split_vertical', provide 2.`,
                    persona: "Motion Director",
                    model: "antigravity-bridge"
                })
            });
            const result = await response.json();
            results.push({ ...scene, visual_script: result.response });
        }
        return {
            scenesWithVisuals: results,
            topic: scenesArray[0]?.topic || "", // Pass through context if available
            tone: scenesArray[0]?.tone || ""
        };
    }
});
const visualArchitectFlow = visualArchitectFlowDef({
    scenes: copywriterFlow.outputs.scenesWithText,
    tone: tone,
    ambient_mood: directorFlow.outputs.ambient_mood,
    critique: visual_critique
});

// --- 5. Asset Sourcing Stage ---
/**
 * Generates actual image assets for scenes that request them.
 */
export const assetSourcingFlowDef = defineNodeType({
    name: "assetSourcingFlow",
    metadata: {
        title: "Asset Sourcing Flow",
        description: "Fetches or generates the actual image assets requested by the Visual Architect."
    },
    inputs: {
        scenes: { type: array(object({})) }
    },
    outputs: {
        scenesWithAssets: { type: array(object({})) }
    },
    invoke: async ({ scenes }) => {
        console.log(`[AssetSourcing] Sourcing production layers for ${Array.isArray(scenes) ? scenes.length : 0} scenes...`);
        const scenesArray = scenes as any[];
        const results = [];

        for (const scene of scenesArray) {
            const script = scene.visual_script;
            if (script && script.composition && Array.isArray(script.composition)) {
                console.log(`   📷 Sourcing assets for Scene ${scene.scene_id}...`);
                // Source EACH image in the composition (Parallel for sprites within a scene is fine)
                const updatedComposition = await Promise.all(script.composition.map(async (element: any) => {
                    if (element.type === 'video' && element.image_prompt) {
                        const response = await fetch("http://127.0.0.1:3000/api/source-video", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                prompt: element.image_prompt
                            })
                        });
                        const result = await response.json();
                        return { ...element, url: result.url };
                    }
                    if (element.type === 'image' && element.image_prompt) {
                        const response = await fetch("http://127.0.0.1:3000/generate-image", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                prompt: element.image_prompt
                            })
                        });
                        const result = await response.json();
                        return { ...element, url: result.url };
                    }
                    return element;
                }));

                results.push({
                    ...scene,
                    visual_script: {
                        ...script,
                        composition: updatedComposition
                    }
                });
            } else {
                results.push(scene);
            }
        }
        return { scenesWithAssets: results };
    }
});
const assetSourcingFlow = assetSourcingFlowDef({ scenes: visualArchitectFlow.outputs.scenesWithVisuals });


// --- 6. Social Captioner Stage ---
/**
 * Generates a social media caption for the video.
 */
export const captionerFlowDef = defineNodeType({
    name: "captionerFlow",
    metadata: {
        title: "Captioner Flow",
        description: "Creative engine that generates social media captions and post text."
    },
    inputs: {
        topic: { type: "string" },
        scenes: { type: array(object({})) }
    },
    outputs: {
        caption: { type: "string" }
    },
    invoke: async ({ topic, scenes }) => {
        const response = await fetch("http://127.0.0.1:3000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                task: `Write a social media caption for a video about "${topic}" with the following scenes: ${JSON.stringify(scenes)}.`,
                persona: "Social Media Manager",
                model: "antigravity-bridge"
            })
        });
        const result = await response.json();
        return { caption: result.response };
    }
});
const captionerFlow = captionerFlowDef({ topic, scenes: directorFlow.outputs.scenes });

// --- 7. Voiceover Stage ---
/**
 * Generates audio voiceovers for each scene.
 */
export const voiceoverFlowDef = defineNodeType({
    name: "voiceoverFlow",
    metadata: {
        title: "Voiceover Flow",
        description: "Generates AI voiceovers (TTS) for each scene's script."
    },
    inputs: {
        scenes: { type: array(object({})) }
    },
    outputs: {
        scenesWithAudio: { type: array(object({})) }
    },
    invoke: async ({ scenes }) => {
        console.log("[Voiceover] Generating high-fidelity audio...");
        const scenesArray = scenes as any[];
        const results = await Promise.all(scenesArray.map(async (scene) => {
            // Use key_takeaway or overlay_text for the voiceover script
            const scriptText = scene.key_takeaway || scene.overlay_text || "";
            if (!scriptText) return scene;

            const response = await fetch("http://127.0.0.1:3000/generate-audio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: scriptText,
                    voice: "alloy" // Default voice
                })
            });
            const result = await response.json();
            return { ...scene, audio_url: result.url };
        }));
        return { scenesWithAudio: results };
    }
});
const voiceoverFlow = voiceoverFlowDef({ scenes: assetSourcingFlow.outputs.scenesWithAssets });

// --- 8. Final Assembler ---
/**
 * Combines the video structure into a single output object.
 */
export const assemblerDef = defineNodeType({
    name: "assembler",
    metadata: {
        title: "Assembler",
        description: "Combines various outputs into a single, cohesive final package."
    },
    inputs: {
        title: { type: "string" },
        duration: { type: "number" },
        scenes: { type: array(object({})) }
    },
    outputs: {
        video_structure: { type: object({}) }
    },
    invoke: ({ title, duration, scenes }) => ({
        video_structure: {
            video_title_internal: title,
            estimated_total_duration: duration,
            scenes: scenes
        }
    })
});
const assembler = assemblerDef({
    title: directorFlow.outputs.title,
    duration: directorFlow.outputs.total_duration,
    scenes: voiceoverFlow.outputs.scenesWithAudio
});

// --- 8. Video Renderer ---
/**
 * Triggers the Remotion render on the Bridge Server.
 */
export const rendererDef = defineNodeType({
    name: "renderer",
    metadata: {
        title: "Renderer",
        description: "Sends the final video structure to the Bridge Server to trigger the Remotion render."
    },
    inputs: {
        video_structure: { type: object({}) },
    },
    outputs: {
        video_url: { type: "string" }
    },
    invoke: async ({ video_structure }) => {
        console.log("[Renderer] Triggering Remotion production...");
        const response = await fetch("http://127.0.0.1:3000/api/render", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                video_structure: video_structure
            })
        });
        const result = await response.json();
        return { video_url: result.video_url };
    }
});
const renderer = rendererDef({ video_structure: assembler.outputs.video_structure });

// --- Graph Export ---
export default board({
    title: "Prompt to Video Post",
    description: "Converts a topic into a Remotion-ready video structure and renders it.",
    inputs: { topic, tone, visual_critique },
    outputs: {
        video_structure: assembler.outputs.video_structure,
        video_url: renderer.outputs.video_url
    }
});
