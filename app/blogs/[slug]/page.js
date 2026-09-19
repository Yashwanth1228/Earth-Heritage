import { notFound } from 'next/navigation';
import { getBlogBySlug, getAllBlogs, getRelatedBlogs } from '@/data/blogs';
import { constructMetadata } from '@/lib/seo';
import { getBlogPostSchema } from '@/lib/schema';
import BlogDetailHero from '@/components/blogs/BlogDetailHero';
import BlogDetailBody from '@/components/blogs/BlogDetailBody';
import BlogDetailRelated from '@/components/blogs/BlogDetailRelated';
import BlogDetailNavigation from '@/components/blogs/BlogDetailNavigation';

/**
 * Generate dynamic SEO metadata for journal article
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams?.slug);

  if (!blog) {
    return {
      title: 'Perspective Not Found | Earth Heritage'
    };
  }

  const ogImage =
    blog.coverImage &&
    typeof blog.coverImage.src === 'string' &&
    blog.coverImage.src.trim().length > 0
      ? blog.coverImage.src
      : undefined;

  return {
    ...constructMetadata({
      title: blog.title,
      description:
        blog.excerpt ||
        'Reflections, agricultural perspectives, and field notes from the Earth Heritage Journal.',
      canonicalUrl: `/blogs/${blog.slug}`,
      ...(ogImage ? { image: ogImage } : {})
    }),
    title: `${blog.title} | Earth Heritage`
  };
}

/**
 * Generate static params for confirmed journal articles
 * When blogs array is empty, produces 0 dynamic paths at build time
 */
export async function generateStaticParams() {
  const allBlogs = getAllBlogs();
  return allBlogs.map((blog) => ({
    slug: blog.slug
  }));
}

/**
 * Dynamic Individual Article Reading Page (/blogs/[slug])
 * 
 * Modular Architectural Foundation:
 * 1. JSON-LD BlogPosting Structured Data
 * 2. BlogDetailHero — Light (#FAF6F0) reading header, metadata, lead excerpt, cover photo
 * 3. BlogDetailBody — Immersive prose reading room with structured content blocks
 * 4. BlogDetailNavigation — Dynamic Previous / Next article traversal
 * 5. BlogDetailCta — Consultation closer with pre-filled enquiry modal context
 * 
 * Note on Data Integrity:
 * Automatically invokes notFound() when the requested slug is unconfirmed.
 */
export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams?.slug);

  // If no confirmed article matches the slug, return HTTP 404
  if (!blog) {
    notFound();
  }

  const blogSchema = getBlogPostSchema(blog);
  const relatedBlogs = getRelatedBlogs(blog.slug, 3);

  return (
    <>
      {/* BlogPosting Schema for confirmed article */}
      {blogSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
      )}
      <div className="w-full bg-[#FAF6F0]">
        {/* 1. Article Header & Metadata */}
        <BlogDetailHero blog={blog} />

        {/* 2. Structured Content Blocks Reading Body */}
        <BlogDetailBody content={blog.content} />

        {/* 3. Related Perspectives */}
        <BlogDetailRelated relatedBlogs={relatedBlogs} />

        {/* 4. Adjacent Perspective Navigation */}
        <BlogDetailNavigation currentSlug={blog.slug} />
      </div>
    </>
  );
}
