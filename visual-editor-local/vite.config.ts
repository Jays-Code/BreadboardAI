import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

async function getAssets(iconDir: string) {
    const files = fs.readdirSync(iconDir, { withFileTypes: true });
    const styles: string[] = [];
    const assets: [string, string][] = [];
    let mainIcon = "";

    for (const file of files) {
        if (file.isDirectory()) continue;
        const ext = path.extname(file.name);
        const name = path.basename(file.name, ext).replace(/\./g, '-');
        const filePath = path.join(iconDir, file.name);
        const data = fs.readFileSync(filePath);

        let mimeType = "";
        if (ext === '.svg') mimeType = 'image/svg+xml';
        else if (ext === '.png') mimeType = 'image/png';
        else if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
        else continue;

        const base64 = `data:${mimeType};base64,${data.toString('base64')}`;
        assets.push([name, base64]);
        styles.push(`--bb-${name}: url("${base64}")`);

        if (file.name === 'logo.svg') {
            mainIcon = base64;
        }
    }

    return {
        styles: `:root { ${styles.join('; ')} }`,
        assets,
        mainIcon
    };
}

export default defineConfig(async () => {
    const rootDir = path.resolve(__dirname, '..');
    const iconDir = path.join(rootDir, 'node_modules/@breadboard-ai/visual-editor/public/third_party/icons');
    const assetPack = await getAssets(iconDir);

    // For localization, we'll import the English pack.
    // We'll do this in main.ts instead to keep config simple, 
    // but we need to define the empty strings here if the editor expects them as globals.

    return {
        root: '.',
        publicDir: 'public',
        define: {
            'MAIN_ICON': JSON.stringify(assetPack.mainIcon),
            'ASSET_PACK': JSON.stringify(assetPack.styles),
            'ASSET_PACK_ICONS': JSON.stringify(assetPack.assets),
            'GIT_HASH': JSON.stringify('local-fix'),
            'LANGUAGE_PACK': JSON.stringify('en-US') // We'll handle this in main.ts
        },
        assetsInclude: ['**/*.wasm'],
        optimizeDeps: {
            include: [
                'lit',
                'lit/directives/ref.js',
                'lit/directives/until.js',
                'lit/directives/map.js',
                'lit/directives/class-map.js',
                'lit/directives/style-map.js',
                '@lit/context'
            ],
            exclude: [
                '@google-labs/breadboard',
                '@breadboard-ai/visual-editor',
                '@breadboard-ai/shared-ui',
                '@breadboard-ai/google-drive-kit-manifest'
            ],
            esbuildOptions: {
                target: 'esnext',
            }
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
        },
        resolve: {
            alias: {
                '@breadboard-ai/visual-editor/': path.join(rootDir, 'node_modules/@breadboard-ai/visual-editor/'),
                '@breadboard-ai/visual-editor': path.join(rootDir, 'node_modules/@breadboard-ai/visual-editor/build/src/index.js'),
                '@breadboard-ai/shared-ui/': path.join(rootDir, 'node_modules/@breadboard-ai/shared-ui/dist/'),
                '@breadboard-ai/shared-ui': path.join(rootDir, 'node_modules/@breadboard-ai/shared-ui/dist/index.js'),
                '@google-labs/breadboard/harness': path.join(rootDir, 'node_modules/@google-labs/breadboard/dist/harness.min.js'),
                '@google-labs/breadboard/kits': path.join(rootDir, 'node_modules/@google-labs/breadboard/dist/kits.min.js'),
                '@google-labs/breadboard/legacy.js': path.join(rootDir, 'node_modules/@google-labs/breadboard/dist/src/legacy/index.js'),
                '@google-labs/breadboard': path.join(__dirname, 'breadboard-proxy.ts'),
                '@google-labs/core-kit': path.join(__dirname, 'core-kit-proxy.ts'),
                '@breadboard-ai/google-drive-kit/google-drive.kit.json': path.join(__dirname, 'src/assets/google-drive.kit.json'),
                '@breadboard-ai/example-boards/examples-boards.json': path.join(__dirname, 'src/assets/examples-boards.json'),
                '@breadboard-ai/example-boards/playground-boards.json': path.join(__dirname, 'src/assets/playground-boards.json'),
                '../../../../../breadboard/dist/src/data/common.js': path.join(rootDir, 'node_modules/@breadboard-ai/data/dist/src/common.js'),
            }
        }
    };
});
