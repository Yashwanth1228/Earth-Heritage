/**
 * Earth Heritage — Enquiry Normalization & Canonical Scope Resolver
 * 
 * Centralized utility for:
 * 1. Phone number validation and canonical normalization (Indian 10-digit mobile & E.164 international).
 * 2. URL pathname extraction (handles relative paths, absolute URLs, query strings, and trailing slashes).
 * 3. Canonical scope resolution (isolates projects, services, events, blogs, and corporate forms).
 * 4. Interest label normalization (matches equivalent project labels while separating site visits and distinct services).
 * 
 * Rules in this module must stay 100% consistent with the PostgreSQL backfill and matching logic.
 */

/**
 * Normalizes and validates incoming phone numbers.
 * 
 * Accepted formats:
 * - Indian mobile: 10 digits starting with [6-9]. Normalized to pure 10 digits (e.g. '9876543210').
 * - Indian mobile with leading trunk 0: (e.g. '09876543210') -> normalized to '9876543210'.
 * - Indian mobile with +91 or 91 prefix: (e.g. '+919876543210' or '919876543210') -> normalized to '9876543210'.
 * - International: E.164 standard (+[1-9]\d{6,14}). Preserved with leading + (e.g. '+14155552671').
 * 
 * Rejects:
 * - Empty/null inputs.
 * - Non-numeric strings or arbitrary digit sequences not conforming to Indian mobile or E.164.
 * 
 * @param {string} rawPhone
 * @returns {{ valid: boolean, error: string|null, normalized: string|null, country: 'IN'|'INTL'|null }}
 */
export function normalizeAndValidatePhone(rawPhone) {
  if (!rawPhone || typeof rawPhone !== 'string') {
    return { valid: false, error: 'Phone number is required.', normalized: null, country: null };
  }

  const trimmed = rawPhone.trim();
  if (!trimmed) {
    return { valid: false, error: 'Phone number is required.', normalized: null, country: null };
  }

  // Strip visual separators: whitespace, hyphens, periods, parentheses
  const cleaned = trimmed.replace(/[\s\-\(\)\.]/g, '');

  // 1. Indian Mobile Number with country code +91 or 91 (12 or 13 chars, national number starting with 6-9)
  if (/^(\+91|91)[6-9]\d{9}$/.test(cleaned)) {
    const digits = cleaned.startsWith('+') ? cleaned.slice(3) : cleaned.slice(2);
    return { valid: true, error: null, normalized: digits, country: 'IN' };
  }

  // 2. Indian Mobile Number with leading trunk 0 (11 digits, national number starting with 6-9)
  if (/^0[6-9]\d{9}$/.test(cleaned)) {
    return { valid: true, error: null, normalized: cleaned.slice(1), country: 'IN' };
  }

  // 3. Standard 10-digit Indian Mobile (starts with 6, 7, 8, or 9)
  if (/^[6-9]\d{9}$/.test(cleaned)) {
    return { valid: true, error: null, normalized: cleaned, country: 'IN' };
  }

  // 4. Standard International Number in E.164 Format
  // Must start with '+' followed by 7 to 15 digits (excluding +91 which was caught above)
  if (/^\+[1-9]\d{6,14}$/.test(cleaned)) {
    return { valid: true, error: null, normalized: cleaned, country: 'INTL' };
  }

  return {
    valid: false,
    error: 'Please provide a valid 10-digit mobile number or international number with country code (+).',
    normalized: null,
    country: null
  };
}

/**
 * Extracts a clean, normalized, lowercased URL pathname.
 * Handles:
 * - Relative paths (e.g. '/lp/nairuthya-whispering-wood')
 * - Full URLs (e.g. 'https://earthheritage.in/lp/nairuthya-whispering-wood')
 * - Query strings and hashes (e.g. '/projects/coconut-garden?utm_source=meta#enquiry-form')
 * - Trailing slashes (e.g. '/projects/coconut-garden/' -> '/projects/coconut-garden')
 * - Preserves root path '/'
 * 
 * @param {string} rawUrl
 * @returns {string} Clean lowercased pathname
 */
