import fs from 'fs';

const manifest = JSON.parse(fs.readFileSync('docs/cloudinary-migration-manifest.json', 'utf8'));
const pilot = JSON.parse(fs.readFileSync('docs/cloudinary-pilot-migration.json', 'utf8'));

const pilotPaths = new Set(pilot.migratedAssets.map(a => a.localPath));
const unmigrated = manifest.cloudinaryCandidates.filter(c => !pilotPaths.has(c.localPath));

console.log('Total unmigrated candidates:', unmigrated.length);

const byFolder = {};
unmigrated.forEach(u => {
  byFolder[u.proposedCloudinaryFolder] = byFolder[u.proposedCloudinaryFolder] || [];
  byFolder[u.proposedCloudinaryFolder].push(u);
});

for (const [folder, items] of Object.entries(byFolder)) {
  console.log(`\n=== ${folder} (${items.length} items) ===`);
  items.sort((a, b) => b.fileSize - a.fileSize).forEach(item => {
    console.log(`  ${item.localPath} | ${item.fileSizeFormatted} | usages: ${item.usageCount}`);
  });
}
