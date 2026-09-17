/**
 * Earth Heritage — Centralized Project Data Source
 * 
 * Single source of truth for Earth Heritage projects, managed land initiatives,
 * and dynamic project detail pages (/projects/[slug]).
 * 
 * Project Schema Architecture (for future verified projects):
 * {
 *   id: string,               // Unique project identifier (e.g. 'eh-estates-01')
 *   slug: string,             // URL slug (e.g. 'green-valley-estate')
 *   name: string,             // Confirmed official project name
 *   tagline?: string,         // Short descriptive tagline
 *   description?: string,     // In-depth editorial project narrative
 *   overview?: string,        // Comprehensive land & terroir story
 *   stewardshipApproach?: string, // Verified agricultural & operational farm management approach
 *   location?: string,        // Confirmed geographic region / district
 *   status?: string,          // 'In Planning' | 'Under Development' | 'Active Stewardship'
 *   heroImage?: {             // Primary hero landscape visual
 *     src: string,
 *     alt: string
 *   },
 *   images?: Array<{          // Primary image list
 *     src: string,
 *     alt: string,
 *     caption?: string
 *   }>,
 *   gallery?: Array<{         // Curated field & land photography
 *     src: string,
 *     alt: string,
 *     caption?: string
 *   }>,
 *   features?: string[],      // Confirmed operational/land features
 *   enquiryInterest?: string  // Pre-filled interest for global enquiry modal
 * }
 * 
 * NOTE:
 * Do NOT invent fake project names, acreage, returns, or testimonials.
 * When real projects are officially confirmed, add them directly to this array.
 */

export const projects = [
  {
    id: 'demo-concept-01',
    slug: 'managed-farmland-concept-i',
    name: 'Managed Farmland — Concept I',
    number: '01',
    category: 'Managed Farmland',
    shortDescription:
      'A concept exploration of the Earth Heritage managed farmland approach, where land ownership remains with the landowner while agreed farm operations are professionally managed.',
    tagline: 'A concept exploration of the Earth Heritage managed farmland approach.',
    overview:
      'A concept exploration of the Earth Heritage managed farmland approach, where land ownership remains with the landowner while agreed farm operations are professionally managed.\n\nThis initiative illustrates how disciplined agronomic stewardship, clear boundary demarcation, and long-term soil health management provide peace of mind for land stewardship.',
    stewardshipApproach:
      'Earth Heritage coordinates on-ground agricultural manpower, seasonal crop planning, irrigation maintenance, and ongoing farm operations. Landowners retain titled ownership while the farm thrives through active care.',
    location: null,
    status: 'Concept Preview',
    isDemo: true,
    imageIsTemporary: true,
    featured: true,
    coverImage: {
      src: '/images/managed-farmland/intro-farmland.jpg',
      alt: 'Managed Farmland — Concept I agricultural landscape'
    },
    heroImage: {
      src: '/images/managed-farmland/intro-farmland.jpg',
      alt: 'Managed Farmland — Concept I agricultural landscape'
    },
    images: [
      {
        src: '/images/managed-farmland/intro-farmland.jpg',
        alt: 'Managed Farmland — Concept I agricultural landscape'
      }
    ],
    features: [
      'Titled Land Ownership Retention',
      'Structured Farm Operations Coordination',
      'Soil Enrichment & Water Conservation',
      'Regular Agricultural Updates'
    ],
    enquiryInterest: 'Managed Farmland — Concept I'
  },
  {
    id: 'demo-concept-02',
    slug: 'managed-farmland-concept-ii',
    name: 'Managed Farmland — Concept II',
    number: '02',
    category: 'Farm Management',
    shortDescription:
      'A concept project illustrating how land ownership and ongoing farm care can come together through coordinated farm management, cultivation, maintenance, and harvest activities.',
    tagline: 'Coordinated farm management, cultivation, maintenance, and harvest care.',
    overview:
      'A concept project illustrating how land ownership and ongoing farm care can come together through coordinated farm management, cultivation, maintenance, and harvest activities.\n\nDemonstrating hands-on operational systems designed for sustainable agroforestry and responsible land stewardship.',
    stewardshipApproach:
      'Focused on comprehensive farm management workflows: skilled manpower allocation, precision pruning, organic soil nourishment, and coordinated harvest handling.',
    location: null,
    status: 'Concept Preview',
    isDemo: true,
    imageIsTemporary: true,
    featured: false,
    coverImage: {
      src: '/images/farm-management/responsible-care.jpg',
      alt: 'Managed Farmland — Concept II farm care landscape'
    },
    heroImage: {
      src: '/images/farm-management/responsible-care.jpg',
      alt: 'Managed Farmland — Concept II farm care landscape'
    },
    images: [
      {
        src: '/images/farm-management/responsible-care.jpg',
        alt: 'Managed Farmland — Concept II farm care landscape'
      }
    ],
    features: [
      'Comprehensive Cultivation Planning',
      'Daily On-Ground Operational Care',
      'Eco-Friendly Farm Maintenance',
      'Harvest Coordination & Logistics'
    ],
    enquiryInterest: 'Managed Farmland — Concept II'
  },
  {
    id: 'demo-concept-03',
    slug: 'land-and-legacy-concept-iii',
    name: 'Land & Legacy — Concept III',
    number: '03',
    category: 'Land & Legacy',
    shortDescription:
      'A conceptual expression of the Earth Heritage philosophy of bringing together land, nature, ownership, ongoing care, and a long-term sense of purpose.',
    tagline: 'Bringing together land, nature, ownership, and enduring purpose.',
    overview:
      'A conceptual expression of the Earth Heritage philosophy of bringing together land, nature, ownership, ongoing care, and a long-term sense of purpose.\n\nEnvisioned as an enduring ecological sanctuary where native canopy preservation harmonizes with mindful agrarian practices.',
    stewardshipApproach:
      'Guided by the philosophy of "Back to Roots, Forward with Purpose." Prioritizing biodiversity enhancement, water catchment protection, and legacy-oriented tree care.',
    location: null,
    status: 'Concept Preview',
    isDemo: true,
    imageIsTemporary: true,
    featured: false,
    coverImage: {
      src: '/images/managed-farmland/nature-responsibility.jpg',
      alt: 'Land & Legacy — Concept III agroforestry landscape'
    },
    heroImage: {
      src: '/images/managed-farmland/nature-responsibility.jpg',
      alt: 'Land & Legacy — Concept III agroforestry landscape'
    },
    images: [
      {
        src: '/images/managed-farmland/nature-responsibility.jpg',
        alt: 'Land & Legacy — Concept III agroforestry landscape'
      }
    ],
    features: [
      'Native Canopy Preservation',
      'Ecological Habitat Harmony',
      'Generational Land Legacy',
      'Transparent Operational Governance'
    ],
    enquiryInterest: 'Land & Legacy — Concept III'
  }
];

/**
 * Retrieve all confirmed projects
 * @returns {Array} Array of project objects
 */
export function getAllProjects() {
  return projects;
}

/**
 * Find a project by its URL slug
 * @param {string} slug 
 * @returns {Object|undefined} Matching project or undefined
 */
export function getProjectBySlug(slug) {
  if (!slug) return undefined;
  return projects.find((project) => project.slug === slug);
}

/**
 * Retrieve adjacent (previous and next) confirmed projects for navigation
 * @param {string} slug 
 * @returns {{ prev: Object|null, next: Object|null }}
 */
export function getAdjacentProjects(slug) {
  if (!slug || projects.length <= 1) return { prev: null, next: null };
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) return { prev: null, next: null };
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  return { prev, next };
}

