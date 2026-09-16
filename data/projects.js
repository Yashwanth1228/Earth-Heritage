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

export const projects = [];

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

