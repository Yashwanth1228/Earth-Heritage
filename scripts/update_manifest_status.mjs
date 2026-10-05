import fs from 'fs';

const pilotData = JSON.parse(fs.readFileSync('docs/cloudinary-pilot-migration.json', 'utf8'));
const manifestJson = JSON.parse(fs.readFileSync('docs/cloudinary-migration-manifest.json', 'utf8'));

const pilotLocalPaths = new Set(pilotData.migratedAssets.map(a => a.localPath));
const pilotMap = new Map(pilotData.migratedAssets.map(a => [a.localPath, a]));

// 1. Update JSON manifest
manifestJson.summary.pilotMigratedCount = pilotLocalPaths.size;
manifestJson.summary.notYetMigratedCount = manifestJson.cloudinaryCandidates.length - pilotLocalPaths.size;

manifestJson.cloudinaryCandidates.forEach(item => {
  if (pilotLocalPaths.has(item.localPath)) {
    item.migrationStatus = 'PILOT_MIGRATED';
    const pilotInfo = pilotMap.get(item.localPath);
    item.cloudinarySecureUrl = pilotInfo.secureUrl;
    item.isCanonical = pilotInfo.isCanonical;
    if (pilotInfo.canonicalTarget) {
      item.canonicalTarget = pilotInfo.canonicalTarget;
    }
  } else {
    item.migrationStatus = 'NOT_YET_MIGRATED';
  }
});

fs.writeFileSync('docs/cloudinary-migration-manifest.json', JSON.stringify(manifestJson, null, 2));
console.log('Updated docs/cloudinary-migration-manifest.json');

// 2. Update Markdown manifest
let md = fs.readFileSync('docs/cloudinary-migration-manifest.md', 'utf8');

// Update Summary section
const oldSummaryBlock = `## Summary
- **Total Image Assets Scanned:** 91
- **Total Candidates for Cloudinary Migration:** 75
- **Total Core Assets to Keep Local:** 16`;

const newSummaryBlock = `## Summary
- **Total Image Assets Scanned:** 91
- **Total Candidates for Cloudinary Migration:** 75
- **Pilot Migrated Assets (Step 7):** 8 (6 canonical Cloudinary uploads + 2 consolidated duplicate paths)
- **Remaining Candidates (Not Yet Migrated):** 67
- **Total Core Assets to Keep Local:** 16`;

md = md.replace(oldSummaryBlock, newSummaryBlock);

// Update status in the Candidates table
manifestJson.cloudinaryCandidates.forEach(item => {
  const lineRegex = new RegExp(`(\\| \`${item.localPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\` [^|]+ \\| [^|]+ \\| [^|]+ \\| [^|]+ \\| [^|]+ \\| )\x60[A-Z_]+\x60( \\|)`);
  if (lineRegex.test(md)) {
    md = md.replace(lineRegex, `$1\`${item.migrationStatus}\`$2`);
  }
});

// Add Pilot Batch Section to Markdown
const pilotSection = `
---

## Pilot Batch Migration Status (Step 7)
The following 8 local image paths (6 canonical assets + 2 consolidated duplicate paths) were migrated to Cloudinary as part of the Controlled Pilot Batch in Step 7. All pilot assets have been verified with HTTP 200 via Next.js \`/_next/image\` optimization and production build.

| Local Asset Path | Cloudinary Folder | Cloudinary Public ID | Cloudinary Secure URL | Status | Role |
| :--- | :--- | :--- | :--- | :---: | :--- |
${pilotData.migratedAssets.map(a => `| \`${a.localPath}\` | \`${a.cloudinaryFolder}\` | \`${a.publicId}\` | [Link](${a.secureUrl}) | \`${a.migrationStatus}\` | ${a.isCanonical ? 'Canonical Upload' : 'Consolidated Duplicate -> \`' + a.canonicalTarget + '\`'} |`).join('\n')}
`;

if (!md.includes('## Pilot Batch Migration Status (Step 7)')) {
  md = md.replace('## Cloudinary Candidates', pilotSection + '\n## Cloudinary Candidates');
}

fs.writeFileSync('docs/cloudinary-migration-manifest.md', md);
console.log('Updated docs/cloudinary-migration-manifest.md');
