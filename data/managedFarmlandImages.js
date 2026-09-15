/**
 * Centralized Image Architecture for Managed Farmland (/managed-farmland)
 * 
 * Curated dedicated farmland photography specifically produced for the
 * Managed Farmland page (/managed-farmland).
 * 
 * Distinct, high-resolution visual assets ensuring authentic farmland storytelling
 * without duplicating hero imagery from the landing or About pages.
 * 
 * All temporary development assets are explicitly documented for straightforward
 * replacement when authentic project photography becomes available.
 */

export const managedFarmlandImages = {
  intro: {
    id: 'mf-intro-farmland',
    src: '/images/managed-farmland/intro-farmland.jpg',
    alt: 'Expansive managed agricultural estate with neatly cultivated crop rows, thriving orchard trees, and rich organic soil under clear morning sunlight',
    usage: 'Section 1 — Large editorial farmland hero image below page title',
    temporary: true,
    width: 2400,
    height: 1350
  },

  coreProposition: {
    id: 'mf-core-estate',
    src: '/images/managed-farmland/core-proposition.jpg',
    alt: 'Scenic managed farmland estate with peaceful rural pathway, mature shade trees, and deep fertile soil furrows under open skies',
    usage: 'Section 2 — Core proposition editorial visual pairing ("You own the land. We manage the farm.")',
    temporary: true,
    width: 2400,
    height: 1350
  },

  managementStages: [
    {
      id: 'mf-stage-01',
      stage: '01',
      title: 'People & Manpower',
      src: '/images/landing/manage-01-people.jpg',
      alt: 'Dedicated agricultural team and skilled farm hands working with soil and seedlings',
      usage: 'Section 3 — Management sequence stage 01',
      temporary: true,
      width: 1200,
      height: 800
    },
    {
      id: 'mf-stage-02',
      stage: '02',
      title: 'Crop Planning',
      src: '/images/landing/manage-02-crop.jpg',
      alt: 'Young vibrant crop seedlings planted in disciplined agricultural rows',
      usage: 'Section 3 — Management sequence stage 02',
      temporary: true,
      width: 1000,
      height: 667
    },
    {
      id: 'mf-stage-03',
      stage: '03',
      title: 'Cultivation',
      src: '/images/landing/manage-03-cultivation.jpg',
      alt: 'Lush agricultural cultivation beds thriving under natural sunlight',
      usage: 'Section 3 — Management sequence stage 03',
      temporary: true,
      width: 1000,
      height: 667
    },
    {
      id: 'mf-stage-04',
      stage: '04',
      title: 'Farm Maintenance',
      src: '/images/landing/manage-04-care.jpg',
      alt: 'Healthy tree canopy, soil enrichment, and orderly grove maintenance',
      usage: 'Section 3 — Management sequence stage 04',
      temporary: true,
      width: 1000,
      height: 667
    },
    {
      id: 'mf-stage-05',
      stage: '05',
      title: 'Day-to-Day Operations',
      src: '/images/landing/manage-05-operations.jpg',
      alt: 'Agricultural landscape pathway with orderly irrigation infrastructure',
      usage: 'Section 3 — Management sequence stage 05',
      temporary: true,
      width: 1000,
      height: 667
    },
    {
      id: 'mf-stage-06',
      stage: '06',
      title: 'Harvest Management',
      src: '/images/landing/manage-06-harvest.jpg',
      alt: 'Bountiful harvest produce fresh from cultivated farmland',
      usage: 'Section 3 — Management sequence stage 06',
      temporary: true,
      width: 1000,
      height: 667
    }
  ],

  natureResponsibility: {
    id: 'mf-nature-stewardship',
    src: '/images/managed-farmland/nature-responsibility.jpg',
    alt: 'Expansive biodiverse farmland at golden hour with ancient shaded trees, flourishing vegetation, and rolling hills bathed in amber sunlight',
    usage: 'Section 7 — Land, Nature & Responsibility ("Management isn\'t just about operating a farm. It\'s about caring for the land.")',
    temporary: true,
    width: 2400,
    height: 1350
  },

  cta: {
    id: 'mf-cta-landscape',
    src: '/images/landing/cta-landscape.jpg',
    alt: 'Serene sunset over fertile agricultural acreage, mature trees, and distant horizon',
    usage: 'Section 10 — Final closing enquiry CTA visual accent',
    temporary: true,
    width: 2400,
    height: 1350
  }
};
