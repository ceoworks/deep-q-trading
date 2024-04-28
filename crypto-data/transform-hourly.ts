//@ts-ignore
import fs from 'fs'; // File system access
import dataImported from './btc-4h.json'; // Sample JSON data

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

function convertTimestampToTime(timestamp: number): string {
    // Divide by 1000 to convert milliseconds to seconds
    const dateInSec = timestamp;
    const time = new Date(dateInSec).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: "UTC",
      hour12: false
    });
    return time.replace("24", "00"); // HH:MM format
  }

// Create CSV file
const csvContent = data
    .map((item) => {
        const date = convertTimestamp(item[0] as number);
        const row = [date, convertTimestampToTime(item[0] as number), item[1], item[2], item[3], item[4]];
        return row.join(',');
    })
    .join('\n');

fs.writeFileSync(
    './crypto-data/btc-4h.csv',
    `${columns.join(',')}\n${csvContent}`
);

// to run this file
//  yarn ts-node --compilerOptions '{"resolveJsonModule": true, "lib": ["esnext"]}' ./crypto-data/transform.ts
