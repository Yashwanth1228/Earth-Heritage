import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const manifest = JSON.parse(fs.readFileSync('docs/cloudinary-migration-manifest.json', 'utf8'));

const unmigrated = manifest.cloudinaryCandidates.filter(c => c.migrationStatus !== 'PILOT_MIGRATED');

console.log(`=== REMAINING UNMIGRATED CANDIDATES (${unmigrated.length}) ===\n`);

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.mjs') || file.endsWith('.json')) {
      results.push(fullPath);
    }
  });
  return results;
}

const allFiles = [...getFiles('data'), ...getFiles('components'), ...getFiles('app')];

let totalBytes = 0;
unmigrated.forEach(u => {
  const fileExists = fs.existsSync(u.localPath);
  let size = 0;
  let hash = '';
  if (fileExists) {
    const buf = fs.readFileSync(u.localPath);
    size = buf.length;
    totalBytes += size;
    hash = crypto.createHash('sha256').update(buf).digest('hex');
  }

  const wp = u.localPath.replace(/^public/, '');
  const usages = [];
  allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(wp)) {
      usages.push(file.replace(/\\/g, '/'));
    }
  });

  console.log(`[${fileExists ? 'EXISTS' : 'MISSING'}] ${u.localPath}`);
  console.log(`  Size: ${(size / 1024).toFixed(1)} KB`);
  console.log(`  Category / Proposed Folder: ${u.proposedCloudinaryFolder}`);
  console.log(`  Proposed Public ID: ${u.proposedPublicId}`);
  console.log(`  SHA-256: ${hash}`);
  console.log(`  Usages (${usages.length}):`);
  if (usages.length === 0) {
    console.log(`    (none directly referenced)`);
  } else {
    usages.forEach(f => console.log(`    - ${f}`));
  }
  console.log('');
});

console.log(`Total size of remaining candidates: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
