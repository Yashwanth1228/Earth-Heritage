import fs from 'fs';

// 1. Load environment variables
process.loadEnvFile('.env.local');

// 2. Import server Cloudinary utility
const { uploadImageStream, isCloudinaryConfigured } = await import('../lib/cloudinary.js');

if (!isCloudinaryConfigured) {
  console.error('Error: Cloudinary is not configured. Check .env.local.');
  process.exit(1);
}

// 3. Define the 11 canonical Batch 2 assets
const batch2Assets = [
  {
    localPath: 'public/images/projects/coconut-garden/entrance-gate.jpg',
    canonicalPath: 'public/images/projects/coconut-garden/entrance-gate.jpg',
    cloudinaryFolder: 'earth-heritage/projects/coconut-garden',
    publicId: 'entrance-gate',
    category: 'projects',
    reason: 'Standard project asset; verifies projects/coconut-garden subfolder hierarchy.',
    usageLocations: [
      'data/projects.js',
      'data/galleryImages.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/projects/coconut-garden-hero.jpg',
    canonicalPath: 'public/images/projects/coconut-garden-hero.jpg',
    cloudinaryFolder: 'earth-heritage/projects',
    publicId: 'coconut-garden-hero',
    category: 'projects',
    reason: 'Project hero image; tests direct projects root folder.',
    usageLocations: [
      'data/projects.js',
      'data/galleryImages.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/gallery/experiences-gathering.jpg',
    canonicalPath: 'public/images/gallery/experiences-gathering.jpg',
    cloudinaryFolder: 'earth-heritage/gallery',
    publicId: 'experiences-gathering',
    category: 'gallery',
    reason: 'Gallery feature image; reused across events and home sections.',
    usageLocations: [
      'data/events.js',
      'components/sections/home/HomeEvents.js',
      'components/sections/home/HomeStories.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/amenities/garden-area.jpg',
    canonicalPath: 'public/images/amenities/garden-area.jpg',
    cloudinaryFolder: 'earth-heritage/amenities',
    publicId: 'garden-area',
    category: 'amenities',
    reason: 'Large amenities photograph (1.24 MB); tests amenities grid performance.',
    usageLocations: [
      'data/projects.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/plantations/red-sandal.jpg',
    canonicalPath: 'public/images/plantations/red-sandal.jpg',
    cloudinaryFolder: 'earth-heritage/plantations',
    publicId: 'red-sandal',
    category: 'plantations',
    reason: 'Plantations feature photograph (1.16 MB); tests plantations folder.',
    usageLocations: [
      'data/projects.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/plantations/mahogany.jpg',
    canonicalPath: 'public/images/plantations/mahogany.jpg',
    cloudinaryFolder: 'earth-heritage/plantations',
    publicId: 'mahogany',
    category: 'plantations',
    reason: 'Plantations feature photograph (1.14 MB); tests plantations folder.',
    usageLocations: [
      'data/projects.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/landing/cta-landscape.jpg',
    canonicalPath: 'public/images/landing/cta-landscape.jpg',
    cloudinaryFolder: 'earth-heritage/landing',
    publicId: 'cta-landscape',
    category: 'landing',
    reason: 'Large landing background image (1.37 MB); consolidates duplicate how-it-works/stage-06-continue.jpg.',
    usageLocations: [
      'data/landingImages.js',
      'data/farmManagementImages.js',
      'data/managedFarmlandImages.js'
    ],
    duplicates: [
      {
        localPath: 'public/images/how-it-works/stage-06-continue.jpg',
        usageLocations: [
          'data/howItWorksData.js',
          'data/howItWorksImages.js'
        ]
      }
    ]
  },
  {
    localPath: 'public/images/managed-farmland/intro-farmland.jpg',
    canonicalPath: 'public/images/managed-farmland/intro-farmland.jpg',
    cloudinaryFolder: 'earth-heritage/managed-farmland',
    publicId: 'intro-farmland',
    category: 'managed-farmland',
    reason: 'Highly reused asset (1.10 MB, 7 usages); consolidates duplicate how-it-works/stage-02-plan.jpg.',
    usageLocations: [
      'data/managedFarmlandImages.js',
      'data/projects.js',
      'data/blogs.js',
      'data/events.js',
      'components/projects/ProjectDetailGallery.js',
      'components/sections/home/HomeEvents.js',
      'components/sections/home/HomeStories.js'
    ],
    duplicates: [
      {
        localPath: 'public/images/how-it-works/stage-02-plan.jpg',
        usageLocations: [
          'data/howItWorksData.js',
          'data/howItWorksImages.js',
          'components/sections/home/HomeHowItWorks.js'
        ]
      }
    ]
  },
  {
    localPath: 'public/images/farm-management/people-and-land.jpg',
    canonicalPath: 'public/images/farm-management/people-and-land.jpg',
    cloudinaryFolder: 'earth-heritage/farm-management',
    publicId: 'people-and-land',
    category: 'farm-management',
    reason: 'Highly reused asset (1.05 MB, 5 usages); consolidates duplicate how-it-works/stage-03-work.jpg.',
    usageLocations: [
      'data/farmManagementImages.js',
      'data/blogs.js',
      'data/events.js',
      'components/sections/home/HomeEvents.js',
      'components/sections/home/HomeStories.js'
    ],
    duplicates: [
      {
        localPath: 'public/images/how-it-works/stage-03-work.jpg',
        usageLocations: [
          'data/howItWorksData.js',
          'data/howItWorksImages.js',
          'components/sections/home/HomeHowItWorks.js'
        ]
      }
    ]
  },
  {
    localPath: 'public/images/about/founder-sathish-agastya.jpg',
    canonicalPath: 'public/images/about/founder-sathish-agastya.jpg',
    cloudinaryFolder: 'earth-heritage/about',
    publicId: 'founder-sathish-agastya',
    category: 'about',
    reason: 'Founder Sathish Agastya profile image; consolidates unreferenced founder-sathish-agastya-hq.jpg.',
    usageLocations: [
      'data/aboutData.js'
    ],
    duplicates: [
      {
        localPath: 'public/images/about/founder-sathish-agastya-hq.jpg',
        usageLocations: []
      }
    ]
  },
  {
    localPath: 'public/images/campaign/gandhi-jayanti-2026.jpg',
    canonicalPath: 'public/images/campaign/gandhi-jayanti-2026.jpg',
    cloudinaryFolder: 'earth-heritage/campaign',
    publicId: 'gandhi-jayanti-2026',
    category: 'campaign',
    reason: 'Campaign floating badge visual; tests campaign folder migration.',
    usageLocations: [
      'components/ui/FloatingEnquiryButton.js'
    ],
    duplicates: []
  }
];

console.log(`Starting Batch 2 upload of ${batch2Assets.length} canonical assets...\n`);

const results = [];

for (const asset of batch2Assets) {
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
      migrationStatus: 'PILOT_MIGRATED'
    });
  }
}

// 4. Create docs/cloudinary-batch-2-migration.json
const outputData = {
  version: '1.0.0',
  batch: 2,
  executedAt: new Date().toISOString(),
  summary: {
    totalCanonicalUploads: batch2Assets.length,
    totalLocalPathsMapped: results.length,
    foldersCovered: Array.from(new Set(results.map(r => r.cloudinaryFolder))),
    totalOriginalBytes: results.reduce((acc, r) => acc + r.originalFileSize, 0)
  },
  migratedAssets: results
};

fs.writeFileSync('docs/cloudinary-batch-2-migration.json', JSON.stringify(outputData, null, 2));
console.log('\nWrote docs/cloudinary-batch-2-migration.json successfully.');
