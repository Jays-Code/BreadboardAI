
import { defineConfig } from 'vite';

export default defineConfig({
    root: 'ui',
    publicDir: '../public',
    define: {
        'ASSET_PACK_ICONS': JSON.stringify({})
    },
    resolve: {
        modules: ['node_modules', 'tools/editor/node_modules']
    },
    server: {
        port: 5173,
        host: true,
        proxy: {
            '/api/run': 'http://localhost:3000',
            '/api/run-stream': 'http://localhost:3000',
            '/api/results': 'http://localhost:3000',
            '/api/result': 'http://localhost:3000',
            '/api/render': 'http://localhost:3000',
            '/api/render-status': 'http://localhost:3000'
        }
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true
    }
});
