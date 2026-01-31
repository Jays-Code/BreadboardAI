
import { chromium } from '@playwright/test';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err));
    page.on('requestfailed', request => {
        console.log('FAILED REQUEST:', request.url(), request.failure()?.errorText);
    });
    page.on('request', request => {
        if (request.url().includes('locales') || request.url().includes('.json')) {
            // console.log('REQUEST:', request.url());
        }
    });
    page.on('response', response => {
        if (response.status() >= 400) {
            console.log('FAILED RESPONSE:', response.status(), response.url());
        }
    });

    try {
        console.log("Navigating...");
        await page.goto('http://localhost:5173/?board=/src/graphs/prompt-to-post.ts', { waitUntil: 'networkidle' });
        console.log("Navigation complete.");

        await page.waitForTimeout(2000);

        const html = await page.evaluate(() => document.body.innerHTML);
        console.log("BODY CONTENT SNIPPET:", html.trim().substring(0, 500));

    } catch (e) {
        console.log("Navigation failed:", e);
    }

    await browser.close();
})();
