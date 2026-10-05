import fs from 'fs';

// Load batch 3 migration output to get exact secure URLs
const batch3 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-3-migration.json', 'utf8'));

// Build replacement map from localPath to secureUrl
const replacements = batch3.migratedAssets.map(asset => ({
  local: asset.localPath.replace(/^public/, ''),
  cloudinary: asset.secureUrl,
  canonicalTarget: asset.canonicalTarget || null,
  isCanonical: asset.isCanonical
}));

console.log(`Prepared ${replacements.length} replacement mappings from Batch 3.\n`);
replacements.forEach(r => {
  console.log(`  ${r.local} -> ${r.cloudinary}${r.isCanonical ? '' : ' (Consolidated duplicate)'}`);
});

// Candidate files that may contain these references
const targetFiles = [
  'data/projects.js',
  'data/galleryImages.js',
  'data/howItWorksData.js',
  'data/howItWorksImages.js',
  'data/farmManagementImages.js',
  'data/landingImages.js',
  'data/managedFarmlandImages.js',
  'data/blogs.js',
  'data/events.js',
  'components/sections/home/HomeHowItWorks.js',
  'components/sections/home/HomeStories.js',
  'components/sections/home/HomeEvents.js'
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
      // Replace all occurrences of local path with Cloudinary URL
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
console.log(`Batch 3 Application References Updated!`);
console.log(`Total replacements: ${totalReplacements}`);
console.log(`Modified files count: ${modifiedFiles.length}`);
console.log('=============================================');
