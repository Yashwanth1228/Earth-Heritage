import fs from 'fs';
import crypto from 'crypto';

const batch2 = [
  { canonical: 'public/images/projects/coconut-garden/entrance-gate.jpg', folder: 'earth-heritage/projects/coconut-garden', publicId: 'entrance-gate', dups: [] },
  { canonical: 'public/images/projects/coconut-garden-hero.jpg', folder: 'earth-heritage/projects', publicId: 'coconut-garden-hero', dups: [] },
  { canonical: 'public/images/gallery/experiences-gathering.jpg', folder: 'earth-heritage/gallery', publicId: 'experiences-gathering', dups: [] },
  { canonical: 'public/images/amenities/garden-area.jpg', folder: 'earth-heritage/amenities', publicId: 'garden-area', dups: [] },
  { canonical: 'public/images/plantations/red-sandal.jpg', folder: 'earth-heritage/plantations', publicId: 'red-sandal', dups: [] },
  { canonical: 'public/images/plantations/mahogany.jpg', folder: 'earth-heritage/plantations', publicId: 'mahogany', dups: [] },
  { canonical: 'public/images/landing/cta-landscape.jpg', folder: 'earth-heritage/landing', publicId: 'cta-landscape', dups: ['public/images/how-it-works/stage-06-continue.jpg'] },
  { canonical: 'public/images/managed-farmland/intro-farmland.jpg', folder: 'earth-heritage/managed-farmland', publicId: 'intro-farmland', dups: ['public/images/how-it-works/stage-02-plan.jpg'] },
  { canonical: 'public/images/farm-management/people-and-land.jpg', folder: 'earth-heritage/farm-management', publicId: 'people-and-land', dups: ['public/images/how-it-works/stage-03-work.jpg'] },
  { canonical: 'public/images/about/founder-sathish-agastya.jpg', folder: 'earth-heritage/about', publicId: 'founder-sathish-agastya', dups: ['public/images/about/founder-sathish-agastya-hq.jpg'] },
  { canonical: 'public/images/campaign/gandhi-jayanti-2026.jpg', folder: 'earth-heritage/campaign', publicId: 'gandhi-jayanti-2026', dups: [] }
];

console.log('Verifying Batch 2 assets:');
let totalBytes = 0;
batch2.forEach((item, idx) => {
  const buf = fs.readFileSync(item.canonical);
  totalBytes += buf.length;
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  console.log(`[${idx+1}] ${item.canonical} (${(buf.length/1024).toFixed(1)} KB) -> ${item.folder}/${item.publicId}`);
  item.dups.forEach(d => {
    const dBuf = fs.readFileSync(d);
    const dHash = crypto.createHash('sha256').update(dBuf).digest('hex');
    const match = hash === dHash;
    console.log(`    Duplicate: ${d} | Hash match: ${match}`);
  });
});
console.log('Total payload size:', (totalBytes / (1024 * 1024)).toFixed(2), 'MB');
