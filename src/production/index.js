const {dateCreator} = require("../general.module");
const {counterDivider} = require("../counter.module");

async function plantingDailyReportFetcher(page) {
    await page.goto(`${process.env.URL}planting/adminstaff/dailyreport`, { waitUntil: 'networkidle0' });

    console.log("Navigated to the daily report page.");

    const formattedDate = dateCreator();
    await page.type('input[name="filter_date_start"]', formattedDate);
    await page.type('input[name="filter_date_end"]', formattedDate);

    await Promise.all([
        page.locator('button[type="submit"]').click(),
        page.waitForResponse(response => response.ok() && response.url().includes('/planting/adminstaff/dailyreport')) // Adjust this URL as needed
    ]);
    const infoSelector = 'div.dataTables_info';
    await page.waitForSelector(infoSelector, { timeout: 60000 });

    const tableInfo = await page.evaluate(() => {
        const infoDiv = document.querySelector('div.dataTables_info');
        return infoDiv ? infoDiv.innerText.trim() : null;
    });

    let array = tableInfo.split(' ');
    if (tableInfo) {
        console.log(`Pagination info: ${array[5]}`);
        counterDivider(array[5]);
    } else {
        console.log("No pagination info found.");
    }
}

module.exports ={
    plantingDailyReportFetcher,
}