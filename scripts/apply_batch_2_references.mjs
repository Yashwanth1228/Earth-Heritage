import fs from 'fs';

// Exact replacement mappings for Batch 2
const replacements = [
  // 1. Coconut Garden Entrance Gate
  {
    local: '/images/projects/coconut-garden/entrance-gate.jpg',
    cloudinary: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201948/earth-heritage/projects/coconut-garden/entrance-gate.jpg'
  },
  // 2. Coconut Garden Hero
  {
    local: '/images/projects/coconut-garden-hero.jpg',
    cloudinary: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201949/earth-heritage/projects/coconut-garden-hero.jpg'
  },
  // 3. Experiences Gathering (Gallery)
  {
    local: '/images/gallery/experiences-gathering.jpg',
    cloudinary: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201951/earth-heritage/gallery/experiences-gathering.jpg'
  },
  // 4. Garden Area (Amenities)
  {
    local: '/images/amenities/garden-area.jpg',
    cloudinary: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201953/earth-heritage/amenities/garden-area.jpg'
  },
  // 5. Red Sandal (Plantations)
  {
    local: '/images/plantations/red-sandal.jpg',
    cloudinary: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201954/earth-heritage/plantations/red-sandal.jpg'
  },
  // 6. Mahogany (Plantations)
  {
    local: '/images/plantations/mahogany.jpg',
    cloudinary: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201956/earth-heritage/plantations/mahogany.jpg'
  },
  // 7. CTA Landscape (Landing) + Duplicate Stage 06 Continue (How It Works)
  {
    local: '/images/landing/cta-landscape.jpg',
    cloudinary: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201958/earth-heritage/landing/cta-landscape.jpg'
  },
  {
    local: '/images/how-it-works/stage-06-continue.jpg',
    cloudinary: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201958/earth-heritage/landing/cta-landscape.jpg'
  },
  // 8. Intro Farmland (Managed Farmland) + Duplicate Stage 02 Plan (How It Works)
  {
    local: '/images/managed-farmland/intro-farmland.jpg',
    cloudinary: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201959/earth-heritage/managed-farmland/intro-farmland.jpg'
  },
  {
    local: '/images/how-it-works/stage-02-plan.jpg',
    cloudinary: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201959/earth-heritage/managed-farmland/intro-farmland.jpg'
  },
  // 9. People and Land (Farm Management) + Duplicate Stage 03 Work (How It Works)
  {
    local: '/images/farm-management/people-and-land.jpg',
    cloudinary: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201960/earth-heritage/farm-management/people-and-land.jpg'
  },
  {
    local: '/images/how-it-works/stage-03-work.jpg',
    cloudinary: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201960/earth-heritage/farm-management/people-and-land.jpg'
  },
  // 10. Founder Sathish Agastya (About) + Duplicate -hq
  {
    local: '/images/about/founder-sathish-agastya.jpg',
    cloudinary: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201961/earth-heritage/about/founder-sathish-agastya.jpg'
  },
  {
    local: '/images/about/founder-sathish-agastya-hq.jpg',
    cloudinary: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201961/earth-heritage/about/founder-sathish-agastya.jpg'
  },
  // 11. Gandhi Jayanti Campaign (Campaign)
  {
    local: '/images/campaign/gandhi-jayanti-2026.jpg',
    cloudinary: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201962/earth-heritage/campaign/gandhi-jayanti-2026.jpg'
  }
];

// Target files to update
const targetFiles = [
  'components/campaigns/GandhiJayantiPopup.js',
  'components/projects/ProjectDetailGallery.js',
  'components/sections/home/HomeEvents.js',
  'components/sections/home/HomeStories.js',
  'components/sections/home/HomeHowItWorks.js',
  'data/aboutData.js',
  'data/blogs.js',
  'data/events.js',
  'data/farmManagementImages.js',
  'data/galleryImages.js',
  'data/howItWorksData.js',
  'data/howItWorksImages.js',
  'data/landingImages.js',
  'data/managedFarmlandImages.js',
  'data/projects.js'
];

let totalReplacements = 0;
const modifiedFiles = [];

for (const filePath of targetFiles) {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let fileChanges = 0;

  for (const { local, cloudinary } of replacements) {
    if (content.includes(local)) {
      const parts = content.split(local);
      fileChanges += parts.length - 1;
      content = parts.join(cloudinary);
    }
  }

  if (fileChanges > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedFiles.push({ filePath, count: fileChanges });
    totalReplacements += fileChanges;
    console.log(`Updated ${filePath}: ${fileChanges} replacement(s)`);
  }
}

console.log(`\nCompleted! Total replacements: ${totalReplacements} across ${modifiedFiles.length} files.`);
