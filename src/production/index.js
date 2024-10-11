const {dateCreator, jsonFormatter, delay} = require("../general.module");

async function productionFetcher(page, URL, REPORT, doubleDate, filterStartDate, filterEndDate, submitButton) {
    await page.goto(`${process.env.URL}${URL}`, { waitUntil: 'networkidle0' });

    const formattedDate = dateCreator();
    await page.type(`input[id="${filterStartDate}"]`, formattedDate);
    doubleDate ? page.type(`input[id="${filterEndDate}"]`, formattedDate) : null

    if(URL === "production/adminstaff/closing_jurnal"){
        await Promise.all([
            await page.locator(`text=${submitButton}`).click(),
        ])
    }

    else{
        await Promise.all([
            await page.click(`text=${submitButton}`),
        ]);
    }
    await page.waitForResponse(response => response.ok()) // Adjust this URL as needed
    await jsonFormatter(page, REPORT);
}

async function masterProductionFetch(page) {
    await productionFetcher(page, process.env.DAILY_REPORT_PRODUCTION_DAILY_REPORT_URL,process.env.DAILY_REPORT_PRODUCTION_DAILY_REPORT, false, "filterStartDate", "", "Submit" );
    await delay(500); // Wait for 5 seconds
    await productionFetcher(page, process.env.DAILY_REPORT_PRODUCTION_PENGUKURAN_KAYU_URL,process.env.DAILY_REPORT_PRODUCTION_PENGUKURAN_KAYU, false, "filterStartDate", "", "Submit" );
    await delay(500); // Wait for 5 seconds
    await productionFetcher(page, process.env.DAILY_REPORT_PRODUCTION_INTERNAL_AUDIT_URL,process.env.DAILY_REPORT_PRODUCTION_INTERNAL_AUDIT, false, "filterStartDate", "", "Submit" );
    await delay(500);
    await productionFetcher(page, process.env.DAILY_REPORT_PRODUCTION_DELIVERY_URL,  process.env.DAILY_REPORT_PRODUCTION_DELIVERY, true, "date_from", "date_to", "Load");
    await delay(500); // Wait for 5 seconds
    await productionFetcher(page, process.env.DAILY_REPORT_PRODUCTION_JURNAL_ALAT_BERAT_URL,process.env.DAILY_REPORT_PRODUCTION_JURNAL_ALAT_BERAT, true, "startdate", "enddate", "Submit" );
}
module.exports ={
    masterProductionFetch,
}