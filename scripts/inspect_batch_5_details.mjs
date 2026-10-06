import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const batch5Selection = [
  {
    localPath: 'public/images/gallery/nairuthya-02-stone-terraces.jpg',
    folder: 'earth-heritage/gallery',
    publicId: 'nairuthya-02-stone-terraces'
  },
  {
    localPath: 'public/images/gallery/nairuthya-03-plots-irrigation.jpg',
    folder: 'earth-heritage/gallery',
    publicId: 'nairuthya-03-plots-irrigation'
  },
  {
    localPath: 'public/images/gallery/nairuthya-04-children-play.jpg',
    folder: 'earth-heritage/gallery',
    publicId: 'nairuthya-04-children-play'
  },
  {
    localPath: 'public/images/gallery/nairuthya-05-elevated-vista.jpg',
    folder: 'earth-heritage/gallery',
    publicId: 'nairuthya-05-elevated-vista'
  },
  {
    localPath: 'public/images/gallery/nairuthya-06-outdoor-fitness.jpg',
    folder: 'earth-heritage/gallery',
    publicId: 'nairuthya-06-outdoor-fitness'
  },
  {
    localPath: 'public/images/landing/manage-02-crop.jpg',
    folder: 'earth-heritage/landing',
    publicId: 'manage-02-crop'
  },
  {
    localPath: 'public/images/landing/manage-03-cultivation.jpg',
    folder: 'earth-heritage/landing',
    publicId: 'manage-03-cultivation'
  },
  {
    localPath: 'public/images/landing/manage-04-care.jpg',
    folder: 'earth-heritage/landing',
    publicId: 'manage-04-care'
  },
  {
    localPath: 'public/images/landing/manage-05-operations.jpg',
    folder: 'earth-heritage/landing',
    publicId: 'manage-05-operations'
  },
  {
    localPath: 'public/images/landing/philosophy-panorama.jpg',
    folder: 'earth-heritage/landing',
    publicId: 'philosophy-panorama'
  },
  {
    localPath: 'public/images/landing/hero-villa-retreat.jpg',
    folder: 'earth-heritage/landing',
    publicId: 'hero-villa-retreat'
  },
  {
    localPath: 'public/images/landing/hero-farmland-estate.jpg',
    folder: 'earth-heritage/landing',
    publicId: 'hero-farmland-estate'
  },
  {
    localPath: 'public/images/landing/hero-landscape.jpg',
    folder: 'earth-heritage/landing',
    publicId: 'hero-landscape'
  }
];

// Check all files and references
const webPaths = batch5Selection.map(s => s.localPath.replace(/^public/, ''));

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.mjs') || file.endsWith('.json')) {
      results.push(fullPath);
    }
  });
  return results;
}

const allFiles = [...getFiles('data'), ...getFiles('components'), ...getFiles('app')];

console.log(`Checking ${batch5Selection.length} selected candidates for Batch 5...\n`);

let totalBytes = 0;
batch5Selection.forEach(item => {
  const fileExists = fs.existsSync(item.localPath);
  const buf = fs.readFileSync(item.localPath);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  totalBytes += buf.length;

  const wp = item.localPath.replace(/^public/, '');
  const usages = [];
  allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(wp)) {
      usages.push(file.replace(/\\/g, '/'));
    }
  });

  console.log(`[${fileExists ? 'OK' : 'MISSING'}] ${item.localPath} (${(buf.length / 1024).toFixed(1)} KB)`);
  console.log(`  Cloudinary Target: ${item.folder}/${item.publicId}`);
  console.log(`  SHA-256: ${hash.substring(0, 16)}...`);
  console.log(`  Usages (${usages.length}):`);
  usages.forEach(u => console.log(`    - ${u}`));
  console.log('');
});

console.log(`Total original size: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
