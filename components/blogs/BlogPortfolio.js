'use client';

import Link from 'next/link';
import { ArrowRight, Compass, Sprout, ShieldCheck } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import BlogCard from '@/components/blogs/BlogCard';

/**
 * Editorial Blog Portfolio Section
 * 
 * Distinct contrasting background:
 * - Top hero section is light ivory (#FAF7F2)
 * - This portfolio section uses the richer warm biscuit background (#F0E0C6) for contrast
 * - In one row 3 blogs are displayed in equal-sized cards
 * - Responsive: 3 columns on desktop (lg:grid-cols-3), 2 on tablet (md:grid-cols-2), 1 on mobile
 */
export default function BlogPortfolio({ blogs = [] }) {
  const hasBlogs = Array.isArray(blogs) && blogs.length > 0;

  return (
    <section
      id="journal-portfolio"
      data-navbar-theme="light"
      className="relative py-14 sm:py-20 lg:py-24 bg-[#F0E0C6] border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Earth Heritage Journal Publications"
    >
      {/* Background Organic Topographic Elevation Contours */}
      <LandContourPattern variant="biscuit-topography" className="opacity-90 pointer-events-none" />

      <Container size="default" className="relative z-10">
        {hasBlogs ? (
          /* Uniform 3-Column Equal-Sized Card Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {blogs.map((blog, idx) => (
              <MotionReveal
                key={blog.slug || `blog-${idx}`}
                delay={0.05 + (idx % 3) * 0.08}
                className="flex flex-col h-full"
              >
                <BlogCard blog={blog} priority={idx < 3} className="w-full h-full" />
              </MotionReveal>
            ))}
          </div>
        ) : (
          /* Dignified Production Empty State (when blogs = []) */
          <div className="max-w-3xl mx-auto">
            <MotionReveal delay={0.1}>
              <div className="bg-white/95 backdrop-blur-sm border border-[#D5C09D] rounded-3xl p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
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
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-border-subtle space-y-2">
                    <div className="w-8 h-8 rounded-full bg-[#163A20]/10 flex items-center justify-center text-brand-primary">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h3 className="font-sans font-semibold text-sm text-text-primary">Titled Land</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Essays exploring the enduring peace of mind of registered ownership.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-border-subtle space-y-2">
                    <div className="w-8 h-8 rounded-full bg-[#163A20]/10 flex items-center justify-center text-brand-primary">
                      <Sprout className="w-4 h-4" />
                    </div>
                    <h3 className="font-sans font-semibold text-sm text-text-primary">Farm Care</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Agricultural perspectives on agronomic management and crop cycles.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-border-subtle space-y-2">
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
