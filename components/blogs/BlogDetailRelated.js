'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import BlogCard from '@/components/blogs/BlogCard';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * Editorial Related Articles Section for /blogs/[slug]
 * 
 * Strict Standards:
 * - Renders 2–3 related articles based on category relevance
 * - Features warm biscuit background (#F0E0C6) with signature topographic contour pattern
 * - Editorial, clean aesthetic (no sensationalist clickbait cards)
 * - Returns null gracefully if no related articles exist
 */
export default function BlogDetailRelated({ relatedBlogs = [] }) {
  if (!Array.isArray(relatedBlogs) || relatedBlogs.length === 0) {
    return null;
  }

  return (
    <section
      id="related-perspectives"
      data-navbar-theme="light"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#F0E0C6] text-[#111613] border-t border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Related Journal Perspectives"
    >
      {/* Signature Earth Heritage Topographic Motifs */}
      <LandContourPattern variant="biscuit-topography" className="opacity-90 pointer-events-none" />

      <Container size="default" className="relative z-10">
        <div className="space-y-10 sm:space-y-12">
          {/* Header */}
          <div className="max-w-2xl">
            <MotionReveal delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/70 border border-[#D5C09D] text-xs font-mono font-semibold tracking-wider text-[#1E460B] uppercase shadow-xs mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                <span>FURTHER PERSPECTIVES</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111613] font-normal tracking-tight">
                Related Reading from the Journal
              </h2>
            </MotionReveal>
          </div>

          {/* Editorial Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {relatedBlogs.map((blog, idx) => (
              <MotionReveal
                key={blog.slug || `related-${idx}`}
                delay={0.1 + idx * 0.08}
                className="flex flex-col h-full"
              >
                <BlogCard blog={blog} variant="compact" className="h-full" />
              </MotionReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
