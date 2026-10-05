import fs from 'fs';
import path from 'path';

const candidatePaths = [
  'public/images/amenities/camping-area.jpg',
  'public/images/amenities/pond-area.jpg',
  'public/images/amenities/jogging-track.jpg',
  'public/images/amenities/swimming-pool.jpg',
  'public/images/amenities/multi-court.jpg',
  'public/images/amenities/viewpoint.jpg',
  'public/images/amenities/indoor-games.jpg',
  'public/images/farm-management/responsible-care.jpg',
  'public/images/farm-management/intro-farm-management.jpg',
  'public/images/managed-farmland/nature-responsibility.jpg',
  'public/images/managed-farmland/core-proposition.jpg',
  'public/images/about/intro-farmland.jpg',
  'public/images/landing/principles-land.jpg',
  'public/images/landing/hero-managed-crops.jpg'
];

const webPaths = candidatePaths.map(p => p.replace(/^public/, ''));

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
webPaths.forEach((wp, idx) => {
  usages[wp] = [];
  allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(wp)) {
      usages[wp].push(file.replace(/\\/g, '/'));
    }
  });
});

console.log('--- USAGE LOCATIONS FOR BATCH 4 CANDIDATES ---');
for (const [wp, files] of Object.entries(usages)) {
  console.log(`\n${wp}: (${files.length} references)`);
  files.forEach(f => console.log(`   - ${f}`));
}
