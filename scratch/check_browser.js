const { execSync } = require('child_process');
const fs = require('fs');

const possiblePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    console.log('Found browser:', p);
    break;
  }
}
