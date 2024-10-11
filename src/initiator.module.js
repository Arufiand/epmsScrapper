function logger(page){
    // Capture browser console messages and log them
    page.on('console', msg => {
        console.log(`PAGE LOG: ${msg.text()}`);
    });

    // Log network requests
    page.on('request', request => {
        console.log(`Request made: ${request.url()}`);
    });

    // Log network responses
    page.on('response', response => {
        console.log(`Response received from: ${response.url()} with status: ${response.status()}`);
    });

    // Log any errors in the page
    page.on('error', error => {
        console.error(`Page error: ${error.message}`);
    });
}

async function puppeteerInitiator(page){
    await page.goto(process.env.URL);
    await page.setViewport({width: 1080, height: 1024});
    await page.type('input[name="username"]', process.env.USERNAME);
    await page.type('input[name="password"]', process.env.PASSWORD);
    await Promise.all([
        page.locator('button[type="submit"]').click(),
        page.waitForResponse(response => response.url().includes('/home') && response.status() === 200)
    ]);
    await page.waitForFunction(() => window.location.pathname === '/home', { timeout: 60000 });
}

module.exports = {
    logger,
    puppeteerInitiator
};