import fs from 'fs';
import path from 'path';

// 1. Load environment variables from .env.local
process.loadEnvFile('.env.local');

// 2. Import server Cloudinary utility
const { uploadImageStream, isCloudinaryConfigured } = await import('../lib/cloudinary.js');

if (!isCloudinaryConfigured) {
  console.error('Error: Cloudinary is not configured. Check .env.local.');
  process.exit(1);
}

// 3. Define the 6 canonical pilot assets (covering 8 local file paths including duplicates)
const pilotAssets = [
  {
    localPath: 'public/images/projects/coconut-garden/internal-road-layout.jpg',
    canonicalPath: 'public/images/projects/coconut-garden/internal-road-layout.jpg',
    cloudinaryFolder: 'earth-heritage/projects/coconut-garden',
    publicId: 'internal-road-layout',
    category: 'projects',
    reason: 'Standard project asset; verifies subfolder hierarchy under earth-heritage/projects/.',
    usageLocations: [
      'data/galleryImages.js',
      'data/projects.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/gallery/nature-canopy.jpg',
    canonicalPath: 'public/images/gallery/nature-canopy.jpg',
    cloudinaryFolder: 'earth-heritage/gallery',
    publicId: 'nature-canopy',
    category: 'gallery',
    reason: 'Large high-resolution gallery image (1.27 MB); tests bandwidth optimization and multi-component reuse.',
    usageLocations: [
      'data/events.js',
      'components/sections/home/HomeEvents.js',
      'components/sections/home/HomeStories.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/projects/nairuthya-whispering-wood-hero.jpg',
    canonicalPath: 'public/images/projects/nairuthya-whispering-wood-hero.jpg',
    cloudinaryFolder: 'earth-heritage/projects',
    publicId: 'nairuthya-whispering-wood-hero',
    category: 'projects',
    reason: 'Project hero image and binary duplicate with gallery/nairuthya-01-entrance.jpg; verifies duplicate consolidation to one asset.',
    usageLocations: [
      'data/projects.js',
      'data/galleryImages.js',
      'components/projects/nairuthya/NairuthyaHero.js'
    ],
    duplicates: [
      {
        localPath: 'public/images/gallery/nairuthya-01-entrance.jpg',
        usageLocations: [
          'data/galleryImages.js',
          'data/projects.js'
        ]
      }
    ]
  },
  {
    localPath: 'public/images/about/founder-khushi-jain.jpg',
    canonicalPath: 'public/images/about/founder-khushi-jain.jpg',
    cloudinaryFolder: 'earth-heritage/about',
    publicId: 'founder-khushi-jain',
    category: 'about',
    reason: 'About/Leadership profile photo; verifies about folder migration and ignores unreferenced -hq duplicate copy.',
    usageLocations: [
      'data/aboutData.js'
    ],
    duplicates: [
      {
        localPath: 'public/images/about/founder-khushi-jain-hq.jpg',
        usageLocations: []
      }
    ]
  },
  {
    localPath: 'public/images/amenities/club-house.jpg',
    canonicalPath: 'public/images/amenities/club-house.jpg',
    cloudinaryFolder: 'earth-heritage/amenities',
    publicId: 'club-house',
    category: 'amenities',
    reason: 'Amenities feature image (~1.0 MB); verifies amenities folder migration.',
    usageLocations: [
      'data/projects.js'
    ],
    duplicates: []
  },
  {
    localPath: 'public/images/landing/manage-01-people.jpg',
    canonicalPath: 'public/images/landing/manage-01-people.jpg',
    cloudinaryFolder: 'earth-heritage/landing',
    publicId: 'manage-01-people',
    category: 'landing',
    reason: 'Landing & farm management content image; verifies landing folder migration and cross-data sharing.',
    usageLocations: [
      'data/landingImages.js',
      'data/farmManagementImages.js',
      'data/managedFarmlandImages.js'
    ],
    duplicates: []
  }
];

console.log(`Starting pilot upload of ${pilotAssets.length} canonical assets...\n`);

const results = [];

for (const asset of pilotAssets) {
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
      canonicalTarget: asset.localPath,
      migrationStatus: 'PILOT_MIGRATED'
    });
  }
}

// 4. Create docs/cloudinary-pilot-migration.json
const outputData = {
  version: '1.0.0',
  executedAt: new Date().toISOString(),
  summary: {
    totalCanonicalUploads: pilotAssets.length,
    totalLocalPathsMapped: results.length,
    foldersCreated: Array.from(new Set(results.map(r => r.cloudinaryFolder))),
    totalOriginalBytes: results.reduce((acc, r) => acc + r.originalFileSize, 0)
  },
  migratedAssets: results
};

fs.writeFileSync('docs/cloudinary-pilot-migration.json', JSON.stringify(outputData, null, 2));
console.log('\nWrote docs/cloudinary-pilot-migration.json successfully.');
