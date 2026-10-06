process.loadEnvFile('.env.local');
const { cloudinary, isCloudinaryConfigured } = await import('../lib/cloudinary.js');
import fs from 'fs';

if (!isCloudinaryConfigured) {
  console.error('Cloudinary is not configured.');
  process.exit(1);
}

console.log('=== PHASE 2 — SAFE CLOUDINARY REORGANIZATION ===\n');

const migrationTargets = [
  {
    name: 'Nairuthya Hero',
    currentPublicId: 'earth-heritage/projects/nairuthya-whispering-wood-hero',
    targetPublicId: 'earth-heritage/projects/nairuthya-whispering-wood/hero',
    currentUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/projects/nairuthya-whispering-wood-hero.jpg'
  },
  {
    name: 'Nairuthya Stone Terraces',
    currentPublicId: 'earth-heritage/gallery/nairuthya-02-stone-terraces',
    targetPublicId: 'earth-heritage/projects/nairuthya-whispering-wood/stone-terraces',
    currentUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262711/earth-heritage/gallery/nairuthya-02-stone-terraces.jpg'
  },
  {
    name: 'Nairuthya Plots & Irrigation',
    currentPublicId: 'earth-heritage/gallery/nairuthya-03-plots-irrigation',
    targetPublicId: 'earth-heritage/projects/nairuthya-whispering-wood/plots-irrigation',
    currentUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262714/earth-heritage/gallery/nairuthya-03-plots-irrigation.jpg'
  },
  {
    name: 'Nairuthya Children Play',
    currentPublicId: 'earth-heritage/gallery/nairuthya-04-children-play',
    targetPublicId: 'earth-heritage/projects/nairuthya-whispering-wood/children-play',
    currentUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262717/earth-heritage/gallery/nairuthya-04-children-play.jpg'
  },
  {
    name: 'Nairuthya Elevated Vista',
    currentPublicId: 'earth-heritage/gallery/nairuthya-05-elevated-vista',
    targetPublicId: 'earth-heritage/projects/nairuthya-whispering-wood/elevated-vista',
    currentUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262720/earth-heritage/gallery/nairuthya-05-elevated-vista.jpg'
  },
  {
    name: 'Nairuthya Outdoor Fitness',
    currentPublicId: 'earth-heritage/gallery/nairuthya-06-outdoor-fitness',
    targetPublicId: 'earth-heritage/projects/nairuthya-whispering-wood/outdoor-fitness',
    currentUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262722/earth-heritage/gallery/nairuthya-06-outdoor-fitness.jpg'
  }
];

const results = [];

for (const item of migrationTargets) {
  console.log(`Renaming: ${item.currentPublicId} -> ${item.targetPublicId}...`);
  try {
    const renameRes = await cloudinary.uploader.rename(
      item.currentPublicId,
      item.targetPublicId,
      { overwrite: false, invalidate: true }
    );

    console.log(`  ✓ Successfully renamed in Cloudinary!`);
    console.log(`    New Public ID: ${renameRes.public_id}`);
    console.log(`    New Secure URL: ${renameRes.secure_url}`);
    console.log(`    Dimensions: ${renameRes.width}x${renameRes.height}, Format: ${renameRes.format}, Bytes: ${renameRes.bytes}`);

    // Verify the new URL immediately via HTTP HEAD
    const headRes = await fetch(renameRes.secure_url, { method: 'HEAD' });
    console.log(`    HTTP verification of new URL: HTTP ${headRes.status} OK\n`);

    if (headRes.status !== 200) {
      console.error(`✗ HTTP check failed for new URL: ${renameRes.secure_url}`);
      process.exit(1);
    }

    results.push({
      name: item.name,
      oldPublicId: item.currentPublicId,
      newPublicId: renameRes.public_id,
      oldUrl: item.currentUrl,
      newUrl: renameRes.secure_url,
      format: renameRes.format,
      width: renameRes.width,
      height: renameRes.height,
      bytes: renameRes.bytes,
      httpStatus: headRes.status
    });
  } catch (err) {
    console.error(`✗ Failed renaming ${item.currentPublicId}:`, err);
    process.exit(1);
  }
}

fs.writeFileSync('scratch/nairuthya_rename_results.json', JSON.stringify(results, null, 2));
console.log('Phase 2 Cloudinary Reorganization completed successfully!');
