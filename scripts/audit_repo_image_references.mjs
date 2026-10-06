import fs from 'fs';
import path from 'path';

const manifest = JSON.parse(fs.readFileSync('docs/cloudinary-migration-manifest.json', 'utf8'));

const keepLocalWebPaths = new Set(manifest.keepLocal.map(a => a.webPath));
const candidateWebPaths = new Set(manifest.cloudinaryCandidates.map(a => a.webPath));

function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      // Exclude node_modules, .next, .git, scratch
      if (!['node_modules', '.next', '.git', 'scratch'].includes(file)) {
        results = results.concat(getFiles(fullPath));
      }
    } else if (/\.(js|jsx|ts|tsx|json|mjs|html)$/.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const prodDirs = ['data', 'components', 'app', 'lib'];
const prodFiles = prodDirs.flatMap(getFiles);

const imageRefRegex = /['"`](\/images\/[^'"`\s]+)['"`]/g;

const foundRefs = [];

prodFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = imageRefRegex.exec(content)) !== null) {
    foundRefs.push({
      file: file.replace(/\\/g, '/'),
      webPath: match[1]
    });
  }
});

console.log(`Found ${foundRefs.length} production code references to '/images/...'`);

const classifications = {
  keepLocal: [],
  candidateUnmigrated: [],
  candidateMigratedInCode: [], // Local path still used where it shouldn't be
  otherLocal: []
};

foundRefs.forEach(ref => {
  if (keepLocalWebPaths.has(ref.webPath)) {
    classifications.keepLocal.push(ref);
  } else if (candidateWebPaths.has(ref.webPath)) {
    classifications.candidateUnmigrated.push(ref);
  } else {
    classifications.otherLocal.push(ref);
  }
});

console.log('\n--- AUDIT RESULTS ---');
console.log(`1. KEEP_LOCAL / Intentionally Local: ${classifications.keepLocal.length}`);
classifications.keepLocal.forEach(r => console.log(`   - [KEEP_LOCAL] ${r.file} -> ${r.webPath}`));

console.log(`2. Cloudinary Candidates Still Referenced Locally (Should be 0): ${classifications.candidateUnmigrated.length}`);
classifications.candidateUnmigrated.forEach(r => console.log(`   - [UNMIGRATED VIOLATION] ${r.file} -> ${r.webPath}`));

console.log(`3. Other Local Image References: ${classifications.otherLocal.length}`);
classifications.otherLocal.forEach(r => console.log(`   - [OTHER] ${r.file} -> ${r.webPath}`));

if (classifications.candidateUnmigrated.length === 0) {
  console.log('\n✓ REPOSITORY AUDIT PASSED: Zero remaining Cloudinary candidate paths referenced locally in production code!');
} else {
  console.error('\n✗ REPOSITORY AUDIT FAILED: Unmigrated candidate paths remain!');
  process.exit(1);
}
