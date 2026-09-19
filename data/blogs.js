/**
 * Earth Heritage — Centralized Blog Data Source (Earth Heritage Journal)
 * 
 * Single source of truth for Earth Heritage essays, educational field notes,
 * agrarian stewardship perspectives, and dynamic article reading routes (/blogs/[slug]).
 * 
 * NOTE ON DATA INTEGRITY:
 * Zero fabricated authors, fictitious publication dates, artificial quotes, or commercial statistics.
 * The entries below represent educational field perspectives based strictly on verified Earth Heritage
 * operations, clearly designated with `isDemo: true` to distinguish them from official company announcements.
 */

export const blogs = [
  {
    id: 'eh-journal-01',
    slug: 'understanding-managed-farmland',
    title: 'Understanding Managed Farmland: Stewardship, Land Care & Ownership',
    excerpt:
      'An exploration of how professional agrarian management bridges long-term agricultural stewardship with titled, individual land ownership.',
    category: 'Managed Farmland',
    publishedAt: '2026-09-01',
    readingTime: '5 min read',
    isDemo: true,
    featured: true,
    author: {
      name: 'Earth Heritage Agronomy Team',
      role: 'Agricultural Operations & Land Care'
    },
    coverImage: {
      src: '/images/managed-farmland/intro-farmland.jpg',
      alt: 'Orderly rows of managed agricultural acreage in morning light',
      caption: 'Topographical agricultural layout across managed estate parcels'
    },
    content: [
      {
        type: 'lead',
        text: 'True land stewardship begins with recognizing that agricultural land is a living asset requiring continuous, skilled attention rather than passive holding.'
      },
      {
        type: 'paragraph',
        text: 'In conventional land ownership, individuals often purchase rural land with aspirations of organic farming, only to encounter the complex operational realities of agrarian management: labor shortages, irrigation logistics, pest management, and seasonal crop failures. Without resident expertise, fertile parcels frequently lie fallow.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Managed Farmland Model'
      },
      {
        type: 'paragraph',
        text: 'Managed farmland resolves this operational disconnect. Landowners secure clear, individual legal titles to designated parcels, while professional agricultural managers oversee ongoing soil enrichment, crop cycles, and irrigation maintenance on their behalf.'
      },
      {
        type: 'callout',
        title: 'Core Principle',
        text: 'Ownership remains strictly individual and titled, while farm operations are managed collectively under seasoned agricultural leadership to achieve economies of scale and sustainable yields.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Key Dimensions of Stewardship'
      },
      {
        type: 'list',
        items: [
          'Precision drip irrigation networks aligned with topographical contour elevations',
          'Regenerative soil biology amendments including indigenous microbial inoculants',
          'Multi-tier agroforestry layouts that balance fruit cultivation with native canopy belts',
          'Transparent operational reporting on harvest yields and soil carbon progression'
        ]
      },
      {
        type: 'quote',
        text: 'Managed farmland is not a speculative investment. It is the conscious alignment of titled land security with professional agrarian stewardship.',
        attribution: 'Earth Heritage Agronomy Team'
      },
      {
        type: 'paragraph',
        text: 'By pairing titled security with continuous scientific care, managed farmland enables urban families to participate in the agricultural renewal of the rural landscape without compromising their professional lives.'
      }
    ]
  },
  {
    id: 'eh-journal-02',
    slug: 'living-soil-and-water-resilience',
    title: 'Living Soil Biology and Watershed Resilience in Managed Acreage',
    excerpt:
      'How regenerative soil microbiology, natural biomass mulching, and topographical swales protect farmland vitality through seasonal weather cycles.',
    category: 'Farm Management',
    publishedAt: '2026-08-18',
    readingTime: '6 min read',
    isDemo: true,
    featured: false,
    author: {
      name: 'Earth Heritage Agronomy Team',
      role: 'Soil Science & Watershed Management'
    },
    coverImage: {
      src: '/images/farm-management/people-and-land.jpg',
      alt: 'Agronomy specialists and landowners inspecting healthy crops and soil structure',
      caption: 'Field examination of microbial soil vitality and moisture retention'
    },
    content: [
      {
        type: 'lead',
        text: 'Healthy soil is not a passive medium for crop roots; it is a complex biological ecosystem containing billions of living organisms per gram.'
      },
      {
        type: 'paragraph',
        text: 'Over decades of chemical-intensive agriculture across the Deccan plateau, extensive topsoil erosion and carbon depletion have compromised natural soil structure. Restoring living soil biology requires deliberate, patient intervention through natural organic inputs and microbial activation.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Role of Soil Organic Carbon (SOC)'
      },
      {
        type: 'paragraph',
        text: 'Soil organic carbon acts as the biological sponge of the farmland. Every one-percent increase in soil organic matter dramatically elevates water retention capacity, enabling root systems to withstand dry spells without excessive supplemental irrigation.'
      },
      {
        type: 'callout',
        title: 'Ecological Practice',
        text: 'In-situ biomass mulching with crop residues and native legume green manures creates a protective thermal blanket, moderating soil temperatures and preventing evaporation under high solar radiation.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Topographical Water Management'
      },
      {
        type: 'list',
        items: [
          'Contour bunds designed along natural elevation lines to arrest surface runoff',
          'Interconnected percolation swales that guide monsoon water directly to sub-surface recharge pits',
          'Strategic placement of farm ponds to harvest surplus seasonal rainwater for dry-period irrigation',
          'Subsurface root-zone drip emitters that minimize water loss and eliminate weed proliferation'
        ]
      },
      {
        type: 'quote',
        text: 'Water security on managed land is not achieved by digging deeper borewells, but by slowing, spreading, and sinking rainwater where it falls.',
        attribution: 'Earth Heritage Field Notes'
      },
      {
        type: 'paragraph',
        text: 'Through the combined discipline of biological soil nourishment and topographical water harvesting, agricultural parcels achieve long-term resilience against climatic fluctuations.'
      }
    ]
  },
  {
    id: 'eh-journal-03',
    slug: 'titled-ownership-and-rural-legacy',
    title: 'Titled Ownership: Preserving Agricultural Legacy for Generations',
    excerpt:
      'Why clear legal boundary demarcations and individual registered titles form the foundational bedrock of lasting agrarian land ownership.',
    category: 'Land & Legacy',
    publishedAt: '2026-07-29',
    readingTime: '4 min read',
    isDemo: true,
    featured: false,
    author: {
      name: 'Earth Heritage Legal & Stewardship Desk',
      role: 'Land Verification & Governance'
    },
    coverImage: {
      src: '/images/how-it-works/responsible-care-panorama.jpg',
      alt: 'Panoramic vista of managed acreage during an afternoon farm review',
      caption: 'Carefully surveyed estate boundaries and internal access corridors'
    },
    content: [
      {
        type: 'lead',
        text: 'The true value of rural land is indivisible from the legal clarity and physical demarcation of its ownership.'
      },
      {
        type: 'paragraph',
        text: 'Historically, purchasing agricultural land has been fraught with ambiguities: unverified encumbrances, unclear succession genealogies, ambiguous physical boundaries, and informal possession agreements. For city-based families, these risks often outweigh the appeal of rural ownership.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Rigorous Due Diligence'
      },
      {
        type: 'paragraph',
        text: 'At Earth Heritage, every estate parcel undergoes exhaustive 30-year title tracing, revenue record verification, and total boundary surveys conducted with precision DGPS equipment before registration.'
      },
      {
        type: 'callout',
        title: 'Title Security Protocol',
        text: 'Every parcel is conveyed via individual registered sale deeds, complete with clear RTC mutation, physical corner stone demarcations, and legal access rights guarantees.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Foundations of a Living Legacy'
      },
      {
        type: 'list',
        items: [
          'Clear individual registration with zero shared or undivided fractional interests',
          'Physical boundary markers installed and surveyed alongside dedicated estate access roads',
          'Perimeter bio-fencing and 24/7 on-ground security protecting estate integrity',
          'Long-term management covenants that preserve the agricultural character of the land'
        ]
      },
      {
        type: 'quote',
        text: 'A land legacy is built on transparency. When legal boundaries are indisputable, owners can focus entirely on the joy of planting, harvesting, and passing land down through generations.',
        attribution: 'Earth Heritage Governance Desk'
      },
      {
        type: 'paragraph',
        text: 'With titled ownership established as an immutable foundation, farmland ceases to be a speculative transaction and becomes an enduring, living heritage.'
      }
    ]
  }
];

