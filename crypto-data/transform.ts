//@ts-ignore
import fs from 'fs'; // File system access
import dataImported from './btc-daily.json'; // Sample JSON data

// Sample JSON data
const data: (string | number)[][] = dataImported;

// Define CSV columns
const columns: string[] = ['Date', 'Time', 'Open', 'High', 'Low', 'Close'];

function convertTimestamp(timestamp: number): string {
    //@ts-ignore
    console.log('timestamp:', timestamp);
    // Divide by 1000 to convert milliseconds to seconds
    return new Date(timestamp).toISOString().slice(0, 10); // YYYY-MM-DD
}

// Create CSV file
const csvContent = data
    .map((item) => {
        const date = convertTimestamp(item[0] as number);
        const row = [date, '00:00', item[1], item[2], item[3], item[4]];
        return row.join(',');
    })
    .join('\n');

fs.writeFileSync(
    './crypto-data/btc-daily.csv',
    `${columns.join(',')}\n${csvContent}`
);

// to run this file
//  yarn ts-node --compilerOptions '{"resolveJsonModule": true, "lib": ["esnext"]}' ./crypto-data/transform.ts
