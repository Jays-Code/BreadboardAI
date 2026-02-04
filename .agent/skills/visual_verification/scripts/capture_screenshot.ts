
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';
import { statSync } from 'fs';

async function capture() {
    const args = process.argv.slice(2);
    const url = args[0] || 'http://localhost:5173';
    const outputPath = args[1] || '.agent/artifacts/screenshot.png';

    // Ensure output directory exists (basic check, relying on parent dirs usually existing)
    // Actually, we should probably assume the agent handles dir creation or use a known path.
    // We'll trust the provided path for now.

    const viewportArg = args[2];
    let width = 1280;
    let height = 720;

    if (viewportArg) {
        const [w, h] = viewportArg.split(',').map(Number);
        if (!isNaN(w) && !isNaN(h)) {
            width = w;
            height = h;
        }
    }

    console.log(`Navigating to ${url}... with viewport ${width}x${height}`);

    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
        // Set a reasonable viewport for desktop validation
        await page.setViewportSize({ width, height });

        await page.goto(url, { waitUntil: 'load', timeout: 60000 });

        // Add a small delay to ensure animations or framework hydration settle
        // We'll skip secondary networkidle to avoid heartbeat timeouts
        await page.waitForTimeout(1000);
        await page.waitForSelector('bb-main', { state: 'attached', timeout: 10000 }).catch(() => console.log("Warning: bb-main not found within timeout"));
        // Give it a moment to render content inside shadow root
        await page.waitForTimeout(2000);
        console.log(`Capturing screenshot to ${outputPath}...`);
        await page.screenshot({ path: outputPath, fullPage: false, timeout: 60000 });

        // ANALYZE: Check metadata to verify it's not blank
        const stats = statSync(outputPath);
        console.log(`Screenshot size: ${stats.size} bytes`);
        if (stats.size < 10000) {
            console.error("FAILURE: Screenshot is too small (<10KB). Likely a blank white screen.");
            process.exit(1);
        }

        console.log('Screenshot captured successfully.');
    } catch (error) {
        console.error('Error capturing screenshot:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

capture();
