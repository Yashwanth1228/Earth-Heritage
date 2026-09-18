'use client';

import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { ArrowUpRight } from 'lucide-react';
import { companyData } from '@/data/company';

/**
 * 02 — HomeAbout: Editorial Introduction to Earth Heritage
 * 
 * Purpose: Quick understanding of who Earth Heritage is.
 * Headline: "Land is more than an asset. It is a living legacy."
 * Based exclusively on confirmed corporate data (founding, leadership, model).
 */
export default function HomeAbout() {
  return (
    <section
      id="about-overview"
      data-navbar-theme="light"
      className="relative w-full bg-[#FAF7F2] text-[#111613] py-20 sm:py-28 lg:py-32 border-b border-[#E8DFC8] overflow-hidden"
      aria-label="About Earth Heritage"
    >
      {/* Background Topography Pattern */}
      <LandContourPattern variant="biscuit-organic-flow" className="opacity-70" />

      <Container size="default" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Composition (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <MotionReveal delay={0.15}>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(17,22,19,0.08)] border border-[#DDD3BF] bg-white aspect-[4/5] sm:aspect-[3/4]">
                <Image
                  src="/images/landing/statement-landscape.jpg"
                  alt="Sunlight filtering through vibrant green foliage and mature trees on farmland"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

                {/* Grounding Founding Card */}
                <div className="absolute bottom-5 left-5 right-5 p-4 sm:p-5 rounded-xl bg-[#FAF7F2]/95 border border-[#DDD3BF] backdrop-blur-md shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-[#15341C] uppercase font-semibold">
                    <span>Founded {companyData.founded}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  </div>
                  <p className="font-serif text-sm font-normal text-[#111613]">
                    Rooted in farming heritage and long-term land stewardship.
                  </p>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Editorial Narrative & Values (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 sm:space-y-8">
            <MotionReveal delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8D8] border border-[#DDD3BF] text-xs font-mono font-semibold tracking-widest text-[#15341C] uppercase shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
                <span>Who We Are</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal tracking-tight text-[#111613] leading-[1.12]">
                Land is more than an asset.{' '}
                <span className="italic font-light text-[#8C7A5A] block sm:inline">
                  It is a living legacy.
                </span>
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.25}>
              <div className="space-y-4 text-base sm:text-lg text-[#324036] font-normal leading-relaxed">
                <p>
                  At Earth Heritage, we believe that meaningful land ownership begins with thoughtful care. We unite farmland ownership, ongoing professional farm management, and responsible environmental stewardship — enabling individuals and families to build an enduring connection to nature.
                </p>
                <p className="text-sm sm:text-base text-[#4E5B51]">
                  The company was founded by Sathish Agastya and Khushi Jain, bringing together personal agricultural roots, technology, design, and relationship-driven business leadership to create a lasting standard in managed farmland.
                </p>
              </div>
            </MotionReveal>

            {/* 3 Core Highlights */}
            <MotionReveal delay={0.35}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E5DAC4]">
                <div className="space-y-1">
                  <span className="font-mono text-xs text-[#8C7A5A] font-semibold">01 &bull; OWNERSHIP</span>
                  <h3 className="font-serif text-base font-medium text-[#111613]">You Own the Land</h3>
                  <p className="text-xs text-[#526356] leading-relaxed">
                    Full land ownership retained by you as the individual landowner.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-xs text-[#8C7A5A] font-semibold">02 &bull; MANAGEMENT</span>
                  <h3 className="font-serif text-base font-medium text-[#111613]">We Manage the Farm</h3>
                  <p className="text-xs text-[#526356] leading-relaxed">
                    Dedicated coordination of manpower, cultivation, and routine care.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-xs text-[#8C7A5A] font-semibold">03 &bull; LEGACY</span>
                  <h3 className="font-serif text-base font-medium text-[#111613]">Generational Value</h3>
                  <p className="text-xs text-[#526356] leading-relaxed">
                    A flourishing natural estate for your family across generations.
                  </p>
                </div>
              </div>
            </MotionReveal>

            {/* CTA */}
            <MotionReveal delay={0.45} className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#15341C] hover:text-[#1E460B] group transition-colors"
              >
                <span>Discover Our Story</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </MotionReveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
