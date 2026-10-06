import fs from 'fs';

const batch6 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-6-migration.json', 'utf8'));

console.log(`Verifying CDN delivery for all ${batch6.migratedAssets.length} Batch 6 assets...\n`);

let passCount = 0;
let failCount = 0;

for (const asset of batch6.migratedAssets) {
  try {
    const res = await fetch(asset.secureUrl, { method: 'HEAD' });
    const contentType = res.headers.get('content-type');
    const contentLength = res.headers.get('content-length');
    if (res.status === 200) {
      console.log(`✓ [200 OK] ${asset.publicId}`);
      console.log(`  URL: ${asset.secureUrl}`);
      console.log(`  Content-Type: ${contentType}, Content-Length: ${contentLength} bytes\n`);
      passCount++;
    } else {
      console.error(`✗ [${res.status}] ${asset.publicId}: ${asset.secureUrl}`);
      failCount++;
    }
  } catch (err) {
    console.error(`✗ [ERROR] ${asset.publicId}: ${err.message}`);
    failCount++;
  }
}

console.log(`CDN Verification Summary: ${passCount} passed, ${failCount} failed.`);
if (failCount > 0) {
  process.exit(1);
}