export function extractCleanPathname(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return '/';
  const trimmed = rawUrl.trim();
  if (!trimmed || trimmed === '/') return '/';

  // Normalize protocol-less or protocol-bearing earthheritage.in domain
  const withoutDomain = trimmed.replace(/^(?:https?:\/\/)?(?:www\.)?earthheritage\.in(?::\d+)?(?=\/|$)/i, '');
  if (!withoutDomain || withoutDomain === '/') return '/';

  try {
    const parsed = new URL(withoutDomain, 'https://earthheritage.in');
    let pathname = parsed.pathname.toLowerCase().trim();
    if (pathname.length > 1 && pathname.endsWith('/')) {
      pathname = pathname.replace(/\/+$/, '');
    }
    return pathname.startsWith('/') ? pathname : `/${pathname}`;
  } catch {
    let fallback = withoutDomain
      .toLowerCase()
      .replace(/^https?:\/\/[^\/]+/i, '')
      .replace(/[?#].*$/, '');
    if (fallback.length > 1 && fallback.endsWith('/')) {
      fallback = fallback.replace(/\/+$/, '');
    }
    if (!fallback.startsWith('/')) {
      fallback = `/${fallback}`;
    }
    return fallback || '/';
  }
}

/**
 * Resolves a canonical scope identifier for an enquiry based on pageUrl, source, and interestedIn.
 * 
 * Taxonomy:
 * - Projects: 'project:nairuthya-whispering-wood', 'project:coconut-garden', 'project:concept-iii'
 * - Services: 'service:farm-management', 'service:managed-farmland', 'service:land-ownership'
 * - Events: 'event:<slug>' or 'event:general'
 * - Blogs: 'blog:<slug>' or 'blog:general'
 * - Corporate: 'corporate:home' (homepage form), 'corporate:general' (unscoped modal)
 * - Known pages: 'page:<clean_slug>'
 * - Unclassifiable: 'ambiguous:unclassified'
 * 
 * @param {string} rawUrl
 * @param {string} source
 * @param {string} rawInterest
 * @returns {string} Canonical scope identifier
 */
export function resolveCanonicalScope(rawUrl, source, rawInterest) {
  const path = extractCleanPathname(rawUrl);
  const src = (source || '').toLowerCase().trim();
  const interest = (rawInterest || '').toLowerCase().trim();

  // 1. Projects (Isolated by confirmed project keywords)
  if (path.includes('nairuthya') || src.includes('nairuthya') || interest.includes('nairuthya')) {
    return 'project:nairuthya-whispering-wood';
  }
  if (path.includes('coconut') || src.includes('coconut') || interest.includes('coconut')) {
    return 'project:coconut-garden';
  }
  if (
    path.includes('concept-iii') ||
    src.includes('concept-iii') ||
    interest.includes('concept-iii') ||
    path.includes('land-and-legacy') ||
    src.includes('land-and-legacy') ||
    (interest.includes('legacy') && (path.includes('concept') || src.includes('concept') || interest.includes('concept')))
  ) {
    return 'project:concept-iii';
  }

  // 2. Dedicated Services
  if (path === '/farm-management' || interest === 'farm management') {
    return 'service:farm-management';
  }
  if (path === '/managed-farmland' || path === '/lp/managed-farmland' || interest === 'managed farmland') {
    return 'service:managed-farmland';
  }
  if (path === '/lp/land-ownership' || path === '/land-ownership' || interest === 'land ownership') {
    return 'service:land-ownership';
  }

  // 3. Events
  if (path.startsWith('/events') || interest.startsWith('event attendance:')) {
    const slug = path.replace(/^\/events\/?/, '').split('/')[0];
    return slug ? `event:${slug}` : 'event:general';
  }

  // 4. Blogs
  if (path.startsWith('/blogs/')) {
    const slug = path.replace(/^\/blogs\/?/, '').split('/')[0];
    return slug ? `blog:${slug}` : 'blog:general';
  }

  // 5. Corporate Homepage Form
  if (src.includes('corporate home page')) {
    return 'corporate:home';
  }

  // 6. Global Modal Generic Inquiry (header / floating CTA with no project context)
  if (path === '/' && (src.includes('modal') || interest === 'general enquiry')) {
    return 'corporate:general';
  }

  if (path === '/') {
    return 'corporate:home';
  }

  // 7. Known Static Pages (Clean kebab-case slugs, e.g. 'page:how-it-works')
  const knownPages = ['/about', '/contact', '/how-it-works', '/gallery', '/disclaimer', '/privacy-policy', '/terms', '/projects'];
  if (knownPages.includes(path)) {
    const cleanSlug = path.replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9\-]/g, '-');
    return cleanSlug ? `page:${cleanSlug}` : 'ambiguous:unclassified';
  }

  // 8. Conservative Ambiguity Fallback
  return 'ambiguous:unclassified';
}

/**
 * Normalizes an enquiry interest label within its canonical scope.
 * 
 * Rules:
 * - Within a project scope:
 *   - Site-visit requests ('Site Visit', 'Schedule Visit', etc.) -> 'site-visit'
 *   - General/plot/brochure enquiries ('General Enquiry', project name, etc.) -> 'project-enquiry'
 *   This separates high-intent site visits from general queries for the same project.
 * - Dedicated service offerings:
 *   - 'Farm Management' -> 'service-farm-management'
 *   - 'Managed Farmland' -> 'service-managed-farmland'
 *   - 'Land Ownership' -> 'service-land-ownership'
 * - Events:
 *   - 'Event Attendance: ...' -> 'event-attendance'
 * - General/Corporate:
 *   - 'General Enquiry' -> 'general-enquiry'
 * 
 * @param {string} rawInterest
 * @param {string} canonicalScope
 * @returns {string} Normalized interest key
 */
export function normalizeInterest(rawInterest, canonicalScope) {
  const interest = (rawInterest || '').toLowerCase().trim();
  const scope = (canonicalScope || '').toLowerCase().trim();
  const isProject = scope.startsWith('project:');

  // A. Site Visit Milestone (High-intent on-site visit request)
  if (
    interest.includes('site visit') ||
    interest.includes('visit enquiry') ||
    interest.includes('schedule visit') ||
    interest.includes('estate visit')
  ) {
    return 'site-visit';
  }

  // B. Project Enquiry (Normalizes equivalent plot/brochure/general inquiries on project pages)
  if (isProject) {
    return 'project-enquiry';
  }

  // C. Dedicated Services (Materially different commercial requirements)
  if (interest === 'farm management' || scope === 'service:farm-management') {
    return 'service-farm-management';
  }
  if (interest === 'managed farmland' || scope === 'service:managed-farmland') {
    return 'service-managed-farmland';
  }
  if (interest === 'land ownership' || scope === 'service:land-ownership') {
    return 'service-land-ownership';
  }

  // D. Event Attendance
  if (interest.startsWith('event attendance:') || scope.startsWith('event:')) {
    return 'event-attendance';
  }

  // E. General Inquiries
  if (
    interest === 'general enquiry' ||
    interest === 'general inquiry' ||
    interest === 'projects inquiry' ||
    interest === 'general' ||
    interest === ''
  ) {
    return 'general-enquiry';
  }

  // F. Fallback: Deterministic slug for custom labels
  const slug = interest.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return slug ? `custom-${slug}` : 'general-enquiry';
}
