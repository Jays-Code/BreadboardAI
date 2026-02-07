import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

export default defineConfig(async () => {
    let currentDir = __dirname;
    while (currentDir !== '/' && !fs.existsSync(path.join(currentDir, 'package.json')) || path.basename(currentDir) === 'editor') {
        currentDir = path.dirname(currentDir);
    }
    const rootDir = currentDir;

    return {
        root: '.',
        publicDir: 'public',
        define: {
            'MAIN_ICON': JSON.stringify(""),
            'ASSET_PACK': JSON.stringify(":root {}"),
            'ASSET_PACK_ICONS': JSON.stringify([]),
            'GIT_HASH': JSON.stringify('local-fix'),
            'LANGUAGE_PACK': JSON.stringify('en-US')
        },
        optimizeDeps: {
            esbuildOptions: {
                target: 'esnext',
            },
            // Exclude everything that might cause trouble, but include lit for the viewer
            exclude: [
                '@breadboard-ai/visual-editor',
                '@breadboard-ai/shared-ui'
            ]
        },
        build: {
            target: 'esnext',
        },
        esbuild: {
            target: 'esnext',
        },
        server: {
            port: 5174,
            host: '0.0.0.0',
            fs: {
                allow: [rootDir]
            }
        }
    };
});