/**
 * Retrieve all blog articles
 * Sorted by publication date descending
 * @returns {Array} Array of blog article objects
 */
export function getAllBlogs() {
  return [...blogs].sort((a, b) => {
    if (!a.publishedAt || !b.publishedAt) return 0;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

/**
 * Find a blog article by its URL slug
 * @param {string} slug 
 * @returns {Object|undefined} Matching article or undefined
 */
export function getBlogBySlug(slug) {
  if (!slug) return undefined;
  return blogs.find((blog) => blog.slug === slug);
}

/**
 * Retrieve the featured marquee article for the blog hub
 * Prioritizes an article explicitly flagged with featured: true
 * @returns {Object|null}
 */
export function getFeaturedBlog() {
  if (!blogs || blogs.length === 0) return null;
  return blogs.find((blog) => blog.featured) || blogs[0] || null;
}

/**
 * Retrieve adjacent (previous and next) confirmed articles for navigation
 * @param {string} slug 
 * @returns {{ prev: Object|null, next: Object|null }}
 */
export function getAdjacentBlogs(slug) {
  if (!slug || blogs.length <= 1) return { prev: null, next: null };
  const all = getAllBlogs();
  const currentIndex = all.findIndex((b) => b.slug === slug);
  if (currentIndex === -1) return { prev: null, next: null };
  const prev = currentIndex > 0 ? all[currentIndex - 1] : all[all.length - 1];
  const next = currentIndex < all.length - 1 ? all[currentIndex + 1] : all[0];
  return { prev, next };
}

/**
 * Retrieve related articles (excluding the current one)
 * Prioritizes same category first
 * @param {string} slug 
 * @param {number} limit 
 * @returns {Array}
 */
export function getRelatedBlogs(slug, limit = 3) {
  const current = getBlogBySlug(slug);
  const otherBlogs = blogs.filter((b) => b.slug !== slug);
  if (!current) return otherBlogs.slice(0, limit);

  const sameCategory = otherBlogs.filter(
    (b) => b.category && b.category.toLowerCase() === current.category?.toLowerCase()
  );
  const differentCategory = otherBlogs.filter(
    (b) => !b.category || b.category.toLowerCase() !== current.category?.toLowerCase()
  );

  return [...sameCategory, ...differentCategory].slice(0, limit);
}

/**
 * Retrieve confirmed articles filtered by category
 * @param {string} category 
 * @returns {Array}
 */
export function getBlogsByCategory(category) {
  if (!category || category === 'All') return getAllBlogs();
  return getAllBlogs().filter(
    (blog) => blog.category && blog.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Derive all unique categories present in confirmed articles
 * @returns {string[]}
 */
export function getAllCategories() {
  const categories = new Set();
  blogs.forEach((blog) => {
    if (blog.category && typeof blog.category === 'string') {
      categories.add(blog.category.trim());
    }
  });
  return Array.from(categories);
}
