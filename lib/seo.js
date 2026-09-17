import { siteConfig } from '@/config/site';

/**
 * Construct standardized Next.js App Router metadata
 */
export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  canonicalUrl,
  noIndex = false
} = {}) {
  const metaTitle = title 
    ? `${title} | ${siteConfig.shortName}`
    : `${siteConfig.name} | ${siteConfig.tagline}`;

  const url = canonicalUrl ? `${siteConfig.url}${canonicalUrl}` : siteConfig.url;

  return {
    title: metaTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.png', type: 'image/png' }
      ],
      shortcut: '/favicon.ico',
      apple: '/apple-icon.png'
    },
    openGraph: {
      title: metaTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: metaTitle
        }
      ],
      locale: 'en_IN',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description,
      images: [image]
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  };
}
