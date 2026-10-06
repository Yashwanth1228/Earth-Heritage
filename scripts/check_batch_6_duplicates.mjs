import fs from 'fs';
import crypto from 'crypto';

const pilot1 = JSON.parse(fs.readFileSync('docs/cloudinary-pilot-migration.json', 'utf8'));
const pilot2 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-2-migration.json', 'utf8'));
const pilot3 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-3-migration.json', 'utf8'));
const pilot4 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-4-migration.json', 'utf8'));
const pilot5 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-5-migration.json', 'utf8'));

const allPreviousAssets = [
  ...pilot1.migratedAssets,
  ...pilot2.migratedAssets,
  ...pilot3.migratedAssets,
  ...pilot4.migratedAssets,
  ...pilot5.migratedAssets
];

const previousHashes = new Map();
allPreviousAssets.forEach(a => {
  if (fs.existsSync(a.localPath)) {
    const buf = fs.readFileSync(a.localPath);
    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    previousHashes.set(hash, a);
  }
});

const batch6Candidates = [
  'public/images/about/philosophy-farmland.jpg',
  'public/images/about/story-farmland.jpg',
  'public/images/landing/hero-family-farmland.jpg',
  'public/images/landing/hero-plantation-walk.jpg',
  'public/images/landing/problem-land.jpg',
  'public/images/landing/solution-management.jpg',
  'public/images/landing/statement-landscape.jpg',
  'public/images/projects/nairuthya-project-overview.png'
];

console.log(`Checking ${batch6Candidates.length} Batch 6 candidates for duplicates...\n`);

let duplicatesFound = 0;
const batch6Hashes = new Map();

batch6Candidates.forEach(cp => {
  if (!fs.existsSync(cp)) {
    console.error(`ERROR: File does not exist: ${cp}`);
    return;
  }
  const buf = fs.readFileSync(cp);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  
  if (previousHashes.has(hash)) {
    const existing = previousHashes.get(hash);
    console.log(`Duplicate found for ${cp} -> matches previously migrated ${existing.localPath} (${existing.publicId})`);
    duplicatesFound++;
  } else {
    console.log(`Unique against previous batches: ${cp} (${hash.substring(0, 16)}...)`);
  }

  if (batch6Hashes.has(hash)) {
    console.log(`DUPLICATE WITHIN BATCH 6: ${cp} matches ${batch6Hashes.get(hash)}`);
    duplicatesFound++;
  } else {
    batch6Hashes.set(hash, cp);
  }
});

console.log(`\nTotal duplicate matches: ${duplicatesFound}`);
