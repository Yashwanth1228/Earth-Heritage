'use client';

import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import AnimatedTitle from '@/components/animations/AnimatedTitle';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { ArrowRight, ShieldCheck, Sprout, Trees } from 'lucide-react';

/**
 * 02 — HomeAbout: Editorial Introduction to Earth Heritage
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          
          {/* LEFT COLUMN: Title, Narrative Details, Pillars & CTA (6 cols on lg - Enters from Left) */}
          <MotionReveal direction="left" delay={0.1} duration={0.7} className="lg:col-span-6 space-y-6 sm:space-y-7">
            
            {/* Eyebrow */}
            <div className="inline-block text-[11px] sm:text-xs font-mono font-semibold tracking-[0.24em] text-[#8C7A5A] uppercase">
              About Earth Heritage
            </div>

            {/* Editorial Headline with Left-to-Right Animated Title Wipe */}
            <AnimatedTitle
              as="h2"
              className="font-serif text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-normal tracking-tight text-[#111613] leading-[1.14]"
              withUnderline
              underlineColor="#B88E3E"
              underlineDelay={0.4}
            >
              Land is more than an asset.{' '}
              <span className="italic font-light text-[#2C4830] block mt-1">
                It is a living legacy.
              </span>
            </AnimatedTitle>

            {/* Gold Divider */}
            <div className="w-16 h-[2px] bg-[#B88E3E]" aria-hidden="true" />

            {/* Narrative Details */}
            <div className="space-y-4 text-[#3A493D]">
              <p className="font-sans text-sm sm:text-base text-[#2E3B32] font-normal leading-relaxed">
                Earth Heritage unites individual farmland ownership with professional, long-term farm management. We bridge the gap between people and the land — enabling families to own productive agricultural acreage while our experienced teams supervise daily cultivation, maintenance, and ecological care.
              </p>
              <p className="font-sans text-xs sm:text-[14px] text-[#526356] leading-relaxed">
                Founded on a deep respect for agriculture, natural cycles, and generational stewardship, we create enduring estates where landowners stay connected to nature without the operational burden of daily farming.
              </p>
            </div>

            {/* 3 Core Stewardship Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#EAE0CD]">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-3.5 rounded-xl bg-white/80 border border-[#E2D7C3] space-y-1.5 shadow-2xs hover:border-[#B88E3E]/60 transition-colors"
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

            {/* Action CTA */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#15341C] hover:text-[#1E460B] group transition-colors"
              >
                <span className="border-b border-[#15341C]/40 pb-0.5 group-hover:border-[#1E460B]">
                  Discover Our Story
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>

          </MotionReveal>

          {/* RIGHT COLUMN: Single Majestic Architectural Farmland Image (6 cols on lg - Enters from Right) */}
          <MotionReveal direction="right" delay={0.2} duration={0.7} className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] xl:aspect-[5/6] max-h-[620px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(17,22,19,0.10)] border border-[#DDD3BF] bg-[#EDE5D5] group">
              <Image
                src="https://res.cloudinary.com/yffbj6hj/image/upload/v1791204922/earth-heritage/managed-farmland/nature-responsibility.jpg"
                alt="Expansive organic managed farmland with healthy crop rows, rolling contours, and sunset hills"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-103"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-[11px] font-mono tracking-wider uppercase font-semibold">
                  <span>THE ESTATE</span>
                  <span className="text-[#55c40d]">&bull;</span>
                  <span>LIVING LEGACY</span>
                </span>
              </div>

              {/* Bottom Editorial Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 text-white space-y-1">
                <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.2em] text-[#F2CF84] uppercase block">
                  Ecological Stewardship
                </span>
                <p className="font-serif text-lg sm:text-xl lg:text-2xl font-normal text-[#FAF7F2] tracking-tight leading-snug">
                  Naturally Cultivated Farmland Acreage
                </p>
                <p className="font-sans text-xs sm:text-[13px] text-[#D8E4DC] leading-relaxed max-w-md pt-0.5">
                  Enduring agricultural property registered directly in your name with dedicated on-ground management.
                </p>
              </div>
            </div>
          </MotionReveal>

        </div>
      </Container>
    </section>
  );
}
