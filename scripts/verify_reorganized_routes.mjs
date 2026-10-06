const routes = [
  '/',
  '/about',
  '/gallery',
  '/projects',
  '/projects/nairuthya-whispering-wood',
  '/projects/coconut-garden',
  '/how-it-works',
  '/managed-farmland',
  '/farm-management',
  '/events',
  '/blogs',
  '/lp/managed-farmland',
  '/cloudinary-test'
];

console.log('=== ROUTE VERIFICATION ON PORT 3005 ===\n');

let allRoutesOk = true;
const routeResults = [];

for (const route of routes) {
  const url = `http://localhost:3005${route}`;
  try {
    const res = await fetch(url);
    if (res.status === 200) {
      console.log(`✓ [HTTP 200] ${route}`);
      routeResults.push({ route, status: 200 });
    } else {
      console.error(`✗ [HTTP ${res.status}] ${route}`);
      routeResults.push({ route, status: res.status });
      allRoutesOk = false;
    }
  } catch (err) {
    console.error(`✗ [ERROR] ${route}:`, err.message);
    routeResults.push({ route, status: 'ERROR', error: err.message });
    allRoutesOk = false;
  }
}

console.log(`\nAll Routes Passed: ${allRoutesOk}`);

console.log('\n=== NEXT.JS IMAGE OPTIMIZATION TEST FOR REORGANIZED NAIRUTHYA ASSETS ===\n');

const testImages = [
  {
    name: 'Nairuthya Hero',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/projects/nairuthya-whispering-wood/hero.jpg'
  },
  {
    name: 'Nairuthya Stone Terraces',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262711/earth-heritage/projects/nairuthya-whispering-wood/stone-terraces.jpg'
  },
  {
    name: 'Nairuthya Plots & Irrigation',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262714/earth-heritage/projects/nairuthya-whispering-wood/plots-irrigation.jpg'
  },
  {
    name: 'Nairuthya Children Play',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262717/earth-heritage/projects/nairuthya-whispering-wood/children-play.jpg'
  },
  {
    name: 'Nairuthya Elevated Vista',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262720/earth-heritage/projects/nairuthya-whispering-wood/elevated-vista.jpg'
  },
  {
    name: 'Nairuthya Outdoor Fitness',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262722/earth-heritage/projects/nairuthya-whispering-wood/outdoor-fitness.jpg'
  }
];

let allOptOk = true;

for (const img of testImages) {
  const optUrl = `http://localhost:3005/_next/image?url=${encodeURIComponent(img.url)}&w=1200&q=75`;
  try {
    const res = await fetch(optUrl, {
      headers: {
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    });
    const buf = await res.arrayBuffer();
    const format = res.headers.get('content-type');

    if (res.status === 200 && format && format.startsWith('image/')) {
      console.log(`✓ [HTTP 200] ${img.name}: ${format}, ${(buf.byteLength / 1024).toFixed(1)} KB`);
    } else {
      console.error(`✗ [HTTP ${res.status}] Failed optimizing ${img.name}`);
      allOptOk = false;
    }
  } catch (err) {
    console.error(`✗ Error optimizing ${img.name}:`, err.message);
    allOptOk = false;
  }
}

if (!allRoutesOk || !allOptOk) {
  process.exit(1);
}

console.log('\nAll routes and Next.js image optimizations verified successfully!');
