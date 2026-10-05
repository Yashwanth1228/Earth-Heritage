import fs from 'fs';

// 1. Load environment variables
process.loadEnvFile('.env.local');

// 2. Import server Cloudinary utility
const { uploadImageStream, isCloudinaryConfigured } = await import('../lib/cloudinary.js');

if (!isCloudinaryConfigured) {
  console.error('Error: Cloudinary is not configured. Check .env.local.');
  process.exit(1);
}

// 3. Define the 14 canonical Batch 4 assets
const batch4Assets = [
  {
    localPath: 'public/images/amenities/camping-area.jpg',
    canonicalPath: 'public/images/amenities/camping-area.jpg',
    cloudinaryFolder: 'earth-heritage/amenities',
    publicId: 'camping-area',
    category: 'amenities',
    reason: 'Camping area amenity visual (1.14 MB).',
    usageLocations: ['data/projects.js']
  },
  {
    localPath: 'public/images/amenities/pond-area.jpg',
    canonicalPath: 'public/images/amenities/pond-area.jpg',
    cloudinaryFolder: 'earth-heritage/amenities',
    publicId: 'pond-area',
    category: 'amenities',
    reason: 'Pond area amenity visual (1.14 MB).',
    usageLocations: ['data/projects.js']
  },
  {
    localPath: 'public/images/amenities/jogging-track.jpg',
    canonicalPath: 'public/images/amenities/jogging-track.jpg',
    cloudinaryFolder: 'earth-heritage/amenities',
    publicId: 'jogging-track',
    category: 'amenities',
    reason: 'Jogging track amenity visual (1.10 MB).',
    usageLocations: ['data/projects.js']
  },
  {
    localPath: 'public/images/amenities/swimming-pool.jpg',
    canonicalPath: 'public/images/amenities/swimming-pool.jpg',
    cloudinaryFolder: 'earth-heritage/amenities',
    publicId: 'swimming-pool',
    category: 'amenities',
    reason: 'Swimming pool amenity visual (1.09 MB).',
    usageLocations: ['data/projects.js']
  },
  {
    localPath: 'public/images/amenities/multi-court.jpg',
    canonicalPath: 'public/images/amenities/multi-court.jpg',
    cloudinaryFolder: 'earth-heritage/amenities',
    publicId: 'multi-court',
    category: 'amenities',
    reason: 'Multi-court sports amenity visual (1.05 MB).',
    usageLocations: ['data/projects.js']
  },
  {
    localPath: 'public/images/amenities/viewpoint.jpg',
    canonicalPath: 'public/images/amenities/viewpoint.jpg',
    cloudinaryFolder: 'earth-heritage/amenities',
    publicId: 'viewpoint',
    category: 'amenities',
    reason: 'Viewpoint scenic amenity visual (993.2 KB).',
    usageLocations: ['data/projects.js']
  },
  {
    localPath: 'public/images/amenities/indoor-games.jpg',
    canonicalPath: 'public/images/amenities/indoor-games.jpg',
    cloudinaryFolder: 'earth-heritage/amenities',
    publicId: 'indoor-games',
    category: 'amenities',
    reason: 'Indoor games clubhouse amenity visual (922.6 KB). Completes 100% of Amenities.',
    usageLocations: ['data/projects.js']
  },
  {
    localPath: 'public/images/farm-management/responsible-care.jpg',
    canonicalPath: 'public/images/farm-management/responsible-care.jpg',
    cloudinaryFolder: 'earth-heritage/farm-management',
    publicId: 'responsible-care',
    category: 'farm-management',
    reason: 'Farm management responsible stewardship visual (1.02 MB). Reused in 3 locations.',
    usageLocations: [
      'data/farmManagementImages.js',
      'data/projects.js',
      'components/sections/home/HomeStories.js'
    ]
  },
  {
    localPath: 'public/images/farm-management/intro-farm-management.jpg',
    canonicalPath: 'public/images/farm-management/intro-farm-management.jpg',
    cloudinaryFolder: 'earth-heritage/farm-management',
    publicId: 'intro-farm-management',
    category: 'farm-management',
    reason: 'Introductory farm management header visual (1.00 MB). Completes 100% of Farm Management.',
    usageLocations: ['data/farmManagementImages.js']
  },
  {
    localPath: 'public/images/managed-farmland/nature-responsibility.jpg',
    canonicalPath: 'public/images/managed-farmland/nature-responsibility.jpg',
    cloudinaryFolder: 'earth-heritage/managed-farmland',
    publicId: 'nature-responsibility',
    category: 'managed-farmland',
    reason: 'Managed farmland environmental responsibility visual (1.05 MB). Reused in 4 locations.',
    usageLocations: [
      'data/managedFarmlandImages.js',
      'data/projects.js',
      'components/projects/ProjectDetailGallery.js',
      'components/sections/home/HomeAbout.js'
    ]
  },
  {
    localPath: 'public/images/managed-farmland/core-proposition.jpg',
    canonicalPath: 'public/images/managed-farmland/core-proposition.jpg',
    cloudinaryFolder: 'earth-heritage/managed-farmland',
    publicId: 'core-proposition',
    category: 'managed-farmland',
    reason: 'Managed farmland core proposition visual (996.0 KB). Completes 100% of Managed Farmland.',
    usageLocations: [
      'data/managedFarmlandImages.js',
      'components/projects/ProjectDetailGallery.js',
      'components/sections/home/HomeStories.js'
    ]
  },
  {
    localPath: 'public/images/about/intro-farmland.jpg',
    canonicalPath: 'public/images/about/intro-farmland.jpg',
    cloudinaryFolder: 'earth-heritage/about',
    publicId: 'intro-farmland',
    category: 'about',
    reason: 'About page introductory farmland hero visual (1.02 MB). Resolves filename collision safely via folder isolation.',
    usageLocations: ['data/aboutImages.js']
  },
  {
    localPath: 'public/images/landing/principles-land.jpg',
    canonicalPath: 'public/images/landing/principles-land.jpg',
    cloudinaryFolder: 'earth-heritage/landing',
    publicId: 'principles-land',
    category: 'landing',
    reason: 'Landing page agrarian principles visual (1.10 MB).',
    usageLocations: ['data/landingImages.js']
  },
  {
    localPath: 'public/images/landing/hero-managed-crops.jpg',
    canonicalPath: 'public/images/landing/hero-managed-crops.jpg',
    cloudinaryFolder: 'earth-heritage/landing',
    publicId: 'hero-managed-crops',
    category: 'landing',
    reason: 'Landing page managed crops feature visual (1.11 MB).',
    usageLocations: [
      'data/landingImages.js',
      'components/sections/home/HomeManagedFarmland.js'
    ]
  }
];

