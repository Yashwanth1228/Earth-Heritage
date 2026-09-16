/**
 * Earth Heritage — Centralized Blog Data Source (Earth Heritage Journal)
 * 
 * Single source of truth for Earth Heritage essays, field notes, stewardship
 * perspectives, and dynamic article reading routes (/blogs/[slug]).
 * 
 * Blog Article Schema Architecture (for future verified articles):
 * {
 *   id: string,               // Unique article identifier (e.g. 'eh-journal-01')
 *   slug: string,             // URL slug (e.g. 'understanding-managed-farmland')
 *   title: string,            // Editorial headline (Cormorant Garamond serif)
 *   excerpt: string,          // Short summary / lead statement (2-3 sentences)
 *   category: string,         // e.g. 'Managed Farmland' | 'Land & Ownership' | 'Stewardship' | 'Perspectives'
 *   publishedAt: string,      // ISO date string ('2026-09-01')
 *   updatedAt?: string,       // Optional ISO revision date
 *   readingTime?: string,     // e.g. '5 min read' (auto-derived if omitted)
 *   author?: {                // Author attribution
 *     name: string,           // 'Earth Heritage Editorial' or confirmed author name
 *     role?: string,          // 'Co-Founder' | 'Agricultural Stewardship'
 *     avatar?: string         // Optional author portrait image URL
 *   },
 *   coverImage?: {            // Primary landscape visual
 *     src: string,
 *     alt: string,
 *     caption?: string
 *   },
 *   featured?: boolean,       // Flags marquee lead placement on /blogs
 *   tags?: string[],          // Subject keywords
 *   content: Array<{          // Structured content blocks
 *     type: 'lead' | 'paragraph' | 'heading' | 'quote' | 'callout' | 'image' | 'list',
 *     text?: string,
 *     level?: number,         // For headings (2 or 3)
 *     attribution?: string,   // For pull quotes
 *     title?: string,         // For callouts
 *     items?: string[],       // For bulleted lists
 *     src?: string,           // For inline imagery
 *     alt?: string,
 *     caption?: string
 *   }>
 * }
 * 
 * NOTE ON DATA INTEGRITY:
 * Do NOT invent fake articles, placeholder authors, or marketing claims.
 * When real articles are officially published, add them directly to this array.
 */

export const blogs = [];

/**
 * Retrieve all confirmed blog articles
 * Sorted by publication date descending if publishedAt is present
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
 * Prioritizes an article explicitly flagged with featured: true,
 * otherwise falls back to the most recent article, or null if empty.
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
  const prev = currentIndex > 0 ? all[currentIndex - 1] : null;
  const next = currentIndex < all.length - 1 ? all[currentIndex + 1] : null;
  return { prev, next };
}

/**
 * Retrieve confirmed articles filtered by category
 * @param {string} category 
 * @returns {Array}
 */
export function getBlogsByCategory(category) {
  if (!category) return getAllBlogs();
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
