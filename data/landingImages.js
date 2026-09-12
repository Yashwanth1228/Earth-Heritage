/**
 * Centralized Landing Page Image Architecture
 * 
 * IMPORTANT:
 * All images configured here are curated temporary visual assets for development.
 * They represent the visual standards (aerial farmland, tree-lined agriculture,
 * managed plantations, atmospheric light) required for the Earth Heritage brand.
 * 
 * When authentic Earth Heritage farm and project photography is delivered,
 * update the 'src' paths in this single file without altering any section components.
 */

export const landingImages = {
  hero: {
    id: 'hero-landscape',
    src: '/images/landing/hero-landscape.jpg',
    alt: 'Expansive managed farmland with lush green tree canopies at golden sunrise',
    usage: 'Hero full-screen landscape background',
    temporary: true,
    width: 2400,
    height: 1600
  },
  statement: {
    id: 'statement-landscape',
    src: '/images/landing/statement-landscape.jpg',
    alt: 'Sunlight filtering through a rich, verdant tree canopy on agricultural land',
    usage: 'Section 2 — Living Legacy editorial visual pairing',
    temporary: true,
    width: 1600,
    height: 1067
  },
  problem: {
    id: 'problem-land',
    src: '/images/landing/problem-land.jpg',
    alt: 'Rolling open green farmland landscape under soft morning mist',
    usage: 'Section 3 — Landowner responsibility & stewardship visual pairing',
    temporary: true,
    width: 1600,
    height: 1067
  },
  solution: {
    id: 'solution-management',
    src: '/images/landing/solution-management.jpg',
    alt: 'Neatly cultivated agricultural rows under expansive open skies',
    usage: 'Section 4 — Core proposition ("You own the land. We manage the farm.")',
    temporary: true,
    width: 1600,
    height: 1067
  },
  managementCards: [
    {
      id: 'manage-card-01',
      number: '01',
      title: 'Plan the Farm',
      quote: '“Thoughtful farm management begins with understanding the land and planning the work required to care for it.”',
      src: '/images/landing/manage-02-crop.jpg',
      alt: 'Systematic crop rows and open agricultural fields for strategic farm planning',
      description: 'Thoughtful farm management begins with understanding the land and planning the work required to care for it.',
      width: 1000,
      height: 667,
      temporary: true
    },
    {
      id: 'manage-card-02',
      number: '02',
      title: 'Manage the Farm',
      quote: '“Day-to-day care requires coordination, people, maintenance, and consistent attention to the farm.”',
      src: '/images/landing/manage-04-care.jpg',
      alt: 'Active agricultural stewardship, tree canopy care, and disciplined field management',
      description: 'Day-to-day care requires coordination, people, maintenance, and consistent attention to the farm.',
      width: 1000,
      height: 667,
      temporary: true
    },
    {
      id: 'manage-card-03',
      number: '03',
      title: 'Manage the Harvest',
      quote: '“From ongoing farm operations to harvest, agreed management activities continue to care for the farm.”',
      src: '/images/landing/manage-06-harvest.jpg',
      alt: 'Bountiful harvest produce fresh from cultivated farmland',
      description: 'From ongoing farm operations to harvest, agreed management activities continue to care for the farm.',
      width: 1000,
      height: 667,
      temporary: true
    }
  ],
  managementStages: [
    {
      id: 'manage-01-people',
      stage: '01',
      title: 'People & Manpower',
      src: '/images/landing/manage-01-people.jpg',
      alt: 'Agricultural caretakers and skilled farm hands working with soil and seedlings',
      usage: 'Management sequence stage 01',
      temporary: true,
      width: 1200,
      height: 800
    },
    {
      id: 'manage-02-crop',
      stage: '02',
      title: 'Crop Planning',
      src: '/images/landing/manage-02-crop.jpg',
      alt: 'Young vibrant crop seedlings planted in disciplined rows',
      usage: 'Management sequence stage 02',
      temporary: true,
      width: 1000,
      height: 667
    },
    {
      id: 'manage-03-cultivation',
      stage: '03',
      title: 'Cultivation',
      src: '/images/landing/manage-03-cultivation.jpg',
      alt: 'Lush agricultural cultivation beds thriving under natural sunlight',
      usage: 'Management sequence stage 03',
      temporary: true,
      width: 1000,
      height: 667
    },
    {
      id: 'manage-04-care',
      stage: '04',
      title: 'Farm Care',
      src: '/images/landing/manage-04-care.jpg',
      alt: 'Healthy tree canopy, soil enrichment, and orderly grove maintenance',
      usage: 'Management sequence stage 04',
      temporary: true,
      width: 1000,
      height: 667
    },
    {
      id: 'manage-05-operations',
      stage: '05',
      title: 'Farm Operations',
      src: '/images/landing/manage-05-operations.jpg',
      alt: 'Agricultural landscape pathway with orderly irrigation infrastructure',
      usage: 'Management sequence stage 05',
      temporary: true,
      width: 1000,
      height: 667
    },
    {
      id: 'manage-06-harvest',
      stage: '06',
      title: 'Harvest Management',
      src: '/images/landing/manage-06-harvest.jpg',
      alt: 'Bountiful harvest produce fresh from cultivated farmland',
      usage: 'Management sequence stage 06',
      temporary: true,
      width: 1000,
      height: 667
    }
  ],
  philosophy: {
    id: 'philosophy-panorama',
    src: '/images/landing/philosophy-panorama.jpg',
    alt: 'Breathtaking full-width panorama of lush misty forest and agricultural valley',
    usage: 'Section 7 — Full-width brand campaign ("BACK TO ROOTS. FORWARD WITH PURPOSE.")',
    temporary: true,
    width: 2400,
    height: 1200
  },
  principles: {
    id: 'principles-land',
    src: '/images/landing/principles-land.jpg',
    alt: 'Warm natural light across fertile farmland soil and green foliage',
    usage: 'Section 8 — "Built around what matters" editorial visual accent',
    temporary: true,
    width: 1600,
    height: 1067
  },
  cta: {
    id: 'cta-landscape',
    src: '/images/landing/cta-landscape.jpg',
    alt: 'Tranquil sunset over scenic farmland, trees, and expansive horizon',
    usage: 'Section 10 — Final closing cinematic CTA',
    temporary: true,
    width: 2400,
    height: 1350
  },
  founders: {
    // Verified founders placeholders — designed to receive authentic portrait photography
    sathish: {
      id: 'founder-sathish',
      name: 'Sathish Agastya',
      role: 'Founder',
      usage: 'Section 9 — Founders introduction portrait slot',
      temporary: true
    },
    khushi: {
      id: 'founder-khushi',
      name: 'Khushi Jain',
      role: 'Founder',
      usage: 'Section 9 — Founders introduction portrait slot',
      temporary: true
    }
  }
};
