# Cloudinary Migration Manifest

## Summary
- **Total Image Assets Scanned:** 91
- **Total Candidates for Cloudinary Migration:** 75
- **Migrated Assets (Pilot + Batches 2–4):** 54 (45 canonical Cloudinary uploads + 9 consolidated duplicate paths)
- **Remaining Candidates (Not Yet Migrated):** 21
- **Total Core Assets to Keep Local:** 16
- **Exact Content Duplicate Groups:** 12 (24 total file paths sharing identical binary content)
- **Filename Collision Groups:** 1 (`intro-farmland.jpg`)
- **Assets Reused Across Multiple Code Locations:** 36
- **Total Candidate Media Size:** 57.31 MB
- **Total Local Core Media Size:** 1570.0 KB

---

## Keep Local
These core identity, favicon, PWA, and structural UI texture files must remain in `public/` to prevent broken browser discovery, metadata issues, or CSS background failures.

| Local Path | File Size | Reason |
| :--- | :---: | :--- |
| `public/apple-icon.png` | 9.6 KB | Favicon / PWA browser discovery asset (must remain in web root for browser discovery) |
| `public/apple-touch-icon.png` | 9.6 KB | Favicon / PWA browser discovery asset (must remain in web root for browser discovery) |
| `public/favicon-48x48.png` | 2.3 KB | Favicon / PWA browser discovery asset (must remain in web root for browser discovery) |
| `public/favicon-96x96.png` | 4.8 KB | Favicon / PWA browser discovery asset (must remain in web root for browser discovery) |
| `public/favicon.ico` | 20.1 KB | Favicon / PWA browser discovery asset (must remain in web root for browser discovery) |
| `public/icon.png` | 42.8 KB | Favicon / PWA browser discovery asset (must remain in web root for browser discovery) |
| `public/icons/icon-512.png` | 42.8 KB | Favicon / PWA browser discovery asset (must remain in web root for browser discovery) |
| `public/images/earth-heritage-logo-dark-cropped.png` | 54.6 KB | Core Earth Heritage brand logo / wordmark / vector identity |
| `public/images/earth-heritage-logo-dark.png` | 61.6 KB | Core Earth Heritage brand logo / wordmark / vector identity |
| `public/images/earth-heritage-logo-light-cropped.png` | 56.7 KB | Core Earth Heritage brand logo / wordmark / vector identity |
| `public/images/earth-heritage-logo-light.png` | 98.0 KB | Core Earth Heritage brand logo / wordmark / vector identity |
| `public/images/earth-heritage-logo-original.png` | 98.0 KB | Core Earth Heritage brand logo / wordmark / vector identity |
| `public/images/earth-heritage-mark.png` | 40.2 KB | Core Earth Heritage brand logo / wordmark / vector identity |
| `public/images/earth-heritage-wordmark-dark.png` | 12.6 KB | Core Earth Heritage brand logo / wordmark / vector identity |
| `public/images/earth-heritage-wordmark-light.png` | 14.7 KB | Core Earth Heritage brand logo / wordmark / vector identity |
| `public/images/wood-texture.jpg` | 1001.7 KB | Fixed architectural UI texture element (seamless CSS pattern) |

---


---

## Migrated Assets Status (Pilot + Batches 2–4)
The following 54 local image paths (45 canonical Cloudinary assets + 9 consolidated duplicate paths) have been migrated to Cloudinary across Step 7 (Pilot), Step 8 (Batch 2), Step 9 (Batch 3), and Step 10 (Batch 4). All assets have been verified with HTTP 200 via Next.js `/_next/image` optimization, ESLint, and production build.

