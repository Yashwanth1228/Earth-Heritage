import fs from 'fs';

const manifest = JSON.parse(fs.readFileSync('docs/cloudinary-migration-manifest.json', 'utf8'));

// Filter unmigrated candidates
const unmigrated = manifest.cloudinaryCandidates.filter(c => c.migrationStatus !== 'PILOT_MIGRATED');

console.log(`Total remaining candidates: ${unmigrated.length}`);

// Group by duplicate group
const dupGroups = manifest.contentDuplicates || [];
console.log('\n--- Duplicate Groups Status ---');
dupGroups.forEach((dg, i) => {
  const fileStatuses = dg.files.map(f => {
    const cand = manifest.cloudinaryCandidates.find(c => c.localPath === f);
    return { path: f, status: cand ? cand.migrationStatus : 'UNKNOWN' };
  });
  console.log(`Duplicate Group ${i + 1} (${dg.sha256.substring(0, 10)}...):`);
  fileStatuses.forEach(fs => console.log(`  - ${fs.path} [${fs.status}]`));
});

console.log('\n--- Remaining Candidates by Folder & Size ---');
const byFolder = {};
unmigrated.forEach(u => {
  const folder = u.proposedCloudinaryFolder;
  byFolder[folder] = byFolder[folder] || [];
  byFolder[folder].push(u);
});

for (const [folder, items] of Object.entries(byFolder)) {
  console.log(`\nFolder: ${folder} (${items.length} candidates)`);
  items.sort((a, b) => b.fileSize - a.fileSize).forEach(item => {
    console.log(`  ${item.localPath} | ${(item.fileSize / 1024).toFixed(1)} KB | usages: ${item.usageCount} | dupGroup: ${item.duplicateGroup || 'none'}`);
  });
}
