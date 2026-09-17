import { siteConfig } from '@/config/site';
import { getAllProjects } from '@/data/projects';
import { getAllBlogs } from '@/data/blogs';

export default function sitemap() {
  const currentDate = new Date().toISOString();

  // Core static website routes
  const staticRoutes = [
    {
      url: `${siteConfig.url}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${siteConfig.url}/managed-farmland`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${siteConfig.url}/farm-management`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${siteConfig.url}/how-it-works`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${siteConfig.url}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${siteConfig.url}/blogs`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${siteConfig.url}/events`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    }
  ];

  // Dynamic project routes (only generated for confirmed projects with valid slug, excluding demo projects)
  const confirmedProjects = getAllProjects() || [];
  const projectRoutes = confirmedProjects
    .filter(
      (project) =>
        project &&
        typeof project.slug === 'string' &&
        project.slug.trim().length > 0 &&
        !project.isDemo
    )
    .map((project) => ({
      url: `${siteConfig.url}/projects/${encodeURIComponent(project.slug.trim())}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    }));

  // Dynamic blog article routes (only generated for confirmed articles with valid slug)
  const confirmedBlogs = getAllBlogs() || [];
  const blogRoutes = confirmedBlogs
    .filter(
      (blog) =>
        blog && typeof blog.slug === 'string' && blog.slug.trim().length > 0
    )
    .map((blog) => ({
      url: `${siteConfig.url}/blogs/${encodeURIComponent(blog.slug.trim())}`,
      lastModified: blog.updatedAt || blog.publishedAt || currentDate,
      changeFrequency: 'monthly',
      priority: 0.6
    }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}


