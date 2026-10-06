import fs from 'fs';
import crypto from 'crypto';

const pilot1 = JSON.parse(fs.readFileSync('docs/cloudinary-pilot-migration.json', 'utf8'));
const pilot2 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-2-migration.json', 'utf8'));
const pilot3 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-3-migration.json', 'utf8'));
const pilot4 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-4-migration.json', 'utf8'));

const allPreviousAssets = [
  ...pilot1.migratedAssets,
  ...pilot2.migratedAssets,
  ...pilot3.migratedAssets,
  ...pilot4.migratedAssets
];

const previousHashes = new Map();
allPreviousAssets.forEach(a => {
  if (fs.existsSync(a.localPath)) {
    const buf = fs.readFileSync(a.localPath);
    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    previousHashes.set(hash, a);
  }
});

const batch5Candidates = [
  'public/images/gallery/nairuthya-02-stone-terraces.jpg',
  'public/images/gallery/nairuthya-03-plots-irrigation.jpg',
  'public/images/gallery/nairuthya-04-children-play.jpg',
  'public/images/gallery/nairuthya-05-elevated-vista.jpg',
  'public/images/gallery/nairuthya-06-outdoor-fitness.jpg',
  'public/images/landing/manage-02-crop.jpg',
  'public/images/landing/manage-03-cultivation.jpg',
  'public/images/landing/manage-04-care.jpg',
  'public/images/landing/manage-05-operations.jpg',
  'public/images/landing/philosophy-panorama.jpg',
  'public/images/landing/hero-villa-retreat.jpg',
  'public/images/landing/hero-farmland-estate.jpg',
  'public/images/landing/hero-landscape.jpg'
];

let duplicatesFound = 0;
batch5Candidates.forEach(cp => {
  const buf = fs.readFileSync(cp);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  if (previousHashes.has(hash)) {
    const existing = previousHashes.get(hash);
    console.log(`Duplicate found for ${cp} -> matches previously migrated ${existing.localPath} (${existing.publicId})`);
    duplicatesFound++;
  }
});

console.log(`Total duplicate matches against previously migrated assets: ${duplicatesFound}`);
