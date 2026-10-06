import fs from 'fs';
import path from 'path';

const manifest = JSON.parse(fs.readFileSync('docs/cloudinary-migration-manifest.json', 'utf8'));

function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!['node_modules', '.next', '.git', 'scratch'].includes(file)) {
        results = results.concat(getFiles(fullPath));
      }
    } else if (/\.(js|jsx|ts|tsx|json|mjs|html)$/.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const prodFiles = ['app', 'components', 'data', 'config', 'lib'].flatMap(getFiles);

console.log('Auditing 16 KEEP_LOCAL assets against production code...');

const keepLocalAudit = [];

manifest.keepLocal.forEach(asset => {
  const localExists = fs.existsSync(asset.localPath);
  const size = localExists ? fs.statSync(asset.localPath).size : 0;
  
  const usages = [];
  prodFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(asset.webPath) || content.includes(asset.fileName)) {
      usages.push(file.replace(/\\/g, '/'));
    }
  });

  keepLocalAudit.push({
    localPath: asset.localPath,
    webPath: asset.webPath,
    fileName: asset.fileName,
    exists: localExists,
    size,
    reason: asset.reason,
    usages,
    referencedInCode: usages.length > 0
  });
});

console.log(JSON.stringify(keepLocalAudit, null, 2));

fs.writeFileSync('scratch/step_13_keep_local_audit.json', JSON.stringify(keepLocalAudit, null, 2));
