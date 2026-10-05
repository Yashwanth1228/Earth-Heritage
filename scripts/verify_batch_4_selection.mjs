import fs from 'fs';
import crypto from 'crypto';

const manifest = JSON.parse(fs.readFileSync('docs/cloudinary-migration-manifest.json', 'utf8'));
const pilot1 = JSON.parse(fs.readFileSync('docs/cloudinary-pilot-migration.json', 'utf8'));
const pilot2 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-2-migration.json', 'utf8'));
const pilot3 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-3-migration.json', 'utf8'));

const existingMigratedPaths = new Set();
const existingPublicIds = new Set();

[...pilot1.migratedAssets, ...pilot2.migratedAssets, ...pilot3.migratedAssets].forEach(a => {
  existingMigratedPaths.add(a.localPath);
  existingPublicIds.add(a.publicId);
});

const batch4Selection = [
  {
    localPath: 'public/images/amenities/camping-area.jpg',
    folder: 'earth-heritage/amenities',
    publicId: 'camping-area'
  },
  {
    localPath: 'public/images/amenities/pond-area.jpg',
    folder: 'earth-heritage/amenities',
    publicId: 'pond-area'
  },
  {
    localPath: 'public/images/amenities/jogging-track.jpg',
    folder: 'earth-heritage/amenities',
    publicId: 'jogging-track'
  },
  {
    localPath: 'public/images/amenities/swimming-pool.jpg',
    folder: 'earth-heritage/amenities',
    publicId: 'swimming-pool'
  },
  {
    localPath: 'public/images/amenities/multi-court.jpg',
    folder: 'earth-heritage/amenities',
    publicId: 'multi-court'
  },
  {
    localPath: 'public/images/amenities/viewpoint.jpg',
    folder: 'earth-heritage/amenities',
    publicId: 'viewpoint'
  },
  {
    localPath: 'public/images/amenities/indoor-games.jpg',
    folder: 'earth-heritage/amenities',
    publicId: 'indoor-games'
  },
  {
    localPath: 'public/images/farm-management/responsible-care.jpg',
    folder: 'earth-heritage/farm-management',
    publicId: 'responsible-care'
  },
  {
    localPath: 'public/images/farm-management/intro-farm-management.jpg',
    folder: 'earth-heritage/farm-management',
    publicId: 'intro-farm-management'
  },
  {
    localPath: 'public/images/managed-farmland/nature-responsibility.jpg',
    folder: 'earth-heritage/managed-farmland',
    publicId: 'nature-responsibility'
  },
  {
    localPath: 'public/images/managed-farmland/core-proposition.jpg',
    folder: 'earth-heritage/managed-farmland',
    publicId: 'core-proposition'
  },
  {
    localPath: 'public/images/about/intro-farmland.jpg',
    folder: 'earth-heritage/about',
    publicId: 'intro-farmland'
  },
  {
    localPath: 'public/images/landing/principles-land.jpg',
    folder: 'earth-heritage/landing',
    publicId: 'principles-land'
  },
  {
    localPath: 'public/images/landing/hero-managed-crops.jpg',
    folder: 'earth-heritage/landing',
    publicId: 'hero-managed-crops'
  }
];

console.log(`Checking ${batch4Selection.length} selected candidates for Batch 4...\n`);

let collisionsFound = 0;
let totalBytes = 0;

for (const item of batch4Selection) {
  const fullPublicId = `${item.folder}/${item.publicId}`;
  const fileExists = fs.existsSync(item.localPath);
  const alreadyMigrated = existingMigratedPaths.has(item.localPath);
  const publicIdExists = existingPublicIds.has(fullPublicId);

  const buffer = fs.readFileSync(item.localPath);
  const hash = crypto.createHash('sha256').update(buffer).digest('hex');
  totalBytes += buffer.length;

  console.log(`[${fileExists ? 'EXISTS' : 'MISSING'}] ${item.localPath}`);
  console.log(`  Folder/PublicId: ${fullPublicId}`);
  console.log(`  Size: ${(buffer.length / 1024).toFixed(1)} KB | SHA-256: ${hash.substring(0, 12)}...`);

  if (alreadyMigrated) {
    console.error(`  ERROR: Asset already migrated!`);
    collisionsFound++;
  }
  if (publicIdExists) {
    console.error(`  ERROR: Public ID collision with ${fullPublicId}!`);
    collisionsFound++;
  }
}

console.log(`\nTotal canonical assets: ${batch4Selection.length}`);
console.log(`Total original bytes: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`Collisions or issues: ${collisionsFound}`);