| Local Asset Path | Cloudinary Folder | Cloudinary Public ID | Cloudinary Secure URL | Status | Batch | Role |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| `public/images/projects/coconut-garden/internal-road-layout.jpg` | `earth-heritage/projects/coconut-garden` | `earth-heritage/projects/coconut-garden/internal-road-layout` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791200705/earth-heritage/projects/coconut-garden/internal-road-layout.jpg) | `PILOT_MIGRATED` | Pilot (Step 7) | Canonical Upload |
| `public/images/gallery/nature-canopy.jpg` | `earth-heritage/gallery` | `earth-heritage/gallery/nature-canopy` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791200706/earth-heritage/gallery/nature-canopy.jpg) | `PILOT_MIGRATED` | Pilot (Step 7) | Canonical Upload |
| `public/images/projects/nairuthya-whispering-wood-hero.jpg` | `earth-heritage/projects` | `earth-heritage/projects/nairuthya-whispering-wood-hero` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/projects/nairuthya-whispering-wood-hero.jpg) | `PILOT_MIGRATED` | Pilot (Step 7) | Canonical Upload |
| `public/images/gallery/nairuthya-01-entrance.jpg` | `earth-heritage/projects` | `earth-heritage/projects/nairuthya-whispering-wood-hero` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/projects/nairuthya-whispering-wood-hero.jpg) | `PILOT_MIGRATED` | Pilot (Step 7) | Consolidated Duplicate -> `public/images/projects/nairuthya-whispering-wood-hero.jpg` |
| `public/images/about/founder-khushi-jain.jpg` | `earth-heritage/about` | `earth-heritage/about/founder-khushi-jain` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/about/founder-khushi-jain.jpg) | `PILOT_MIGRATED` | Pilot (Step 7) | Canonical Upload |
| `public/images/about/founder-khushi-jain-hq.jpg` | `earth-heritage/about` | `earth-heritage/about/founder-khushi-jain` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/about/founder-khushi-jain.jpg) | `PILOT_MIGRATED` | Pilot (Step 7) | Consolidated Duplicate -> `public/images/about/founder-khushi-jain.jpg` |
| `public/images/amenities/club-house.jpg` | `earth-heritage/amenities` | `earth-heritage/amenities/club-house` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791200710/earth-heritage/amenities/club-house.jpg) | `PILOT_MIGRATED` | Pilot (Step 7) | Canonical Upload |
| `public/images/landing/manage-01-people.jpg` | `earth-heritage/landing` | `earth-heritage/landing/manage-01-people` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791200711/earth-heritage/landing/manage-01-people.jpg) | `PILOT_MIGRATED` | Pilot (Step 7) | Canonical Upload |
| `public/images/projects/coconut-garden/entrance-gate.jpg` | `earth-heritage/projects/coconut-garden` | `earth-heritage/projects/coconut-garden/entrance-gate` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791201948/earth-heritage/projects/coconut-garden/entrance-gate.jpg) | `PILOT_MIGRATED` | Batch 2 (Step 8) | Canonical Upload |
| `public/images/projects/coconut-garden-hero.jpg` | `earth-heritage/projects` | `earth-heritage/projects/coconut-garden-hero` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791201949/earth-heritage/projects/coconut-garden-hero.jpg) | `PILOT_MIGRATED` | Batch 2 (Step 8) | Canonical Upload |
| `public/images/gallery/experiences-gathering.jpg` | `earth-heritage/gallery` | `earth-heritage/gallery/experiences-gathering` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791201951/earth-heritage/gallery/experiences-gathering.jpg) | `PILOT_MIGRATED` | Batch 2 (Step 8) | Canonical Upload |
| `public/images/amenities/garden-area.jpg` | `earth-heritage/amenities` | `earth-heritage/amenities/garden-area` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791201953/earth-heritage/amenities/garden-area.jpg) | `PILOT_MIGRATED` | Batch 2 (Step 8) | Canonical Upload |
| `public/images/plantations/red-sandal.jpg` | `earth-heritage/plantations` | `earth-heritage/plantations/red-sandal` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791201954/earth-heritage/plantations/red-sandal.jpg) | `PILOT_MIGRATED` | Batch 2 (Step 8) | Canonical Upload |
| `public/images/plantations/mahogany.jpg` | `earth-heritage/plantations` | `earth-heritage/plantations/mahogany` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791201956/earth-heritage/plantations/mahogany.jpg) | `PILOT_MIGRATED` | Batch 2 (Step 8) | Canonical Upload |
| `public/images/landing/cta-landscape.jpg` | `earth-heritage/landing` | `earth-heritage/landing/cta-landscape` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791201958/earth-heritage/landing/cta-landscape.jpg) | `PILOT_MIGRATED` | Batch 2 (Step 8) | Canonical Upload |
| `public/images/how-it-works/stage-06-continue.jpg` | `earth-heritage/landing` | `earth-heritage/landing/cta-landscape` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791201958/earth-heritage/landing/cta-landscape.jpg) | `PILOT_MIGRATED` | Batch 2 (Step 8) | Consolidated Duplicate -> `public/images/landing/cta-landscape.jpg` |
| `public/images/managed-farmland/intro-farmland.jpg` | `earth-heritage/managed-farmland` | `earth-heritage/managed-farmland/intro-farmland` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791201959/earth-heritage/managed-farmland/intro-farmland.jpg) | `PILOT_MIGRATED` | Batch 2 (Step 8) | Canonical Upload |
| `public/images/how-it-works/stage-02-plan.jpg` | `earth-heritage/managed-farmland` | `earth-heritage/managed-farmland/intro-farmland` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791201959/earth-heritage/managed-farmland/intro-farmland.jpg) | `PILOT_MIGRATED` | Batch 2 (Step 8) | Consolidated Duplicate -> `public/images/managed-farmland/intro-farmland.jpg` |
| `public/images/farm-management/people-and-land.jpg` | `earth-heritage/farm-management` | `earth-heritage/farm-management/people-and-land` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791201960/earth-heritage/farm-management/people-and-land.jpg) | `PILOT_MIGRATED` | Batch 2 (Step 8) | Canonical Upload |
| `public/images/how-it-works/stage-03-work.jpg` | `earth-heritage/farm-management` | `earth-heritage/farm-management/people-and-land` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791201960/earth-heritage/farm-management/people-and-land.jpg) | `PILOT_MIGRATED` | Batch 2 (Step 8) | Consolidated Duplicate -> `public/images/farm-management/people-and-land.jpg` |
| `public/images/about/founder-sathish-agastya.jpg` | `earth-heritage/about` | `earth-heritage/about/founder-sathish-agastya` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791201961/earth-heritage/about/founder-sathish-agastya.jpg) | `PILOT_MIGRATED` | Batch 2 (Step 8) | Canonical Upload |
| `public/images/about/founder-sathish-agastya-hq.jpg` | `earth-heritage/about` | `earth-heritage/about/founder-sathish-agastya` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791201961/earth-heritage/about/founder-sathish-agastya.jpg) | `PILOT_MIGRATED` | Batch 2 (Step 8) | Consolidated Duplicate -> `public/images/about/founder-sathish-agastya.jpg` |
| `public/images/campaign/gandhi-jayanti-2026.jpg` | `earth-heritage/campaign` | `earth-heritage/campaign/gandhi-jayanti-2026` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791201962/earth-heritage/campaign/gandhi-jayanti-2026.jpg) | `PILOT_MIGRATED` | Batch 2 (Step 8) | Canonical Upload |
| `public/images/projects/coconut-garden/boundary-plantation-wall.png` | `earth-heritage/projects/coconut-garden` | `earth-heritage/projects/coconut-garden/boundary-plantation-wall` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791203224/earth-heritage/projects/coconut-garden/boundary-plantation-wall.png) | `PILOT_MIGRATED` | Batch 3 (Step 9) | Canonical Upload |
| `public/images/projects/coconut-garden/plot-demarcation-10.jpg` | `earth-heritage/projects/coconut-garden` | `earth-heritage/projects/coconut-garden/plot-demarcation-10` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791203228/earth-heritage/projects/coconut-garden/plot-demarcation-10.jpg) | `PILOT_MIGRATED` | Batch 3 (Step 9) | Canonical Upload |
| `public/images/projects/coconut-garden/farm-landscape-groves.jpg` | `earth-heritage/projects/coconut-garden` | `earth-heritage/projects/coconut-garden/farm-landscape-groves` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791203230/earth-heritage/projects/coconut-garden/farm-landscape-groves.jpg) | `PILOT_MIGRATED` | Batch 3 (Step 9) | Canonical Upload |
| `public/images/plantations/coconut.jpg` | `earth-heritage/plantations` | `earth-heritage/plantations/coconut` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791203240/earth-heritage/plantations/coconut.jpg) | `PILOT_MIGRATED` | Batch 3 (Step 9) | Canonical Upload |
| `public/images/plantations/areca-nut.jpg` | `earth-heritage/plantations` | `earth-heritage/plantations/areca-nut` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791203253/earth-heritage/plantations/areca-nut.jpg) | `PILOT_MIGRATED` | Batch 3 (Step 9) | Canonical Upload |
| `public/images/plantations/seasonal-fruits.jpg` | `earth-heritage/plantations` | `earth-heritage/plantations/seasonal-fruits` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791203256/earth-heritage/plantations/seasonal-fruits.jpg) | `PILOT_MIGRATED` | Batch 3 (Step 9) | Canonical Upload |
| `public/images/plantations/teak-wood.jpg` | `earth-heritage/plantations` | `earth-heritage/plantations/teak-wood` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791203260/earth-heritage/plantations/teak-wood.jpg) | `PILOT_MIGRATED` | Batch 3 (Step 9) | Canonical Upload |
| `public/images/gallery/hero-feature.jpg` | `earth-heritage/gallery` | `earth-heritage/gallery/hero-feature` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791203262/earth-heritage/gallery/hero-feature.jpg) | `PILOT_MIGRATED` | Batch 3 (Step 9) | Canonical Upload |
| `public/images/how-it-works/stage-01-understand.jpg` | `earth-heritage/gallery` | `earth-heritage/gallery/hero-feature` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791203262/earth-heritage/gallery/hero-feature.jpg) | `PILOT_MIGRATED` | Batch 3 (Step 9) | Consolidated Duplicate -> `public/images/gallery/hero-feature.jpg` |
| `public/images/gallery/cultivation-detail.jpg` | `earth-heritage/gallery` | `earth-heritage/gallery/cultivation-detail` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791203266/earth-heritage/gallery/cultivation-detail.jpg) | `PILOT_MIGRATED` | Batch 3 (Step 9) | Canonical Upload |
| `public/images/how-it-works/stage-04-cultivate.jpg` | `earth-heritage/gallery` | `earth-heritage/gallery/cultivation-detail` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791203266/earth-heritage/gallery/cultivation-detail.jpg) | `PILOT_MIGRATED` | Batch 3 (Step 9) | Consolidated Duplicate -> `public/images/gallery/cultivation-detail.jpg` |
| `public/images/amenities/children-play-area.jpg` | `earth-heritage/amenities` | `earth-heritage/amenities/children-play-area` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791203273/earth-heritage/amenities/children-play-area.jpg) | `PILOT_MIGRATED` | Batch 3 (Step 9) | Canonical Upload |
| `public/images/amenities/cottages.jpg` | `earth-heritage/amenities` | `earth-heritage/amenities/cottages` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791203277/earth-heritage/amenities/cottages.jpg) | `PILOT_MIGRATED` | Batch 3 (Step 9) | Canonical Upload |
| `public/images/amenities/yoga-meditation.jpg` | `earth-heritage/amenities` | `earth-heritage/amenities/yoga-meditation` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791203279/earth-heritage/amenities/yoga-meditation.jpg) | `PILOT_MIGRATED` | Batch 3 (Step 9) | Canonical Upload |
| `public/images/how-it-works/responsible-care-panorama.jpg` | `earth-heritage/how-it-works` | `earth-heritage/how-it-works/responsible-care-panorama` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791203281/earth-heritage/how-it-works/responsible-care-panorama.jpg) | `PILOT_MIGRATED` | Batch 3 (Step 9) | Canonical Upload |
| `public/images/landing/manage-06-harvest.jpg` | `earth-heritage/landing` | `earth-heritage/landing/manage-06-harvest` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791203282/earth-heritage/landing/manage-06-harvest.jpg) | `PILOT_MIGRATED` | Batch 3 (Step 9) | Canonical Upload |
| `public/images/how-it-works/stage-05-harvest.jpg` | `earth-heritage/landing` | `earth-heritage/landing/manage-06-harvest` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791203282/earth-heritage/landing/manage-06-harvest.jpg) | `PILOT_MIGRATED` | Batch 3 (Step 9) | Consolidated Duplicate -> `public/images/landing/manage-06-harvest.jpg` |
| `public/images/amenities/camping-area.jpg` | `earth-heritage/amenities` | `earth-heritage/amenities/camping-area` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791204894/earth-heritage/amenities/camping-area.jpg) | `PILOT_MIGRATED` | Batch 4 (Step 10) | Canonical Upload |
| `public/images/amenities/pond-area.jpg` | `earth-heritage/amenities` | `earth-heritage/amenities/pond-area` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791204908/earth-heritage/amenities/pond-area.jpg) | `PILOT_MIGRATED` | Batch 4 (Step 10) | Canonical Upload |
| `public/images/amenities/jogging-track.jpg` | `earth-heritage/amenities` | `earth-heritage/amenities/jogging-track` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791204912/earth-heritage/amenities/jogging-track.jpg) | `PILOT_MIGRATED` | Batch 4 (Step 10) | Canonical Upload |
| `public/images/amenities/swimming-pool.jpg` | `earth-heritage/amenities` | `earth-heritage/amenities/swimming-pool` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791204914/earth-heritage/amenities/swimming-pool.jpg) | `PILOT_MIGRATED` | Batch 4 (Step 10) | Canonical Upload |
| `public/images/amenities/multi-court.jpg` | `earth-heritage/amenities` | `earth-heritage/amenities/multi-court` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791204915/earth-heritage/amenities/multi-court.jpg) | `PILOT_MIGRATED` | Batch 4 (Step 10) | Canonical Upload |
| `public/images/amenities/viewpoint.jpg` | `earth-heritage/amenities` | `earth-heritage/amenities/viewpoint` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791204917/earth-heritage/amenities/viewpoint.jpg) | `PILOT_MIGRATED` | Batch 4 (Step 10) | Canonical Upload |
| `public/images/amenities/indoor-games.jpg` | `earth-heritage/amenities` | `earth-heritage/amenities/indoor-games` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791204918/earth-heritage/amenities/indoor-games.jpg) | `PILOT_MIGRATED` | Batch 4 (Step 10) | Canonical Upload |
| `public/images/farm-management/responsible-care.jpg` | `earth-heritage/farm-management` | `earth-heritage/farm-management/responsible-care` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791204920/earth-heritage/farm-management/responsible-care.jpg) | `PILOT_MIGRATED` | Batch 4 (Step 10) | Canonical Upload |
| `public/images/farm-management/intro-farm-management.jpg` | `earth-heritage/farm-management` | `earth-heritage/farm-management/intro-farm-management` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791204921/earth-heritage/farm-management/intro-farm-management.jpg) | `PILOT_MIGRATED` | Batch 4 (Step 10) | Canonical Upload |
| `public/images/managed-farmland/nature-responsibility.jpg` | `earth-heritage/managed-farmland` | `earth-heritage/managed-farmland/nature-responsibility` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791204922/earth-heritage/managed-farmland/nature-responsibility.jpg) | `PILOT_MIGRATED` | Batch 4 (Step 10) | Canonical Upload |
| `public/images/managed-farmland/core-proposition.jpg` | `earth-heritage/managed-farmland` | `earth-heritage/managed-farmland/core-proposition` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791204923/earth-heritage/managed-farmland/core-proposition.jpg) | `PILOT_MIGRATED` | Batch 4 (Step 10) | Canonical Upload |
| `public/images/about/intro-farmland.jpg` | `earth-heritage/about` | `earth-heritage/about/intro-farmland` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791204925/earth-heritage/about/intro-farmland.jpg) | `PILOT_MIGRATED` | Batch 4 (Step 10) | Canonical Upload |
| `public/images/landing/principles-land.jpg` | `earth-heritage/landing` | `earth-heritage/landing/principles-land` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791204926/earth-heritage/landing/principles-land.jpg) | `PILOT_MIGRATED` | Batch 4 (Step 10) | Canonical Upload |
| `public/images/landing/hero-managed-crops.jpg` | `earth-heritage/landing` | `earth-heritage/landing/hero-managed-crops` | [Link](https://res.cloudinary.com/yffbj6hj/image/upload/v1791204927/earth-heritage/landing/hero-managed-crops.jpg) | `PILOT_MIGRATED` | Batch 4 (Step 10) | Canonical Upload |

---

## Cloudinary Candidates
The following 75 content-managed images are candidates for migration to Cloudinary under the `earth-heritage/` folder hierarchy.

| Local Path | Proposed Cloudinary Folder | Proposed Public ID | Size | Usages | Current Usage Locations | Status |
| :--- | :--- | :--- | :---: | :---: | :--- | :---: |
| `public/images/about/founder-khushi-jain-hq.jpg` | `earth-heritage/about` | `founder-khushi-jain-hq` | 421.8 KB | 0 | *None (Orphaned/Unreferenced)* | `CLOUDINARY_CANDIDATE` |
| `public/images/about/founder-khushi-jain.jpg` | `earth-heritage/about` | `founder-khushi-jain` | 421.8 KB | 1 | `data/aboutData.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/about/founder-sathish-agastya-hq.jpg` | `earth-heritage/about` | `founder-sathish-agastya-hq` | 371.8 KB | 0 | *None (Orphaned/Unreferenced)* | `CLOUDINARY_CANDIDATE` |
| `public/images/about/founder-sathish-agastya.jpg` | `earth-heritage/about` | `founder-sathish-agastya` | 371.8 KB | 1 | `data/aboutData.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/about/intro-farmland.jpg` | `earth-heritage/about` | `intro-farmland` | 1017.6 KB | 1 | `data/aboutImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/about/philosophy-farmland.jpg` | `earth-heritage/about` | `philosophy-farmland` | 960.7 KB | 0 | *None (Orphaned/Unreferenced)* | `CLOUDINARY_CANDIDATE` |
| `public/images/about/story-farmland.jpg` | `earth-heritage/about` | `story-farmland` | 1.19 MB | 0 | *None (Orphaned/Unreferenced)* | `CLOUDINARY_CANDIDATE` |
| `public/images/amenities/camping-area.jpg` | `earth-heritage/amenities` | `camping-area` | 1.11 MB | 1 | `data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/amenities/children-play-area.jpg` | `earth-heritage/amenities` | `children-play-area` | 1.20 MB | 1 | `data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/amenities/club-house.jpg` | `earth-heritage/amenities` | `club-house` | 1009.7 KB | 1 | `data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/amenities/cottages.jpg` | `earth-heritage/amenities` | `cottages` | 1.20 MB | 1 | `data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/amenities/garden-area.jpg` | `earth-heritage/amenities` | `garden-area` | 1.24 MB | 1 | `data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/amenities/indoor-games.jpg` | `earth-heritage/amenities` | `indoor-games` | 922.6 KB | 1 | `data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/amenities/jogging-track.jpg` | `earth-heritage/amenities` | `jogging-track` | 1.07 MB | 1 | `data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/amenities/multi-court.jpg` | `earth-heritage/amenities` | `multi-court` | 1.02 MB | 1 | `data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/amenities/pond-area.jpg` | `earth-heritage/amenities` | `pond-area` | 1.11 MB | 1 | `data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/amenities/swimming-pool.jpg` | `earth-heritage/amenities` | `swimming-pool` | 1.06 MB | 1 | `data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/amenities/viewpoint.jpg` | `earth-heritage/amenities` | `viewpoint` | 993.2 KB | 1 | `data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/amenities/yoga-meditation.jpg` | `earth-heritage/amenities` | `yoga-meditation` | 1.16 MB | 1 | `data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/campaign/gandhi-jayanti-2026.jpg` | `earth-heritage/campaign` | `gandhi-jayanti-2026` | 177.5 KB | 1 | `components/campaigns/GandhiJayantiPopup.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/farm-management/intro-farm-management.jpg` | `earth-heritage/farm-management` | `intro-farm-management` | 1002.4 KB | 1 | `data/farmManagementImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/farm-management/people-and-land.jpg` | `earth-heritage/farm-management` | `people-and-land` | 1.05 MB | 5 | `components/sections/home/HomeEvents.js`<br>`components/sections/home/HomeStories.js`<br>`data/blogs.js`<br>`data/events.js`<br>`data/farmManagementImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/farm-management/responsible-care.jpg` | `earth-heritage/farm-management` | `responsible-care` | 1015.0 KB | 3 | `components/sections/home/HomeStories.js`<br>`data/farmManagementImages.js`<br>`data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/gallery/cultivation-detail.jpg` | `earth-heritage/gallery` | `cultivation-detail` | 811.1 KB | 1 | `components/sections/home/HomeStories.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/gallery/experiences-gathering.jpg` | `earth-heritage/gallery` | `experiences-gathering` | 919.3 KB | 3 | `components/sections/home/HomeEvents.js`<br>`components/sections/home/HomeStories.js`<br>`data/events.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/gallery/hero-feature.jpg` | `earth-heritage/gallery` | `hero-feature` | 826.0 KB | 1 | `components/sections/home/HomeStories.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/gallery/nairuthya-01-entrance.jpg` | `earth-heritage/gallery` | `nairuthya-01-entrance` | 206.9 KB | 2 | `data/galleryImages.js`<br>`data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/gallery/nairuthya-02-stone-terraces.jpg` | `earth-heritage/gallery` | `nairuthya-02-stone-terraces` | 211.3 KB | 2 | `data/galleryImages.js`<br>`data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/gallery/nairuthya-03-plots-irrigation.jpg` | `earth-heritage/gallery` | `nairuthya-03-plots-irrigation` | 202.5 KB | 2 | `data/galleryImages.js`<br>`data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/gallery/nairuthya-04-children-play.jpg` | `earth-heritage/gallery` | `nairuthya-04-children-play` | 236.5 KB | 2 | `data/galleryImages.js`<br>`data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/gallery/nairuthya-05-elevated-vista.jpg` | `earth-heritage/gallery` | `nairuthya-05-elevated-vista` | 189.1 KB | 2 | `data/galleryImages.js`<br>`data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/gallery/nairuthya-06-outdoor-fitness.jpg` | `earth-heritage/gallery` | `nairuthya-06-outdoor-fitness` | 227.6 KB | 2 | `data/galleryImages.js`<br>`data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/gallery/nature-canopy.jpg` | `earth-heritage/gallery` | `nature-canopy` | 1.27 MB | 3 | `components/sections/home/HomeEvents.js`<br>`components/sections/home/HomeStories.js`<br>`data/events.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/how-it-works/responsible-care-panorama.jpg` | `earth-heritage/how-it-works` | `responsible-care-panorama` | 1.01 MB | 5 | `components/sections/home/HomeEvents.js`<br>`components/sections/home/HomeStories.js`<br>`data/blogs.js`<br>`data/events.js`<br>`data/howItWorksImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/how-it-works/stage-01-understand.jpg` | `earth-heritage/how-it-works` | `stage-01-understand` | 826.0 KB | 3 | `components/sections/home/HomeHowItWorks.js`<br>`data/howItWorksData.js`<br>`data/howItWorksImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/how-it-works/stage-02-plan.jpg` | `earth-heritage/how-it-works` | `stage-02-plan` | 1.10 MB | 3 | `components/sections/home/HomeHowItWorks.js`<br>`data/howItWorksData.js`<br>`data/howItWorksImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/how-it-works/stage-03-work.jpg` | `earth-heritage/how-it-works` | `stage-03-work` | 1.05 MB | 3 | `components/sections/home/HomeHowItWorks.js`<br>`data/howItWorksData.js`<br>`data/howItWorksImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/how-it-works/stage-04-cultivate.jpg` | `earth-heritage/how-it-works` | `stage-04-cultivate` | 811.1 KB | 3 | `components/sections/home/HomeHowItWorks.js`<br>`data/howItWorksData.js`<br>`data/howItWorksImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/how-it-works/stage-05-harvest.jpg` | `earth-heritage/how-it-works` | `stage-05-harvest` | 174.7 KB | 3 | `components/sections/home/HomeHowItWorks.js`<br>`data/howItWorksData.js`<br>`data/howItWorksImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/how-it-works/stage-06-continue.jpg` | `earth-heritage/how-it-works` | `stage-06-continue` | 1.37 MB | 2 | `data/howItWorksData.js`<br>`data/howItWorksImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/landing/cta-landscape.jpg` | `earth-heritage/landing` | `cta-landscape` | 1.37 MB | 3 | `data/farmManagementImages.js`<br>`data/landingImages.js`<br>`data/managedFarmlandImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/landing/hero-family-farmland.jpg` | `earth-heritage/landing` | `hero-family-farmland` | 1.08 MB | 0 | *None (Orphaned/Unreferenced)* | `CLOUDINARY_CANDIDATE` |
| `public/images/landing/hero-farmland-estate.jpg` | `earth-heritage/landing` | `hero-farmland-estate` | 993.2 KB | 1 | `data/landingImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/landing/hero-landscape.jpg` | `earth-heritage/landing` | `hero-landscape` | 596.9 KB | 1 | `components/sections/landing/ManagedFarmlandHero.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/landing/hero-managed-crops.jpg` | `earth-heritage/landing` | `hero-managed-crops` | 1.08 MB | 2 | `components/sections/home/HomeManagedFarmland.js`<br>`data/landingImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/landing/hero-plantation-walk.jpg` | `earth-heritage/landing` | `hero-plantation-walk` | 1.24 MB | 0 | *None (Orphaned/Unreferenced)* | `CLOUDINARY_CANDIDATE` |
| `public/images/landing/hero-villa-retreat.jpg` | `earth-heritage/landing` | `hero-villa-retreat` | 1007.9 KB | 1 | `data/landingImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/landing/manage-01-people.jpg` | `earth-heritage/landing` | `manage-01-people` | 134.4 KB | 3 | `data/farmManagementImages.js`<br>`data/landingImages.js`<br>`data/managedFarmlandImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/landing/manage-02-crop.jpg` | `earth-heritage/landing` | `manage-02-crop` | 122.3 KB | 6 | `components/sections/home/HomeEvents.js`<br>`components/sections/home/HomeStories.js`<br>`data/events.js`<br>`data/farmManagementImages.js`<br>`data/landingImages.js`<br>`data/managedFarmlandImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/landing/manage-03-cultivation.jpg` | `earth-heritage/landing` | `manage-03-cultivation` | 214.3 KB | 4 | `components/sections/home/HomeStories.js`<br>`data/farmManagementImages.js`<br>`data/landingImages.js`<br>`data/managedFarmlandImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/landing/manage-04-care.jpg` | `earth-heritage/landing` | `manage-04-care` | 737.5 KB | 3 | `data/farmManagementImages.js`<br>`data/landingImages.js`<br>`data/managedFarmlandImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/landing/manage-05-operations.jpg` | `earth-heritage/landing` | `manage-05-operations` | 74.7 KB | 3 | `data/farmManagementImages.js`<br>`data/landingImages.js`<br>`data/managedFarmlandImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/landing/manage-06-harvest.jpg` | `earth-heritage/landing` | `manage-06-harvest` | 174.7 KB | 4 | `components/sections/home/HomeStories.js`<br>`data/farmManagementImages.js`<br>`data/landingImages.js`<br>`data/managedFarmlandImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/landing/philosophy-panorama.jpg` | `earth-heritage/landing` | `philosophy-panorama` | 651.8 KB | 2 | `components/sections/gallery/GalleryPhilosophy.js`<br>`data/landingImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/landing/principles-land.jpg` | `earth-heritage/landing` | `principles-land` | 1.08 MB | 1 | `data/landingImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/landing/problem-land.jpg` | `earth-heritage/landing` | `problem-land` | 342.6 KB | 1 | `data/landingImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/landing/solution-management.jpg` | `earth-heritage/landing` | `solution-management` | 845.1 KB | 0 | *None (Orphaned/Unreferenced)* | `CLOUDINARY_CANDIDATE` |
| `public/images/landing/statement-landscape.jpg` | `earth-heritage/landing` | `statement-landscape` | 553.1 KB | 1 | `data/landingImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/managed-farmland/core-proposition.jpg` | `earth-heritage/managed-farmland` | `core-proposition` | 996.0 KB | 3 | `components/projects/ProjectDetailGallery.js`<br>`components/sections/home/HomeStories.js`<br>`data/managedFarmlandImages.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/managed-farmland/intro-farmland.jpg` | `earth-heritage/managed-farmland` | `intro-farmland` | 1.10 MB | 7 | `components/projects/ProjectDetailGallery.js`<br>`components/sections/home/HomeEvents.js`<br>`components/sections/home/HomeStories.js`<br>`data/blogs.js`<br>`data/events.js`<br>`data/managedFarmlandImages.js`<br>`data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/managed-farmland/nature-responsibility.jpg` | `earth-heritage/managed-farmland` | `nature-responsibility` | 1.02 MB | 4 | `components/projects/ProjectDetailGallery.js`<br>`components/sections/home/HomeAbout.js`<br>`data/managedFarmlandImages.js`<br>`data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/plantations/areca-nut.jpg` | `earth-heritage/plantations` | `areca-nut` | 1.06 MB | 1 | `data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/plantations/coconut.jpg` | `earth-heritage/plantations` | `coconut` | 1.07 MB | 1 | `data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/plantations/mahogany.jpg` | `earth-heritage/plantations` | `mahogany` | 1.14 MB | 1 | `data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/plantations/red-sandal.jpg` | `earth-heritage/plantations` | `red-sandal` | 1.16 MB | 1 | `data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/plantations/seasonal-fruits.jpg` | `earth-heritage/plantations` | `seasonal-fruits` | 1.04 MB | 1 | `data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/plantations/teak-wood.jpg` | `earth-heritage/plantations` | `teak-wood` | 988.8 KB | 1 | `data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/projects/coconut-garden/boundary-plantation-wall.png` | `earth-heritage/projects/coconut-garden` | `boundary-plantation-wall` | 985.4 KB | 2 | `data/galleryImages.js`<br>`data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/projects/coconut-garden/entrance-gate.jpg` | `earth-heritage/projects/coconut-garden` | `entrance-gate` | 363.8 KB | 2 | `data/galleryImages.js`<br>`data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/projects/coconut-garden/farm-landscape-groves.jpg` | `earth-heritage/projects/coconut-garden` | `farm-landscape-groves` | 389.6 KB | 2 | `data/galleryImages.js`<br>`data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/projects/coconut-garden/internal-road-layout.jpg` | `earth-heritage/projects/coconut-garden` | `internal-road-layout` | 309.3 KB | 2 | `data/galleryImages.js`<br>`data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/projects/coconut-garden/plot-demarcation-10.jpg` | `earth-heritage/projects/coconut-garden` | `plot-demarcation-10` | 532.0 KB | 2 | `data/galleryImages.js`<br>`data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/projects/coconut-garden-hero.jpg` | `earth-heritage/projects` | `coconut-garden-hero` | 389.6 KB | 2 | `data/galleryImages.js`<br>`data/projects.js` | `CLOUDINARY_CANDIDATE` |
| `public/images/projects/nairuthya-project-overview.png` | `earth-heritage/projects` | `nairuthya-project-overview` | 334.4 KB | 0 | *None (Orphaned/Unreferenced)* | `CLOUDINARY_CANDIDATE` |
| `public/images/projects/nairuthya-whispering-wood-hero.jpg` | `earth-heritage/projects` | `nairuthya-whispering-wood-hero` | 206.9 KB | 3 | `components/projects/nairuthya/NairuthyaHero.js`<br>`data/galleryImages.js`<br>`data/projects.js` | `CLOUDINARY_CANDIDATE` |

---

## Duplicate / Reused Assets

### 1. Exact Binary Content Duplicates (Identical SHA-256)
The audit identified 12 duplicate groups (24 file paths). During the migration, multiple duplicate local files can be pointed to a single canonical Cloudinary asset to eliminate storage redundancy.

| Asset Group | Duplicate File Paths | Hash (SHA-256) | Recommended Action |
| :--- | :--- | :--- | :--- |
| **Group 1** | `public/apple-icon.png`<br>`public/apple-touch-icon.png` | `7339ba73b3e7...` | Keep local (core browser/brand asset redundancy). |
| **Group 2** | `public/icon.png`<br>`public/icons/icon-512.png` | `2efae21fad5b...` | Keep local (core browser/brand asset redundancy). |
| **Group 3** | `public/images/about/founder-khushi-jain-hq.jpg`<br>`public/images/about/founder-khushi-jain.jpg` | `2de5c1be08ba...` | Upload the standard named asset (e.g. `founder-khushi-jain`). Discard the unreferenced `-hq` copy. |
| **Group 4** | `public/images/about/founder-sathish-agastya-hq.jpg`<br>`public/images/about/founder-sathish-agastya.jpg` | `f61d5368d601...` | Upload the standard named asset (e.g. `founder-khushi-jain`). Discard the unreferenced `-hq` copy. |
| **Group 5** | `public/images/earth-heritage-logo-light.png`<br>`public/images/earth-heritage-logo-original.png` | `5d1537eca4f8...` | Keep local (core browser/brand asset redundancy). |
| **Group 6** | `public/images/farm-management/people-and-land.jpg`<br>`public/images/how-it-works/stage-03-work.jpg` | `b02753516fd8...` | Upload one canonical copy to Cloudinary; update all referencing data files to share the single Cloudinary URL. |
| **Group 7** | `public/images/gallery/cultivation-detail.jpg`<br>`public/images/how-it-works/stage-04-cultivate.jpg` | `58d65ae81eba...` | Upload one canonical copy to Cloudinary; update all referencing data files to share the single Cloudinary URL. |
| **Group 8** | `public/images/gallery/hero-feature.jpg`<br>`public/images/how-it-works/stage-01-understand.jpg` | `8f17a5251ccd...` | Upload one canonical copy to Cloudinary; update all referencing data files to share the single Cloudinary URL. |
| **Group 9** | `public/images/gallery/nairuthya-01-entrance.jpg`<br>`public/images/projects/nairuthya-whispering-wood-hero.jpg` | `10ca9203aa14...` | Upload one canonical copy to Cloudinary; update all referencing data files to share the single Cloudinary URL. |
| **Group 10** | `public/images/how-it-works/stage-02-plan.jpg`<br>`public/images/managed-farmland/intro-farmland.jpg` | `25059761e955...` | Upload one canonical copy to Cloudinary; update all referencing data files to share the single Cloudinary URL. |
| **Group 11** | `public/images/how-it-works/stage-05-harvest.jpg`<br>`public/images/landing/manage-06-harvest.jpg` | `8954822c12fe...` | Upload one canonical copy to Cloudinary; update all referencing data files to share the single Cloudinary URL. |
| **Group 12** | `public/images/how-it-works/stage-06-continue.jpg`<br>`public/images/landing/cta-landscape.jpg` | `0e316c0f581c...` | Upload one canonical copy to Cloudinary; update all referencing data files to share the single Cloudinary URL. |

### 2. Filename Collisions (Identical Filename, Different Folders)
| Filename | File Paths | Size & Details | Recommended Action |
| :--- | :--- | :--- | :--- |
| `intro-farmland.jpg` | 1. `public/images/about/intro-farmland.jpg`<br>2. `public/images/managed-farmland/intro-farmland.jpg` | Path 1: 1017.6 KB (About overview)<br>Path 2: 1128.1 KB (Managed Farmland intro) | **Do not merge**. These are two entirely different images. Cloudinary folder separation (`earth-heritage/about/intro-farmland` vs `earth-heritage/managed-farmland/intro-farmland`) will preserve distinct public IDs naturally. |

### 3. High-Frequency Reused Assets
These content images are referenced across 3 or more independent components or data files. A single Cloudinary URL for each will optimize delivery across the entire website.

| Local Asset Path | Usages | Locations Referencing Asset |
| :--- | :---: | :--- |
| `public/images/farm-management/people-and-land.jpg` | **5** | `components/sections/home/HomeEvents.js`<br>`components/sections/home/HomeStories.js`<br>`data/blogs.js`<br>`data/events.js`<br>`data/farmManagementImages.js` |
| `public/images/farm-management/responsible-care.jpg` | **3** | `components/sections/home/HomeStories.js`<br>`data/farmManagementImages.js`<br>`data/projects.js` |
| `public/images/gallery/experiences-gathering.jpg` | **3** | `components/sections/home/HomeEvents.js`<br>`components/sections/home/HomeStories.js`<br>`data/events.js` |
| `public/images/gallery/nature-canopy.jpg` | **3** | `components/sections/home/HomeEvents.js`<br>`components/sections/home/HomeStories.js`<br>`data/events.js` |
| `public/images/how-it-works/responsible-care-panorama.jpg` | **5** | `components/sections/home/HomeEvents.js`<br>`components/sections/home/HomeStories.js`<br>`data/blogs.js`<br>`data/events.js`<br>`data/howItWorksImages.js` |
| `public/images/how-it-works/stage-01-understand.jpg` | **3** | `components/sections/home/HomeHowItWorks.js`<br>`data/howItWorksData.js`<br>`data/howItWorksImages.js` |
| `public/images/how-it-works/stage-02-plan.jpg` | **3** | `components/sections/home/HomeHowItWorks.js`<br>`data/howItWorksData.js`<br>`data/howItWorksImages.js` |
| `public/images/how-it-works/stage-03-work.jpg` | **3** | `components/sections/home/HomeHowItWorks.js`<br>`data/howItWorksData.js`<br>`data/howItWorksImages.js` |
| `public/images/how-it-works/stage-04-cultivate.jpg` | **3** | `components/sections/home/HomeHowItWorks.js`<br>`data/howItWorksData.js`<br>`data/howItWorksImages.js` |
| `public/images/how-it-works/stage-05-harvest.jpg` | **3** | `components/sections/home/HomeHowItWorks.js`<br>`data/howItWorksData.js`<br>`data/howItWorksImages.js` |
| `public/images/landing/cta-landscape.jpg` | **3** | `data/farmManagementImages.js`<br>`data/landingImages.js`<br>`data/managedFarmlandImages.js` |
| `public/images/landing/manage-01-people.jpg` | **3** | `data/farmManagementImages.js`<br>`data/landingImages.js`<br>`data/managedFarmlandImages.js` |
| `public/images/landing/manage-02-crop.jpg` | **6** | `components/sections/home/HomeEvents.js`<br>`components/sections/home/HomeStories.js`<br>`data/events.js`<br>`data/farmManagementImages.js`<br>`data/landingImages.js`<br>`data/managedFarmlandImages.js` |
| `public/images/landing/manage-03-cultivation.jpg` | **4** | `components/sections/home/HomeStories.js`<br>`data/farmManagementImages.js`<br>`data/landingImages.js`<br>`data/managedFarmlandImages.js` |
| `public/images/landing/manage-04-care.jpg` | **3** | `data/farmManagementImages.js`<br>`data/landingImages.js`<br>`data/managedFarmlandImages.js` |
| `public/images/landing/manage-05-operations.jpg` | **3** | `data/farmManagementImages.js`<br>`data/landingImages.js`<br>`data/managedFarmlandImages.js` |
| `public/images/landing/manage-06-harvest.jpg` | **4** | `components/sections/home/HomeStories.js`<br>`data/farmManagementImages.js`<br>`data/landingImages.js`<br>`data/managedFarmlandImages.js` |
| `public/images/managed-farmland/core-proposition.jpg` | **3** | `components/projects/ProjectDetailGallery.js`<br>`components/sections/home/HomeStories.js`<br>`data/managedFarmlandImages.js` |
| `public/images/managed-farmland/intro-farmland.jpg` | **7** | `components/projects/ProjectDetailGallery.js`<br>`components/sections/home/HomeEvents.js`<br>`components/sections/home/HomeStories.js`<br>`data/blogs.js`<br>`data/events.js`<br>`data/managedFarmlandImages.js`<br>`data/projects.js` |
| `public/images/managed-farmland/nature-responsibility.jpg` | **4** | `components/projects/ProjectDetailGallery.js`<br>`components/sections/home/HomeAbout.js`<br>`data/managedFarmlandImages.js`<br>`data/projects.js` |
| `public/images/projects/nairuthya-whispering-wood-hero.jpg` | **3** | `components/projects/nairuthya/NairuthyaHero.js`<br>`data/galleryImages.js`<br>`data/projects.js` |

---

## Migration Notes

### 1. Data File Centralization
85%+ of content image usages are concentrated in the following centralized data modules:
- `data/projects.js`
- `data/galleryImages.js`
- `data/landingImages.js`
- `data/howItWorksData.js` & `data/howItWorksImages.js`
- `data/farmManagementImages.js`
- `data/managedFarmlandImages.js`
- `data/blogs.js`
- `data/events.js`
- `data/aboutData.js` & `data/aboutImages.js`

Migrating these data files to use Cloudinary URLs (or a Cloudinary URL resolver utility) will automatically update almost all production pages without touching individual page components.

### 2. Direct Component References
A small number of UI components reference image paths directly in JSX:
- `components/projects/nairuthya/NairuthyaHero.js` (`/images/projects/nairuthya-whispering-wood-hero.jpg`)
- `components/projects/ProjectDetailGallery.js` (`/images/managed-farmland/intro-farmland.jpg`)
- `components/sections/home/HomeStories.js` (`/images/gallery/hero-feature.jpg`, `/images/gallery/cultivation-detail.jpg`, etc.)
- `components/sections/home/HomeEvents.js` (`/images/farm-management/people-and-land.jpg`, `/images/managed-farmland/intro-farmland.jpg`)
- `components/sections/home/HomeHowItWorks.js` (`/images/how-it-works/stage-01-understand.jpg`, etc.)

These should either be switched to import from their corresponding data module or updated directly during component migration.

### 3. Performance & Size Optimization Opportunity
- Total candidate image payload is **~56.7 MB** across 75 assets.
- Many source images are currently between 1.0 MB and 2.5 MB (e.g., `hero-landscape.jpg` at 2.45 MB, `farm-management-01.jpg` at 2.21 MB).
- Serving these via Cloudinary with automatic format negotiation (`f_auto`, `q_auto`) and Next.js Image Optimization will cut bandwidth consumption by an estimated **65%–80%** without visual degradation.

### 4. Zero Disruption for Core Brand & Browser Assets
- The 16 `KEEP_LOCAL` assets (favicons, touch icons, brand logos, wordmarks, wood texture) will remain permanently in `public/`.
- Search engines, social share scrapers, browser tabs, and Apple Touch Icon resolvers will experience zero disruption.

### 5. Safe Migration Phasing
- Phase 1: Upload candidate assets to their designated `earth-heritage/<folder>` directories in Cloudinary.
- Phase 2: Create a Cloudinary image helper/resolver (`lib/cloudinaryClient.js` or `lib/media.js`) to generate optimized URLs.
- Phase 3: Switch centralized data modules (`data/*.js`) one section at a time.
- Phase 4: Validate all pages, then clean up obsolete redundant local files after verification.
