import fs from 'fs';
import crypto from 'crypto';

// 1. Load environment variables
process.loadEnvFile('.env.local');

// 2. Import server Cloudinary utility
const { uploadImageStream, isCloudinaryConfigured } = await import('../lib/cloudinary.js');

if (!isCloudinaryConfigured) {
  console.error('Error: Cloudinary is not configured. Check .env.local.');
  process.exit(1);
}

// 3. Define the 8 final Batch 6 assets
const batch6Assets = [
  {
    localPath: 'public/images/about/philosophy-farmland.jpg',
    canonicalPath: 'public/images/about/philosophy-farmland.jpg',
    cloudinaryFolder: 'earth-heritage/about',
    publicId: 'philosophy-farmland',
    category: 'about',
    reason: 'Philosophy farmland agrarian visual (960.7 KB). Completes 100% of About candidate assets.',
    usageLocations: []
  },
  {
    localPath: 'public/images/about/story-farmland.jpg',
    canonicalPath: 'public/images/about/story-farmland.jpg',
    cloudinaryFolder: 'earth-heritage/about',
    publicId: 'story-farmland',
    category: 'about',
    reason: 'Story farmland agrarian heritage visual (1.19 MB). Completes 100% of About candidate assets.',
    usageLocations: []
  },
  {
    localPath: 'public/images/landing/hero-family-farmland.jpg',
    canonicalPath: 'public/images/landing/hero-family-farmland.jpg',
    cloudinaryFolder: 'earth-heritage/landing',
    publicId: 'hero-family-farmland',
    category: 'landing',
    reason: 'Family farmland lifestyle visual (1.08 MB).',
    usageLocations: []
  },
  {
    localPath: 'public/images/landing/hero-plantation-walk.jpg',
    canonicalPath: 'public/images/landing/hero-plantation-walk.jpg',
    cloudinaryFolder: 'earth-heritage/landing',
    publicId: 'hero-plantation-walk',
    category: 'landing',
    reason: 'Plantation walk agroforestry visual (1.24 MB).',
    usageLocations: []
  },
  {
    localPath: 'public/images/landing/problem-land.jpg',
    canonicalPath: 'public/images/landing/problem-land.jpg',
    cloudinaryFolder: 'earth-heritage/landing',
    publicId: 'problem-land',
    category: 'landing',
    reason: 'Section 3 landowner responsibility mist visual (342.6 KB).',
    usageLocations: ['data/landingImages.js']
  },
  {
    localPath: 'public/images/landing/solution-management.jpg',
    canonicalPath: 'public/images/landing/solution-management.jpg',
    cloudinaryFolder: 'earth-heritage/landing',
    publicId: 'solution-management',
    category: 'landing',
    reason: 'Cultivated rows farmland management visual (845.1 KB).',
    usageLocations: []
  },
  {
    localPath: 'public/images/landing/statement-landscape.jpg',
    canonicalPath: 'public/images/landing/statement-landscape.jpg',
    cloudinaryFolder: 'earth-heritage/landing',
    publicId: 'statement-landscape',
    category: 'landing',
    reason: 'Section 2 sunlit tree canopy editorial visual (553.1 KB).',
    usageLocations: ['data/landingImages.js']
  },
  {
    localPath: 'public/images/projects/nairuthya-project-overview.png',
    canonicalPath: 'public/images/projects/nairuthya-project-overview.png',
    cloudinaryFolder: 'earth-heritage/projects',
    publicId: 'nairuthya-project-overview',
    category: 'projects',
    reason: 'Nairuthya project overview diagrammatic asset (334.4 KB). Completes 100% of Projects candidate assets.',
    usageLocations: []
  }
];

console.log(`Starting Batch 6 (FINAL) upload of ${batch6Assets.length} canonical assets...\n`);

const results = [];

for (const asset of batch6Assets) {
  console.log(`Uploading ${asset.localPath} -> ${asset.cloudinaryFolder}/${asset.publicId}...`);
  const fileBuffer = fs.readFileSync(asset.canonicalPath);
  const originalFileSize = fileBuffer.length;
  const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

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
    hash,
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

// 4. Create docs/cloudinary-batch-6-migration.json
const outputData = {
  version: '1.0.0',
  batch: 6,
  isFinalBatch: true,
  executedAt: new Date().toISOString(),
  baseline: {
    canonicalCloudinaryUploadsBefore: 58,
    migratedLocalPathsBefore: 67,
    remainingCandidatesBefore: 8,
    keepLocalCount: 16,
    totalScopeAssets: 91
  },
  summary: {
    totalCanonicalUploads: batch6Assets.length,
    totalLocalPathsMapped: results.length,
    foldersCovered: Array.from(new Set(results.map(r => r.cloudinaryFolder))),
    totalOriginalBytes: results.reduce((acc, r) => acc + r.originalFileSize, 0)
  },
  migratedAssets: results
};

fs.writeFileSync('docs/cloudinary-batch-6-migration.json', JSON.stringify(outputData, null, 2));
console.log('\nWrote docs/cloudinary-batch-6-migration.json successfully.');
