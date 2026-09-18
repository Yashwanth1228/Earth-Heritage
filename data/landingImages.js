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

/**
 * 4-Chapter Cinematic Opening Sequence for Homepage Hero
 * Each slide features distinct photography, chapter narrative, and aligned branding copy.
 */
export const heroSlides = [
  {
    id: 'slide-01',
    number: '01',
    chapter: 'THE VISION',
    image: {
      src: '/images/landing/hero-landscape.jpg',
      alt: 'Expansive managed farmland with lush green tree canopies at golden sunrise',
      width: 2400,
      height: 1600
    },
    theme: 'dark',
    headingShadowClass: 'drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]',
    titleLine1Class: 'text-[#FFFFFF]',
    titleLine2Class: 'italic text-[#F2CF84]',
    descriptionClass: 'text-[#EDE7DE]/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]',
    badgeClass: 'bg-[#1A2218]/90 border-[#9A814F]/50',
    badgeTextClass: 'text-[#B88E3E]',
    badgeIconClass: 'text-[#B88E3E]',
    primaryBtnClass: 'bg-[#F7F4EC] text-[#152B1B] hover:bg-white',
    primaryBtnIconClass: 'text-[#152B1B]',
    secondaryBtnClass: 'bg-[#183622]/85 hover:bg-[#1E432A] border border-[#346642]/65 text-[#EDE7DD]',
    scrollIndicatorClass: 'text-[#DCD4C7]/85 group-hover:text-white',
    eyebrow: 'Managed Farmland • Land Ownership & Stewardship',
    titleLine1: 'Own a Piece of Earth.',
    titleLine2: 'Build a Legacy.',
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
      src: '/images/landing/statement-landscape.jpg',
      alt: 'Sunlight filtering through a rich, verdant tree canopy on agricultural land',
      width: 1600,
      height: 1067
    },
    theme: 'dark',
    headingShadowClass: 'drop-shadow-[0_2px_14px_rgba(0,0,0,0.92)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]',
    imageOverlay: 'bg-black/15',
    titleLine1Class: 'text-[#FFFFFF]',
    titleLine2Class: 'italic text-[#F2CF84]',
    descriptionClass: 'text-[#EDE7DE] drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]',
    badgeClass: 'bg-[#1A2218]/90 border-[#9A814F]/50',
    badgeTextClass: 'text-[#B88E3E]',
    badgeIconClass: 'text-[#B88E3E]',
    primaryBtnClass: 'bg-[#F7F4EC] text-[#152B1B] hover:bg-white',
    primaryBtnIconClass: 'text-[#152B1B]',
    secondaryBtnClass: 'bg-[#183622]/85 hover:bg-[#1E432A] border border-[#346642]/65 text-[#EDE7DD]',
    scrollIndicatorClass: 'text-[#DCD4C7]/85 group-hover:text-white',
    eyebrow: 'Living Legacy • A Tangible Foundation',
    titleLine1: 'Land is More Than an Asset.',
    titleLine2: 'It is a Lasting Anchor.',
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
    theme: 'light',
    titleLine1Class: 'text-[#0C1F13] font-medium',
    titleLine2Class: 'italic text-[#5C3E14] font-medium',
    descriptionClass: 'text-[#182B1C] font-normal',
    badgeClass: 'bg-white/95 border-[#0C1F13]/25 shadow-sm',
    badgeTextClass: 'text-[#0C1F13]',
    badgeIconClass: 'text-[#5C3E14]',
    primaryBtnClass: 'bg-[#0C1F13] text-[#F7F4EC] hover:bg-[#163822] shadow-[0_6px_20px_rgba(12,31,19,0.3)]',
    primaryBtnIconClass: 'text-[#F7F4EC]',
    secondaryBtnClass: 'bg-[#0C1F13]/10 hover:bg-[#0C1F13]/20 border border-[#0C1F13]/60 text-[#0C1F13]',
    scrollIndicatorClass: 'text-[#0C1F13]/75 group-hover:text-[#0C1F13]',
    eyebrow: 'The Partnership • Management & Stewardship',
    titleLine1: 'You Own the Land.',
    titleLine2: 'We Manage the Farm.',
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
    headingShadowClass: 'drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)]',
    titleLine1Class: 'text-[#FFFFFF]',
    titleLine2Class: 'italic text-[#F0CE80]',
    descriptionClass: 'text-[#EDE7DE]/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]',
    badgeClass: 'bg-[#1A2218]/90 border-[#9A814F]/50',
    badgeTextClass: 'text-[#B88E3E]',
    badgeIconClass: 'text-[#B88E3E]',
    primaryBtnClass: 'bg-[#F7F4EC] text-[#152B1B] hover:bg-white',
    primaryBtnIconClass: 'text-[#152B1B]',
    secondaryBtnClass: 'bg-[#183622]/85 hover:bg-[#1E432A] border border-[#346642]/65 text-[#EDE7DD]',
    scrollIndicatorClass: 'text-[#DCD4C7]/85 group-hover:text-white',
    eyebrow: 'Our Philosophy • Rooted in Responsibility',
    titleLine1: 'Back to Roots.',
    titleLine2: 'Forward with Purpose.',
    description:
      'Cultivating land with ecological sensitivity, mindful community, and enduring pride of ownership.',
    isMainH1: false,
    primaryAction: {
      label: 'Our Philosophy',
      href: '/about'
    }
  }
];

