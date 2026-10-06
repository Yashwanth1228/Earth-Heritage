import fs from 'fs';
import path from 'path';

function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (/\.(js|jsx|ts|tsx|json|mjs|css|html)$/.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const prodDirs = ['data', 'components', 'app', 'lib'];
const prodFiles = prodDirs.flatMap(getFiles);

const targets = [
  'philosophy-farmland.jpg',
  'story-farmland.jpg',
  'hero-family-farmland.jpg',
  'hero-plantation-walk.jpg',
  'problem-land.jpg',
  'solution-management.jpg',
  'statement-landscape.jpg',
  'nairuthya-project-overview.png'
];

console.log('Auditing production files for remaining unmigrated references...');
let violations = 0;

prodFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  targets.forEach(target => {
    // Check if file references local path: /images/.../<target>
    const localRegex = new RegExp(`/images/[^"'\`\\s]*${target}`, 'g');
    const matches = content.match(localRegex);
    if (matches) {
      console.error(`VIOLATION in ${file}: references local path ${matches.join(', ')}`);
      violations++;
    }
  });
});

if (violations === 0) {
  console.log('✓ ZERO unmigrated local references to Batch 6 assets found in production code!');
} else {
  console.error(`✗ Found ${violations} local references that need updating.`);
  process.exit(1);
}
