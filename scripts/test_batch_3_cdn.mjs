import fs from 'fs';

const b3 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-3-migration.json', 'utf8'));

console.log(`Checking ${b3.migratedAssets.length} asset URLs against Cloudinary CDN...\n`);

let allOk = true;
for (const asset of b3.migratedAssets) {
  try {
    const res = await fetch(asset.secureUrl, { method: 'HEAD' });
    if (res.status === 200) {
      console.log(`✓ [200 OK] ${asset.publicId} (${asset.format}, ${asset.width}x${asset.height})`);
    } else {
      console.error(`✗ [${res.status}] ${asset.publicId}`);
      allOk = false;
    }
  } catch (err) {
    console.error(`✗ Error fetching ${asset.publicId}: ${err.message}`);
    allOk = false;
  }
}

if (!allOk) {
  console.error('\nSome Cloudinary assets failed to return HTTP 200!');
  process.exit(1);
} else {
  console.log('\nAll Batch 3 assets are verified live on Cloudinary CDN with HTTP 200 OK!');
}
