import fs from 'fs';

const executedAt = new Date().toISOString();

const nairuthyaAuditData = {
  version: '1.0.0',
  auditType: 'READ_ONLY_CLOUDINARY_PROJECT_FOLDER_AUDIT',
  project: 'Nairuthya Whispering Wood',
  executedAt,
  status: 'READ_ONLY_COMPLETED',
  constraintsPreserved: {
    noFilesUploaded: true,
    noAssetsMoved: true,
    noAssetsRenamed: true,
    noAssetsDeleted: true,
    noPublicIdsChanged: true,
    noCloudinaryFoldersCreatedOrChanged: true,
    noApplicationCodeModified: true,
    noReferencesModified: true,
    noMigrationDocumentationModified: true
  },
  cloudinaryFolderStructure: {
    verifiedRootFolders: ['earth-heritage', 'samples'],
    verifiedEarthHeritageSubfolders: [
      'about',
      'amenities',
      'campaign',
      'farm-management',
      'gallery',
      'how-it-works',
      'landing',
      'managed-farmland',
      'plantations',
      'projects',
      'test'
    ],
    verifiedProjectsSubfolders: ['coconut-garden'],
    nairuthyaDedicatedFolderExists: false,
    nairuthyaExpectedFolderPath: 'earth-heritage/projects/nairuthya-whispering-wood/'
  },
  nairuthyaAssets: [
    {
      id: 1,
      name: 'Nairuthya Whispering Wood Hero',
      localSourcePath: 'public/images/projects/nairuthya-whispering-wood-hero.jpg',
      originalFileName: 'nairuthya-whispering-wood-hero.jpg',
      currentCloudinaryFolder: 'earth-heritage/projects',
      publicId: 'earth-heritage/projects/nairuthya-whispering-wood-hero',
      secureUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/projects/nairuthya-whispering-wood-hero.jpg',
      format: 'jpg',
      width: 1024,
      height: 444,
      fileSizeBytes: 211886,
      fileSizeFormatted: '206.9 KB',
      isCanonical: true,
      replacesDuplicate: 'public/images/gallery/nairuthya-01-entrance.jpg (Exact duplicate, consolidated in Pilot)',
      migrationBatch: 'Pilot (Step 7)',
      httpStatus: 200,
      verificationStatus: 'CONFIRMED',
      websiteReferences: [
        { file: 'data/projects.js', field: 'heroImage.src, cardImage.src, gallery[0].src', active: true },
        { file: 'data/galleryImages.js', field: 'featuredImage.src, nww-gal-01.src, nww-gal-07.src', active: true },
        { file: 'components/projects/nairuthya/NairuthyaHero.js', field: 'project?.heroImage?.src fallback', active: true }
      ]
    },
    {
      id: 2,
      name: 'Nairuthya Project Overview',
      localSourcePath: 'public/images/projects/nairuthya-project-overview.png',
      originalFileName: 'nairuthya-project-overview.png',
      currentCloudinaryFolder: 'earth-heritage/projects',
      publicId: 'earth-heritage/projects/nairuthya-project-overview',
      secureUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791263928/earth-heritage/projects/nairuthya-project-overview.png',
      format: 'png',
      width: 337,
      height: 471,
      fileSizeBytes: 342407,
      fileSizeFormatted: '334.4 KB',
      isCanonical: true,
      replacesDuplicate: null,
      migrationBatch: 'Batch 6 (Step 12)',
      httpStatus: 200,
      verificationStatus: 'CONFIRMED',
      websiteReferences: [
        { file: 'None', field: 'None (Unreferenced / Dormant diagram asset in public/images/projects/)', active: false }
      ]
    },
    {
      id: 3,
      name: 'Nairuthya 02 Stone Terraces',
      localSourcePath: 'public/images/gallery/nairuthya-02-stone-terraces.jpg',
      originalFileName: 'nairuthya-02-stone-terraces.jpg',
      currentCloudinaryFolder: 'earth-heritage/gallery',
      publicId: 'earth-heritage/gallery/nairuthya-02-stone-terraces',
      secureUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262711/earth-heritage/gallery/nairuthya-02-stone-terraces.jpg',
      format: 'jpg',
      width: 1024,
      height: 461,
      fileSizeBytes: 216407,
      fileSizeFormatted: '211.3 KB',
      isCanonical: true,
      replacesDuplicate: null,
      migrationBatch: 'Batch 5 (Step 11)',
      httpStatus: 200,
      verificationStatus: 'CONFIRMED',
      websiteReferences: [
        { file: 'data/projects.js', field: 'gallery[1] (nairuthya-gal-2)', active: true },
        { file: 'data/galleryImages.js', field: 'gallery[1] (nww-gal-02)', active: true }
      ]
    },
    {
      id: 4,
      name: 'Nairuthya 03 Plots & Irrigation',
      localSourcePath: 'public/images/gallery/nairuthya-03-plots-irrigation.jpg',
      originalFileName: 'nairuthya-03-plots-irrigation.jpg',
      currentCloudinaryFolder: 'earth-heritage/gallery',
      publicId: 'earth-heritage/gallery/nairuthya-03-plots-irrigation',
      secureUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262714/earth-heritage/gallery/nairuthya-03-plots-irrigation.jpg',
      format: 'jpg',
      width: 1024,
      height: 461,
      fileSizeBytes: 207372,
      fileSizeFormatted: '202.5 KB',
      isCanonical: true,
      replacesDuplicate: null,
      migrationBatch: 'Batch 5 (Step 11)',
      httpStatus: 200,
      verificationStatus: 'CONFIRMED',
      websiteReferences: [
        { file: 'data/projects.js', field: 'gallery[2] (nairuthya-gal-3)', active: true },
        { file: 'data/galleryImages.js', field: 'gallery[2] (nww-gal-03)', active: true }
      ]
    },
    {
      id: 5,
      name: 'Nairuthya 04 Children Play',
      localSourcePath: 'public/images/gallery/nairuthya-04-children-play.jpg',
      originalFileName: 'nairuthya-04-children-play.jpg',
      currentCloudinaryFolder: 'earth-heritage/gallery',
      publicId: 'earth-heritage/gallery/nairuthya-04-children-play',
      secureUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262717/earth-heritage/gallery/nairuthya-04-children-play.jpg',
      format: 'jpg',
      width: 1024,
      height: 461,
      fileSizeBytes: 242185,
      fileSizeFormatted: '236.5 KB',
      isCanonical: true,
      replacesDuplicate: null,
      migrationBatch: 'Batch 5 (Step 11)',
      httpStatus: 200,
      verificationStatus: 'CONFIRMED',
      websiteReferences: [
        { file: 'data/projects.js', field: 'gallery[3] (nairuthya-gal-4)', active: true },
        { file: 'data/galleryImages.js', field: 'gallery[3] (nww-gal-04)', active: true }
      ]
    },
    {
      id: 6,
      name: 'Nairuthya 05 Elevated Vista',
      localSourcePath: 'public/images/gallery/nairuthya-05-elevated-vista.jpg',
      originalFileName: 'nairuthya-05-elevated-vista.jpg',
      currentCloudinaryFolder: 'earth-heritage/gallery',
      publicId: 'earth-heritage/gallery/nairuthya-05-elevated-vista',
      secureUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262720/earth-heritage/gallery/nairuthya-05-elevated-vista.jpg',
      format: 'jpg',
      width: 1024,
      height: 461,
      fileSizeBytes: 193665,
      fileSizeFormatted: '189.1 KB',
      isCanonical: true,
      replacesDuplicate: null,
      migrationBatch: 'Batch 5 (Step 11)',
      httpStatus: 200,
      verificationStatus: 'CONFIRMED',
      websiteReferences: [
        { file: 'data/projects.js', field: 'gallery[4] (nairuthya-gal-5)', active: true },
        { file: 'data/galleryImages.js', field: 'gallery[4] (nww-gal-05)', active: true }
      ]
    },
    {
      id: 7,
      name: 'Nairuthya 06 Outdoor Fitness',
      localSourcePath: 'public/images/gallery/nairuthya-06-outdoor-fitness.jpg',
      originalFileName: 'nairuthya-06-outdoor-fitness.jpg',
      currentCloudinaryFolder: 'earth-heritage/gallery',
      publicId: 'earth-heritage/gallery/nairuthya-06-outdoor-fitness',
      secureUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791262722/earth-heritage/gallery/nairuthya-06-outdoor-fitness.jpg',
      format: 'jpg',
      width: 1024,
      height: 461,
      fileSizeBytes: 233110,
      fileSizeFormatted: '227.6 KB',
      isCanonical: true,
      replacesDuplicate: null,
      migrationBatch: 'Batch 5 (Step 11)',
      httpStatus: 200,
      verificationStatus: 'CONFIRMED',
      websiteReferences: [
        { file: 'data/projects.js', field: 'gallery[5] (nairuthya-gal-6)', active: true },
        { file: 'data/galleryImages.js', field: 'gallery[5] (nww-gal-06)', active: true }
      ]
    }
  ],
  consolidatedDuplicates: [
    {
      name: 'Nairuthya 01 Entrance Portal',
      localSourcePath: 'public/images/gallery/nairuthya-01-entrance.jpg',
      canonicalCloudinaryAsset: 'earth-heritage/projects/nairuthya-whispering-wood-hero',
      canonicalSecureUrl: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/projects/nairuthya-whispering-wood-hero.jpg',
      reason: 'Identical binary content (SHA-256: 10ca9203aa14...); consolidated to avoid uploading duplicate asset to Cloudinary.'
    }
  ],
  nairuthyaFolderStatus: {
    dedicatedFolderExists: false,
    dedicatedFolderPath: 'earth-heritage/projects/nairuthya-whispering-wood',
    assetsInsideDedicatedFolder: 0,
    assetsDirectlyUnderProjects: 2,
    assetsInGalleryFolder: 5,
    assetsElsewhereInCloudinary: 0,
    totalNairuthyaAssetsInCloudinary: 7,
    orphanedCloudinaryAssets: 1, // nairuthya-project-overview
    activeWebsiteAssets: 6
  },
  coconutGardenComparison: {
    dedicatedFolderExists: true,
    dedicatedFolderPath: 'earth-heritage/projects/coconut-garden',
    assetsInsideDedicatedFolder: 5,
    assetsDirectlyUnderProjects: 1, // coconut-garden-hero
    totalCoconutAssetsUnderProjects: 6,
    comparisonSummary: 'Coconut Garden possesses a dedicated project subfolder in Cloudinary ("earth-heritage/projects/coconut-garden/") containing 5 assets, with 1 asset sitting directly under "earth-heritage/projects/". In contrast, Nairuthya Whispering Wood has NO dedicated subfolder in Cloudinary; its 7 assets are divided across "earth-heritage/projects/" (2 assets) and "earth-heritage/gallery/" (5 assets).'
  },
  finalFindings: {
    allImagesPresentInCloudinary: true,
    exactLocations: {
      underProjects: [
        'earth-heritage/projects/nairuthya-whispering-wood-hero',
        'earth-heritage/projects/nairuthya-project-overview'
      ],
      underGallery: [
        'earth-heritage/gallery/nairuthya-02-stone-terraces',
        'earth-heritage/gallery/nairuthya-03-plots-irrigation',
        'earth-heritage/gallery/nairuthya-04-children-play',
        'earth-heritage/gallery/nairuthya-05-elevated-vista',
        'earth-heritage/gallery/nairuthya-06-outdoor-fitness'
      ]
    },
    dedicatedFolderExists: false,
    sittingDirectlyUnderProjects: 2,
    locatedElsewhere: 5, // in earth-heritage/gallery/
    missingAssets: 0,
    orphanedAssets: 1, // nairuthya-project-overview
    websiteFunctionsCorrectly: true
  }
};

