import fs from 'fs';

const batch4 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-4-migration.json', 'utf8'));

const replacements = batch4.migratedAssets.map(asset => ({
  local: asset.localPath.replace(/^public/, ''),
  cloudinary: asset.secureUrl,
  canonicalTarget: asset.canonicalTarget || null,
  isCanonical: asset.isCanonical
}));

console.log(`Prepared ${replacements.length} replacement mappings from Batch 4.\n`);
replacements.forEach(r => {
  console.log(`  ${r.local} -> ${r.cloudinary}`);
});

const targetFiles = [
  'data/projects.js',
  'data/farmManagementImages.js',
  'data/managedFarmlandImages.js',
  'data/aboutImages.js',
  'data/aboutData.js',
  'data/landingImages.js',
  'components/projects/ProjectDetailGallery.js',
  'components/sections/home/HomeAbout.js',
  'components/sections/home/HomeStories.js',
  'components/sections/home/HomeManagedFarmland.js'
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
console.log(`Batch 4 Application References Updated!`);
console.log(`Total replacements: ${totalReplacements}`);
console.log(`Modified files count: ${modifiedFiles.length}`);
console.log('=============================================');
