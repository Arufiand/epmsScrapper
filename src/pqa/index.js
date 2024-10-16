const { dateCreator, jsonFormatter, delay } = require("../general.module");

async function pqaFetcher(page, URL, REPORT) {
    await page.goto(`${process.env.URL}${URL}`, { waitUntil: 'networkidle0' });

    // Ensure dateCreator returns a properly formatted date like 'YYYY-MM-DD'
    const formattedDate = dateCreator(); // Assuming it returns in 'YYYY-MM-DD' format

    // Directly set the values of date_from and date_to using evaluate
    await page.evaluate((formattedDate) => {
        document.querySelector('input[id="date_from"]').value = formattedDate;
        document.querySelector('input[id="date_to"]').value = formattedDate;
    }, formattedDate);

    // Wait for the date to be set and submit to be clicked
    await Promise.all([
        page.click(`text=Load`),
        page.waitForResponse(response => response.ok() && response.url().includes('/pqa/sectionhead/get_workplan')) // Adjust this URL as needed
    ]);

    // Add a short delay to ensure all data is loaded
    await delay(3000);

    // Process the result data
    await jsonFormatter(page, REPORT);
}

async function masterPqaFetch(page) {
    await pqaFetcher(page, process.env.DAILY_REPORT_PQA_RKH_URL, process.env.DAILY_REPORT_PQA_RKH);
    await delay(500); // Wait for half a second between fetches
    await pqaFetcher(page, process.env.DAILY_REPORT_PQA_TALLY_SHEET_URL, process.env.DAILY_REPORT_PQA_TALLY_SHEET);
}

module.exports = {
    masterPqaFetch,
};