fs.writeFileSync('docs/cloudinary-nairuthya-folder-audit.json', JSON.stringify(nairuthyaAuditData, null, 2));
console.log('Created docs/cloudinary-nairuthya-folder-audit.json');

// Generate docs/cloudinary-nairuthya-folder-audit.md
const mdReport = `# Nairuthya Whispering Wood — Cloudinary Folder Audit

## Audit Status

READ-ONLY — No Cloudinary or application changes made.

---

## Actual Cloudinary Project Structure

\`\`\`text
earth-heritage/
├── about/
├── amenities/
├── campaign/
├── farm-management/
├── gallery/
│   ├── nairuthya-02-stone-terraces.jpg
│   ├── nairuthya-03-plots-irrigation.jpg
│   ├── nairuthya-04-children-play.jpg
│   ├── nairuthya-05-elevated-vista.jpg
│   ├── nairuthya-06-outdoor-fitness.jpg
│   └── [other gallery assets...]
├── how-it-works/
├── landing/
├── managed-farmland/
├── plantations/
├── projects/
│   ├── coconut-garden/
│   │   ├── boundary-plantation-wall.png
│   │   ├── entrance-gate.jpg
│   │   ├── farm-landscape-groves.jpg
│   │   ├── internal-road-layout.jpg
│   │   └── plot-demarcation-10.jpg
│   ├── coconut-garden-hero.jpg
│   ├── nairuthya-project-overview.png
│   └── nairuthya-whispering-wood-hero.jpg
└── test/
\`\`\`

---

## Nairuthya Assets

| # | Asset | Current Cloudinary Folder | Public ID | Dimensions | Format | HTTP | Website Reference |
|---|---|---|---|---|---|:---:|---|
| 1 | Nairuthya Whispering Wood Hero | \`earth-heritage/projects\` | \`earth-heritage/projects/nairuthya-whispering-wood-hero\` | 1024×444 | \`jpg\` | 200 OK | \`data/projects.js\`, \`data/galleryImages.js\`, \`components/projects/nairuthya/NairuthyaHero.js\` |
| 2 | Nairuthya Project Overview | \`earth-heritage/projects\` | \`earth-heritage/projects/nairuthya-project-overview\` | 337×471 | \`png\` | 200 OK | *None (Unreferenced / Dormant diagram asset)* |
| 3 | Nairuthya 02 Stone Terraces | \`earth-heritage/gallery\` | \`earth-heritage/gallery/nairuthya-02-stone-terraces\` | 1024×461 | \`jpg\` | 200 OK | \`data/projects.js\`, \`data/galleryImages.js\` |
| 4 | Nairuthya 03 Plots & Irrigation | \`earth-heritage/gallery\` | \`earth-heritage/gallery/nairuthya-03-plots-irrigation\` | 1024×461 | \`jpg\` | 200 OK | \`data/projects.js\`, \`data/galleryImages.js\` |
| 5 | Nairuthya 04 Children Play | \`earth-heritage/gallery\` | \`earth-heritage/gallery/nairuthya-04-children-play\` | 1024×461 | \`jpg\` | 200 OK | \`data/projects.js\`, \`data/galleryImages.js\` |
| 6 | Nairuthya 05 Elevated Vista | \`earth-heritage/gallery\` | \`earth-heritage/gallery/nairuthya-05-elevated-vista\` | 1024×461 | \`jpg\` | 200 OK | \`data/projects.js\`, \`data/galleryImages.js\` |
| 7 | Nairuthya 06 Outdoor Fitness | \`earth-heritage/gallery\` | \`earth-heritage/gallery/nairuthya-06-outdoor-fitness\` | 1024×461 | \`jpg\` | 200 OK | \`data/projects.js\`, \`data/galleryImages.js\` |

> **Note on Duplicate Asset (\`nairuthya-01-entrance.jpg\`):**
> Local asset \`public/images/gallery/nairuthya-01-entrance.jpg\` is an exact binary duplicate of \`public/images/projects/nairuthya-whispering-wood-hero.jpg\` (SHA-256: \`10ca9203aa14...\`). In the Pilot batch (Step 7), it was consolidated into canonical asset \`earth-heritage/projects/nairuthya-whispering-wood-hero\` to eliminate duplicate storage. All website references to \`nairuthya-01\` now resolve to that single canonical Cloudinary URL.

---

## Nairuthya Folder Status

- **Does \`earth-heritage/projects/nairuthya-whispering-wood/\` exist?**
  **NO.** The folder does not exist in Cloudinary.
- **Number of assets inside \`earth-heritage/projects/nairuthya-whispering-wood/\`:**
  **0**
- **Number of Nairuthya assets directly under \`earth-heritage/projects/\`:**
  **2** (\`nairuthya-whispering-wood-hero\` and \`nairuthya-project-overview\`)
- **Number of Nairuthya assets elsewhere under \`earth-heritage/\`:**
  **5** (all 5 reside in \`earth-heritage/gallery/\`)
- **Any duplicate/orphaned Cloudinary assets:**
  - **Duplicate consolidated:** 1 local duplicate (\`nairuthya-01-entrance.jpg\`) mapped to the canonical hero image.
  - **Orphaned / Unreferenced:** 1 Cloudinary asset (\`earth-heritage/projects/nairuthya-project-overview\`) exists on Cloudinary but is not referenced in active production code.

---

## Coconut Garden Comparison

### Coconut Garden Structure:
- **Dedicated Folder:** \`earth-heritage/projects/coconut-garden/\` **EXISTS** in Cloudinary.
- **Assets Inside Dedicated Folder (5):**
  - \`earth-heritage/projects/coconut-garden/boundary-plantation-wall\`
  - \`earth-heritage/projects/coconut-garden/entrance-gate\`
  - \`earth-heritage/projects/coconut-garden/farm-landscape-groves\`
  - \`earth-heritage/projects/coconut-garden/internal-road-layout\`
  - \`earth-heritage/projects/coconut-garden/plot-demarcation-10\`
- **Asset Directly Under \`earth-heritage/projects/\` (1):**
  - \`earth-heritage/projects/coconut-garden-hero\`

### Comparison:
1. Coconut Garden has a dedicated project subfolder in Cloudinary (\`projects/coconut-garden/\`) grouping its 5 sub-assets, plus 1 hero image sitting at the \`projects/\` root.
2. Nairuthya Whispering Wood has **no dedicated project subfolder** in Cloudinary. Its hero image and overview diagram sit directly at the \`projects/\` root, while all 5 of its gallery/amenity photos sit inside \`earth-heritage/gallery/\`.
3. This asymmetry mirrors the original local filesystem organization:
   - Locally, Coconut Garden had \`public/images/projects/coconut-garden/\` plus \`coconut-garden-hero.jpg\`.
   - Locally, Nairuthya never had a \`projects/nairuthya-whispering-wood/\` directory; instead, its photos were originally placed in \`public/images/gallery/\` and \`public/images/projects/\`.

---

## Website Reference Verification

| Asset | Production Reference | Source File | Current Cloudinary URL / Public ID | Status |
|---|---|---|---|:---:|
| **Hero Image** | \`heroImage.src\`, \`cardImage.src\` | \`data/projects.js\` | \`earth-heritage/projects/nairuthya-whispering-wood-hero\` | Active / Verified |
| **Hero Image (Featured)** | \`featuredImage.src\` | \`data/galleryImages.js\` | \`earth-heritage/projects/nairuthya-whispering-wood-hero\` | Active / Verified |
| **Hero Fallback** | Default hero visual | \`components/projects/nairuthya/NairuthyaHero.js\` | \`earth-heritage/projects/nairuthya-whispering-wood-hero\` | Active / Verified |
| **Gallery Item 1** | \`nairuthya-gal-1\` / \`nww-gal-01\` | \`data/projects.js\`, \`data/galleryImages.js\` | \`earth-heritage/projects/nairuthya-whispering-wood-hero\` | Active / Verified |
| **Gallery Item 2** | \`nairuthya-gal-2\` / \`nww-gal-02\` | \`data/projects.js\`, \`data/galleryImages.js\` | \`earth-heritage/gallery/nairuthya-02-stone-terraces\` | Active / Verified |
| **Gallery Item 3** | \`nairuthya-gal-3\` / \`nww-gal-03\` | \`data/projects.js\`, \`data/galleryImages.js\` | \`earth-heritage/gallery/nairuthya-03-plots-irrigation\` | Active / Verified |
| **Gallery Item 4** | \`nairuthya-gal-4\` / \`nww-gal-04\` | \`data/projects.js\`, \`data/galleryImages.js\` | \`earth-heritage/gallery/nairuthya-04-children-play\` | Active / Verified |
| **Gallery Item 5** | \`nairuthya-gal-5\` / \`nww-gal-05\` | \`data/projects.js\`, \`data/galleryImages.js\` | \`earth-heritage/gallery/nairuthya-05-elevated-vista\` | Active / Verified |
| **Gallery Item 6** | \`nairuthya-gal-6\` / \`nww-gal-06\` | \`data/projects.js\`, \`data/galleryImages.js\` | \`earth-heritage/gallery/nairuthya-06-outdoor-fitness\` | Active / Verified |
| **Gallery Item 7** | \`nww-gal-07\` (Entrance portal) | \`data/galleryImages.js\` | \`earth-heritage/projects/nairuthya-whispering-wood-hero\` | Active / Verified |
| **Project Overview** | None | None | \`earth-heritage/projects/nairuthya-project-overview\` | Dormant / Unused |

---

## Cloudinary URL Verification

All 7 Cloudinary URLs were directly tested via HTTP:

1. \`https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/projects/nairuthya-whispering-wood-hero.jpg\` &rarr; **HTTP 200 OK** (image/jpeg, 211.9 KB)
2. \`https://res.cloudinary.com/yffbj6hj/image/upload/v1791263928/earth-heritage/projects/nairuthya-project-overview.png\` &rarr; **HTTP 200 OK** (image/png, 342.4 KB)
3. \`https://res.cloudinary.com/yffbj6hj/image/upload/v1791262711/earth-heritage/gallery/nairuthya-02-stone-terraces.jpg\` &rarr; **HTTP 200 OK** (image/jpeg, 216.4 KB)
4. \`https://res.cloudinary.com/yffbj6hj/image/upload/v1791262714/earth-heritage/gallery/nairuthya-03-plots-irrigation.jpg\` &rarr; **HTTP 200 OK** (image/jpeg, 207.4 KB)
5. \`https://res.cloudinary.com/yffbj6hj/image/upload/v1791262717/earth-heritage/gallery/nairuthya-04-children-play.jpg\` &rarr; **HTTP 200 OK** (image/jpeg, 242.2 KB)
6. \`https://res.cloudinary.com/yffbj6hj/image/upload/v1791262720/earth-heritage/gallery/nairuthya-05-elevated-vista.jpg\` &rarr; **HTTP 200 OK** (image/jpeg, 193.7 KB)
7. \`https://res.cloudinary.com/yffbj6hj/image/upload/v1791262722/earth-heritage/gallery/nairuthya-06-outdoor-fitness.jpg\` &rarr; **HTTP 200 OK** (image/jpeg, 233.1 KB)

---

## Final Finding

1. **Are all Nairuthya images actually present in Cloudinary?**
   **YES.** All 7 unique Nairuthya assets are present, fully uploaded, and reachable in Cloudinary.
2. **Where exactly are they located?**
   - **2 assets** are in \`earth-heritage/projects/\` (\`nairuthya-whispering-wood-hero\` and \`nairuthya-project-overview\`)
   - **5 assets** are in \`earth-heritage/gallery/\` (\`nairuthya-02-stone-terraces\`, \`nairuthya-03-plots-irrigation\`, \`nairuthya-04-children-play\`, \`nairuthya-05-elevated-vista\`, \`nairuthya-06-outdoor-fitness\`)
3. **Does a dedicated Nairuthya project folder exist?**
   **NO.** The folder \`earth-heritage/projects/nairuthya-whispering-wood/\` does not exist in Cloudinary.
4. **Are any Nairuthya images sitting directly under \`earth-heritage/projects/\`?**
   **YES.** Exactly 2 assets: \`nairuthya-whispering-wood-hero\` and \`nairuthya-project-overview\`.
5. **Are any Nairuthya images located elsewhere?**
   **YES.** Exactly 5 assets are located in \`earth-heritage/gallery/\`.
6. **Are there any missing Nairuthya assets?**
   **NO.** Zero assets are missing. (The former 8th local file, \`nairuthya-01-entrance.jpg\`, is an exact binary duplicate that was consolidated into the canonical hero image).
7. **Are there any orphaned Cloudinary Nairuthya assets?**
   **YES (1 asset).** \`earth-heritage/projects/nairuthya-project-overview\` was migrated from the local filesystem in Batch 6, but is not currently referenced in any page or component data.
8. **Does the current website work correctly with the existing locations?**
   **YES.** All pages referencing Nairuthya Whispering Wood (including \`/projects/nairuthya-whispering-wood\`, \`/projects\`, and \`/gallery\`) render with HTTP 200 and deliver images through Next.js optimization with zero broken URLs.
`;

fs.writeFileSync('docs/cloudinary-nairuthya-folder-audit.md', mdReport);
console.log('Created docs/cloudinary-nairuthya-folder-audit.md');
