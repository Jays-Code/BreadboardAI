import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function run() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const url = 'http://localhost:5173/#board/prompt-to-post';

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    console.log(`Navigating to ${url}...`);
    await page.goto(url);
    await page.waitForTimeout(3000); // Wait for load

    console.log('Filling in prompt...');
    await page.fill('input#input-input-0-topic', 'Verifying the Results Archive Feature');
    await page.fill('input#input-input-0-tone', 'Professional and helpful');

    console.log('Clicking Run Board...');
    await page.click('button#run-btn');

    console.log('Waiting for run to complete...');
    await page.waitForFunction(() => {
        const btn = document.querySelector('button#run-btn');
        return btn && btn.textContent === 'Run Board';
    }, { timeout: 45000 });

    console.log('Run complete. Waiting for history list to update...');
    await page.waitForTimeout(5000);

    console.log('Checking for history item...');
    const result = await page.evaluate(() => {
        const item = document.querySelector('.result-history-item');
        return item ? item.innerHTML : 'NOT_FOUND';
    });
    console.log('History Item HTML:', result);

    const screenshotPath = path.resolve(process.cwd(), '.agent/artifacts/final_debug_run.png');
    console.log(`Taking full-page screenshot: ${screenshotPath}`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    await browser.close();
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
