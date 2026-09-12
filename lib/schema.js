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
