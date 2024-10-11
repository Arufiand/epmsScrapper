const {dateCreator, jsonFormatter, delay} = require("../general.module");

async function plantingFetcher(page, URL, REPORT){
    await page.goto(`${process.env.URL}${URL}`, { waitUntil: 'networkidle0' });
    const formattedDate = dateCreator();
    await page.type('input[name="filter_date_start"]', formattedDate);
    await page.type('input[name="filter_date_end"]', formattedDate);

    await Promise.all([
        page.locator('button[type="submit"]').click(),
        page.waitForResponse(response => response.ok() && response.url().includes(URL)) // Adjust this URL as needed
    ]);

    await jsonFormatter(page, REPORT)
}


async function masterPlantingFetch(page) {
    await plantingFetcher(page, process.env.DAILY_REPORT_PLANTING_DAILY_REPORT_URL,process.env.DAILY_REPORT_PLANTING_DAILY_REPORT );
    await delay(500); // Wait for 5 seconds
    await plantingFetcher(page, process.env.DAILY_REPORT_PLANTING_DAILY_REPORT_SPREADING_URL,process.env.DAILY_REPORT_PLANTING_DAILY_REPORT_SPREADING );
    await delay(500); // Wait for 5 seconds
    await plantingFetcher(page, process.env.DAILY_REPORT_PLANTING_DAILY_REPORT_AUDIT_URL,process.env.DAILY_REPORT_PLANTING_INTERNAL_AUDIT_PLANTING );
    await delay(500); // Wait for 5 seconds
    await plantingFetcher(page, process.env.DAILY_REPORT_PLANTING_AUDIT_PEMELIHARAAN_URL,process.env.DAILY_REPORT_PLANTING_AUDIT_PEMELIHARAAN );
    await delay(500); // Wait for 5 seconds
    await plantingFetcher(page, process.env.DAILY_REPORT_PLANTING_AUDIT_SPREADING_URL,process.env.DAILY_REPORT_PLANTING_AUDIT_SPREADING );
}


module.exports ={
    masterPlantingFetch
}