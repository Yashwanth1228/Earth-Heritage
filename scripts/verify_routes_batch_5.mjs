import fs from 'fs';

const routes = [
  '/',
  '/projects',
  '/projects/coconut-garden',
  '/projects/nairuthya-whispering-wood',
  '/gallery',
  '/managed-farmland',
  '/farm-management',
  '/events',
  '/about',
  '/how-it-works',
  '/blogs',
  '/lp/managed-farmland',
  '/cloudinary-test'
];

console.log('=== STEP 11: VERIFY AFFECTED PRODUCTION ROUTES ===\n');

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

console.log('=== STEP 12: NEXT.JS IMAGE OPTIMIZATION VERIFICATION (/_next/image) ===\n');

const representativeImages = [
  {
    name: 'Nairuthya 02 Stone Terraces (Gallery - JPG 211 KB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262711/earth-heritage/gallery/nairuthya-02-stone-terraces.jpg',
    originalBytes: 216407
  },
  {
    name: 'Nairuthya 04 Children Play (Gallery - JPG 237 KB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262717/earth-heritage/gallery/nairuthya-04-children-play.jpg',
    originalBytes: 242185
  },
  {
    name: 'Manage 02 Crop (Landing - JPG 122 KB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262723/earth-heritage/landing/manage-02-crop.jpg',
    originalBytes: 125274
  },
  {
    name: 'Manage 04 Care (Landing - JPG 738 KB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262732/earth-heritage/landing/manage-04-care.jpg',
    originalBytes: 755215
  },
  {
    name: 'Philosophy Panorama (Landing - JPG 652 KB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262740/earth-heritage/landing/philosophy-panorama.jpg',
    originalBytes: 667470
  },
  {
    name: 'Hero Villa Retreat (Landing - JPG 1.01 MB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262746/earth-heritage/landing/hero-villa-retreat.jpg',
    originalBytes: 1032062
  },
  {
    name: 'Hero Landscape (Landing - JPG 597 KB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262751/earth-heritage/landing/hero-landscape.jpg',
    originalBytes: 611185
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

// Update docs/cloudinary-batch-5-migration.json with full report
const b5 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-5-migration.json', 'utf8'));
b5.routeVerification = {
  verifiedAt: new Date().toISOString(),
  allPassed: true,
  routes: routeResults
};
b5.imageOptimizationVerification = {
  allPassed: true,
  representativeImages: optResults
};
b5.applicationChanges = {
  totalReferencesReplaced: 35,
  modifiedFilesCount: 10,
  filesModified: [
    'data/landingImages.js (11 replacements)',
    'data/galleryImages.js (5 replacements)',
    'data/projects.js (5 replacements)',
    'data/farmManagementImages.js (4 replacements)',
    'data/managedFarmlandImages.js (4 replacements)',
    'components/sections/home/HomeStories.js (2 replacements)',
    'data/events.js (1 replacement)',
    'components/sections/home/HomeEvents.js (1 replacement)',
    'components/sections/gallery/GalleryPhilosophy.js (1 replacement)',
    'components/sections/landing/ManagedFarmlandHero.js (1 replacement)'
  ]
};

fs.writeFileSync('docs/cloudinary-batch-5-migration.json', JSON.stringify(b5, null, 2));
console.log('\nUpdated docs/cloudinary-batch-5-migration.json with full verification results.');
