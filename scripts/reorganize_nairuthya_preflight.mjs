process.loadEnvFile('.env.local');
const { cloudinary, isCloudinaryConfigured } = await import('../lib/cloudinary.js');
import fs from 'fs';
import path from 'path';

if (!isCloudinaryConfigured) {
  console.error('Cloudinary is not configured.');
  process.exit(1);
}

console.log('=== PHASE 1 — READ-ONLY PREFLIGHT ===\n');

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

// 1. Check current assets existence in Cloudinary
console.log('1. Checking current Cloudinary assets existence & reachability:');
for (const item of migrationTargets) {
  try {
    const resource = await cloudinary.api.resource(item.currentPublicId);
    const headRes = await fetch(item.currentUrl, { method: 'HEAD' });
    console.log(`✓ [EXISTS & HTTP ${headRes.status}] ${item.currentPublicId} (${resource.format}, ${resource.width}x${resource.height}, ${(resource.bytes/1024).toFixed(1)} KB)`);
    item.resourceInfo = resource;
  } catch (err) {
    console.error(`✗ [ERROR] Could not fetch resource ${item.currentPublicId}:`, err.message);
    process.exit(1);
  }
}

// 2. Check target public IDs in Cloudinary (must NOT exist)
console.log('\n2. Confirming target public IDs do not already exist in Cloudinary:');
for (const item of migrationTargets) {
  try {
    const exists = await cloudinary.api.resource(item.targetPublicId);
    console.error(`✗ CONFLICT: Target public ID already exists: ${item.targetPublicId}!`);
    process.exit(1);
  } catch (err) {
    if (err.error && err.error.http_code === 404 || err.status === 404 || err.http_code === 404) {
      console.log(`✓ Target available: ${item.targetPublicId}`);
    } else {
      console.error(`Unexpected error checking ${item.targetPublicId}:`, err.message);
      process.exit(1);
    }
  }
}

// 3. Confirm dormant asset nairuthya-project-overview is untouched and unreferenced
console.log('\n3. Checking dormant asset earth-heritage/projects/nairuthya-project-overview:');
try {
  const dormant = await cloudinary.api.resource('earth-heritage/projects/nairuthya-project-overview');
  console.log(`✓ Dormant asset exists in Cloudinary: ${dormant.public_id} (${dormant.format}, ${(dormant.bytes/1024).toFixed(1)} KB)`);
} catch (err) {
  console.error(`✗ Could not find dormant asset:`, err.message);
}

// 4. Scan repository for all occurrences of current public IDs & URLs
console.log('\n4. Scanning repository for references to the 6 assets:');
function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!['node_modules', '.next', '.git', 'scratch'].includes(file)) {
        results = results.concat(getFiles(fullPath));
      }
    } else if (/\.(js|jsx|ts|tsx|json|mjs|html|css)$/.test(file)) {
      results.push(fullPath.replace(/\\/g, '/'));
    }
  });
  return results;
}

const prodFiles = ['app', 'components', 'data', 'config', 'lib'].flatMap(getFiles);

const repoRefMap = {};
migrationTargets.forEach(t => {
  repoRefMap[t.currentPublicId] = [];
  const searchKey = path.basename(t.currentPublicId);
  prodFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(t.currentPublicId) || content.includes(searchKey)) {
      repoRefMap[t.currentPublicId].push(file);
    }
  });
  console.log(`- ${t.currentPublicId} referenced in ${repoRefMap[t.currentPublicId].length} files:`);
  repoRefMap[t.currentPublicId].forEach(f => console.log(`    * ${f}`));
});

// Check if dormant overview is referenced anywhere in prodFiles
const dormantRefs = [];
prodFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('nairuthya-project-overview')) {
    dormantRefs.push(file);
  }
});
console.log(`\nDormant asset "nairuthya-project-overview" references in production files: ${dormantRefs.length}`);
if (dormantRefs.length === 0) {
  console.log('✓ Confirmed: nairuthya-project-overview is completely unreferenced in production code.');
} else {
  console.log('  References found:', dormantRefs);
}

fs.writeFileSync('scratch/nairuthya_preflight_results.json', JSON.stringify({
  migrationTargets,
  repoRefMap,
  dormantRefs
}, null, 2));

console.log('\nPhase 1 Preflight completed successfully. All conditions met!');
