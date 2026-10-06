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
      if (!['node_modules', '.next', '.git', 'scratch'].includes(file)) {
        results = results.concat(getFiles(fullPath));
      }
    } else if (/\.(js|jsx|ts|tsx|json|mjs|html|css)$/.test(file)) {
      results.push(fullPath.replace(/\\/g, '/'));
    }
  });
  return results;
}

const prodFiles = ['app', 'components', 'data', 'config', 'lib'].flatMap(getFiles);

const oldIds = [
  'earth-heritage/projects/nairuthya-whispering-wood-hero',
  'earth-heritage/gallery/nairuthya-02-stone-terraces',
  'earth-heritage/gallery/nairuthya-03-plots-irrigation',
  'earth-heritage/gallery/nairuthya-04-children-play',
  'earth-heritage/gallery/nairuthya-05-elevated-vista',
  'earth-heritage/gallery/nairuthya-06-outdoor-fitness'
];

const newIds = [
  'earth-heritage/projects/nairuthya-whispering-wood/hero',
  'earth-heritage/projects/nairuthya-whispering-wood/stone-terraces',
  'earth-heritage/projects/nairuthya-whispering-wood/plots-irrigation',
  'earth-heritage/projects/nairuthya-whispering-wood/children-play',
  'earth-heritage/projects/nairuthya-whispering-wood/elevated-vista',
  'earth-heritage/projects/nairuthya-whispering-wood/outdoor-fitness'
];

console.log('=== PHASE 4: VERIFY APPLICATION REFERENCES ===\n');

// 1. Check for remaining references to OLD public IDs
let oldMatchesCount = 0;
oldIds.forEach(id => {
  prodFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(id)) {
      console.error(`✗ OLD ID REFERENCE FOUND: ${file} contains ${id}`);
      oldMatchesCount++;
    }
  });
});

if (oldMatchesCount === 0) {
  console.log('✓ Zero references to the 6 OLD public IDs in application code!\n');
} else {
  console.error(`✗ FAILED: ${oldMatchesCount} references to OLD IDs still exist!`);
  process.exit(1);
}

// 2. Check references to NEW public IDs
console.log('Verifying references to the 6 NEW public IDs:');
newIds.forEach(id => {
  const matches = [];
  prodFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(id)) {
      matches.push(file);
    }
  });
  console.log(`- ${id}: ${matches.length} file(s)`);
  matches.forEach(m => console.log(`    * ${m}`));
});

// 3. Check dormant asset nairuthya-project-overview
const dormantRefs = [];
prodFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('nairuthya-project-overview')) {
    dormantRefs.push(file);
  }
});
console.log(`\nDormant asset "nairuthya-project-overview" references: ${dormantRefs.length}`);
if (dormantRefs.length === 0) {
  console.log('✓ Confirmed: nairuthya-project-overview remains completely untouched and unreferenced.');
} else {
  console.error('✗ WARNING: nairuthya-project-overview was referenced unexpectedly!');
}

console.log('\nPhase 4 verification completed successfully!');
