import fs from 'fs';

const pilot1 = JSON.parse(fs.readFileSync('docs/cloudinary-pilot-migration.json', 'utf8'));
const pilot2 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-2-migration.json', 'utf8'));
const pilot3 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-3-migration.json', 'utf8'));
const pilot4 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-4-migration.json', 'utf8'));
const pilot5 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-5-migration.json', 'utf8'));
const manifest = JSON.parse(fs.readFileSync('docs/cloudinary-migration-manifest.json', 'utf8'));

// Combine all migrated paths
const allMigratedMap = new Map();
pilot1.migratedAssets.forEach(a => allMigratedMap.set(a.localPath, { ...a, batch: 'Pilot (Step 7)' }));
pilot2.migratedAssets.forEach(a => allMigratedMap.set(a.localPath, { ...a, batch: 'Batch 2 (Step 8)' }));
pilot3.migratedAssets.forEach(a => allMigratedMap.set(a.localPath, { ...a, batch: 'Batch 3 (Step 9)' }));
pilot4.migratedAssets.forEach(a => allMigratedMap.set(a.localPath, { ...a, batch: 'Batch 4 (Step 10)' }));
pilot5.migratedAssets.forEach(a => allMigratedMap.set(a.localPath, { ...a, batch: 'Batch 5 (Step 11)' }));

console.log('Total migrated paths to date across all batches:', allMigratedMap.size);

const canonicalUploadsCount = Array.from(allMigratedMap.values()).filter(a => a.isCanonical).length;
const consolidatedDuplicatesCount = allMigratedMap.size - canonicalUploadsCount;
console.log(`Canonical uploads: ${canonicalUploadsCount}, Consolidated duplicates: ${consolidatedDuplicatesCount}`);

// Update JSON manifest summary
manifest.summary.pilotMigratedCount = allMigratedMap.size;
manifest.summary.notYetMigratedCount = manifest.cloudinaryCandidates.length - allMigratedMap.size;
manifest.summary.batch2MigratedCount = pilot2.migratedAssets.length;
manifest.summary.batch3MigratedCount = pilot3.migratedAssets.length;
manifest.summary.batch4MigratedCount = pilot4.migratedAssets.length;
manifest.summary.batch5MigratedCount = pilot5.migratedAssets.length;

manifest.cloudinaryCandidates.forEach(item => {
  if (allMigratedMap.has(item.localPath)) {
    const info = allMigratedMap.get(item.localPath);
    item.migrationStatus = 'PILOT_MIGRATED';
    item.cloudinarySecureUrl = info.secureUrl;
    item.isCanonical = info.isCanonical;
    item.migrationBatch = info.batch;
    if (info.canonicalTarget) {
      item.canonicalTarget = info.canonicalTarget;
    }
  } else {
    item.migrationStatus = 'NOT_YET_MIGRATED';
  }
});

fs.writeFileSync('docs/cloudinary-migration-manifest.json', JSON.stringify(manifest, null, 2));
console.log('Updated docs/cloudinary-migration-manifest.json');

// Update Markdown manifest
let md = fs.readFileSync('docs/cloudinary-migration-manifest.md', 'utf8');

// Update Summary block
const oldSummaryRegex = /## Summary[\s\S]*?(?=---)/;
const newSummaryBlock = `## Summary
- **Total Image Assets Scanned:** 91
- **Total Candidates for Cloudinary Migration:** 75
- **Migrated Assets (Pilot + Batches 2–5):** ${allMigratedMap.size} (${canonicalUploadsCount} canonical Cloudinary uploads + ${consolidatedDuplicatesCount} consolidated duplicate paths)
- **Remaining Candidates (Not Yet Migrated):** ${manifest.summary.notYetMigratedCount}
- **Total Core Assets to Keep Local:** 16
- **Exact Content Duplicate Groups:** 12 (24 total file paths sharing identical binary content)
- **Filename Collision Groups:** 1 (\`intro-farmland.jpg\`)
- **Assets Reused Across Multiple Code Locations:** 36
- **Total Candidate Media Size:** 57.31 MB
- **Total Local Core Media Size:** 1570.0 KB

`;

md = md.replace(oldSummaryRegex, newSummaryBlock);

// Update status in Candidate Table
manifest.cloudinaryCandidates.forEach(item => {
  const lineRegex = new RegExp(`(\\| \`${item.localPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\` [^|]+ \\| [^|]+ \\| [^|]+ \\| [^|]+ \\| [^|]+ \\| )\x60[A-Z_]+\x60( \\|)`);
  if (lineRegex.test(md)) {
    md = md.replace(lineRegex, `$1\`${item.migrationStatus}\`$2`);
  }
});

// Update Status Section
const oldStatusSectionRegex = /## Migrated Assets Status[\s\S]*?(?=## Cloudinary Candidates)/;
const newStatusSection = `## Migrated Assets Status (Pilot + Batches 2–5)
The following ${allMigratedMap.size} local image paths (${canonicalUploadsCount} canonical Cloudinary assets + ${consolidatedDuplicatesCount} consolidated duplicate paths) have been migrated to Cloudinary across Step 7 (Pilot), Step 8 (Batch 2), Step 9 (Batch 3), Step 10 (Batch 4), and Step 11 (Batch 5). All assets have been verified with HTTP 200 via Next.js \`/_next/image\` optimization, ESLint, and production build.

| Local Asset Path | Cloudinary Folder | Cloudinary Public ID | Cloudinary Secure URL | Status | Batch | Role |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
${Array.from(allMigratedMap.values()).map(a => `| \`${a.localPath}\` | \`${a.cloudinaryFolder}\` | \`${a.publicId}\` | [Link](${a.secureUrl}) | \`${a.migrationStatus}\` | ${a.batch} | ${a.isCanonical ? 'Canonical Upload' : 'Consolidated Duplicate -> \`' + (a.canonicalTarget || 'canonical') + '\`'} |`).join('\n')}

---

`;

if (oldStatusSectionRegex.test(md)) {
  md = md.replace(oldStatusSectionRegex, newStatusSection);
} else {
  md = md.replace('## Cloudinary Candidates', newStatusSection + '## Cloudinary Candidates');
}

fs.writeFileSync('docs/cloudinary-migration-manifest.md', md);
console.log('Updated docs/cloudinary-migration-manifest.md');
