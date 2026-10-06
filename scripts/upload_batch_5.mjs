import fs from 'fs';

// 1. Load environment variables
process.loadEnvFile('.env.local');

// 2. Import server Cloudinary utility
const { uploadImageStream, isCloudinaryConfigured } = await import('../lib/cloudinary.js');

if (!isCloudinaryConfigured) {
  console.error('Error: Cloudinary is not configured. Check .env.local.');
  process.exit(1);
}

// 3. Define the 13 canonical Batch 5 assets
const batch5Assets = [
  {
    localPath: 'public/images/gallery/nairuthya-02-stone-terraces.jpg',
    canonicalPath: 'public/images/gallery/nairuthya-02-stone-terraces.jpg',
    cloudinaryFolder: 'earth-heritage/gallery',
    publicId: 'nairuthya-02-stone-terraces',
    category: 'gallery',
    reason: 'Nairuthya Whispering Wood stone terrace agricultural vista (211.3 KB).',
    usageLocations: ['data/galleryImages.js', 'data/projects.js']
  },
  {
    localPath: 'public/images/gallery/nairuthya-03-plots-irrigation.jpg',
    canonicalPath: 'public/images/gallery/nairuthya-03-plots-irrigation.jpg',
    cloudinaryFolder: 'earth-heritage/gallery',
    publicId: 'nairuthya-03-plots-irrigation',
    category: 'gallery',
    reason: 'Farmland plot delineation and irrigation trenches (202.5 KB).',
    usageLocations: ['data/galleryImages.js', 'data/projects.js']
  },
  {
    localPath: 'public/images/gallery/nairuthya-04-children-play.jpg',
    canonicalPath: 'public/images/gallery/nairuthya-04-children-play.jpg',
    cloudinaryFolder: 'earth-heritage/gallery',
    publicId: 'nairuthya-04-children-play',
    category: 'gallery',
    reason: 'Children play area at Nairuthya Whispering Wood (236.5 KB).',
    usageLocations: ['data/galleryImages.js', 'data/projects.js']
  },
  {
    localPath: 'public/images/gallery/nairuthya-05-elevated-vista.jpg',
    canonicalPath: 'public/images/gallery/nairuthya-05-elevated-vista.jpg',
    cloudinaryFolder: 'earth-heritage/gallery',
    publicId: 'nairuthya-05-elevated-vista',
    category: 'gallery',
    reason: 'Elevated panoramic vista overlooking agricultural plots (189.1 KB).',
    usageLocations: ['data/galleryImages.js', 'data/projects.js']
  },
  {
    localPath: 'public/images/gallery/nairuthya-06-outdoor-fitness.jpg',
    canonicalPath: 'public/images/gallery/nairuthya-06-outdoor-fitness.jpg',
    cloudinaryFolder: 'earth-heritage/gallery',
    publicId: 'nairuthya-06-outdoor-fitness',
    category: 'gallery',
    reason: 'Outdoor fitness enclave amidst eucalyptus canopy (227.6 KB). Completes 100% of Gallery assets.',
    usageLocations: ['data/galleryImages.js', 'data/projects.js']
  },
  {
    localPath: 'public/images/landing/manage-02-crop.jpg',
    canonicalPath: 'public/images/landing/manage-02-crop.jpg',
    cloudinaryFolder: 'earth-heritage/landing',
    publicId: 'manage-02-crop',
    category: 'landing',
    reason: 'Stage 02 Crop selection & precision soil planning visual (122.3 KB). Reused in 6 locations.',
    usageLocations: [
      'data/events.js',
      'data/farmManagementImages.js',
      'data/landingImages.js',
      'data/managedFarmlandImages.js',
      'components/sections/home/HomeEvents.js',
      'components/sections/home/HomeStories.js'
    ]
  },
  {
    localPath: 'public/images/landing/manage-03-cultivation.jpg',
    canonicalPath: 'public/images/landing/manage-03-cultivation.jpg',
    cloudinaryFolder: 'earth-heritage/landing',
    publicId: 'manage-03-cultivation',
    category: 'landing',
    reason: 'Stage 03 Cultivation maintenance and precision irrigation (214.3 KB). Reused in 4 locations.',
    usageLocations: [
      'data/farmManagementImages.js',
      'data/landingImages.js',
      'data/managedFarmlandImages.js',
      'components/sections/home/HomeStories.js'
    ]
  },
  {
    localPath: 'public/images/landing/manage-04-care.jpg',
    canonicalPath: 'public/images/landing/manage-04-care.jpg',
    cloudinaryFolder: 'earth-heritage/landing',
    publicId: 'manage-04-care',
    category: 'landing',
    reason: 'Stage 04 Continuous horticultural care visual (737.5 KB). Reused in 3 locations.',
    usageLocations: [
      'data/farmManagementImages.js',
      'data/landingImages.js',
      'data/managedFarmlandImages.js'
    ]
  },
  {
    localPath: 'public/images/landing/manage-05-operations.jpg',
    canonicalPath: 'public/images/landing/manage-05-operations.jpg',
    cloudinaryFolder: 'earth-heritage/landing',
    publicId: 'manage-05-operations',
    category: 'landing',
    reason: 'Stage 05 Agricultural operations and harvest logistics (74.7 KB). Completes 100% of Farm Management sequence.',
    usageLocations: [
      'data/farmManagementImages.js',
      'data/landingImages.js',
      'data/managedFarmlandImages.js'
    ]
  },
  {
    localPath: 'public/images/landing/philosophy-panorama.jpg',
    canonicalPath: 'public/images/landing/philosophy-panorama.jpg',
    cloudinaryFolder: 'earth-heritage/landing',
    publicId: 'philosophy-panorama',
    category: 'landing',
    reason: 'Agrarian stewardship and philosophy panoramic visual (651.8 KB).',
    usageLocations: [
      'data/landingImages.js',
      'components/sections/gallery/GalleryPhilosophy.js'
    ]
  },
  {
    localPath: 'public/images/landing/hero-villa-retreat.jpg',
    canonicalPath: 'public/images/landing/hero-villa-retreat.jpg',
    cloudinaryFolder: 'earth-heritage/landing',
    publicId: 'hero-villa-retreat',
    category: 'landing',
    reason: 'Villa retreat and weekend homestead hero visual (1.01 MB).',
    usageLocations: ['data/landingImages.js']
  },
  {
    localPath: 'public/images/landing/hero-farmland-estate.jpg',
    canonicalPath: 'public/images/landing/hero-farmland-estate.jpg',
    cloudinaryFolder: 'earth-heritage/landing',
    publicId: 'hero-farmland-estate',
    category: 'landing',
    reason: 'Farmland estate wide-angle hero visual (993.2 KB).',
    usageLocations: ['data/landingImages.js']
  },
  {
    localPath: 'public/images/landing/hero-landscape.jpg',
    canonicalPath: 'public/images/landing/hero-landscape.jpg',
    cloudinaryFolder: 'earth-heritage/landing',
    publicId: 'hero-landscape',
    category: 'landing',
    reason: 'Managed farmland landing hero landscape visual (596.9 KB).',
    usageLocations: ['components/sections/landing/ManagedFarmlandHero.js']
  }
];

console.log(`Starting Batch 5 upload of ${batch5Assets.length} canonical assets...\n`);

const results = [];

for (const asset of batch5Assets) {
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

// 4. Create docs/cloudinary-batch-5-migration.json
const outputData = {
  version: '1.0.0',
  batch: 5,
  executedAt: new Date().toISOString(),
  baseline: {
    canonicalCloudinaryUploadsBefore: 45,
    migratedLocalPathsBefore: 54,
    remainingCandidatesBefore: 21,
    keepLocalCount: 16
  },
  summary: {
    totalCanonicalUploads: batch5Assets.length,
    totalLocalPathsMapped: results.length,
    foldersCovered: Array.from(new Set(results.map(r => r.cloudinaryFolder))),
    totalOriginalBytes: results.reduce((acc, r) => acc + r.originalFileSize, 0)
  },
  migratedAssets: results
};

fs.writeFileSync('docs/cloudinary-batch-5-migration.json', JSON.stringify(outputData, null, 2));
console.log('\nWrote docs/cloudinary-batch-5-migration.json successfully.');
