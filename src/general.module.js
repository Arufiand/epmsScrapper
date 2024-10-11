const writeXlsxFile = require('write-excel-file/node')
const path = require('path');
const {counterDivider} = require("./counter.module");

// Define jsonArray outside the function to store data across multiple calls
let jsonArray = [];

function dateCreator() {
    const now = new Date();
    return [
        ('0' + (now.getMonth() + 1)).slice(-2), // Month (MM)
        ('0' + now.getDate()).slice(-2),        // Day (DD)
        now.getFullYear()                       // Year (YYYY)
    ].join('/');
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function jsonGenerator(data) {
    jsonArray.push(data);  // Add new data to the existing array
}

// Export the jsonArray so you can access it from other files if needed
function getJsonArray() {
    return jsonArray;
}

async function jsonFormatter(page,name){
    const infoSelector = 'div.dataTables_info';
    await page.waitForSelector(infoSelector, { timeout: 60000 });

    const tableInfo = await page.evaluate(() => {
        const infoDiv = document.querySelector('div.dataTables_info');
        return infoDiv ? infoDiv.innerText.trim() : null;
    });
    console.log(`tableInfo ${tableInfo}`);
    let array = tableInfo.split(' ');
    if (tableInfo) {
        let dividedCounters = counterDivider(array[5]);
        let json =             {
            "name" : name,
            "Wilayah1" : parseInt(dividedCounters[0]),
            "Wilayah2" : parseInt(dividedCounters[1]),
            "Wilayah3" : parseInt(dividedCounters[2]),
        }

        await jsonGenerator(json);
        console.log(JSON.stringify(json, null, 2));
    } else {
        console.log("No pagination info found.");
    }
}

// Function to write data to an Excel file
async function saveToExcel() {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    const filePath = path.join('/epmsScrapper/data', `daily_report_${formattedDate}.xlsx`);
    const objects = jsonArray;
    const schema = [
        {
            column: 'Name',
            type: String,
            value: dailyReport => dailyReport.name
        },
        {
            column: 'Wilayah 1',
            type: Number,
            // format: 'mm/dd/yyyy',
            value: dailyReport => dailyReport.Wilayah1
        },
        {
            column: 'Wilayah 2',
            type: Number,
            // format: '#,##0.00',
            value: dailyReport => dailyReport.Wilayah2
        },
        {
            column: 'Wilayah 3',
            type: Number,
            value: dailyReport => dailyReport.Wilayah3
        }
    ]
    try {
        // fs.writeFileSync(filePath.replace('.xlsx', '.txt'), 'Test data 2');
        await writeXlsxFile(objects, {
            schema,
            filePath: filePath
        })
        console.log('Text file written successfully.');
    } catch (error) {
        console.error(`Error writing text file: ${error}`);
    }
}


// Export the functions using module.exports
module.exports = {
    dateCreator,
    jsonGenerator,
    getJsonArray,
    saveToExcel,
    jsonFormatter,
    delay
};
