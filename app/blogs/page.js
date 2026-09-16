import { constructMetadata } from '@/lib/seo';
import { getBlogCollectionSchema } from '@/lib/schema';
import { getAllBlogs, getAllCategories } from '@/data/blogs';
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
 * Editorial Blog Catalog Hub (/blogs)
 * 
 * Sequential Architecture:
 * 1. JSON-LD CollectionPage Structured Data
 * 2. BlogHero — Editorial journal introduction and optional category filters
 * 3. BlogPortfolio — Adaptive editorial exhibition (Marquee Feature -> Asymmetric Pairs / Empty State)
 */
export default function BlogsPage() {
  const allBlogs = getAllBlogs();
  const allCategories = getAllCategories();
  const collectionSchema = getBlogCollectionSchema(allBlogs);

  return (
    <>
      {/* CollectionPage Schema for /blogs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <div className="w-full bg-[#FAF6F0]">
        <BlogHero categories={allCategories} />
        <BlogPortfolio blogs={allBlogs} />
      </div>
    </>
  );
}

