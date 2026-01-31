
import { chromium } from '@playwright/test';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    page.on('response', response => {
        console.log(`${response.status()} ${response.url()}`);
    });

    try {
        await page.goto('http://localhost:5173/?board=/src/graphs/prompt-to-post.ts', { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
    } catch (e) {
        console.log("Navigation failed:", e);
    }

    await browser.close();
})();