console.log(`Starting Batch 4 upload of ${batch4Assets.length} canonical assets...\n`);

const results = [];

for (const asset of batch4Assets) {
  console.log(`Uploading ${asset.localPath} -> ${asset.cloudinaryFolder}/${asset.publicId}...`);
  const fileBuffer = fs.readFileSync(asset.canonicalPath);
  const originalFileSize = fileBuffer.length;

  const uploadResult = await uploadImageStream(fileBuffer, {
    folder: asset.cloudinaryFolder,
    public_id: asset.publicId,
    overwrite: true,
    resource_type: 'image'
  });

  console.log(`  ✓ Uploaded successfully: ${uploadResult.secure_url}`);
  console.log(`    Dimensions: ${uploadResult.width}x${uploadResult.height}, Format: ${uploadResult.format}, Bytes: ${uploadResult.bytes}`);

  const canonicalRecord = {
    localPath: asset.localPath,
    cloudinaryFolder: asset.cloudinaryFolder,
    publicId: uploadResult.public_id,
    secureUrl: uploadResult.secure_url,
    originalFileSize,
    originalFileSizeFormatted: (originalFileSize / 1024).toFixed(1) + ' KB',
    cloudinaryAssetExists: true,
    width: uploadResult.width,
    height: uploadResult.height,
    format: uploadResult.format,
    usageLocations: asset.usageLocations,
    isCanonical: true,
    reusedExistingAsset: false,
    duplicateGroup: 'none',
    migrationStatus: 'PILOT_MIGRATED'
  };
  results.push(canonicalRecord);
}

// 4. Create docs/cloudinary-batch-4-migration.json
const outputData = {
  version: '1.0.0',
  batch: 4,
  executedAt: new Date().toISOString(),
  summary: {
    totalCanonicalUploads: batch4Assets.length,
    totalLocalPathsMapped: results.length,
    foldersCovered: Array.from(new Set(results.map(r => r.cloudinaryFolder))),
    totalOriginalBytes: results.reduce((acc, r) => acc + r.originalFileSize, 0)
  },
  migratedAssets: results
};

fs.writeFileSync('docs/cloudinary-batch-4-migration.json', JSON.stringify(outputData, null, 2));
console.log('\nWrote docs/cloudinary-batch-4-migration.json successfully.');
