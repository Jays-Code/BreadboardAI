import { chromium } from 'playwright';

async function run() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    console.log('Navigating to http://localhost:5174...');
    await page.goto('http://localhost:5174');

    console.log('Waiting for BB-MAIN component...');
    await page.waitForFunction(() => {
        const main = document.querySelector('bb-main');
        return main && main.shadowRoot;
    });

    // Extract board servers from bb-project-listing
    const boardData = await page.evaluate(async () => {
        const main = document.querySelector('bb-main');
        if (!main || !main.shadowRoot) return { error: 'No bb-main or shadowRoot' };

        const projectListing = main.shadowRoot.querySelector('bb-project-listing');
        if (!projectListing) return { error: 'No bb-project-listing' };

        // @ts-ignore
        const servers = projectListing.boardServers || [];
        return {
            serverCount: servers.length,
            servers: servers.map((s: any) => ({
                name: s.name,
                url: s.url?.href,
                itemsCount: s.items ? Array.from(s.items().values()).length : 0,
                // Don't expand all items to avoid huge output, just names
                itemNames: s.items ? Array.from(s.items().values()).map(([name]: [string, any]) => name) : []
            }))
        };
    });

    console.log('Board Data:', JSON.stringify(boardData, null, 2));

    await browser.close();
}

run().catch(console.error);
