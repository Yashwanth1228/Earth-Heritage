import fs from 'fs';

const routes = [
  '/',
  '/about',
  '/projects',
  '/projects/coconut-garden',
  '/projects/nairuthya-whispering-wood',
  '/managed-farmland',
  '/farm-management',
  '/how-it-works',
  '/gallery',
  '/blogs',
  '/events',
  '/lp/managed-farmland',
  '/cloudinary-test'
];

console.log('=== STEP 11: VERIFY ALL MAJOR PRODUCTION ROUTES ===\n');

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

console.log('\nAll 13 routes returned HTTP 200 OK!\n');

console.log('=== STEP 12: NEXT.JS IMAGE OPTIMIZATION VERIFICATION (/_next/image) ===\n');

const representativeImages = [
  {
    name: 'Statement Landscape (Landing - JPG 566 KB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791263927/earth-heritage/landing/statement-landscape.jpg',
    originalBytes: 566389
  },
  {
    name: 'Problem Land (Landing - JPG 351 KB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791263925/earth-heritage/landing/problem-land.jpg',
    originalBytes: 350786
  },
  {
    name: 'Philosophy Farmland (About - JPG 984 KB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791263921/earth-heritage/about/philosophy-farmland.jpg',
    originalBytes: 983717
  },
  {
    name: 'Story Farmland (About - JPG 1.24 MB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791263923/earth-heritage/about/story-farmland.jpg',
    originalBytes: 1243881
  },
  {
    name: 'Nairuthya Project Overview (Projects - PNG 342 KB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791263928/earth-heritage/projects/nairuthya-project-overview.png',
    originalBytes: 342407
  }
];

const optimizationResults = [];

for (const img of representativeImages) {
  const optUrl = `http://localhost:3000/_next/image?url=${encodeURIComponent(img.url)}&w=1200&q=75`;
  try {
    const res = await fetch(optUrl, {
      headers: {
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    });
    const buffer = await res.arrayBuffer();
    const optBytes = buffer.byteLength;
    const contentType = res.headers.get('content-type');
    const reductionPercent = (((img.originalBytes - optBytes) / img.originalBytes) * 100).toFixed(1);

    if (res.status === 200) {
      console.log(`✓ [HTTP ${res.status}] ${img.name}`);
      console.log(`  Optimized format: ${contentType}`);
      console.log(`  Source size: ${(img.originalBytes / 1024).toFixed(1)} KB`);
      console.log(`  Optimized size: ${(optBytes / 1024).toFixed(1)} KB`);
      console.log(`  Bandwidth reduction: ${reductionPercent}%\n`);

      optimizationResults.push({
        name: img.name,
        url: img.url,
        status: res.status,
        contentType,
        originalBytes: img.originalBytes,
        optimizedBytes: optBytes,
        reductionPercent: `${reductionPercent}%`
      });
    } else {
      console.error(`✗ [HTTP ${res.status}] Failed optimizing ${img.name}`);
      process.exit(1);
    }
  } catch (err) {
    console.error(`✗ Optimization fetch error for ${img.name}:`, err.message);
    process.exit(1);
  }
}

console.log('Image Optimization verified successfully for all representative assets!');

// Save results to a temporary JSON so we can embed into batch-6-migration.json
fs.writeFileSync('scratch/batch_6_verification_results.json', JSON.stringify({
  routes: routeResults,
  optimization: optimizationResults
}, null, 2));
