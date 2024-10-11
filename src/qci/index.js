const {dateCreator, jsonFormatter, delay} = require("../general.module");

async function qciFetcher(page, URL, REPORT){
    await page.goto(`${process.env.URL}${URL}`, { waitUntil: 'networkidle0' });
    const formattedDate = dateCreator();
    await page.type('input[id="date_from"]', formattedDate);
    await page.type('input[id="date_to"]', formattedDate);

    await Promise.all([
        page.click(`text=Load`),
        page.waitForResponse(response => response.ok()) // Adjust this URL as needed
    ]);
    await jsonFormatter(page, REPORT)
}

async function masterQciFetch(page) {
    await qciFetcher(page, process.env.DAILY_REPORT_QCI_PPT_URL,process.env.DAILY_REPORT_QCI_PPT);
    await delay(500); // Wait for 5 seconds
    await qciFetcher(page, process.env.DAILY_REPORT_QCI_PPTS_URL,process.env.DAILY_REPORT_QCI_PPTS);
}
module.exports ={
    masterQciFetch,
}