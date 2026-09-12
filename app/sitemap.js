import { siteConfig } from '@/config/site';

export default function sitemap() {
  const currentDate = new Date().toISOString();

  return [
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
    }
  ];
}
