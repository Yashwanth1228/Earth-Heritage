import fs from 'fs';

const manifest = JSON.parse(fs.readFileSync('docs/cloudinary-migration-manifest.json', 'utf8'));
const pilot1 = JSON.parse(fs.readFileSync('docs/cloudinary-pilot-migration.json', 'utf8'));
const pilot2 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-2-migration.json', 'utf8'));
const pilot3 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-3-migration.json', 'utf8'));
const pilot4 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-4-migration.json', 'utf8'));
const pilot5 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-5-migration.json', 'utf8'));
const pilot6 = JSON.parse(fs.readFileSync('docs/cloudinary-batch-6-migration.json', 'utf8'));

console.log('=== STEP 1: MIGRATION HISTORY & CUMULATIVE COUNTS ===');
console.log('Manifest Summary:');
console.log(JSON.stringify(manifest.summary, null, 2));

console.log('\nBatch breakdowns:');
console.log(`- Pilot: ${pilot1.summary.totalCanonicalUploads} canonical uploads, ${pilot1.summary.totalLocalPathsMapped} local paths mapped`);
console.log(`- Batch 2: ${pilot2.summary.totalCanonicalUploads} canonical uploads, ${pilot2.summary.totalLocalPathsMapped} local paths mapped`);
console.log(`- Batch 3: ${pilot3.summary.totalCanonicalUploads} canonical uploads, ${pilot3.summary.totalLocalPathsMapped} local paths mapped`);
console.log(`- Batch 4: ${pilot4.summary.totalCanonicalUploads} canonical uploads, ${pilot4.summary.totalLocalPathsMapped} local paths mapped`);
console.log(`- Batch 5: ${pilot5.summary.totalCanonicalUploads} canonical uploads, ${pilot5.summary.totalLocalPathsMapped} local paths mapped`);
console.log(`- Batch 6: ${pilot6.summary.totalCanonicalUploads} canonical uploads, ${pilot6.summary.totalLocalPathsMapped} local paths mapped`);

const totalCanonical = pilot1.summary.totalCanonicalUploads +
  pilot2.summary.totalCanonicalUploads +
  pilot3.summary.totalCanonicalUploads +
  pilot4.summary.totalCanonicalUploads +
  pilot5.summary.totalCanonicalUploads +
  pilot6.summary.totalCanonicalUploads;

const totalMapped = pilot1.summary.totalLocalPathsMapped +
  pilot2.summary.totalLocalPathsMapped +
  pilot3.summary.totalLocalPathsMapped +
  pilot4.summary.totalLocalPathsMapped +
  pilot5.summary.totalLocalPathsMapped +
  pilot6.summary.totalLocalPathsMapped;

const totalConsolidatedDuplicates = totalMapped - totalCanonical;

console.log(`\nTotals from Batch Reports:`);
console.log(`- Total Canonical Uploads: ${totalCanonical}`);
console.log(`- Total Consolidated Duplicates: ${totalConsolidatedDuplicates}`);
console.log(`- Total Local Paths Covered: ${totalMapped}`);

console.log(`\nManifest Candidate counts:`);
console.log(`- Total candidates in array: ${manifest.cloudinaryCandidates.length}`);
const statuses = {};
manifest.cloudinaryCandidates.forEach(c => {
  statuses[c.migrationStatus] = (statuses[c.migrationStatus] || 0) + 1;
});
console.log('Candidate Status breakdown:', statuses);

console.log(`\nKeepLocal count: ${manifest.keepLocal.length}`);
console.log(`Total scope assets: ${manifest.cloudinaryCandidates.length + manifest.keepLocal.length}`);
