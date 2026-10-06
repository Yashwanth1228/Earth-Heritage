import fs from 'fs';

const b5 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-5-migration.json', 'utf8'));

console.log(`Checking ${b5.migratedAssets.length} Batch 5 URLs against Cloudinary CDN...\n`);

let allOk = true;
const deliveryResults = [];

for (const asset of b5.migratedAssets) {
  try {
    const res = await fetch(asset.secureUrl, { method: 'HEAD' });
    if (res.status === 200) {
      console.log(`✓ [200 OK] ${asset.publicId} (${asset.format}, ${asset.width}x${asset.height})`);
      deliveryResults.push({
        publicId: asset.publicId,
        secureUrl: asset.secureUrl,
        status: res.status,
        dimensions: `${asset.width}x${asset.height}`,
        format: asset.format,
        verified: true
      });
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
  console.log('\nAll 13 Batch 5 assets are verified live on Cloudinary CDN with HTTP 200 OK!');
}
