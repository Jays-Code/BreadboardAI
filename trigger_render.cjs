
const fs = require('fs');
const http = require('http');

async function triggerRender() {
    // 1. Fetch original result
    const resultUrl = 'http://localhost:3000/api/result?id=space-exploration-ba0263c6';
    console.log(`Fetching result from ${resultUrl}...`);

    const result = await fetch(resultUrl).then(r => r.json());

    // Extract video_structure from the output node or trace
    let video_structure = result.outputs?.video_structure;

    if (!video_structure) {
        // Fallback: try to find it in the trace
        const outputEvent = result.trace.find(e => e.type === 'output');
        if (outputEvent) {
            video_structure = outputEvent.data.video_structure;
        }
    }

    if (!video_structure) {
        console.error("Could not find video_structure in result");
        process.exit(1);
    }

    console.log("Found video_structure. Patching URLs...");

    // 2. Recursively patch URLs
    function patch(obj) {
        if (!obj) return;
        if (typeof obj === 'object') {
            for (const key in obj) {
                if (typeof obj[key] === 'string') {
                    // Use local space assets (images + videos) - zero external dependencies!
                    if (obj[key].includes('source.unsplash.com')) {
                        const spaceAssets = [
                            '/assets/space/nebula.png',
                            '/assets/space/starfield.png',
                            '/assets/space/galaxy.png',
                            '/assets/videos/nebula.mp4',  // Video backgrounds!
                        ];
                        const randomAsset = spaceAssets[Math.floor(Math.random() * spaceAssets.length)];
                        obj[key] = randomAsset;
                        console.log(`Patched Asset (Local): ${obj[key]}`);
                    }
                    // Patch Example.com SFX
                    if (obj[key].includes('example.com')) {
                        obj[key] = ''; // Remove it or replace with valid
                        console.log(`Removed SFX: ${key}`);
                    }
                } else if (typeof obj[key] === 'object') {
                    // Array or Object
                    if (Array.isArray(obj[key]) && key === 'sfx_triggers') {
                        // Filter out bad SFX objects
                        obj[key] = obj[key].filter(sfx => !sfx.url.includes('example.com'));
                        console.log(`Filtered sfx_triggers`);
                    } else {
                        patch(obj[key]);
                    }
                }
            }
        }
    }

    patch(video_structure);

    // 3. Trigger Render
    const renderUrl = 'http://localhost:3000/api/render';
    console.log(`Triggering render at ${renderUrl}...`);

    const response = await fetch(renderUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            runId: 'space-exploration-ba0263c6',
            video_structure: video_structure
        })
    });

    const renderJson = await response.json();
    console.log('Render Response:', renderJson);
}

triggerRender().catch(console.error);
