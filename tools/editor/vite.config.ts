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

const breadboardDiagnosticPlugin = (rootDir: string) => {
    return {
        name: 'breadboard-diagnostic',
        resolveId(id: string, _importer?: string) {
            if (id.includes('breadboard/dist/src/data/common.js')) {
                const target = path.join(rootDir, 'node_modules/@breadboard-ai/data/dist/src/common.js');
                console.log(`[Diagnostic] INTERCEPTED common.js resolution -> ${target}`);
                return target;
            }
            if (id.includes('sandbox.wasm')) {
                const target = path.join(rootDir, 'node_modules/@breadboard-ai/visual-editor/public/sandbox.wasm');
                console.log(`[Diagnostic] INTERCEPTED sandbox.wasm resolution -> ${target}`);
                return target;
            }
            return null;
        },
        load(id: string) {
            if (id.includes('main.ts')) {
                console.log(`[Diagnostic] LOADING main.ts`);
            }
            return null;
        },
        transform(_code: string, id: string) {
            if (id.includes('main.ts')) {
                console.log(`[Diagnostic] TRANSFORMING main.ts`);
            }
            return null;
        }
    };
};

export default defineConfig(async () => {
    let currentDir = __dirname;
    while (currentDir !== '/' && !fs.existsSync(path.join(currentDir, 'package.json')) || path.basename(currentDir) === 'editor') {
        currentDir = path.dirname(currentDir);
    }
    const rootDir = currentDir;
    console.log('[ViteConfig] __dirname:', __dirname);
    console.log('[ViteConfig] detected rootDir:', rootDir);

    const iconDir = path.join(rootDir, 'node_modules/@breadboard-ai/visual-editor/public/third_party/icons');
    console.log('[ViteConfig] iconDir:', iconDir);
    const assetPack = await getAssets(iconDir);

    return {
        root: '.',
        publicDir: 'public',
        define: {
            'MAIN_ICON': JSON.stringify(assetPack.mainIcon),
            'ASSET_PACK': JSON.stringify(assetPack.styles),
            'ASSET_PACK_ICONS': JSON.stringify(assetPack.assets),
            'GIT_HASH': JSON.stringify('local-fix'),
            'LANGUAGE_PACK': JSON.stringify('en-US')
        },
        assetsInclude: ['**/*.wasm'],
        plugins: [
            breadboardDiagnosticPlugin(rootDir)
        ],
        optimizeDeps: {
            include: [
                'lit',
                'lit/directives/ref.js',
                'lit/directives/until.js',
                'lit/directives/map.js',
                'lit/directives/class-map.js',
                'lit/directives/style-map.js',
                '@lit/context',
                'pixi.js',
                'eventemitter3',
                'markdown-it',
                'idb',
                'idb-keyval',
                'codemirror',
                '@codemirror/state',
                '@codemirror/view',
                '@codemirror/language',
                '@codemirror/commands',
                '@codemirror/autocomplete',
                'earcut',
                'jszip',
                'ajv',
                '@breadboard-ai/jsandbox'
            ],
            exclude: [
                '@google-labs/breadboard',
                '@google-labs/core-kit',
                '@breadboard-ai/google-drive-kit-manifest',
                'typescript'
            ],
            esbuildOptions: {
                target: 'esnext',
                plugins: [
                    {
                        name: 'sandbox-fix',
                        setup(build: any) {
                            build.onResolve({ filter: /^\/sandbox\.wasm/ }, (_args: any) => {
                                return { external: true };
                            });
                            build.onResolve({ filter: /breadboard\/dist\/src\/data\/common\.js/ }, (args: any) => {
                                const target = path.join(rootDir, 'node_modules/@breadboard-ai/data/dist/src/common.js');
                                console.log(`[Esbuild] Resolved ${args.path} -> ${target}`);
                                return { path: target };
                            });
                        }
                    }
                ]
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
            alias: [
                { find: /^@google-labs\/breadboard\/harness$/, replacement: path.join(rootDir, 'node_modules/@google-labs/breadboard/dist/harness.min.js') },
                { find: /^@google-labs\/breadboard\/kits$/, replacement: path.join(rootDir, 'node_modules/@google-labs/breadboard/dist/kits.min.js') },
                { find: /^@google-labs\/breadboard\/legacy\.js$/, replacement: path.join(rootDir, 'node_modules/@google-labs/breadboard/dist/src/legacy/index.js') },
                { find: /^@google-labs\/breadboard$/, replacement: path.join(__dirname, 'breadboard-proxy.ts') },
                { find: /^@google-labs\/core-kit$/, replacement: path.join(__dirname, 'core-kit-proxy.ts') },
                { find: /^@breadboard-ai\/visual-editor$/, replacement: path.join(rootDir, 'node_modules/@breadboard-ai/visual-editor/build/src/index.js') },
                { find: /^@breadboard-ai\/visual-editor\/(.*)$/, replacement: path.join(rootDir, 'node_modules/@breadboard-ai/visual-editor/$1') },
                { find: /^@breadboard-ai\/shared-ui$/, replacement: path.join(rootDir, 'node_modules/@breadboard-ai/shared-ui/dist/index.js') },
                { find: /^@breadboard-ai\/shared-ui\/(.*)$/, replacement: path.join(rootDir, 'node_modules/@breadboard-ai/shared-ui/dist/$1') },
                { find: '@breadboard-ai/google-drive-kit/google-drive.kit.json', replacement: path.resolve(__dirname, 'src/assets/google-drive.kit.json') },
                { find: '@google-labs/agent-kit/agent.kit.json', replacement: path.resolve(__dirname, 'src/assets/agent.kit.json') },
                { find: '@breadboard-ai/example-boards/examples-boards.json', replacement: path.resolve(__dirname, 'src/assets/shim-kit.json') },
                { find: '@breadboard-ai/example-boards/playground-boards.json', replacement: path.resolve(__dirname, 'src/assets/shim-kit.json') },
                { find: /utils\/kit-loader\.js$/, replacement: path.join(__dirname, 'kit-loader-proxy.ts') },
            ]
        }
    };
});
