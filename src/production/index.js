const {dateCreator, jsonGenerator, jsonFormatter} = require("../general.module");

async function plantingDailyReportFetcher(page) {
    await page.goto(`${process.env.URL}planting/adminstaff/dailyreport`, { waitUntil: 'networkidle0' });

    const formattedDate = dateCreator();
    await page.type('input[name="filter_date_start"]', formattedDate);
    await page.type('input[name="filter_date_end"]', formattedDate);

    await Promise.all([
        page.locator('button[type="submit"]').click(),
        page.waitForResponse(response => response.ok() && response.url().includes('/planting/adminstaff/dailyreport')) // Adjust this URL as needed
    ]);
    await jsonFormatter(page, process.env.DAILY_REPORT_PLANTING)
}
module.exports ={
    plantingDailyReportFetcher,
}