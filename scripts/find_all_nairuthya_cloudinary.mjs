process.loadEnvFile('.env.local');
const { cloudinary, isCloudinaryConfigured } = await import('../lib/cloudinary.js');

if (!isCloudinaryConfigured) {
  console.error('Cloudinary not configured');
  process.exit(1);
}

console.log('=== SEARCHING ALL CLOUDINARY ASSETS FOR NAIRUTHYA / WHISPERING WOOD ===\n');

// Fetch all resources under earth-heritage prefix
let allResources = [];
let nextCursor = null;

do {
  const res = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'earth-heritage',
    max_results: 500,
    next_cursor: nextCursor
  });
  allResources = allResources.concat(res.resources);
  nextCursor = res.next_cursor;
} while (nextCursor);

console.log(`Total Cloudinary assets under "earth-heritage": ${allResources.length}\n`);

const nairuthyaAssets = allResources.filter(r => 
  r.public_id.toLowerCase().includes('nairuthya') || 
  r.public_id.toLowerCase().includes('whispering')
);

console.log(`Found ${nairuthyaAssets.length} assets related to Nairuthya / Whispering Wood in Cloudinary:\n`);

nairuthyaAssets.forEach((a, i) => {
  const folder = a.public_id.split('/').slice(0, -1).join('/');
  console.log(`${i + 1}. Public ID: ${a.public_id}`);
  console.log(`   Folder: ${folder}`);
  console.log(`   Format: ${a.format}, Dimensions: ${a.width}x${a.height}, Size: ${(a.bytes / 1024).toFixed(1)} KB`);
  console.log(`   URL: ${a.secure_url}`);
  console.log('');
});
