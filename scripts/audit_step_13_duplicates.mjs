import fs from 'fs';

const manifest = JSON.parse(fs.readFileSync('docs/cloudinary-migration-manifest.json', 'utf8'));

// The 9 consolidated duplicate paths:
const duplicatePaths = [
  {
    duplicatePath: 'public/images/gallery/nairuthya-01-entrance.jpg',
    canonicalPath: 'public/images/projects/nairuthya-whispering-wood-hero.jpg',
    batch: 'Pilot (Step 7)',
    group: 'Group 9'
  },
  {
    duplicatePath: 'public/images/landing/cta-landscape.jpg',
    canonicalPath: 'public/images/how-it-works/stage-06-continue.jpg',
    batch: 'Pilot (Step 7)',
    group: 'Group 12'
  },
  {
    duplicatePath: 'public/images/how-it-works/stage-03-work.jpg',
    canonicalPath: 'public/images/farm-management/people-and-land.jpg',
    batch: 'Batch 2 (Step 8)',
    group: 'Group 6'
  },
  {
    duplicatePath: 'public/images/how-it-works/stage-04-cultivate.jpg',
    canonicalPath: 'public/images/gallery/cultivation-detail.jpg',
    batch: 'Batch 2 (Step 8)',
    group: 'Group 7'
  },
  {
    duplicatePath: 'public/images/how-it-works/stage-01-understand.jpg',
    canonicalPath: 'public/images/gallery/hero-feature.jpg',
    batch: 'Batch 2 (Step 8)',
    group: 'Group 8'
  },
  {
    duplicatePath: 'public/images/landing/manage-06-harvest.jpg',
    canonicalPath: 'public/images/how-it-works/stage-05-harvest.jpg',
    batch: 'Batch 2 (Step 8)',
    group: 'Group 11'
  },
  {
    duplicatePath: 'public/images/about/founder-khushi-jain.jpg',
    canonicalPath: 'public/images/about/founder-khushi-jain-hq.jpg',
    batch: 'Batch 3 (Step 9)',
    group: 'Group 3'
  },
  {
    duplicatePath: 'public/images/about/founder-sathish-agastya.jpg',
    canonicalPath: 'public/images/about/founder-sathish-agastya-hq.jpg',
    batch: 'Batch 3 (Step 9)',
    group: 'Group 4'
  },
  {
    duplicatePath: 'public/images/how-it-works/stage-02-plan.jpg',
    canonicalPath: 'public/images/managed-farmland/intro-farmland.jpg',
    batch: 'Batch 3 (Step 9)',
    group: 'Group 10'
  }
];

const candidateLookup = new Map();
manifest.cloudinaryCandidates.forEach(c => candidateLookup.set(c.localPath, c));

const duplicateAudit = duplicatePaths.map(d => {
  const dupInfo = candidateLookup.get(d.duplicatePath);
  const canonInfo = candidateLookup.get(d.canonicalPath);
  return {
    group: d.group,
    batchConsolidated: d.batch,
    duplicateLocalPath: d.duplicatePath,
    canonicalLocalPath: d.canonicalPath,
    cloudinaryPublicId: canonInfo?.proposedPublicId || dupInfo?.proposedPublicId,
    cloudinarySecureUrl: canonInfo?.cloudinarySecureUrl,
    sha256: dupInfo?.sha256,
    fileSize: dupInfo?.fileSize,
    existsOnDisk: fs.existsSync(d.duplicatePath),
    productionReferenceToDuplicate: false // Confirmed 0 by repository audit
  };
});

console.log(JSON.stringify(duplicateAudit, null, 2));

fs.writeFileSync('scratch/step_13_duplicate_audit.json', JSON.stringify(duplicateAudit, null, 2));
