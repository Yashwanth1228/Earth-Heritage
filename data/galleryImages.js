/**
 * Centralized Exhibition Gallery Images Architecture (/gallery)
 * 
 * Curated photographic collection spanning:
 * - LAND
 * - NATURE
 * - CULTIVATION
 * - FARM LIFE
 * - EXPERIENCES
 * 
 * IMPORTANT:
 * All images are curated temporary visual assets for development.
 * Each object includes descriptive alt text of what is visually depicted
 * and does not claim to represent specific Earth Heritage project locations.
 * All gallery exhibition items are standardized to equal dimensions (aspect-[4/3], col-span-1).
 */

export const galleryCategories = [
  { id: 'ALL', label: 'All' },
  { id: 'LAND', label: 'Land' },
  { id: 'NATURE', label: 'Nature' },
  { id: 'CULTIVATION', label: 'Cultivation' },
  { id: 'FARM LIFE', label: 'Farm Life' },
  { id: 'EXPERIENCES', label: 'Experiences' }
];

export const galleryImages = [
  // 1. Hero / Exhibition Feature Landmark
  {
    id: 'gal-feature-01',
    src: '/images/gallery/hero-feature.jpg',
    alt: 'Breathtaking misty agricultural valley and rolling green hills at sunrise with golden light breaking through morning clouds',
    title: 'Morning Light over the Valley',
    category: 'LAND',
    aspect: 'aspect-[16/9] lg:aspect-[21/9]',
    isFeature: true,
    temporary: true,
    width: 2400,
    height: 1350
  },

  // 2. LAND
  {
    id: 'gal-land-01',
    src: '/images/managed-farmland/intro-farmland.jpg',
    alt: 'Expansive managed agricultural estate with disciplined crop rows, fruit orchards, and rich dark earth',
    title: 'Cultivated Acreage & Orchards',
    category: 'LAND',
    aspect: 'aspect-[4/3]',
    span: 'col-span-1',
    temporary: true,
    width: 2400,
    height: 1350
  },
  {
    id: 'gal-land-02',
    src: '/images/farm-management/responsible-care.jpg',
    alt: 'Rolling green agricultural acreage with orderly contour furrows and native shade trees',
    title: 'Topographic Contours & Living Soil',
    category: 'LAND',
    aspect: 'aspect-[4/3]',
    span: 'col-span-1',
    temporary: true,
    width: 2400,
    height: 1350
  },

  // 3. NATURE
  {
    id: 'gal-nature-01',
    src: '/images/gallery/nature-canopy.jpg',
    alt: 'Sunbeams filtering through an ancient biodiverse tree canopy with wild ferns and forest flora',
    title: 'Native Canopy & Sunbeams',
    category: 'NATURE',
    aspect: 'aspect-[4/3]',
    span: 'col-span-1',
    temporary: true,
    width: 1600,
    height: 1200
  },
  {
    id: 'gal-nature-02',
    src: '/images/managed-farmland/nature-responsibility.jpg',
    alt: 'Expansive golden-hour agroforestry landscape with mature indigenous trees and distant hills',
    title: 'Ecosystem Harmony at Golden Hour',
    category: 'NATURE',
    aspect: 'aspect-[4/3]',
    span: 'col-span-1',
    temporary: true,
    width: 2400,
    height: 1350
  },
  {
    id: 'gal-nature-03',
    src: '/images/landing/philosophy-panorama.jpg',
    alt: 'Misty tree-lined ridge and panoramic agricultural valley bathed in soft morning light',
    title: 'The Breath of the Horizon',
    category: 'NATURE',
    aspect: 'aspect-[4/3]',
    span: 'col-span-1',
    temporary: true,
    width: 2400,
    height: 1200
  },

  // 4. CULTIVATION
  {
    id: 'gal-cult-01',
    src: '/images/gallery/cultivation-detail.jpg',
    alt: 'Close-up detail of fresh organic vegetable shoots emerging from nutrient-rich dark crumbly soil with morning dew drops',
    title: 'Seedling Emergence & Soil Vitality',
    category: 'CULTIVATION',
    aspect: 'aspect-[4/3]',
    span: 'col-span-1',
    temporary: true,
    width: 1200,
    height: 1600
  },
  {
    id: 'gal-cult-02',
    src: '/images/landing/manage-02-crop.jpg',
    alt: 'Young vibrant agricultural crop seedlings planted in disciplined straight field rows',
    title: 'Scheduled Seasonal Planting',
    category: 'CULTIVATION',
    aspect: 'aspect-[4/3]',
    span: 'col-span-1',
    temporary: true,
    width: 1000,
    height: 667
  },
  {
    id: 'gal-cult-03',
    src: '/images/landing/manage-03-cultivation.jpg',
    alt: 'Thriving agricultural cultivation beds growing under natural sunlight',
    title: 'Growth Care & Natural Cycles',
    category: 'CULTIVATION',
    aspect: 'aspect-[4/3]',
    span: 'col-span-1',
    temporary: true,
    width: 1000,
    height: 667
  },

  // 5. FARM LIFE
  {
    id: 'gal-life-01',
    src: '/images/farm-management/people-and-land.jpg',
    alt: 'Agricultural field specialists and farm hands assessing young fruit trees and soil structure',
    title: 'Hands-on Agronomic Stewardship',
    category: 'FARM LIFE',
    aspect: 'aspect-[4/3]',
    span: 'col-span-1',
    temporary: true,
    width: 2400,
    height: 1350
  },
  {
    id: 'gal-life-02',
    src: '/images/landing/manage-01-people.jpg',
    alt: 'Skilled agricultural team preparing seedlings and tending soil in morning light',
    title: 'Coordinated Field Teams',
    category: 'FARM LIFE',
    aspect: 'aspect-[4/3]',
    span: 'col-span-1',
    temporary: true,
    width: 1200,
    height: 800
  },
  {
    id: 'gal-life-03',
    src: '/images/landing/manage-04-care.jpg',
    alt: 'Orderly orchard grove maintenance, soil enrichment, and healthy canopy upkeep',
    title: 'Continuous Orchard Care',
    category: 'FARM LIFE',
    aspect: 'aspect-[4/3]',
    span: 'col-span-1',
    temporary: true,
    width: 1000,
    height: 667
  },
  {
    id: 'gal-life-04',
    src: '/images/landing/manage-05-operations.jpg',
    alt: 'Agricultural roadway and organized irrigation infrastructure traversing managed acreage',
    title: 'Daily Farm Infrastructure & Routines',
    category: 'FARM LIFE',
    aspect: 'aspect-[4/3]',
    span: 'col-span-1',
    temporary: true,
    width: 1000,
    height: 667
  },
  {
    id: 'gal-life-05',
    src: '/images/landing/manage-06-harvest.jpg',
    alt: 'Bountiful fresh seasonal harvest produce gathered with systematic agricultural care',
    title: 'Seasonal Harvest Produce Handover',
    category: 'FARM LIFE',
    aspect: 'aspect-[4/3]',
    span: 'col-span-1',
    temporary: true,
    width: 1000,
    height: 667
  },

  // 6. EXPERIENCES
  {
    id: 'gal-exp-01',
    src: '/images/gallery/experiences-gathering.jpg',
    alt: 'Warm twilight gathering under an open timber farm pavilion with lantern light and starlight over open fields',
    title: 'Evening Gatherings Under the Stars',
    category: 'EXPERIENCES',
    aspect: 'aspect-[4/3]',
    span: 'col-span-1',
    temporary: true,
    width: 2400,
    height: 1350
  },
  {
    id: 'gal-exp-02',
    src: '/images/managed-farmland/core-proposition.jpg',
    alt: 'Peaceful gravel farm pathway meandering through open fields and shade trees',
    title: 'The Quiet Sanctuary of the Land',
    category: 'EXPERIENCES',
    aspect: 'aspect-[4/3]',
    span: 'col-span-1',
    temporary: true,
    width: 2400,
    height: 1350
  },
  {
    id: 'gal-exp-03',
    src: '/images/landing/cta-landscape.jpg',
    alt: 'Tranquil evening sunset casting warm amber light across fertile farmland acreage',
    title: 'Sunset over Living Legacies',
    category: 'EXPERIENCES',
    aspect: 'aspect-[4/3]',
    span: 'col-span-1',
    temporary: true,
    width: 2400,
    height: 1350
  }
];
