import { siteConfig } from '@/config/site';
import { companyData } from '@/data/company';

/**
 * Generate Organization JSON-LD Schema
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: companyData.name,
    legalName: companyData.name,
    alternateName: companyData.shortName,
    url: siteConfig.url,
    foundingDate: '2026-08-01',
    slogan: companyData.philosophy.primary,
    description: siteConfig.description
  };
}

/**
 * Generate WebSite JSON-LD Schema
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      '@id': `${siteConfig.url}/#organization`
    }
  };
}

/**
 * Generate BreadcrumbList JSON-LD Schema
 */
export function getBreadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`
    }))
  };
}

/**
 * Generate CollectionPage JSON-LD Schema for /projects
 * 
 * Strict Schema.org CollectionPage standard:
 * - Represents the Earth Heritage Projects listing / portfolio
 * - Connected to main WebSite entity via isPartOf
 * - If verified projects exist, references verified item URLs
 * - If projects array is empty, produces a clean, valid CollectionPage without fake items
 */
export function getProjectsCollectionSchema(projectsList = []) {
  const pageUrl = `${siteConfig.url}/projects`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}/#webpage`,
    url: pageUrl,
    name: 'Projects | Earth Heritage',
    description: 'Explore the managed farmland projects, agricultural estates, and land initiatives developed with the Earth Heritage philosophy of responsible stewardship and titled ownership.',
    isPartOf: {
      '@id': `${siteConfig.url}/#website`
    }
  };

  // Only attach item list if confirmed projects exist with valid slugs and names
  const validProjects = Array.isArray(projectsList)
    ? projectsList.filter(
        (p) => p && typeof p.slug === 'string' && p.slug.trim().length > 0 && typeof p.name === 'string'
      )
    : [];

  if (validProjects.length > 0) {
    schema.mainEntity = {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: validProjects.length,
      itemListElement: validProjects.map((p, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: p.name,
        url: `${siteConfig.url}/projects/${p.slug.trim()}`
      }))
    };
  }

  return schema;
}

/**
 * Generate Place JSON-LD Schema for verified Project Detail (/projects/[slug])
 * 
 * Strict Schema.org 'Place' standard:
 * - Accurately represents a managed land / agricultural location initiative
 * - Does NOT use 'Product' schema (no commercial pricing, e-commerce, or investment offers implied)
 * - Only includes verified fields present in project data
 * - Omits missing attributes cleanly (zero undefined, null, or empty string outputs)
 * - Returns null if project or required fields (name, slug) are missing
 */
export function getProjectDetailSchema(project) {
  if (!project || typeof project.name !== 'string' || !project.name.trim() || !project.slug) {
    return null;
  }

  const projectUrl = `${siteConfig.url}/projects/${project.slug.trim()}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${projectUrl}/#place`,
    name: project.name.trim(),
    url: projectUrl
  };

  // Description (from tagline, overview, or description)
  const descriptionText = project.tagline || project.overview || project.description;
  if (typeof descriptionText === 'string' && descriptionText.trim().length > 0) {
    schema.description = descriptionText.trim();
  }

  // Authentic image (from heroImage or first image in images array)
  const heroImg =
    project.heroImage ||
    (Array.isArray(project.images) && project.images.length > 0 ? project.images[0] : null);

  if (heroImg && typeof heroImg.src === 'string' && heroImg.src.trim().length > 0) {
    const imgSrc = heroImg.src.startsWith('http')
      ? heroImg.src
      : `${siteConfig.url}${heroImg.src.startsWith('/') ? '' : '/'}${heroImg.src}`;
    schema.image = imgSrc;
  }

  // Location / Address (ONLY if verified location string exists)
  if (typeof project.location === 'string' && project.location.trim().length > 0) {
    schema.address = {
      '@type': 'PostalAddress',
      addressLocality: project.location.trim(),
      addressCountry: 'IN'
    };
  }

  return schema;
}

/**
 * Generate CollectionPage JSON-LD Schema for /blogs
 * 
 * Strict Schema.org CollectionPage standard:
 * - Connected to main WebSite entity via isPartOf
 * - If verified articles exist, references verified article URLs
 * - If blogs array is empty, produces a clean, valid CollectionPage without fake items
 */
export function getBlogCollectionSchema(blogsList = []) {
  const pageUrl = `${siteConfig.url}/blogs`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}/#webpage`,
    url: pageUrl,
    name: 'Blogs & Perspectives | Earth Heritage',
    description:
      'Read reflections, stewardship field notes, and educational perspectives on managed farmland, soil health, and land ownership from Earth Heritage.',
    isPartOf: {
      '@id': `${siteConfig.url}/#website`
    }
  };

  const validBlogs = Array.isArray(blogsList)
    ? blogsList.filter(
        (b) =>
          b &&
          typeof b.slug === 'string' &&
          b.slug.trim().length > 0 &&
          typeof b.title === 'string'
      )
    : [];

  if (validBlogs.length > 0) {
    schema.mainEntity = {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: validBlogs.length,
      itemListElement: validBlogs.map((b, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: b.title,
        url: `${siteConfig.url}/blogs/${b.slug.trim()}`
      }))
    };
  }

  return schema;
}

/**
 * Generate BlogPosting JSON-LD Schema for verified article detail (/blogs/[slug])
 * 
 * Strict Schema.org BlogPosting standard:
 * - Only includes verified fields present in blog data
 * - Omits missing attributes cleanly (zero undefined, null, or empty string outputs)
 * - Returns null if blog or required fields (title, slug) are missing
 */
export function getBlogPostSchema(blog) {
  if (!blog || typeof blog.title !== 'string' || !blog.title.trim() || !blog.slug) {
    return null;
  }

  const articleUrl = `${siteConfig.url}/blogs/${blog.slug.trim()}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${articleUrl}/#article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl
    },
    headline: blog.title.trim(),
    url: articleUrl,
    publisher: {
      '@id': `${siteConfig.url}/#organization`
    }
  };

  if (typeof blog.excerpt === 'string' && blog.excerpt.trim().length > 0) {
    schema.description = blog.excerpt.trim();
  }

  if (typeof blog.publishedAt === 'string' && blog.publishedAt.trim().length > 0) {
    schema.datePublished = blog.publishedAt.trim();
    schema.dateModified = (blog.updatedAt || blog.publishedAt).trim();
  }

  if (blog.author && typeof blog.author.name === 'string') {
    schema.author = {
      '@type': 'Person',
      name: blog.author.name.trim()
    };
  } else {
    schema.author = {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url
    };
  }

  if (
    blog.coverImage &&
    typeof blog.coverImage.src === 'string' &&
    blog.coverImage.src.trim().length > 0
  ) {
    const imgSrc = blog.coverImage.src.startsWith('http')
      ? blog.coverImage.src
      : `${siteConfig.url}${blog.coverImage.src.startsWith('/') ? '' : '/'}${blog.coverImage.src}`;
    schema.image = imgSrc;
  }

  if (typeof blog.category === 'string' && blog.category.trim().length > 0) {
    schema.articleSection = blog.category.trim();
  }

  return schema;
}


