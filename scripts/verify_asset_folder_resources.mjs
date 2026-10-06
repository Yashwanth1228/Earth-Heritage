process.loadEnvFile('.env.local');
const { cloudinary } = await import('../lib/cloudinary.js');

console.log('=== VERIFYING MEDIA LIBRARY ASSET FOLDER ===\n');

// 1. Verify subfolders of earth-heritage/projects
const sub = await cloudinary.api.sub_folders('earth-heritage/projects');
console.log('1. Subfolders under earth-heritage/projects:');
sub.folders.forEach(f => console.log(`   - ${f.name} (path: ${f.path})`));

const nwwFolderExists = sub.folders.some(f => f.name === 'nairuthya-whispering-wood' || f.path === 'earth-heritage/projects/nairuthya-whispering-wood');
console.log(`\nDedicated Media Library Folder Exists: ${nwwFolderExists}`);

// 2. Query resources in asset folder earth-heritage/projects/nairuthya-whispering-wood
const targetIds = [
  'earth-heritage/projects/nairuthya-whispering-wood/hero',
  'earth-heritage/projects/nairuthya-whispering-wood/stone-terraces',
  'earth-heritage/projects/nairuthya-whispering-wood/plots-irrigation',
  'earth-heritage/projects/nairuthya-whispering-wood/children-play',
  'earth-heritage/projects/nairuthya-whispering-wood/elevated-vista',
  'earth-heritage/projects/nairuthya-whispering-wood/outdoor-fitness'
];

console.log('\n2. Verifying each asset reports exact asset_folder "earth-heritage/projects/nairuthya-whispering-wood":\n');

let allVerified = true;

for (const id of targetIds) {
  const res = await cloudinary.api.resource(id);
  const isMatch = res.asset_folder === 'earth-heritage/projects/nairuthya-whispering-wood';
  console.log(`- ${res.public_id}`);
  console.log(`  Asset Folder: "${res.asset_folder}" -> [${isMatch ? 'VERIFIED MATCH' : 'MISMATCH'}]`);
  console.log(`  Delivery URL: ${res.secure_url}`);
  if (!isMatch) allVerified = false;
}

// 3. Test resources_by_asset_folder API if available
try {
  const byFolder = await cloudinary.api.resources_by_asset_folder('earth-heritage/projects/nairuthya-whispering-wood');
  console.log(`\n3. resources_by_asset_folder count: ${byFolder.resources.length}`);
  byFolder.resources.forEach(r => console.log(`   * ${r.public_id} (${r.asset_folder})`));
} catch (e) {
  console.log('\nNote on resources_by_asset_folder API:', e.message);
}

if (!allVerified || !nwwFolderExists) {
  console.error('\nVerification failed!');
  process.exit(1);
}

console.log('\nAll 6 assets successfully verified in Media Library folder "earth-heritage/projects/nairuthya-whispering-wood"!');
