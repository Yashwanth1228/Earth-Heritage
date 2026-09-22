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
    src: '/images/landing/hero-family-farmland.jpg',
    alt: 'Happy family walking along a sunlit coconut and mango tree plantation pathway on a managed farmland estate',
    usage: 'Hero full-screen landscape background',
    temporary: false,
    width: 2400,
    height: 1350
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

/**
 * 4-Chapter Cinematic Opening Sequence for Homepage Hero
 * Enhanced with dual-style typography (Bold White + Warm Honey-Gold Italic Serif)
 * and luxury managed farmland retreat photography (Hebbevu reference aesthetic).
 */
export const heroSlides = [
  {
    id: 'slide-01',
    number: '01',
    chapter: 'THE VISION',
    image: {
      src: '/images/landing/hero-family-farmland.jpg',
      alt: 'Happy family walking along a sunlit coconut and mango tree plantation pathway on a managed farmland estate',
      width: 2400,
      height: 1350
    },
    theme: 'dark',
    eyebrow: 'PREMIUM MANAGED FARMLAND PROJECT',
    titlePart1: 'Own a Piece of',
    titleAccent1: 'Earth.',
    titlePart2: 'Build a Living',
    titleAccent2: 'Legacy.',
    description:
      'Managed farmland for people who want to own land, stay connected to nature, and build something meaningful for the long term.',
    isMainH1: true,
    primaryAction: {
      label: 'Discover Earth Heritage',
      href: '#statement'
    }
  },
  {
    id: 'slide-02',
    number: '02',
    chapter: 'THE LAND',
    image: {
      src: '/images/landing/hero-villa-retreat.jpg',
      alt: 'Luxury eco-farmhouse villa on a managed farmland estate surrounded by lush lawns, vegetable gardens, and coconut palms',
      width: 2400,
      height: 1350
    },
    theme: 'dark',
    eyebrow: 'LIVING LEGACY • A TANGIBLE FOUNDATION',
    titlePart1: 'Land is More Than',
    titleAccent1: 'an Asset.',
    titlePart2: 'It is a Lasting',
    titleAccent2: 'Anchor.',
    description:
      'A foundation that endures through generations—grounded in ownership, nurtured by time, and protected by care.',
    isMainH1: false,
    primaryAction: {
      label: 'Explore Our Approach',
      href: '#problem'
    }
  },
  {
    id: 'slide-03',
    number: '03',
    chapter: 'THE CARE',
    image: {
      src: '/images/landing/solution-management.jpg',
      alt: 'Neatly cultivated agricultural rows under expansive open skies',
      width: 1600,
      height: 1067
    },
    theme: 'dark',
    eyebrow: 'THE PARTNERSHIP • MANAGEMENT & STEWARDSHIP',
    titlePart1: 'You Own the',
    titleAccent1: 'Land.',
    titlePart2: 'We Manage the',
    titleAccent2: 'Farm.',
    description:
      'Retain complete titled ownership while our on-ground team coordinates farm operations, cultivation, and ongoing agricultural care.',
    isMainH1: false,
    primaryAction: {
      label: 'How It Works',
      href: '/how-it-works'
    }
  },
  {
    id: 'slide-04',
    number: '04',
    chapter: 'THE PURPOSE',
    image: {
      src: '/images/landing/philosophy-panorama.jpg',
      alt: 'Breathtaking full-width panorama of lush misty forest and agricultural valley',
      width: 2400,
      height: 1200
    },
    theme: 'dark',
    eyebrow: 'OUR PHILOSOPHY • ROOTED IN RESPONSIBILITY',
    titlePart1: 'Back to',
    titleAccent1: 'Roots.',
    titlePart2: 'Forward with',
    titleAccent2: 'Purpose.',
    description:
      'Cultivating land with ecological sensitivity, mindful community, and enduring pride of ownership.',
    isMainH1: false,
    primaryAction: {
      label: 'Our Philosophy',
      href: '/about'
    }
  }
];

