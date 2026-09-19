import { constructMetadata } from '@/lib/seo';
import { getBlogCollectionSchema } from '@/lib/schema';
import { getAllBlogs } from '@/data/blogs';
import BlogHero from '@/components/blogs/BlogHero';
import BlogPortfolio from '@/components/blogs/BlogPortfolio';

export const metadata = {
  ...constructMetadata({
    title: 'Blogs & Perspectives',
    description:
      'Read reflections, stewardship field notes, and educational perspectives on managed farmland, soil health, and land ownership from Earth Heritage.',
    canonicalUrl: '/blogs'
  }),
  title: 'Blogs | Earth Heritage'
};

/**
 * Direct Editorial Blog Catalog Hub (/blogs)
 * 
 * Sequential Architecture:
 * 1. JSON-LD CollectionPage Structured Data
 * 2. BlogHero — Light editorial journal header (#FAF7F2)
 * 3. BlogPortfolio — Contrasting warm biscuit section (#F0E0C6) with equal-sized 3-column cards
 */
export default function BlogsPage() {
  const allBlogs = getAllBlogs();
  const collectionSchema = getBlogCollectionSchema(allBlogs);

  return (
    <>
      {/* CollectionPage Schema for /blogs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <div className="w-full">
        <BlogHero />
        <BlogPortfolio blogs={allBlogs} />
      </div>
    </>
  );
}
