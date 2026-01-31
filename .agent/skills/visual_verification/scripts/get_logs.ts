
import { chromium } from '@playwright/test';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err));
    page.on('requestfailed', request => {
        console.log('FAILED REQUEST:', request.url(), request.failure()?.errorText);
    });

    const url = process.argv[2] || 'http://localhost:5173/?board=/src/graphs/prompt-to-post.ts';
    try {
        console.log(`Navigating to ${url}...`);
        await page.goto(url, { waitUntil: 'load', timeout: 60000 });
        console.log("Navigation complete.");

        const html = await page.evaluate(() => document.body.innerHTML);
        console.log("BODY CONTENT:", html.trim() ? html.substring(0, 500) : "[EMPTY]");

        // Also check if the JS file loaded
        const scripts = await page.evaluate(() => Array.from(document.querySelectorAll('script[src]')).map(s => s.src));
        console.log("SCRIPTS:", scripts);

    } catch (e) {
        console.log("Navigation failed:", e);
    }

    await browser.close();
})();
