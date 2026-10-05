import fs from 'fs';

const pilot1 = JSON.parse(fs.readFileSync('docs/cloudinary-pilot-migration.json', 'utf8'));
const pilot2 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-2-migration.json', 'utf8'));
const manifest = JSON.parse(fs.readFileSync('docs/cloudinary-migration-manifest.json', 'utf8'));

// Combine all migrated paths
const allMigratedMap = new Map();
pilot1.migratedAssets.forEach(a => allMigratedMap.set(a.localPath, { ...a, batch: 'Pilot (Step 7)' }));
pilot2.migratedAssets.forEach(a => allMigratedMap.set(a.localPath, { ...a, batch: 'Batch 2 (Step 8)' }));

console.log('Total migrated paths to date:', allMigratedMap.size);

// Update JSON manifest
manifest.summary.pilotMigratedCount = allMigratedMap.size;
manifest.summary.notYetMigratedCount = manifest.cloudinaryCandidates.length - allMigratedMap.size;
manifest.summary.batch2MigratedCount = pilot2.migratedAssets.length;

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
- **Migrated Assets (Pilot + Batch 2):** ${allMigratedMap.size} (17 canonical Cloudinary uploads + 6 consolidated duplicate paths)
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

// Update Pilot & Batch Migration Status Section
const oldPilotSectionRegex = /## Pilot Batch Migration Status[\s\S]*?(?=## Cloudinary Candidates)/;
const newBatchStatusSection = `## Migrated Assets Status (Pilot + Batch 2)
The following ${allMigratedMap.size} local image paths (17 canonical Cloudinary assets + 6 consolidated duplicate paths) have been migrated to Cloudinary across Step 7 (Pilot) and Step 8 (Batch 2). All assets have been verified with HTTP 200 via Next.js \`/_next/image\` optimization, ESLint, and production build.

| Local Asset Path | Cloudinary Folder | Cloudinary Public ID | Cloudinary Secure URL | Status | Batch | Role |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
${Array.from(allMigratedMap.values()).map(a => `| \`${a.localPath}\` | \`${a.cloudinaryFolder}\` | \`${a.publicId}\` | [Link](${a.secureUrl}) | \`${a.migrationStatus}\` | ${a.batch} | ${a.isCanonical ? 'Canonical Upload' : 'Consolidated Duplicate -> \`' + (a.canonicalTarget || 'canonical') + '\`'} |`).join('\n')}

---

`;

if (oldPilotSectionRegex.test(md)) {
  md = md.replace(oldPilotSectionRegex, newBatchStatusSection);
} else {
  md = md.replace('## Cloudinary Candidates', newBatchStatusSection + '## Cloudinary Candidates');
}

fs.writeFileSync('docs/cloudinary-migration-manifest.md', md);
console.log('Updated docs/cloudinary-migration-manifest.md');
