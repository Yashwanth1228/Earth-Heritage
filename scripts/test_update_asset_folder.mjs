process.loadEnvFile('.env.local');
const { cloudinary } = await import('../lib/cloudinary.js');

console.log('Testing update of asset_folder on hero asset...\n');

const heroId = 'earth-heritage/projects/nairuthya-whispering-wood/hero';

const before = await cloudinary.api.resource(heroId);
console.log('Before update:');
console.log(`  Public ID: ${before.public_id}`);
console.log(`  Asset Folder: ${before.asset_folder}`);
console.log(`  Secure URL: ${before.secure_url}`);

const updateRes = await cloudinary.api.update(heroId, {
  asset_folder: 'earth-heritage/projects/nairuthya-whispering-wood'
});

console.log('\nUpdate result:');
console.log(`  Public ID: ${updateRes.public_id}`);
console.log(`  Asset Folder: ${updateRes.asset_folder}`);
console.log(`  Secure URL: ${updateRes.secure_url}`);

const after = await cloudinary.api.resource(heroId);
console.log('\nAfter update verification:');
console.log(`  Public ID: ${after.public_id}`);
console.log(`  Asset Folder: ${after.asset_folder}`);
console.log(`  Secure URL: ${after.secure_url}`);

const headRes = await fetch(after.secure_url, { method: 'HEAD' });
console.log(`  Delivery URL HTTP Status: ${headRes.status}`);
