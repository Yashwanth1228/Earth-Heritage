import fs from 'fs';

// 1. Load environment variables
process.loadEnvFile('.env.local');

// 2. Import server Cloudinary utility
const { uploadImageStream, isCloudinaryConfigured } = await import('../lib/cloudinary.js');

if (!isCloudinaryConfigured) {
  console.error('Error: Cloudinary is not configured. Check .env.local.');
  process.exit(1);
}

// 3. Define the 14 canonical Batch 3 assets
const batch3Assets = [
  {
    localPath: 'public/images/projects/coconut-garden/boundary-plantation-wall.png',
    canonicalPath: 'public/images/projects/coconut-garden/boundary-plantation-wall.png',
    cloudinaryFolder: 'earth-heritage/projects/coconut-garden',
    publicId: 'boundary-plantation-wall',
    category: 'projects',
    reason: 'Coconut garden boundary plantation wall illustration (985.4 KB).',
    usageLocations: [
      'data/projects.js',
      'data/galleryImages.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/projects/coconut-garden/plot-demarcation-10.jpg',
    canonicalPath: 'public/images/projects/coconut-garden/plot-demarcation-10.jpg',
    cloudinaryFolder: 'earth-heritage/projects/coconut-garden',
    publicId: 'plot-demarcation-10',
    category: 'projects',
    reason: 'Coconut garden plot demarcation photo (532.0 KB).',
    usageLocations: [
      'data/projects.js',
      'data/galleryImages.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/projects/coconut-garden/farm-landscape-groves.jpg',
    canonicalPath: 'public/images/projects/coconut-garden/farm-landscape-groves.jpg',
    cloudinaryFolder: 'earth-heritage/projects/coconut-garden',
    publicId: 'farm-landscape-groves',
    category: 'projects',
    reason: 'Coconut garden landscape grove photo (389.6 KB). Completes 100% of Coconut Garden project images.',
    usageLocations: [
      'data/projects.js',
      'data/galleryImages.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/plantations/coconut.jpg',
    canonicalPath: 'public/images/plantations/coconut.jpg',
    cloudinaryFolder: 'earth-heritage/plantations',
    publicId: 'coconut',
    category: 'plantations',
    reason: 'Coconut plantation feature photo (1.07 MB).',
    usageLocations: [
      'data/projects.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/plantations/areca-nut.jpg',
    canonicalPath: 'public/images/plantations/areca-nut.jpg',
    cloudinaryFolder: 'earth-heritage/plantations',
    publicId: 'areca-nut',
    category: 'plantations',
    reason: 'Areca nut plantation feature photo (1.06 MB).',
    usageLocations: [
      'data/projects.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/plantations/seasonal-fruits.jpg',
    canonicalPath: 'public/images/plantations/seasonal-fruits.jpg',
    cloudinaryFolder: 'earth-heritage/plantations',
    publicId: 'seasonal-fruits',
    category: 'plantations',
    reason: 'Seasonal fruits plantation feature photo (1.04 MB).',
    usageLocations: [
      'data/projects.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/plantations/teak-wood.jpg',
    canonicalPath: 'public/images/plantations/teak-wood.jpg',
    cloudinaryFolder: 'earth-heritage/plantations',
    publicId: 'teak-wood',
    category: 'plantations',
    reason: 'Teak wood plantation feature photo (988.8 KB). Completes 100% of plantations imagery.',
    usageLocations: [
      'data/projects.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/gallery/hero-feature.jpg',
    canonicalPath: 'public/images/gallery/hero-feature.jpg',
    cloudinaryFolder: 'earth-heritage/gallery',
    publicId: 'hero-feature',
    category: 'gallery',
    reason: 'Gallery hero feature image (826.0 KB); consolidates duplicate how-it-works/stage-01-understand.jpg (Duplicate Group 8).',
    usageLocations: [
      'components/sections/home/HomeStories.js'
    ],
    duplicates: [
      {
        localPath: 'public/images/how-it-works/stage-01-understand.jpg',
        duplicateGroup: 'Group 8',
        usageLocations: [
          'data/howItWorksData.js',
          'data/howItWorksImages.js',
          'components/sections/home/HomeHowItWorks.js'
        ]
      }
    ]
  },
  {
    localPath: 'public/images/gallery/cultivation-detail.jpg',
    canonicalPath: 'public/images/gallery/cultivation-detail.jpg',
    cloudinaryFolder: 'earth-heritage/gallery',
    publicId: 'cultivation-detail',
    category: 'gallery',
    reason: 'Gallery cultivation detail photo (811.1 KB); consolidates duplicate how-it-works/stage-04-cultivate.jpg (Duplicate Group 7).',
    usageLocations: [
      'components/sections/home/HomeStories.js'
    ],
    duplicates: [
      {
        localPath: 'public/images/how-it-works/stage-04-cultivate.jpg',
        duplicateGroup: 'Group 7',
        usageLocations: [
          'data/howItWorksData.js',
          'data/howItWorksImages.js',
          'components/sections/home/HomeHowItWorks.js'
        ]
      }
    ]
  },
  {
    localPath: 'public/images/amenities/children-play-area.jpg',
    canonicalPath: 'public/images/amenities/children-play-area.jpg',
    cloudinaryFolder: 'earth-heritage/amenities',
    publicId: 'children-play-area',
    category: 'amenities',
    reason: 'Children play area amenity photo (1.20 MB).',
    usageLocations: [
      'data/projects.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/amenities/cottages.jpg',
    canonicalPath: 'public/images/amenities/cottages.jpg',
    cloudinaryFolder: 'earth-heritage/amenities',
    publicId: 'cottages',
    category: 'amenities',
    reason: 'Cottages amenity photo (1.20 MB).',
    usageLocations: [
      'data/projects.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/amenities/yoga-meditation.jpg',
    canonicalPath: 'public/images/amenities/yoga-meditation.jpg',
    cloudinaryFolder: 'earth-heritage/amenities',
    publicId: 'yoga-meditation',
    category: 'amenities',
    reason: 'Yoga and meditation amenity photo (1.16 MB).',
    usageLocations: [
      'data/projects.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/how-it-works/responsible-care-panorama.jpg',
    canonicalPath: 'public/images/how-it-works/responsible-care-panorama.jpg',
    cloudinaryFolder: 'earth-heritage/how-it-works',
    publicId: 'responsible-care-panorama',
    category: 'how-it-works',
    reason: 'Responsible care panoramic landscape (1.01 MB); reused across blog, events, and home sections.',
    usageLocations: [
      'data/blogs.js',
      'data/events.js',
      'data/howItWorksImages.js',
      'components/sections/home/HomeEvents.js',
      'components/sections/home/HomeStories.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/landing/manage-06-harvest.jpg',
    canonicalPath: 'public/images/landing/manage-06-harvest.jpg',
    cloudinaryFolder: 'earth-heritage/landing',
    publicId: 'manage-06-harvest',
    category: 'landing',
    reason: 'Farmland harvest photo (174.7 KB); consolidates duplicate how-it-works/stage-05-harvest.jpg (Duplicate Group 11), reused across 7 locations.',
    usageLocations: [
      'data/farmManagementImages.js',
      'data/landingImages.js',
      'data/managedFarmlandImages.js',
      'components/sections/home/HomeStories.js'
    ],
    duplicates: [
      {
        localPath: 'public/images/how-it-works/stage-05-harvest.jpg',
        duplicateGroup: 'Group 11',
        usageLocations: [
          'data/howItWorksData.js',
          'data/howItWorksImages.js',
          'components/sections/home/HomeHowItWorks.js'
        ]
      }
    ]
  }
];

console.log(`Starting Batch 3 upload of ${batch3Assets.length} canonical assets...\n`);

const results = [];

for (const asset of batch3Assets) {
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

  // Base record for the canonical asset
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
    duplicateGroup: asset.duplicates.length > 0 ? asset.duplicates[0].duplicateGroup : 'none',
    migrationStatus: 'PILOT_MIGRATED'
  };
  results.push(canonicalRecord);

  // If there are duplicate local files that map to this single Cloudinary asset
  for (const dup of asset.duplicates) {
    const dupBuffer = fs.readFileSync(dup.localPath);
    results.push({
      localPath: dup.localPath,
      cloudinaryFolder: asset.cloudinaryFolder,
      publicId: uploadResult.public_id,
      secureUrl: uploadResult.secure_url,
      originalFileSize: dupBuffer.length,
      originalFileSizeFormatted: (dupBuffer.length / 1024).toFixed(1) + ' KB',
      cloudinaryAssetExists: true,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
      usageLocations: dup.usageLocations,
      isCanonical: false,
      reusedExistingAsset: true,
      canonicalTarget: asset.localPath,
      duplicateGroup: dup.duplicateGroup,
      migrationStatus: 'PILOT_MIGRATED'
    });
  }
}

// 4. Create docs/cloudinary-batch-3-migration.json
const outputData = {
  version: '1.0.0',
  batch: 3,
  executedAt: new Date().toISOString(),
  summary: {
    totalCanonicalUploads: batch3Assets.length,
    totalLocalPathsMapped: results.length,
    foldersCovered: Array.from(new Set(results.map(r => r.cloudinaryFolder))),
    totalOriginalBytes: results.reduce((acc, r) => acc + r.originalFileSize, 0)
  },
  migratedAssets: results
};

fs.writeFileSync('docs/cloudinary-batch-3-migration.json', JSON.stringify(outputData, null, 2));
console.log('\nWrote docs/cloudinary-batch-3-migration.json successfully.');
