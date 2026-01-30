
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';

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

        await page.goto(url, { waitUntil: 'networkidle' });

        // Add a small delay to ensure animations or framework hydration settle
        await page.waitForTimeout(1000);

        console.log(`Capturing screenshot to ${outputPath}...`);
        await page.screenshot({ path: outputPath, fullPage: false });

        console.log('Screenshot captured successfully.');
    } catch (error) {
        console.error('Error capturing screenshot:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

capture();
