
import { chromium } from '@playwright/test';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    await page.goto('http://localhost:5173/game');
    await page.waitForTimeout(2000);

    // No need to click force win, we hardcoded the beam at [0,0]

    await page.screenshot({ path: '.agent/artifacts/verification_debug_red.png' });
    await browser.close();
})();
