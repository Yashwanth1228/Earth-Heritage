'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * Editorial Introduction & Category Navigation for /blogs
 * 
 * Strict Standards:
 * - Begins with approved light ivory background (#FAF6F0)
 * - Restrained typography and subtle contour motif accents
 * - Renders category pills ONLY if confirmed categories exist
 */
export default function BlogHero({
  categories = [],
  activeCategory = null,
  onSelectCategory = null
}) {
  const hasCategories = Array.isArray(categories) && categories.length > 1;

  return (
    <section
      id="blog-hero"
      data-navbar-theme="light"
      className="relative bg-[#FAF6F0] text-[#111613] pt-28 sm:pt-36 pb-12 sm:pb-16 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Earth Heritage Journal Introduction"
    >
      {/* Signature Earth Heritage Contour Motifs */}
      <LandContourPattern variant="biscuit-contours" className="opacity-80" />

      <Container size="default" className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Eyebrow Badge */}
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>EARTH HERITAGE JOURNAL</span>
            </div>
          </MotionReveal>

          {/* Luxury Serif Display Title */}
          <MotionReveal delay={0.15}>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[66px] font-normal tracking-tight text-[#111613] leading-[1.12]">
              Perspectives on land, care, and stewardship.
            </h1>
          </MotionReveal>

          {/* Supporting Statement */}
          <MotionReveal delay={0.25}>
            <p className="font-sans text-base sm:text-lg md:text-xl text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
              Reflections, agricultural field notes, and educational perspectives exploring the responsibilities and enduring legacy of managed farmland.
            </p>
          </MotionReveal>

          {/* Optional Category Navigation (Rendered ONLY if multiple confirmed categories exist) */}
          {hasCategories && onSelectCategory && (
            <MotionReveal delay={0.35} className="pt-4">
              <nav
                className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
                aria-label="Filter journal articles by topic"
              >
                <button
                  type="button"
                  onClick={() => onSelectCategory(null)}
                  className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                    activeCategory === null
                      ? 'bg-[#1E460B] text-[#FAF6F0] font-semibold shadow-xs'
                      : 'bg-[#FAF7F2] text-[#5A685D] hover:text-[#111613] border border-[#D5C09D]/70'
                  }`}
                >
                  All Perspectives
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => onSelectCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                      activeCategory === cat
                        ? 'bg-[#1E460B] text-[#FAF6F0] font-semibold shadow-xs'
                        : 'bg-[#FAF7F2] text-[#5A685D] hover:text-[#111613] border border-[#D5C09D]/70'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            </MotionReveal>
          )}
        </div>
      </Container>
    </section>
  );
}
