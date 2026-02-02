
import { chromium } from '@playwright/test';
import * as fs from 'fs';

(async () => {
    const url = process.argv[2] || 'http://localhost:5174/';
    const outFile = process.argv[3] || 'logs/runtime_logs.txt';
    const logs: string[] = [];

    const browser = await chromium.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
        const text = `PAGE LOG: ${msg.text()}`;
        console.log(text);
        logs.push(text);
    });
    page.on('pageerror', err => {
        const text = `PAGE ERROR: ${err}`;
        console.log(text);
        logs.push(text);
    });
    page.on('requestfailed', request => {
        const text = `FAILED REQUEST: ${request.url()} ${request.failure()?.errorText}`;
        console.log(text);
        logs.push(text);
    });

    try {
        console.log(`Navigating to ${url}...`);
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 180000 });
        console.log("Navigation complete.");

        // Wait for a few heartbeats
        await page.waitForTimeout(30000);
        const html = await page.evaluate(() => document.body.innerHTML);
        logs.push(`BODY CONTENT: ${html.trim()}`);

    } catch (e: any) {
        console.error('Navigation failed:', e.message);
        logs.push(`NAVIGATION FAILED: ${e.message}`);
    } finally {
        fs.writeFileSync(outFile, logs.join('\n'));
        await browser.close();
        console.log(`Logs saved to ${outFile}`);
    }
})();
