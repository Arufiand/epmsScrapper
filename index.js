require('dotenv').config();
const puppeteer = require('puppeteer');
const {masterPlantingFetch} = require("./src/planting");
const {puppeteerInitiator, logger} = require("./src/initiator.module");
const {saveToExcel} = require("./src/general.module");
const {masterProductionFetch} = require("./src/production");

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        // args: ['--no-sandbox', '--disable-setuid-sandbox'] // if using HTTPS
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors', '--allow-insecure-localhost'],
        ignoreHTTPSErrors: true ,// Ensures Puppeteer ignores HTTPS-related errors
        executablePath: '/usr/bin/chromium',  // Use the installed Chromium
        headless: true,  // Run in headless mode
    });
    const page = await browser.newPage();
    await puppeteerInitiator(page);
    // logger(page);
    // await masterPlantingFetch(page);
    // await masterProductionFetch(page);
    // await masterQciFetch(page);
    await browser.close();

    await saveToExcel();
})();