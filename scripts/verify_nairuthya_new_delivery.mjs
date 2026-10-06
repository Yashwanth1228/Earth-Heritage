const newAssets = [
  {
    name: 'Nairuthya Hero',
    publicId: 'earth-heritage/projects/nairuthya-whispering-wood/hero',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/projects/nairuthya-whispering-wood/hero.jpg',
    expectedFormat: 'image/jpeg',
    expectedWidth: 1024,
    expectedHeight: 444
  },
  {
    name: 'Nairuthya Stone Terraces',
    publicId: 'earth-heritage/projects/nairuthya-whispering-wood/stone-terraces',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262711/earth-heritage/projects/nairuthya-whispering-wood/stone-terraces.jpg',
    expectedFormat: 'image/jpeg',
    expectedWidth: 1024,
    expectedHeight: 461
  },
  {
    name: 'Nairuthya Plots & Irrigation',
    publicId: 'earth-heritage/projects/nairuthya-whispering-wood/plots-irrigation',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262714/earth-heritage/projects/nairuthya-whispering-wood/plots-irrigation.jpg',
    expectedFormat: 'image/jpeg',
    expectedWidth: 1024,
    expectedHeight: 461
  },
  {
    name: 'Nairuthya Children Play',
    publicId: 'earth-heritage/projects/nairuthya-whispering-wood/children-play',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262717/earth-heritage/projects/nairuthya-whispering-wood/children-play.jpg',
    expectedFormat: 'image/jpeg',
    expectedWidth: 1024,
    expectedHeight: 461
  },
  {
    name: 'Nairuthya Elevated Vista',
    publicId: 'earth-heritage/projects/nairuthya-whispering-wood/elevated-vista',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262720/earth-heritage/projects/nairuthya-whispering-wood/elevated-vista.jpg',
    expectedFormat: 'image/jpeg',
    expectedWidth: 1024,
    expectedHeight: 461
  },
  {
    name: 'Nairuthya Outdoor Fitness',
    publicId: 'earth-heritage/projects/nairuthya-whispering-wood/outdoor-fitness',
    url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262722/earth-heritage/projects/nairuthya-whispering-wood/outdoor-fitness.jpg',
    expectedFormat: 'image/jpeg',
    expectedWidth: 1024,
    expectedHeight: 461
  }
];

console.log('=== PHASE 5: VERIFY CLOUDINARY DELIVERY URLS ===\n');

for (const a of newAssets) {
  try {
    const res = await fetch(a.url);
    const contentType = res.headers.get('content-type');
    const contentLength = res.headers.get('content-length');
    const buf = await res.arrayBuffer();

    console.log(`✓ [HTTP ${res.status}] ${a.name}`);
    console.log(`  Public ID: ${a.publicId}`);
    console.log(`  Content-Type: ${contentType}`);
    console.log(`  Downloaded Bytes: ${buf.byteLength} (Header: ${contentLength})`);
    console.log(`  URL: ${a.url}\n`);

    if (res.status !== 200 || !contentType.startsWith('image/')) {
      console.error(`✗ FAILED verification for ${a.name}`);
      process.exit(1);
    }
  } catch (err) {
    console.error(`✗ ERROR requesting ${a.url}:`, err.message);
    process.exit(1);
  }
}

console.log('All 6 new Cloudinary URLs verified successfully with HTTP 200 OK and valid image data!');
