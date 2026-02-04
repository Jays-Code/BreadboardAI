async function run() {
    try {
        console.log('[Main] Starting Breadboard Viewer...');

        // Import the viewer component
        await import('./breadboard-viewer.ts');
        console.log('[Main] Breadboard viewer imported');

        // Create and append the viewer
        const viewer = document.createElement('breadboard-viewer');
        document.body.appendChild(viewer);
        console.log('[Main] Breadboard viewer attached - SUCCESS!');
    } catch (e) {
        console.error('[Main] Error during startup:', e);

        // Show error on page
        document.body.innerHTML = `
            <div style="padding: 40px; font-family: monospace; background: #fee; color: #800;">
                <h1>❌ Startup Error</h1>
                <pre>${e}</pre>
            </div>
        `;
    }
}

run();
