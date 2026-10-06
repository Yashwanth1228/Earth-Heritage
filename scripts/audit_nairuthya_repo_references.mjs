import fs from 'fs';
import path from 'path';

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
    } else if (/\.(js|jsx|ts|tsx|json|mjs|html|md)$/.test(file)) {
      results.push(fullPath.replace(/\\/g, '/'));
    }
  });
  return results;
}

const allFiles = getFiles('.');

const searchTerms = [
  'nairuthya',
  'whispering-wood',
  'whispering wood',
  'nww-gal'
];

console.log('Searching repository for Nairuthya Whispering Wood references...\n');

const occurrences = [];

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  searchTerms.forEach(term => {
    const regex = new RegExp(term, 'gi');
    let match;
    while ((match = regex.exec(content)) !== null) {
      // Get line number
      const lineNo = content.substring(0, match.index).split('\n').length;
      const lineContent = content.split('\n')[lineNo - 1].trim();
      occurrences.push({
        file,
        term,
        lineNo,
        lineContent
      });
    }
  });
});

console.log(`Found ${occurrences.length} total occurrences across repository files.`);

// Group by file
const byFile = {};
occurrences.forEach(o => {
  byFile[o.file] = (byFile[o.file] || 0) + 1;
});

console.log('\nOccurrences by file:');
Object.entries(byFile).forEach(([f, count]) => {
  console.log(`- ${f}: ${count}`);
});

fs.writeFileSync('scratch/nairuthya_repo_occurrences.json', JSON.stringify({
  total: occurrences.length,
  byFile,
  occurrences
}, null, 2));
