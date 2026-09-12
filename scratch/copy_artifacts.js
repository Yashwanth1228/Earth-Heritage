const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c\\scratch';
const destDir = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

const files = [
  { from: 'shot_both_buttons_visible.png', to: 'screenshot_buttons_active.png' },
  { from: 'shot_modal_open.png', to: 'screenshot_enquiry_modal.png' },
  { from: 'mobile_390x844_iPhone12.png', to: 'screenshot_mobile_view.png' }
];

for (const f of files) {
  const src = path.join(srcDir, f.from);
  const dst = path.join(destDir, f.to);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`Copied ${f.from} -> ${f.to}`);
  } else {
    console.log(`Missing ${src}`);
  }
}
