import fs from 'fs';
import crypto from 'crypto';

const pilot1 = JSON.parse(fs.readFileSync('docs/cloudinary-pilot-migration.json', 'utf8'));
const pilot2 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-2-migration.json', 'utf8'));

const migratedPublicIds = new Set();
pilot1.migratedAssets.forEach(a => migratedPublicIds.add(a.publicId));
pilot2.migratedAssets.forEach(a => migratedPublicIds.add(a.publicId));

const batch3Candidates = [
  {
    localPath: 'public/images/projects/coconut-garden/boundary-plantation-wall.png',
    folder: 'earth-heritage/projects/coconut-garden',
    publicId: 'earth-heritage/projects/coconut-garden/boundary-plantation-wall',
    isCanonical: true
  },
  {
    localPath: 'public/images/projects/coconut-garden/plot-demarcation-10.jpg',
    folder: 'earth-heritage/projects/coconut-garden',
    publicId: 'earth-heritage/projects/coconut-garden/plot-demarcation-10',
    isCanonical: true
  },
  {
    localPath: 'public/images/projects/coconut-garden/farm-landscape-groves.jpg',
    folder: 'earth-heritage/projects/coconut-garden',
    publicId: 'earth-heritage/projects/coconut-garden/farm-landscape-groves',
    isCanonical: true
  },
  {
    localPath: 'public/images/plantations/coconut.jpg',
    folder: 'earth-heritage/plantations',
    publicId: 'earth-heritage/plantations/coconut',
    isCanonical: true
  },
  {
    localPath: 'public/images/plantations/areca-nut.jpg',
    folder: 'earth-heritage/plantations',
    publicId: 'earth-heritage/plantations/areca-nut',
    isCanonical: true
  },
  {
    localPath: 'public/images/plantations/seasonal-fruits.jpg',
    folder: 'earth-heritage/plantations',
    publicId: 'earth-heritage/plantations/seasonal-fruits',
    isCanonical: true
  },
  {
    localPath: 'public/images/plantations/teak-wood.jpg',
    folder: 'earth-heritage/plantations',
    publicId: 'earth-heritage/plantations/teak-wood',
    isCanonical: true
  },
  {
    localPath: 'public/images/gallery/hero-feature.jpg',
    folder: 'earth-heritage/gallery',
    publicId: 'earth-heritage/gallery/hero-feature',
    isCanonical: true,
    duplicateGroup: 'Group 8',
    duplicatePaths: ['public/images/how-it-works/stage-01-understand.jpg']
  },
  {
    localPath: 'public/images/how-it-works/stage-01-understand.jpg',
    folder: 'earth-heritage/gallery',
    publicId: 'earth-heritage/gallery/hero-feature',
    isCanonical: false,
    canonicalTarget: 'public/images/gallery/hero-feature.jpg',
    duplicateGroup: 'Group 8'
  },
  {
    localPath: 'public/images/gallery/cultivation-detail.jpg',
    folder: 'earth-heritage/gallery',
    publicId: 'earth-heritage/gallery/cultivation-detail',
    isCanonical: true,
    duplicateGroup: 'Group 7',
    duplicatePaths: ['public/images/how-it-works/stage-04-cultivate.jpg']
  },
  {
    localPath: 'public/images/how-it-works/stage-04-cultivate.jpg',
    folder: 'earth-heritage/gallery',
    publicId: 'earth-heritage/gallery/cultivation-detail',
    isCanonical: false,
    canonicalTarget: 'public/images/gallery/cultivation-detail.jpg',
    duplicateGroup: 'Group 7'
  },
  {
    localPath: 'public/images/amenities/children-play-area.jpg',
    folder: 'earth-heritage/amenities',
    publicId: 'earth-heritage/amenities/children-play-area',
    isCanonical: true
  },
  {
    localPath: 'public/images/amenities/cottages.jpg',
    folder: 'earth-heritage/amenities',
    publicId: 'earth-heritage/amenities/cottages',
    isCanonical: true
  },
  {
    localPath: 'public/images/amenities/yoga-meditation.jpg',
    folder: 'earth-heritage/amenities',
    publicId: 'earth-heritage/amenities/yoga-meditation',
    isCanonical: true
  },
  {
    localPath: 'public/images/how-it-works/responsible-care-panorama.jpg',
    folder: 'earth-heritage/how-it-works',
    publicId: 'earth-heritage/how-it-works/responsible-care-panorama',
    isCanonical: true
  },
  {
    localPath: 'public/images/landing/manage-06-harvest.jpg',
    folder: 'earth-heritage/landing',
    publicId: 'earth-heritage/landing/manage-06-harvest',
    isCanonical: true,
    duplicateGroup: 'Group 11',
    duplicatePaths: ['public/images/how-it-works/stage-05-harvest.jpg']
  },
  {
    localPath: 'public/images/how-it-works/stage-05-harvest.jpg',
    folder: 'earth-heritage/landing',
    publicId: 'earth-heritage/landing/manage-06-harvest',
    isCanonical: false,
    canonicalTarget: 'public/images/landing/manage-06-harvest.jpg',
    duplicateGroup: 'Group 11'
  }
];

console.log('Batch 3 candidate items count:', batch3Candidates.length);
const canonicalCount = batch3Candidates.filter(c => c.isCanonical).length;
console.log('Canonical uploads count:', canonicalCount);

// Check if any public ID collides with already migrated assets
batch3Candidates.forEach(c => {
  if (migratedPublicIds.has(c.publicId)) {
    console.error(`COLLISION! Public ID ${c.publicId} already exists in Pilot or Batch 2!`);
  }
  if (!fs.existsSync(c.localPath)) {
    console.error(`MISSING FILE: ${c.localPath}`);
  }
});

// Calculate file sizes
let totalBytes = 0;
batch3Candidates.filter(c => c.isCanonical).forEach(c => {
  const stat = fs.statSync(c.localPath);
  totalBytes += stat.size;
  console.log(`${c.localPath}: ${(stat.size / 1024).toFixed(1)} KB`);
});
console.log(`\nTotal canonical file size: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
