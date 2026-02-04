
import { defineConfig } from 'vite';

export default defineConfig({
    root: 'ui',
    publicDir: '../public',
    define: {
        'ASSET_PACK_ICONS': JSON.stringify({})
    },
    server: {
        port: 5173,
        host: true,
        proxy: {
            '/api/run': 'http://localhost:3000',
            '/api/run-stream': 'http://localhost:3000'
        }
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true
    }
});
