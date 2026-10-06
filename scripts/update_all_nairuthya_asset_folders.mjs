process.loadEnvFile('.env.local');
const { cloudinary } = await import('../lib/cloudinary.js');
import fs from 'fs';

console.log('=== PHASE 2: UPDATE ASSET_FOLDER FOR ALL 6 NAIRUTHYA ASSETS ===\n');

const targetFolder = 'earth-heritage/projects/nairuthya-whispering-wood';

const assets = [
  {
    name: 'Nairuthya Hero',
    publicId: 'earth-heritage/projects/nairuthya-whispering-wood/hero',
    expectedUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/projects/nairuthya-whispering-wood/hero.jpg'
  },
  {
    name: 'Nairuthya Stone Terraces',
    publicId: 'earth-heritage/projects/nairuthya-whispering-wood/stone-terraces',
    expectedUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262711/earth-heritage/projects/nairuthya-whispering-wood/stone-terraces.jpg'
  },
  {
    name: 'Nairuthya Plots & Irrigation',
    publicId: 'earth-heritage/projects/nairuthya-whispering-wood/plots-irrigation',
    expectedUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262714/earth-heritage/projects/nairuthya-whispering-wood/plots-irrigation.jpg'
  },
  {
    name: 'Nairuthya Children Play',
    publicId: 'earth-heritage/projects/nairuthya-whispering-wood/children-play',
    expectedUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262717/earth-heritage/projects/nairuthya-whispering-wood/children-play.jpg'
  },
  {
    name: 'Nairuthya Elevated Vista',
    publicId: 'earth-heritage/projects/nairuthya-whispering-wood/elevated-vista',
    expectedUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262720/earth-heritage/projects/nairuthya-whispering-wood/elevated-vista.jpg'
  },
  {
    name: 'Nairuthya Outdoor Fitness',
    publicId: 'earth-heritage/projects/nairuthya-whispering-wood/outdoor-fitness',
    expectedUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262722/earth-heritage/projects/nairuthya-whispering-wood/outdoor-fitness.jpg'
  }
];

const results = [];

for (const a of assets) {
  console.log(`Updating asset_folder for ${a.name} (${a.publicId})...`);
  try {
    const updateRes = await cloudinary.api.update(a.publicId, {
      asset_folder: targetFolder
    });

    const verifyRes = await cloudinary.api.resource(a.publicId);
    const headRes = await fetch(verifyRes.secure_url, { method: 'HEAD' });

    console.log(`  ✓ Updated successfully!`);
    console.log(`    Public ID: ${verifyRes.public_id} (Unchanged: ${verifyRes.public_id === a.publicId})`);
    console.log(`    Asset Folder: ${verifyRes.asset_folder}`);
    console.log(`    Secure URL: ${verifyRes.secure_url} (Unchanged: ${verifyRes.secure_url === a.expectedUrl})`);
    console.log(`    HTTP Delivery Status: ${headRes.status} OK\n`);

    if (verifyRes.public_id !== a.publicId) {
      console.error(`✗ Public ID changed unexpectedly for ${a.name}!`);
      process.exit(1);
    }
    if (verifyRes.asset_folder !== targetFolder) {
      console.error(`✗ Asset folder mismatch for ${a.name}!`);
      process.exit(1);
    }
    if (headRes.status !== 200) {
      console.error(`✗ Delivery URL not 200 OK for ${a.name}!`);
      process.exit(1);
    }

    results.push({
      name: a.name,
      publicId: verifyRes.public_id,
      assetId: verifyRes.asset_id,
      assetFolder: verifyRes.asset_folder,
      secureUrl: verifyRes.secure_url,
      httpStatus: headRes.status,
      unchangedPublicId: true,
      unchangedUrl: true
    });
  } catch (err) {
    console.error(`✗ Error updating ${a.name}:`, err.message);
    process.exit(1);
  }
}

// Check dormant asset
const dormant = await cloudinary.api.resource('earth-heritage/projects/nairuthya-project-overview');
console.log('Dormant asset check:');
console.log(`  Public ID: ${dormant.public_id} (Untouched)`);
console.log(`  Asset Folder: ${dormant.asset_folder} (Untouched)`);

fs.writeFileSync('scratch/nairuthya_asset_folder_update_results.json', JSON.stringify({
  targetFolder,
  results,
  dormant: {
    publicId: dormant.public_id,
    assetFolder: dormant.asset_folder,
    untouched: true
  }
}, null, 2));

console.log('\nAll 6 assets now successfully assigned to Media Library asset folder: ' + targetFolder);
