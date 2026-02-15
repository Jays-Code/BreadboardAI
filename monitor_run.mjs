import http from 'http';

const slug = 'repurpose-video';
const inputs = {
    youtube_url: 'https://www.youtube.com/watch?v=XCXo2nW116I',
    runId: 'ralph-monitor-' + Date.now(),
    style_profile: 'Vibrant Fusion'
};

const url = `http://localhost:3000/api/run-stream?slug=${slug}&inputs=${encodeURIComponent(JSON.stringify(inputs))}`;

console.log(`Connecting to ${url}...`);

const req = http.get(url, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        const lines = chunk.split('\n');
        for (const line of lines) {
            if (line.startsWith('data: ')) {
                try {
                    const data = JSON.parse(line.substring(6));
                    if (data.type === 'node-start') {
                        console.log(`[START] Node: ${data.node.id} (${data.node.type})`);
                    } else if (data.type === 'node-end') {
                        console.log(`[END]   Node: ${data.node.id}`);
                    } else if (data.type === 'graph-start') {
                        console.log(`[GRAPH] Start`);
                    } else if (data.type === 'graph-end') {
                        console.log(`[GRAPH] End`);
                    } else if (data.type === 'result') {
                        console.log(`[RESULT] Success! Video URL: ${data.outputs.video_url}`);
                        process.exit(0);
                    } else if (data.type === 'error') {
                        console.error(`[ERROR] ${data.message}`);
                        process.exit(1);
                    }
                } catch (e) {
                    // Ignore malformed JSON chunks that might happen in SSE
                }
            }
        }
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
    process.exit(1);
});
