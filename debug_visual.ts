import { chromium } from 'playwright';

async function run() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const logs: string[] = [];
    page.on('console', msg => {
        const text = msg.text();
        logs.push(`[Browser] ${msg.type()}: ${text}`);
    });

    page.on('pageerror', err => {
        logs.push(`[Page Error] ${err.message}`);
    });

    console.log('Navigating to http://localhost:5174...');
    try {
        await page.goto('http://localhost:5174', { waitUntil: 'domcontentloaded', timeout: 30000 });
        console.log('Page loaded. Waiting for bb-main...');

        await page.waitForSelector('bb-main', { timeout: 60000 });
        console.log('bb-main found. Waiting for initialization...');

        await new Promise(r => setTimeout(r, 10000));

        const boardData = await page.evaluate(() => {
            const main = document.querySelector('bb-main');
            if (!main || !main.shadowRoot) return { error: 'No bb-main or shadowRoot' };

            const ids = Array.from(main.shadowRoot.querySelectorAll('[id]')).map(el => el.id);
            const recentContainer = main.shadowRoot.querySelector('#recent-flows-container');
            const recentText = recentContainer ? recentContainer.innerText : null;

            const projectListing = main.shadowRoot.querySelector('bb-project-listing');
            // @ts-ignore
            const servers = projectListing ? (projectListing.boardServers || []) : [];
            const listingData = servers.map((srv: any) => {
                try {
                    const itemsMap = srv.items();
                    const allBoardNames = Array.from(itemsMap.values()).flatMap((v: any) => Array.from(v.items.keys()));
                    return { name: srv.name, boards: allBoardNames };
                } catch (e) {
                    // @ts-ignore
                    return { name: srv.name, error: e.message };
                }
            });

            return { ids, recentText, listingData };
        });

        console.log('Board Data:', JSON.stringify(boardData, null, 2));
        console.log('Logs captured during session:');
        logs.forEach(l => console.log(l));

        await page.screenshot({ path: 'debug_visual.png', fullPage: true });
        console.log('Screenshot saved to debug_visual.png');

    } catch (e) {
        console.error('Error during verification:', e);
        console.log('Logs captured during session:');
        logs.forEach(l => console.log(l));
    } finally {
        await browser.close();
    }
}

run().catch(console.error);
