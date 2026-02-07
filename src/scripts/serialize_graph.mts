import graph from '../boards/prompt-to-post.js';
import { serialize } from '@breadboard-ai/build';
import fs from 'fs';

try {
    const bgl = serialize(graph);
    fs.writeFileSync('graph.json', JSON.stringify(bgl, null, 2));
    console.log('Successfully serialized graph to graph.json');
} catch (e) {
    console.error('Serialization failed:', e);
}
