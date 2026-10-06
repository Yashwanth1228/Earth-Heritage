import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const manifest = JSON.parse(fs.readFileSync('docs/cloudinary-migration-manifest.json', 'utf8'));

// Build lookup maps from manifest
const keepLocalMap = new Map();
manifest.keepLocal.forEach(k => keepLocalMap.set(k.localPath.replace(/\\/g, '/'), k));

const candidateMap = new Map();
manifest.cloudinaryCandidates.forEach(c => candidateMap.set(c.localPath.replace(/\\/g, '/'), c));

// Read all batch files for canonical & duplicate mapping
const batches = [
  JSON.parse(fs.readFileSync('docs/cloudinary-pilot-migration.json', 'utf8')),
  JSON.parse(fs.readFileSync('docs/cloudinary-batch-2-migration.json', 'utf8')),
  JSON.parse(fs.readFileSync('docs/cloudinary-batch-3-migration.json', 'utf8')),
  JSON.parse(fs.readFileSync('docs/cloudinary-batch-4-migration.json', 'utf8')),
  JSON.parse(fs.readFileSync('docs/cloudinary-batch-5-migration.json', 'utf8')),
  JSON.parse(fs.readFileSync('docs/cloudinary-batch-6-migration.json', 'utf8'))
];

const batchAssetMap = new Map();
batches.forEach(b => {
  const list = b.migratedAssets || b.uploadedAssets || [];
  list.forEach(a => batchAssetMap.set(a.localPath.replace(/\\/g, '/'), a));
});

// Scan all files in public/images recursively
function getFiles(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      res = res.concat(getFiles(p));
    } else if (!f.startsWith('.')) {
      res.push(p.replace(/\\/g, '/'));
    }
  });
  return res;
}

// Find all code references in data, components, app, lib, config
function getSourceFiles(dir) {
  let res = [];
  if (!fs.existsSync(dir)) return res;
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (!['node_modules', '.next', '.git', 'scratch'].includes(f)) {
        res = res.concat(getSourceFiles(p));
      }
    } else if (/\.(js|jsx|ts|tsx|json|mjs|html)$/.test(f)) {
      res.push(p.replace(/\\/g, '/'));
    }
  });
  return res;
}

const sourceFiles = ['app', 'components', 'data', 'config', 'lib'].flatMap(getSourceFiles);
const sourceContents = sourceFiles.map(f => ({ file: f, content: fs.readFileSync(f, 'utf8') }));

function findCodeReferences(webPath) {
  const refs = [];
  sourceContents.forEach(({ file, content }) => {
    if (content.includes(webPath)) {
      refs.push(file);
    }
  });
  return refs;
}

const imageFiles = getFiles('public/images');

// Also include the 7 icon files from public/ that are in manifest
const rootIconFiles = [
  'public/apple-icon.png',
  'public/apple-touch-icon.png',
  'public/favicon-48x48.png',
  'public/favicon-96x96.png',
  'public/favicon.ico',
  'public/icon.png',
  'public/icons/icon-512.png'
].filter(f => fs.existsSync(f));

const allTrackedFiles = [...imageFiles, ...rootIconFiles];

console.log(`Total local images scanned: ${allTrackedFiles.length} (${imageFiles.length} under public/images, ${rootIconFiles.length} root/PWA icons)`);

const inventory = [];

allTrackedFiles.forEach(filePath => {
  const stat = fs.statSync(filePath);
  const buf = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  const ext = path.extname(filePath).toLowerCase();
  const webPath = filePath.replace(/^public/, '');

  const inKeepLocal = keepLocalMap.has(filePath);
  const inCandidates = candidateMap.has(filePath);
  const candidateInfo = candidateMap.get(filePath);
  const batchInfo = batchAssetMap.get(filePath);

  const codeRefs = findCodeReferences(webPath);
  const referencedInCode = codeRefs.length > 0;

  let classification = 'UNKNOWN';
  let cloudinaryPublicId = null;
  let cloudinarySecureUrl = null;
  let isCanonical = null;

  if (inKeepLocal) {
    classification = 'KEEP_LOCAL';
  } else if (inCandidates) {
    if (batchInfo) {
      cloudinaryPublicId = batchInfo.publicId;
      cloudinarySecureUrl = batchInfo.secureUrl;
      isCanonical = batchInfo.isCanonical;

      if (!batchInfo.isCanonical) {
        classification = 'DUPLICATE_BACKUP';
      } else {
        classification = 'MIGRATED_BACKUP';
      }
    } else {
      classification = 'UNKNOWN';
    }
  } else {
    classification = referencedInCode ? 'KEEP_LOCAL' : 'UNREFERENCED';
  }

  inventory.push({
    localPath: filePath,
    webPath,
    fileName: path.basename(filePath),
    extension: ext,
    fileSize: stat.size,
    fileSizeFormatted: (stat.size / 1024).toFixed(1) + ' KB',
    hash,
    width: batchInfo?.width || candidateInfo?.dimensions?.width || null,
    height: batchInfo?.height || candidateInfo?.dimensions?.height || null,
    referencedInProductionCode: referencedInCode,
    productionCodeReferences: codeRefs,
    inMigrationManifest: inKeepLocal || inCandidates,
    manifestRole: inKeepLocal ? 'KEEP_LOCAL' : inCandidates ? 'CLOUDINARY_CANDIDATE' : 'NONE',
    mappedToCloudinary: !!cloudinarySecureUrl,
    isCanonicalCloudinary: isCanonical,
    cloudinaryPublicId,
    cloudinarySecureUrl,
    classification
  });
});

const summaryByClass = {};
inventory.forEach(item => {
  summaryByClass[item.classification] = (summaryByClass[item.classification] || 0) + 1;
});

console.log('\nInventory Summary by Classification:');
console.log(JSON.stringify(summaryByClass, null, 2));

fs.writeFileSync('scratch/step_13_inventory.json', JSON.stringify({
  totalAssets: inventory.length,
  summary: summaryByClass,
  inventory
}, null, 2));

console.log('Saved inventory to scratch/step_13_inventory.json');
