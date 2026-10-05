import fs from 'fs';

const batch3 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-3-migration.json', 'utf8'));

const routes = [
  '/',
  '/projects',
  '/projects/coconut-garden',
  '/projects/nairuthya-whispering-wood',
  '/how-it-works',
  '/gallery',
  '/managed-farmland',
  '/farm-management',
  '/blogs',
  '/blogs/titled-ownership-and-rural-legacy',
  '/events',
  '/cloudinary-test'
];

console.log('=== STEP 8: VERIFY AFFECTED ROUTES ===\n');

let allRoutesOk = true;

for (const route of routes) {
  const url = `http://localhost:3000${route}`;
  try {
    const res = await fetch(url);
    if (res.status === 200) {
      console.log(`✓ [HTTP ${res.status}] ${route}`);
    } else {
      console.error(`✗ [HTTP ${res.status}] ${route}`);
      allRoutesOk = false;
    }
  } catch (err) {
    console.error(`✗ Error requesting ${route}:`, err.message);
    allRoutesOk = false;
  }
}

if (!allRoutesOk) {
  console.error('\nRoute verification failed!');
  process.exit(1);
}

console.log('\nAll affected routes returned HTTP 200 OK!\n');

console.log('=== STEP 9: NEXT.JS IMAGE OPTIMIZATION VERIFICATION (/_next/image) ===\n');

// Pick representative Batch 3 images across folders
const representativeImages = [
  {
    name: 'Boundary Plantation Wall (Projects - Coconut Garden PNG)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791203224/earth-heritage/projects/coconut-garden/boundary-plantation-wall.png'
  },
  {
    name: 'Coconut (Plantations - JPG 1.07MB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791203240/earth-heritage/plantations/coconut.jpg'
  },
  {
    name: 'Hero Feature (Gallery / How It Works - JPG 826KB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791203262/earth-heritage/gallery/hero-feature.jpg'
  },
  {
    name: 'Children Play Area (Amenities - JPG 1.20MB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791203273/earth-heritage/amenities/children-play-area.jpg'
  },
  {
    name: 'Responsible Care Panorama (How It Works - JPG 1.01MB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791203281/earth-heritage/how-it-works/responsible-care-panorama.jpg'
  },
  {
    name: 'Manage 06 Harvest (Landing / How It Works - JPG 175KB)',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791203282/earth-heritage/landing/manage-06-harvest.jpg'
  }
];

let allImagesOk = true;

for (const img of representativeImages) {
  const optUrl = `http://localhost:3000/_next/image?url=${encodeURIComponent(img.url)}&w=1080&q=75`;
  try {
    const res = await fetch(optUrl, {
      headers: {
        'Accept': 'image/webp,image/avif,image/*,*/*'
      }
    });
    const contentType = res.headers.get('content-type');
    const contentLength = res.headers.get('content-length') || (await res.arrayBuffer()).byteLength;
    if (res.status === 200) {
      console.log(`✓ [HTTP 200] ${img.name}`);
      console.log(`    Content-Type: ${contentType}, Size: ${(contentLength / 1024).toFixed(1)} KB`);
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
