import fs from 'fs';
import path from 'path';

const candidatePaths = [
  'public/images/projects/coconut-garden/boundary-plantation-wall.png',
  'public/images/projects/coconut-garden/plot-demarcation-10.jpg',
  'public/images/projects/coconut-garden/farm-landscape-groves.jpg',
  'public/images/plantations/coconut.jpg',
  'public/images/plantations/areca-nut.jpg',
  'public/images/plantations/seasonal-fruits.jpg',
  'public/images/plantations/teak-wood.jpg',
  'public/images/gallery/hero-feature.jpg',
  'public/images/how-it-works/stage-01-understand.jpg',
  'public/images/gallery/cultivation-detail.jpg',
  'public/images/how-it-works/stage-04-cultivate.jpg',
  'public/images/amenities/children-play-area.jpg',
  'public/images/amenities/cottages.jpg',
  'public/images/amenities/yoga-meditation.jpg',
  'public/images/how-it-works/responsible-care-panorama.jpg',
  'public/images/landing/manage-06-harvest.jpg',
  'public/images/how-it-works/stage-05-harvest.jpg'
];

// Convert to web paths (/images/...)
const webPaths = candidatePaths.map(p => p.replace(/^public/, ''));

// Scan all js, jsx, mjs, json files in app/, components/, data/
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.mjs') || file.endsWith('.json')) {
      results.push(fullPath);
    }
  });
  return results;
}

const allFiles = [...getFiles('data'), ...getFiles('components'), ...getFiles('app')];

const usages = {};
candidatePaths.forEach((cp, idx) => {
  const wp = webPaths[idx];
  usages[wp] = [];
  allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(wp)) {
      usages[wp].push(file.replace(/\\/g, '/'));
    }
  });
});

console.log('--- USAGE LOCATIONS FOR CANDIDATES ---');
for (const [wp, files] of Object.entries(usages)) {
  console.log(`\n${wp}: (${files.length} references)`);
  files.forEach(f => console.log(`   - ${f}`));
}
