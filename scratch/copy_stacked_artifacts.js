const fs = require('fs');
const path = require('path');

const destDir = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

const copies = [
  { from: path.join(__dirname, 'settled_slide1_stacked.png'), to: path.join(destDir, 'settled_slide1_stacked.png') },
  { from: path.join(__dirname, 'settled_slide3_stacked.png'), to: path.join(destDir, 'settled_slide3_stacked.png') }
];

for (const c of copies) {
  if (fs.existsSync(c.from)) {
    fs.copyFileSync(c.from, c.to);
    console.log('Copied to ' + c.to);
  }
}
