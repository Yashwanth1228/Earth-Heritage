const fs = require('fs');
const path = require('path');

const destDir = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

const copies = [
  { from: path.join(__dirname, 'inspect_mobile_hero_compact.png'), to: path.join(destDir, 'mobile_hero_compact.png') },
  { from: path.join(__dirname, 'stories_loaded_live.png'), to: path.join(destDir, 'mobile_stories_centered.png') },
  { from: path.join(__dirname, 'final_verified_events.png'), to: path.join(destDir, 'mobile_events_centered.png') }
];

for (const c of copies) {
  if (fs.existsSync(c.from)) {
    fs.copyFileSync(c.from, c.to);
    console.log('Copied to ' + c.to);
  } else {
    console.log('Source missing: ' + c.from);
  }
}
