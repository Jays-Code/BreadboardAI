
import { chromium } from '@playwright/test';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 720 });

    // Go to game
    await page.goto('http://localhost:5173/game');

    // Wait for board to load
    await page.waitForSelector('[data-testid="game-board"]');

    // Click Force Win
    console.log('Clicking Force Win...');
    await page.click('[data-testid="force-win-btn"]');

    // Wait for animation
    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({ path: '.agent/artifacts/verification_win_beam.png' });
    console.log('Screenshot captured.');

    await browser.close();
})();
