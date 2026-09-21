const fs = require('fs');
const path = require('path');

const destDir = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

const copies = [
  { from: path.join(__dirname, 'hero_top_logo_initial.png'), to: path.join(destDir, 'hero_top_logo_initial.png') },
  { from: path.join(__dirname, 'hero_scrolled_navbar_logo.png'), to: path.join(destDir, 'hero_scrolled_navbar_logo.png') }
];

for (const c of copies) {
  if (fs.existsSync(c.from)) {
    fs.copyFileSync(c.from, c.to);
    console.log('Copied to ' + c.to);
  }
}
