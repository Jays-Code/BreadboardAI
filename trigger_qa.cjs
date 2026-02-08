
const fs = require('fs');

async function triggerQA() {
    // 1. Fetch original result
    const resultUrl = 'http://localhost:3000/api/result?id=space-exploration-ba0263c6';
    const result = await fetch(resultUrl).then(r => r.json());

    let video_structure = result.outputs?.video_structure;
    if (!video_structure && result.trace) {
        const outputEvent = result.trace.find(e => e.type === 'output');
        if (outputEvent) video_structure = outputEvent.data.video_structure;
    }

    if (!video_structure) throw new Error("No video_structure found");

    // 2. Patch URLs (SAME logic as render)
    function patch(obj) {
        if (!obj) return;
        if (typeof obj === 'object') {
            for (const key in obj) {
                if (typeof obj[key] === 'string') {
                    // Use local space images - zero external dependencies!
                    if (obj[key].includes('source.unsplash.com')) {
                        const spaceImages = [
                            '/assets/space/nebula.png',
                            '/assets/space/starfield.png',
                            '/assets/space/galaxy.png',
                        ];
                        const randomImage = spaceImages[Math.floor(Math.random() * spaceImages.length)];
                        obj[key] = randomImage;
                        console.log(`Patched Image (Local): ${obj[key]}`);
                    }
                } else if (typeof obj[key] === 'object') {
                    patch(obj[key]);
                }
            }
        }
    }
    // Patch Duration to match actual render (10s)
    if (video_structure) {
        video_structure.estimated_total_duration = 10;
    }
    patch(video_structure);

    // 3. Trigger QA
    const qaUrl = 'http://localhost:3000/api/visual-qa';
    console.log(`Triggering Visual QA...`);

    const response = await fetch(qaUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            runId: 'space-exploration-ba0263c6',
            video_structure: video_structure
        })
    });

    const qaResult = await response.json();
    console.log(JSON.stringify(qaResult, null, 2));
    fs.writeFileSync('qa_report.json', JSON.stringify(qaResult, null, 2));
}

triggerQA().catch(console.error);
