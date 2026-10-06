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

console.log('=== STEP 8: PRODUCTION ROUTE AUDIT (13 ROUTES) ===\n');

const routeResults = [];
let allRoutesPassed = true;

for (const route of routes) {
  const url = `http://localhost:3000${route}`;
  try {
    const res = await fetch(url);
    if (res.status === 200) {
      console.log(`✓ [HTTP 200] ${route}`);
      routeResults.push({ route, status: 200, ok: true });
    } else {
      console.error(`✗ [HTTP ${res.status}] ${route}`);
      routeResults.push({ route, status: res.status, ok: false });
      allRoutesPassed = false;
    }
  } catch (err) {
    console.error(`✗ [FETCH ERROR] ${route}: ${err.message}`);
    routeResults.push({ route, status: 'ERROR', error: err.message, ok: false });
    allRoutesPassed = false;
  }
}

console.log(`\nRoute Verification: ${allRoutesPassed ? 'ALL 13 PASSED' : 'FAILURES OCCURRED'}\n`);

console.log('=== STEP 9: NEXT.JS IMAGE OPTIMIZATION AUDIT (/_next/image) ===\n');

// Representative Cloudinary assets across different categories and batches
const representativeAssets = [
  {
    name: 'Coconut Garden Hero (Projects - Pilot)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791200705/earth-heritage/projects/coconut-garden-hero.jpg',
    sourceSize: 559400
  },
  {
    name: 'Nature Canopy (Gallery - Pilot)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791200706/earth-heritage/gallery/nature-canopy.jpg',
    sourceSize: 672000
  },
  {
    name: 'Responsible Care Panorama (How It Works - Batch 2)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201957/earth-heritage/how-it-works/responsible-care-panorama.jpg',
    sourceSize: 947400
  },
  {
    name: 'Founder Khushi Jain (About - Batch 3)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/about/founder-khushi-jain.jpg',
    sourceSize: 431911
  },
  {
    name: 'Swimming Pool (Amenities - Batch 4)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791204925/earth-heritage/amenities/swimming-pool.jpg',
    sourceSize: 228000
  },
  {
    name: 'Hero Farmland Estate (Landing - Batch 5)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262749/earth-heritage/landing/hero-farmland-estate.jpg',
    sourceSize: 1017000
  },
  {
    name: 'Statement Landscape (Landing - Batch 6)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791263927/earth-heritage/landing/statement-landscape.jpg',
    sourceSize: 566389
  },
  {
    name: 'Nairuthya Project Overview (Projects - Batch 6)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791263928/earth-heritage/projects/nairuthya-project-overview.png',
    sourceSize: 342407
  }
];

const optResults = [];
let allOptPassed = true;

for (const asset of representativeAssets) {
  const optUrl = `http://localhost:3000/_next/image?url=${encodeURIComponent(asset.url)}&w=1200&q=75`;
  try {
    const res = await fetch(optUrl, {
      headers: {
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    });
    const buffer = await res.arrayBuffer();
    const optSize = buffer.byteLength;
    const format = res.headers.get('content-type');
    const reduction = (((asset.sourceSize - optSize) / asset.sourceSize) * 100).toFixed(1);

    if (res.status === 200) {
      console.log(`✓ [HTTP 200] ${asset.name}`);
      console.log(`  Source: ${(asset.sourceSize / 1024).toFixed(1)} KB | Optimized: ${(optSize / 1024).toFixed(1)} KB (${format}) | Savings: ${reduction}%\n`);
      optResults.push({
        name: asset.name,
        url: asset.url,
        status: 200,
        format,
        sourceBytes: asset.sourceSize,
        optimizedBytes: optSize,
        reductionPercent: `${reduction}%`,
        ok: true
      });
    } else {
      console.error(`✗ [HTTP ${res.status}] ${asset.name}`);
      optResults.push({ name: asset.name, url: asset.url, status: res.status, ok: false });
      allOptPassed = false;
    }
  } catch (err) {
    console.error(`✗ [OPT FETCH ERROR] ${asset.name}: ${err.message}`);
    optResults.push({ name: asset.name, url: asset.url, status: 'ERROR', error: err.message, ok: false });
    allOptPassed = false;
  }
}

fs.writeFileSync('scratch/step_13_route_and_opt_results.json', JSON.stringify({
  routes: routeResults,
  allRoutesPassed,
  optimization: optResults,
  allOptPassed
}, null, 2));

if (!allRoutesPassed || !allOptPassed) {
  process.exit(1);
}
