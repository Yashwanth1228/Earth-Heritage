import fs from 'fs';

const routes = [
  '/',
  '/projects',
  '/projects/coconut-garden',
  '/projects/nairuthya-whispering-wood',
  '/managed-farmland',
  '/farm-management',
  '/about',
  '/gallery',
  '/how-it-works',
  '/blogs',
  '/events',
  '/cloudinary-test'
];

console.log('=== STEP 9: VERIFY AFFECTED ROUTES ===\n');

let allRoutesOk = true;
const routeResults = [];

for (const route of routes) {
  const url = `http://localhost:3000${route}`;
  try {
    const res = await fetch(url);
    if (res.status === 200) {
      console.log(`✓ [HTTP ${res.status}] ${route}`);
      routeResults.push({ route, status: res.status });
    } else {
      console.error(`✗ [HTTP ${res.status}] ${route}`);
      routeResults.push({ route, status: res.status });
      allRoutesOk = false;
    }
  } catch (err) {
    console.error(`✗ Error requesting ${route}:`, err.message);
    routeResults.push({ route, status: 'ERROR', error: err.message });
    allRoutesOk = false;
  }
}

if (!allRoutesOk) {
  console.error('\nRoute verification failed!');
  process.exit(1);
}

console.log('\nAll affected routes returned HTTP 200 OK!\n');

console.log('=== STEP 10: NEXT.JS IMAGE OPTIMIZATION VERIFICATION (/_next/image) ===\n');

const representativeImages = [
  {
    name: 'Camping Area (Amenities - JPG 1.14 MB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791204894/earth-heritage/amenities/camping-area.jpg',
    originalBytes: 1168467
  },
  {
    name: 'Swimming Pool (Amenities - JPG 1.09 MB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791204914/earth-heritage/amenities/swimming-pool.jpg',
    originalBytes: 1115194
  },
  {
    name: 'Responsible Care (Farm Management - JPG 1.02 MB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791204920/earth-heritage/farm-management/responsible-care.jpg',
    originalBytes: 1039398
  },
  {
    name: 'Nature Responsibility (Managed Farmland - JPG 1.05 MB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791204922/earth-heritage/managed-farmland/nature-responsibility.jpg',
    originalBytes: 1072956
  },
  {
    name: 'Intro Farmland (About - JPG 1.02 MB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791204925/earth-heritage/about/intro-farmland.jpg',
    originalBytes: 1041997
  },
  {
    name: 'Principles Land (Landing - JPG 1.10 MB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791204926/earth-heritage/landing/principles-land.jpg',
    originalBytes: 1128707
  }
];

let allImagesOk = true;
const optResults = [];

for (const img of representativeImages) {
  const optUrl = `http://localhost:3000/_next/image?url=${encodeURIComponent(img.url)}&w=1080&q=75`;
  try {
    const res = await fetch(optUrl, {
      headers: {
        'Accept': 'image/webp,image/avif,image/*,*/*'
      }
    });
    const contentType = res.headers.get('content-type');
    const buf = await res.arrayBuffer();
    const optBytes = buf.byteLength;
    const reductionPercent = ((1 - optBytes / img.originalBytes) * 100).toFixed(1);

    if (res.status === 200) {
      console.log(`✓ [HTTP 200] ${img.name}`);
      console.log(`    Format: ${contentType}, Optimized Size: ${(optBytes / 1024).toFixed(1)} KB (vs ${(img.originalBytes / 1024).toFixed(1)} KB) -> ${reductionPercent}% reduction`);
      optResults.push({
        name: img.name,
        url: img.url,
        status: res.status,
        format: contentType,
        originalBytes: img.originalBytes,
        optimizedBytes: optBytes,
        reductionPercent: `${reductionPercent}%`
      });
    } else {
      console.error(`✗ [HTTP ${res.status}] ${img.name}: Failed to optimize!`);
      allImagesOk = false;
    }
  } catch (err) {
    console.error(`✗ Error requesting optimization for ${img.name}:`, err.message);
    allImagesOk = false;
  }
}

if (!allImagesOk) {
  console.error('\nImage optimization verification failed!');
  process.exit(1);
}

console.log('\nAll representative images successfully optimized via Next.js with HTTP 200 OK!');

// Update docs/cloudinary-batch-4-migration.json with full report
const b4 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-4-migration.json', 'utf8'));
b4.routeVerification = {
  verifiedAt: new Date().toISOString(),
  allPassed: true,
  routes: routeResults
};
b4.imageOptimizationVerification = {
  allPassed: true,
  representativeImages: optResults
};
b4.applicationChanges = {
  totalReferencesReplaced: 28,
  modifiedFilesCount: 9,
  filesModified: [
    'data/projects.js (13 replacements)',
    'data/landingImages.js (3 replacements)',
    'data/farmManagementImages.js (2 replacements)',
    'data/managedFarmlandImages.js (2 replacements)',
    'components/projects/ProjectDetailGallery.js (2 replacements)',
    'components/sections/home/HomeAbout.js (2 replacements)',
    'components/sections/home/HomeStories.js (2 replacements)',
    'data/aboutImages.js (1 replacement)',
    'components/sections/home/HomeManagedFarmland.js (1 replacement)'
  ]
};

fs.writeFileSync('docs/cloudinary-batch-4-migration.json', JSON.stringify(b4, null, 2));
console.log('\nUpdated docs/cloudinary-batch-4-migration.json with full verification results.');
