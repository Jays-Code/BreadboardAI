
import { defineConfig } from 'vite';

export default defineConfig({
    define: {
        'ASSET_PACK_ICONS': JSON.stringify({})
    },
    server: {
        port: 5173,
        host: true
    }
});
