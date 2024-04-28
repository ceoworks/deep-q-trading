//@ts-ignore
import fs from 'fs'; // File system access
import dataImported from './btc-4h.json'; // Sample JSON data

// Sample JSON data
const data: (string | number)[][] = dataImported;

// Define CSV columns
const columns: string[] = ['Date', 'Time', 'Open', 'High', 'Low', 'Close'];

function convertTimestamp(timestamp: number): string {
    // Divide by 1000 to convert milliseconds to seconds (assuming milliseconds)
    const date = new Date(timestamp);

    const year = date.getFullYear().toString().padStart(4, '0'); // Add leading zeros if needed
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Jan is 0, so +1 for correct month numbering
    const day = date.getDate().toString().padStart(2, '0');

    return `${month}/${day}/${year}`;
}
function convertTimestampToTime(timestamp: number): string {
    // Divide by 1000 to convert milliseconds to seconds
    const dateInSec = timestamp;
    const time = new Date(dateInSec).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC',
        hour12: false,
    });
    return time.replace('24', '00'); // HH:MM format
}

// Create CSV file
const csvContent = data
    .map((item) => {
        const date = convertTimestamp(item[0] as number);
        const row = [
            date,
            convertTimestampToTime(item[0] as number),
            item[1],
            item[2],
            item[3],
            item[4],
        ];
        return row.join(',');
    })
    .join('\n');

fs.writeFileSync(
    './crypto-data/btcHour.csv',
    `${columns.join(',')}\n${csvContent}`
);

// to run this file
//  yarn ts-node --compilerOptions '{"resolveJsonModule": true, "lib": ["esnext"]}' ./crypto-data/transform.ts
