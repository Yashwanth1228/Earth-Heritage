import fs from 'fs';

console.log('=== NAIRUTHYA ASSET REFERENCES IN APPLICATION CODE ===\n');

// 1. In data/projects.js
const projectsContent = fs.readFileSync('data/projects.js', 'utf8');

// Find the Nairuthya Whispering Wood project object
const nwwRegex = /slug:\s*'nairuthya-whispering-wood'[\s\S]*?(?=(?:slug:\s*'|$))/;
const nwwMatch = projectsContent.match(nwwRegex);

if (nwwMatch) {
  const block = nwwMatch[0];
  console.log('Found Nairuthya Whispering Wood project in data/projects.js:');
  const imgUrlRegex = /src:\s*['"`]([^'"`]+)['"`]/g;
  let m;
  while ((m = imgUrlRegex.exec(block)) !== null) {
    console.log(`- ${m[1]}`);
  }
}

// 2. In data/galleryImages.js
const galleryContent = fs.readFileSync('data/galleryImages.js', 'utf8');
const galRegex = /projectId:\s*'nairuthya-whispering-wood'[\s\S]*?(?=(?:projectId:|$))/g;
console.log('\nFound Nairuthya items in data/galleryImages.js:');
let galMatch;
const galImgRegex = /id:\s*'([^']+)'[\s\S]*?src:\s*['"`]([^'"`]+)['"`]/g;
while ((galMatch = galImgRegex.exec(galleryContent)) !== null) {
  if (galMatch[0].includes('nairuthya-whispering-wood')) {
    console.log(`- [${galMatch[1]}] ${galMatch[2]}`);
  }
}

// 3. In components/projects/nairuthya/
const compFiles = fs.readdirSync('components/projects/nairuthya');
console.log('\nChecking components/projects/nairuthya/ for hardcoded images:');
compFiles.forEach(f => {
  const content = fs.readFileSync(`components/projects/nairuthya/${f}`, 'utf8');
  const imgRegex = /['"`](https:\/\/res\.cloudinary\.com\/[^'"`]+|\/images\/[^'"`]+)['"`]/g;
  let cm;
  while ((cm = imgRegex.exec(content)) !== null) {
    console.log(`- [${f}] ${cm[1]}`);
  }
});
