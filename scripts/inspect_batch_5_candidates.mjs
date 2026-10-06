import fs from 'fs';

const manifest = JSON.parse(fs.readFileSync('docs/cloudinary-migration-manifest.json', 'utf8'));

const unmigrated = manifest.cloudinaryCandidates.filter(c => c.migrationStatus !== 'PILOT_MIGRATED');

console.log(`Total remaining unmigrated candidates: ${unmigrated.length}\n`);

// Group by folder
const byFolder = {};
unmigrated.forEach(u => {
  const folder = u.proposedCloudinaryFolder;
  byFolder[folder] = byFolder[folder] || [];
  byFolder[folder].push(u);
});

for (const [folder, items] of Object.entries(byFolder)) {
  console.log(`=== ${folder} (${items.length} items) ===`);
  items.sort((a, b) => b.fileSize - a.fileSize).forEach(item => {
    console.log(`  ${item.localPath} | ${(item.fileSize / 1024).toFixed(1)} KB | usages: ${item.usageCount}`);
  });
  console.log('');
}
