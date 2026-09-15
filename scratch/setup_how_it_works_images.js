const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'how-it-works');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const mappings = [
  {
    src: path.join(__dirname, '..', 'public', 'images', 'gallery', 'hero-feature.jpg'),
    dest: path.join(targetDir, 'stage-01-understand.jpg')
  },
  {
    src: path.join(__dirname, '..', 'public', 'images', 'managed-farmland', 'intro-farmland.jpg'),
    dest: path.join(targetDir, 'stage-02-plan.jpg')
  },
  {
    src: path.join(__dirname, '..', 'public', 'images', 'farm-management', 'people-and-land.jpg'),
    dest: path.join(targetDir, 'stage-03-work.jpg')
  },
  {
    src: path.join(__dirname, '..', 'public', 'images', 'gallery', 'cultivation-detail.jpg'),
    dest: path.join(targetDir, 'stage-04-cultivate.jpg')
  },
  {
    src: path.join(__dirname, '..', 'public', 'images', 'landing', 'manage-06-harvest.jpg'),
    dest: path.join(targetDir, 'stage-05-harvest.jpg')
  },
  {
    src: path.join(__dirname, '..', 'public', 'images', 'landing', 'cta-landscape.jpg'),
    dest: path.join(targetDir, 'stage-06-continue.jpg')
  }
];

mappings.forEach(m => {
  if (fs.existsSync(m.src)) {
    fs.copyFileSync(m.src, m.dest);
    console.log(`Copied ${path.basename(m.src)} -> ${path.basename(m.dest)}`);
  } else {
    console.error(`Missing source image: ${m.src}`);
  }
});

console.log('How It Works images populated successfully.');
