import fs from 'fs';

const batch5 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-5-migration.json', 'utf8'));

const replacements = batch5.migratedAssets.map(asset => ({
  local: asset.localPath.replace(/^public/, ''),
  cloudinary: asset.secureUrl,
  canonicalTarget: asset.canonicalTarget || null,
  isCanonical: asset.isCanonical
}));

console.log(`Prepared ${replacements.length} replacement mappings from Batch 5.\n`);
replacements.forEach(r => {
  console.log(`  ${r.local} -> ${r.cloudinary}`);
});

const targetFiles = [
  'data/galleryImages.js',
  'data/projects.js',
  'data/events.js',
  'data/farmManagementImages.js',
  'data/landingImages.js',
  'data/managedFarmlandImages.js',
  'components/sections/home/HomeEvents.js',
  'components/sections/home/HomeStories.js',
  'components/sections/gallery/GalleryPhilosophy.js',
  'components/sections/landing/ManagedFarmlandHero.js'
];

let totalReplacements = 0;
const modifiedFiles = [];

for (const filePath of targetFiles) {
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping non-existent file: ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let fileModified = false;
  let fileReplacementsCount = 0;

  for (const { local, cloudinary } of replacements) {
    if (content.includes(local)) {
      const occurrences = content.split(local).length - 1;
      content = content.replaceAll(local, cloudinary);
      fileReplacementsCount += occurrences;
      fileModified = true;
    }
  }

  if (fileModified) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedFiles.push({ filePath, count: fileReplacementsCount });
    totalReplacements += fileReplacementsCount;
    console.log(`\nUpdated ${filePath}: ${fileReplacementsCount} replacement(s)`);
  }
}

console.log('\n=============================================');
console.log(`Batch 5 Application References Updated!`);
console.log(`Total replacements: ${totalReplacements}`);
console.log(`Modified files count: ${modifiedFiles.length}`);
console.log('=============================================');
