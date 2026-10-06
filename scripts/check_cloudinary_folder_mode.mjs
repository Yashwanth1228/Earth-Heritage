process.loadEnvFile('.env.local');
const { cloudinary, isCloudinaryConfigured } = await import('../lib/cloudinary.js');
import fs from 'fs';

if (!isCloudinaryConfigured) {
  console.error('Cloudinary not configured');
  process.exit(1);
}

console.log('=== PHASE 1: READ-ONLY CLOUDINARY FOLDER MODE CHECK ===\n');

const targetIds = [
  'earth-heritage/projects/nairuthya-whispering-wood/hero',
  'earth-heritage/projects/nairuthya-whispering-wood/stone-terraces',
  'earth-heritage/projects/nairuthya-whispering-wood/plots-irrigation',
  'earth-heritage/projects/nairuthya-whispering-wood/children-play',
  'earth-heritage/projects/nairuthya-whispering-wood/elevated-vista',
  'earth-heritage/projects/nairuthya-whispering-wood/outdoor-fitness'
];

// 1. Inspect resource metadata for the 6 assets
console.log('1. Inspecting resource metadata for the 6 Nairuthya assets:\n');
const assetDetails = [];

for (const id of targetIds) {
  try {
    const res = await cloudinary.api.resource(id);
    console.log(`Public ID: ${res.public_id}`);
    console.log(`  Asset ID: ${res.asset_id}`);
    console.log(`  Asset Folder: ${res.asset_folder !== undefined ? JSON.stringify(res.asset_folder) : 'undefined'}`);
    console.log(`  Folder (legacy path): ${res.folder !== undefined ? JSON.stringify(res.folder) : 'undefined'}`);
    console.log(`  Display Name: ${res.display_name !== undefined ? JSON.stringify(res.display_name) : 'undefined'}`);
    console.log(`  Format: ${res.format}, Version: ${res.version}`);
    console.log(`  Secure URL: ${res.secure_url}\n`);

    assetDetails.push({
      public_id: res.public_id,
      asset_id: res.asset_id,
      asset_folder: res.asset_folder,
      folder: res.folder,
      display_name: res.display_name,
      secure_url: res.secure_url
    });
  } catch (err) {
    console.error(`Error fetching resource ${id}:`, err.message);
  }
}

// 2. Check coconut-garden assets to see how they are organized
console.log('2. Inspecting Coconut Garden assets for comparison:\n');
const coconutHero = await cloudinary.api.resource('earth-heritage/projects/coconut-garden-hero');
console.log(`Coconut Hero:`);
console.log(`  Public ID: ${coconutHero.public_id}`);
console.log(`  Asset Folder: ${coconutHero.asset_folder !== undefined ? JSON.stringify(coconutHero.asset_folder) : 'undefined'}`);
console.log(`  Folder: ${coconutHero.folder !== undefined ? JSON.stringify(coconutHero.folder) : 'undefined'}\n`);

const coconutSubAsset = await cloudinary.api.resource('earth-heritage/projects/coconut-garden/entrance-gate');
console.log(`Coconut Entrance Gate:`);
console.log(`  Public ID: ${coconutSubAsset.public_id}`);
console.log(`  Asset Folder: ${coconutSubAsset.asset_folder !== undefined ? JSON.stringify(coconutSubAsset.asset_folder) : 'undefined'}`);
console.log(`  Folder: ${coconutSubAsset.folder !== undefined ? JSON.stringify(coconutSubAsset.folder) : 'undefined'}\n`);

// 3. Check folders API
console.log('3. Inspecting Folders via Cloudinary Admin API:');
try {
  const rootFolders = await cloudinary.api.root_folders();
  console.log('Root Folders:', rootFolders.folders.map(f => f.name || f.path));

  const projSub = await cloudinary.api.sub_folders('earth-heritage/projects');
  console.log('Subfolders under earth-heritage/projects:', projSub.folders.map(f => f.name || f.path));

  // Determine folder mode from asset_folder presence
  const hasAssetFolder = assetDetails.some(a => a.asset_folder !== undefined);
  console.log(`\nFolder Mode Analysis:`);
  console.log(`Asset Folder property present on resources: ${hasAssetFolder}`);
  if (hasAssetFolder) {
    console.log('Product environment uses DYNAMIC FOLDER MODE (Asset Folders enabled).');
  } else {
    console.log('Product environment uses FIXED FOLDER MODE.');
  }

} catch (err) {
  console.error('Error querying folders:', err.message);
}
