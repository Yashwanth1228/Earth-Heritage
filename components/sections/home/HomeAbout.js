'use client';

import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { ArrowRight, ShieldCheck, Sprout, Trees } from 'lucide-react';

/**
 * 02 — HomeAbout: Editorial Introduction to Earth Heritage
 * 
 * Sizing & Layout Optimization:
 * - LEFT (6 cols):
 *   - Eyebrow: "ABOUT EARTH HERITAGE"
 *   - Headline: "Land is more than an asset. It is a living legacy."
 *   - Gold accent divider.
 *   - Full narrative detailing mission and model.
 *   - 3 Signature Pillars: Individual Deed, Scientific Agronomy, Living Sanctuary.
 *   - CTA: "Discover Our Story →" linking to /about.
 * - RIGHT (6 cols):
 *   - Proportional Dual-Image Composition covering the full height of the section:
 *     - First Image (Top): /images/about/philosophy-farmland.jpg (aerial contour terrace farmland at sunset, w-full aspect-[16/10]).
 *     - Second Image (Bottom Layered Overlap): /images/about/story-farmland.jpg (vibrant crop rows & drip irrigation, w-[85%] aspect-[16/10] -mt-16 sm:-mt-20 lg:-mt-24 ml-auto z-10).
 *     - Together, the images cleanly span the full vertical height of the section without any wasted space below.
 */
