/**
 * Earth Heritage — Centralized Project Data Source
 * 
 * Single source of truth for Earth Heritage projects, managed land initiatives,
 * and future dynamic project pages (/projects/[slug]).
 * 
 * Project Schema Architecture (for future real projects):
 * {
 *   name: string,             // Confirmed project name
 *   slug: string,             // URL slug (e.g. 'green-valley-estate')
 *   tagline: string,          // Short descriptive tagline
 *   description: string,      // In-depth editorial project narrative
 *   location: string,         // Confirmed geographic location
 *   status: string,           // 'Planning' | 'Active' | 'Under Stewardship'
 *   images: Array<{           // Project photography
 *     src: string,
 *     alt: string,
 *     caption?: string
 *   }>,
 *   features: string[],       // Confirmed operational/land features
 *   faq?: Array<{             // Project-specific FAQs
 *     q: string,
 *     a: string
 *   }>
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
