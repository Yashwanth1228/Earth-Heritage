'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Compass, Sprout, ShieldCheck } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import BlogCard from '@/components/blogs/BlogCard';
import BlogFeatured from '@/components/blogs/BlogFeatured';

/**
 * Editorial Blog Portfolio Section
 * 
 * Replaces rigid grids with an adaptive editorial exhibition layout:
 * - 0 articles: Preserved dignified taking-shape status card
 * - 1 article:  Grand Featured Marquee Showcase
 * - 2 articles: Asymmetric Editorial Duo (7-col feature + 5-col companion)
 * - 3 articles: Featured Lead Marquee + Asymmetric Pair
 * - 4+ articles: Alternating exhibition rhythm
 */
export default function BlogPortfolio({ blogs = [] }) {
  const hasBlogs = Array.isArray(blogs) && blogs.length > 0;
  const count = hasBlogs ? blogs.length : 0;

  return (
    <section
      id="journal-portfolio"
      data-navbar-theme="light"
      className="relative py-16 sm:py-24 lg:py-28 bg-[#FAF7F2] border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Earth Heritage Journal Publications"
    >
      {/* Background Topographic Ambience */}
      <LandContourPattern variant="biscuit-topography" className="opacity-70" />

      <Container size="default" className="relative z-10">
        {hasBlogs ? (
          /* Populated Editorial Showcase */
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {/* Case 1: Exactly 1 Article -> Grand Featured Exhibition */}
            {count === 1 && (
              <div className="max-w-5xl mx-auto">
                <MotionReveal delay={0.1}>
                  <BlogFeatured blog={blogs[0]} priority={true} />
                </MotionReveal>
              </div>
            )}

            {/* Case 2: Exactly 2 Articles -> Asymmetric Editorial Duo */}
            {count === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                <MotionReveal delay={0.1} className="lg:col-span-7 flex flex-col">
                  <BlogCard blog={blogs[0]} priority={true} className="w-full h-full" />
                </MotionReveal>
                <MotionReveal delay={0.2} className="lg:col-span-5 flex flex-col">
                  <BlogCard blog={blogs[1]} className="w-full h-full" />
                </MotionReveal>
              </div>
            )}

            {/* Case 3: Exactly 3 Articles -> Lead Featured + Asymmetric Pair */}
            {count === 3 && (
              <div className="space-y-10 sm:space-y-12">
                <MotionReveal delay={0.1}>
                  <BlogFeatured blog={blogs[0]} priority={true} />
                </MotionReveal>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                  <MotionReveal delay={0.15} className="lg:col-span-7 flex flex-col">
                    <BlogCard blog={blogs[1]} className="w-full h-full" />
                  </MotionReveal>
                  <MotionReveal delay={0.25} className="lg:col-span-5 flex flex-col">
                    <BlogCard blog={blogs[2]} className="w-full h-full" />
                  </MotionReveal>
                </div>
              </div>
            )}

            {/* Case 4: 4+ Articles -> Alternating Editorial Rhythm */}
            {count >= 4 && (
              <EditorialBlogRhythm blogs={blogs} />
            )}
          </div>
        ) : (
          /* Preserved Production Empty State (when blogs = []) */
          <div className="max-w-3xl mx-auto">
            <MotionReveal delay={0.1}>
              <div className="bg-surface/90 backdrop-blur-sm border border-[#D5C09D] rounded-3xl p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
                {/* Decorative Topographic Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#163A20]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/70 border border-[#D5C09D] text-xs font-mono font-semibold tracking-wider text-[#1E460B] uppercase mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D] animate-pulse" aria-hidden="true" />
                  <span>EDITORIAL STATUS</span>
                </div>

                {/* Main Heading */}
                <h2 className="font-serif text-2xl sm:text-4xl text-text-primary font-normal tracking-tight mb-4">
                  Our journal is taking shape.
                </h2>

                {/* Supporting Copy */}
                <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto mb-8">
                  Reflections, seasonal observations, and educational perspectives will be published here as our editorial publications are released.
                </p>

                {/* Editorial Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left my-8 pt-6 border-t border-border-subtle">
                  <div className="p-4 rounded-2xl bg-surface-subtle border border-border-subtle space-y-2">
                    <div className="w-8 h-8 rounded-full bg-[#163A20]/10 flex items-center justify-center text-brand-primary">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h3 className="font-sans font-semibold text-sm text-text-primary">Titled Land</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Essays exploring the enduring peace of mind of registered ownership.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-subtle border border-border-subtle space-y-2">
                    <div className="w-8 h-8 rounded-full bg-[#163A20]/10 flex items-center justify-center text-brand-primary">
                      <Sprout className="w-4 h-4" />
                    </div>
                    <h3 className="font-sans font-semibold text-sm text-text-primary">Farm Care</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Agricultural perspectives on agronomic management and crop cycles.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-subtle border border-border-subtle space-y-2">
                    <div className="w-8 h-8 rounded-full bg-[#163A20]/10 flex items-center justify-center text-brand-primary">
                      <Compass className="w-4 h-4" />
                    </div>
                    <h3 className="font-sans font-semibold text-sm text-text-primary">Living Legacy</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Reflections on generational continuity and living close to nature.
                    </p>
                  </div>
                </div>

                {/* Direct Educational Navigation Links */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <Link
                    href="/managed-farmland"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-dark text-[#FAF6F0] font-sans font-semibold text-xs sm:text-sm tracking-wide hover:bg-brand-primary transition-all duration-200 shadow-sm"
                  >
                    <span>Explore Managed Farmland</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-surface border border-border text-text-primary font-sans font-medium text-xs sm:text-sm tracking-wide hover:bg-surface-subtle transition-all duration-200"
                  >
                    <span>See How It Works</span>
                  </Link>
                </div>
              </div>
            </MotionReveal>
          </div>
        )}
      </Container>
    </section>
  );
}

/**
 * Editorial Blog Rhythm Engine for 4+ articles
 * Groups articles into alternating Featured showcases and Asymmetric pairs
 */
function EditorialBlogRhythm({ blogs }) {
  const sections = [];
  let i = 0;
  let cycle = 0;

  while (i < blogs.length) {
    const remaining = blogs.length - i;

    if (cycle % 2 === 0 || remaining === 1) {
      const blog = blogs[i];
      sections.push(
        <MotionReveal key={blog.slug || `blog-${i}`} delay={0.1}>
          <BlogFeatured blog={blog} priority={i === 0} />
        </MotionReveal>
      );
      i += 1;
    } else {
      const b1 = blogs[i];
      const b2 = blogs[i + 1];
      const isEvenPair = Math.floor(cycle / 2) % 2 === 0;
      const col1 = isEvenPair ? 'lg:col-span-7' : 'lg:col-span-5';
      const col2 = isEvenPair ? 'lg:col-span-5' : 'lg:col-span-7';

      sections.push(
        <div key={`pair-${i}`} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <MotionReveal delay={0.1} className={`${col1} flex flex-col`}>
            <BlogCard blog={b1} className="w-full h-full" />
          </MotionReveal>
          <MotionReveal delay={0.2} className={`${col2} flex flex-col`}>
            <BlogCard blog={b2} className="w-full h-full" />
          </MotionReveal>
        </div>
      );
      i += 2;
    }
    cycle += 1;
  }

  return <div className="space-y-12 sm:space-y-16 lg:space-y-20">{sections}</div>;
}