export default function HomeAbout() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Individual Legal Deed',
      desc: 'Registered directly in your name with clean titles'
    },
    {
      icon: Sprout,
      title: 'Scientific Agronomy',
      desc: 'Dedicated field teams managing daily organic care'
    },
    {
      icon: Trees,
      title: 'Living Family Sanctuary',
      desc: 'Fruitful estates to visit, cherish, and pass down'
    }
  ];

  return (
    <section
      id="about-overview"
      data-navbar-theme="light"
      className="relative w-full bg-[#FAF7F2] text-[#111613] py-20 sm:py-28 lg:py-32 border-b border-[#E8DFC8] overflow-hidden"
      aria-label="About Earth Heritage"
    >
      {/* Subtle Contour Line Accent */}
      <LandContourPattern variant="biscuit-organic-flow" className="opacity-50 pointer-events-none" />

      <Container size="default" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
          
          {/* LEFT COLUMN: Title, Narrative Details, Pillars & CTA (6 cols on lg) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            
            {/* Eyebrow */}
            <MotionReveal delay={0.05}>
              <span className="inline-block text-[11px] sm:text-xs font-mono font-semibold tracking-[0.24em] text-[#8C7A5A] uppercase">
                About Earth Heritage
              </span>
            </MotionReveal>

            {/* Editorial Headline */}
            <MotionReveal delay={0.12}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-normal tracking-tight text-[#111613] leading-[1.14]">
                Land is more than an asset.{' '}
                <span className="italic font-light text-[#2C4830] block mt-1">
                  It is a living legacy.
                </span>
              </h2>
            </MotionReveal>

            {/* Gold Divider */}
            <MotionReveal delay={0.18}>
              <div className="w-16 h-[2px] bg-[#B88E3E]" aria-hidden="true" />
            </MotionReveal>

            {/* Narrative Details */}
            <div className="space-y-4 text-[#3A493D]">
              <MotionReveal delay={0.22}>
                <p className="font-sans text-sm sm:text-base text-[#2E3B32] font-normal leading-relaxed">
                  Earth Heritage unites individual farmland ownership with professional, long-term farm management. We bridge the gap between people and the land — enabling families to own productive agricultural acreage while our experienced teams supervise daily cultivation, maintenance, and ecological care.
                </p>
              </MotionReveal>

              <MotionReveal delay={0.28}>
                <p className="font-sans text-xs sm:text-[14px] text-[#526356] leading-relaxed">
                  Founded on a deep respect for agriculture, natural cycles, and generational stewardship, we create enduring estates where landowners stay connected to nature without the operational burden of daily farming.
                </p>
              </MotionReveal>
            </div>

            {/* 3 Core Stewardship Pillars */}
            <MotionReveal delay={0.34}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#EAE0CD]">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="p-3.5 rounded-xl bg-white/80 border border-[#E2D7C3] space-y-1.5 shadow-2xs"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#15341C]/10 flex items-center justify-center text-[#15341C] mb-1">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="font-serif text-xs font-semibold text-[#111613] leading-snug">
                        {pillar.title}
                      </h4>
                      <p className="font-sans text-[11px] text-[#6A786E] leading-tight">
                        {pillar.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </MotionReveal>

            {/* Action CTA */}
            <MotionReveal delay={0.4} className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#15341C] hover:text-[#1E460B] group transition-colors"
              >
                <span className="border-b border-[#15341C]/40 pb-0.5 group-hover:border-[#1E460B]">
                  Discover Our Story
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </MotionReveal>

          </div>

          {/* RIGHT COLUMN: Full-Height Layered Dual-Image Composition (6 cols on lg) */}
          <div className="lg:col-span-6 relative pt-2 lg:pt-4">
            
            {/* FIRST IMAGE: Aerial Contour Terrace Farmland at Golden Hour (w-full, aspect-[16/10]) */}
            <MotionReveal delay={0.15}>
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(17,22,19,0.08)] border border-[#DDD3BF] bg-[#EDE5D5] group">
                <Image
                  src="/images/about/philosophy-farmland.jpg"
                  alt="Breathtaking aerial view of rolling contour agricultural terraces and farmland homestead under golden sunset"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-103"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

                {/* Top Badge on First Image */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-[10px] font-mono tracking-wider uppercase font-semibold">
                    <span>THE ESTATE</span>
                    <span className="text-[#F2CF84]">&bull;</span>
                    <span>CONTOUR FARMLAND</span>
                  </span>
                </div>

                {/* Bottom Caption on First Image */}
                <div className="absolute bottom-3 left-4 right-4 z-10 text-white space-y-0.5">
                  <p className="font-serif text-sm sm:text-base font-normal text-[#FAF7F2] tracking-tight">
                    Generational Agricultural Land
                  </p>
                  <p className="font-sans text-[11px] text-[#D8E4DC]">
                    Naturally contoured terrain & living agroforestry
                  </p>
                </div>
              </div>
            </MotionReveal>

            {/* SECOND IMAGE: Close Crop Rows with Active Drip Irrigation (w-[86%], aspect-[16/10], overlapping below) */}
            <MotionReveal delay={0.3}>
              <div className="relative w-[88%] sm:w-[85%] aspect-[16/10] -mt-16 sm:-mt-20 lg:-mt-24 ml-auto z-10 rounded-2xl overflow-hidden shadow-[0_24px_50px_rgba(17,22,19,0.18)] border-4 sm:border-[6px] border-[#FAF7F2] bg-[#EDE5D5] group">
                <Image
                  src="/images/about/story-farmland.jpg"
                  alt="Disciplined organic crop rows with modern drip irrigation tended under blue sky"
                  fill
                  sizes="(max-width: 1024px) 85vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                {/* Top Badge on Second Image */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-[9px] font-mono tracking-wider uppercase font-semibold">
                    <span>STEWARDSHIP</span>
                    <span className="text-[#55c40d]">&bull;</span>
                    <span>ACTIVE CARE</span>
                  </span>
                </div>

                {/* Bottom Caption on Second Image */}
                <div className="absolute bottom-3 left-3.5 right-3.5 z-10 text-white space-y-0.5">
                  <p className="font-serif text-xs sm:text-sm font-normal text-[#FAF7F2] tracking-tight">
                    Living Soil & Precision Cultivation
                  </p>
                  <p className="font-sans text-[10px] text-[#D8E4DC]">
                    Supervised daily by resident agronomy specialists
                  </p>
                </div>
              </div>
            </MotionReveal>

          </div>

        </div>
      </Container>
    </section>
  );
}
