'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import { getAdjacentBlogs } from '@/data/blogs';

/**
 * Previous / Next Article Navigation Bar for /blogs/[slug]
 * 
 * Strict Standards:
 * - Derives navigation directly from centralized data/blogs.js
 * - If only 1 or 0 articles exist, returns null cleanly without empty wrappers
 * - Full keyboard accessibility with visible focus rings
 */
export default function BlogDetailNavigation({ currentSlug }) {
  if (!currentSlug) return null;

  const { prev, next } = getAdjacentBlogs(currentSlug);

  // If no adjacent articles exist, omit entirely
  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      className="relative py-12 bg-[#FAF6F0] border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Adjacent Journal Articles"
    >
      <Container size="default" className="relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-6xl mx-auto">
          {/* Previous Article Link */}
          <div className="w-full sm:w-auto text-left">
            {prev ? (
              <Link
                href={`/blogs/${prev.slug}`}
                className="group inline-flex items-center gap-3 p-3 rounded-2xl hover:bg-[#EAD5B5]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                aria-label={`Previous article: ${prev.title}`}
              >
                <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#D5C09D] flex items-center justify-center text-[#5A685D] group-hover:text-brand-primary group-hover:border-brand-primary transition-colors">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                </div>
                <div className="max-w-xs">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#5A685D] block">
                    Previous Perspective
                  </span>
                  <span className="font-serif text-base text-[#111613] group-hover:text-brand-dark transition-colors font-medium line-clamp-1">
                    {prev.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="invisible" aria-hidden="true" />
            )}
          </div>

          {/* Central Catalog Link */}
          <Link
            href="/blogs"
            className="text-xs font-mono uppercase tracking-widest text-[#1E460B] hover:text-brand-primary font-semibold py-2 px-4 rounded-full bg-[#EAD5B5]/50 border border-[#D5C09D] transition-colors"
          >
            All Perspectives
          </Link>

          {/* Next Article Link */}
          <div className="w-full sm:w-auto text-right">
            {next ? (
              <Link
                href={`/blogs/${next.slug}`}
                className="group inline-flex items-center justify-end gap-3 p-3 rounded-2xl hover:bg-[#EAD5B5]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                aria-label={`Next article: ${next.title}`}
              >
                <div className="text-right max-w-xs">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#5A685D] block">
                    Next Perspective
                  </span>
                  <span className="font-serif text-base text-[#111613] group-hover:text-brand-dark transition-colors font-medium line-clamp-1">
                    {next.title}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#D5C09D] flex items-center justify-center text-[#5A685D] group-hover:text-brand-primary group-hover:border-brand-primary transition-colors">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ) : (
              <div className="invisible" aria-hidden="true" />
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
}
