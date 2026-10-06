import fs from 'fs';

const pilot1 = JSON.parse(fs.readFileSync('docs/cloudinary-pilot-migration.json', 'utf8'));
const pilot2 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-2-migration.json', 'utf8'));
const pilot3 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-3-migration.json', 'utf8'));
const pilot4 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-4-migration.json', 'utf8'));
const pilot5 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-5-migration.json', 'utf8'));
const pilot6 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-6-migration.json', 'utf8'));

const allCanonicalAssets = [
  ...pilot1.migratedAssets.filter(a => a.isCanonical),
  ...pilot2.migratedAssets.filter(a => a.isCanonical),
  ...pilot3.migratedAssets.filter(a => a.isCanonical),
  ...pilot4.migratedAssets.filter(a => a.isCanonical),
  ...pilot5.migratedAssets.filter(a => a.isCanonical),
  ...pilot6.migratedAssets.filter(a => a.isCanonical)
];

console.log(`Auditing all ${allCanonicalAssets.length} canonical Cloudinary assets...`);

let reachabilityPassed = 0;
let reachabilityFailed = 0;
const results = [];

for (const asset of allCanonicalAssets) {
  try {
    const res = await fetch(asset.secureUrl, { method: 'HEAD' });
    const is200 = res.status === 200;
    if (is200) {
      reachabilityPassed++;
    } else {
      console.error(`✗ [HTTP ${res.status}] Failed: ${asset.publicId} -> ${asset.secureUrl}`);
      reachabilityFailed++;
    }
    results.push({
      publicId: asset.publicId,
      secureUrl: asset.secureUrl,
      localPath: asset.localPath,
      width: asset.width,
      height: asset.height,
      format: asset.format,
      status: res.status,
      reachable: is200
    });
  } catch (err) {
    console.error(`✗ Network Error for ${asset.publicId}:`, err.message);
    reachabilityFailed++;
    results.push({
      publicId: asset.publicId,
      secureUrl: asset.secureUrl,
      localPath: asset.localPath,
      status: 'ERROR',
      error: err.message,
      reachable: false
    });
  }
}

console.log(`\nCloudinary Reachability Results:`);
console.log(`Passed: ${reachabilityPassed} / ${allCanonicalAssets.length}`);
console.log(`Failed: ${reachabilityFailed}`);

fs.writeFileSync('scratch/step_13_cloudinary_verification.json', JSON.stringify({
  totalAssets: allCanonicalAssets.length,
  passed: reachabilityPassed,
  failed: reachabilityFailed,
  assets: results
}, null, 2));

if (reachabilityFailed > 0) {
  process.exit(1);
}
