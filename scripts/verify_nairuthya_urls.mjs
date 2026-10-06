const nairuthyaAssets = [
  {
    name: 'Nairuthya Whispering Wood Hero',
    publicId: 'earth-heritage/projects/nairuthya-whispering-wood-hero',
    folder: 'earth-heritage/projects',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/projects/nairuthya-whispering-wood-hero.jpg',
    sourcePath: 'public/images/projects/nairuthya-whispering-wood-hero.jpg',
    batch: 'Pilot (Step 7)',
    isCanonical: true,
    replacesDuplicate: 'public/images/gallery/nairuthya-01-entrance.jpg'
  },
  {
    name: 'Nairuthya Project Overview',
    publicId: 'earth-heritage/projects/nairuthya-project-overview',
    folder: 'earth-heritage/projects',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791263928/earth-heritage/projects/nairuthya-project-overview.png',
    sourcePath: 'public/images/projects/nairuthya-project-overview.png',
    batch: 'Batch 6 (Step 12)',
    isCanonical: true,
    replacesDuplicate: null
  },
  {
    name: 'Nairuthya 02 Stone Terraces',
    publicId: 'earth-heritage/gallery/nairuthya-02-stone-terraces',
    folder: 'earth-heritage/gallery',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262711/earth-heritage/gallery/nairuthya-02-stone-terraces.jpg',
    sourcePath: 'public/images/gallery/nairuthya-02-stone-terraces.jpg',
    batch: 'Batch 5 (Step 11)',
    isCanonical: true,
    replacesDuplicate: null
  },
  {
    name: 'Nairuthya 03 Plots & Irrigation',
    publicId: 'earth-heritage/gallery/nairuthya-03-plots-irrigation',
    folder: 'earth-heritage/gallery',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262714/earth-heritage/gallery/nairuthya-03-plots-irrigation.jpg',
    sourcePath: 'public/images/gallery/nairuthya-03-plots-irrigation.jpg',
    batch: 'Batch 5 (Step 11)',
    isCanonical: true,
    replacesDuplicate: null
  },
  {
    name: 'Nairuthya 04 Children Play',
    publicId: 'earth-heritage/gallery/nairuthya-04-children-play',
    folder: 'earth-heritage/gallery',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262717/earth-heritage/gallery/nairuthya-04-children-play.jpg',
    sourcePath: 'public/images/gallery/nairuthya-04-children-play.jpg',
    batch: 'Batch 5 (Step 11)',
    isCanonical: true,
    replacesDuplicate: null
  },
  {
    name: 'Nairuthya 05 Elevated Vista',
    publicId: 'earth-heritage/gallery/nairuthya-05-elevated-vista',
    folder: 'earth-heritage/gallery',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262720/earth-heritage/gallery/nairuthya-05-elevated-vista.jpg',
    sourcePath: 'public/images/gallery/nairuthya-05-elevated-vista.jpg',
    batch: 'Batch 5 (Step 11)',
    isCanonical: true,
    replacesDuplicate: null
  },
  {
    name: 'Nairuthya 06 Outdoor Fitness',
    publicId: 'earth-heritage/gallery/nairuthya-06-outdoor-fitness',
    folder: 'earth-heritage/gallery',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262722/earth-heritage/gallery/nairuthya-06-outdoor-fitness.jpg',
    sourcePath: 'public/images/gallery/nairuthya-06-outdoor-fitness.jpg',
    batch: 'Batch 5 (Step 11)',
    isCanonical: true,
    replacesDuplicate: null
  }
];

console.log('=== VERIFYING NAIRUTHYA CLOUDINARY URLS ===\n');

for (const a of nairuthyaAssets) {
  try {
    const res = await fetch(a.url, { method: 'HEAD' });
    const contentType = res.headers.get('content-type');
    const contentLength = res.headers.get('content-length');
    console.log(`✓ [HTTP ${res.status}] ${a.name}`);
    console.log(`  Public ID: ${a.publicId}`);
    console.log(`  Folder: ${a.folder}`);
    console.log(`  Content-Type: ${contentType}, Bytes: ${contentLength}`);
    console.log(`  URL: ${a.url}\n`);
  } catch (err) {
    console.error(`✗ [ERROR] ${a.name}: ${err.message}`);
  }
}
