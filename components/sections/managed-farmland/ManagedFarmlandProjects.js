'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Sprout } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import AnimatedTitle from '@/components/animations/AnimatedTitle';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { projects } from '@/data/projects';

/**
 * Section 6 — Managed Farmland Projects in Practice
 * 
 * Contextual showcase connecting the managed farmland philosophy to
 * Earth Heritage's active estate projects (Nairuthya Whispering Wood & Coconut Garden),
 * with clear navigational links to each project page and the full portfolio.
 */
export default function ManagedFarmlandProjects() {
  const nairuthya = projects.find((p) => p.slug === 'nairuthya-whispering-wood');
  const coconut = projects.find((p) => p.slug === 'coconut-garden');

  const featuredProjects = [
    {
      data: nairuthya,
      fallbackName: 'Nairuthya Whispering Wood',
      location: 'Honnasandra, Nelamangala',
      category: 'Managed Farmland',
      tagline: '8-acre managed farmland estate in Honnasandra, Nelamangala with titled plots and scheduled plantation care.',
      specs: [
        { label: 'Area', value: '8 Acres' },
        { label: 'Configuration', value: '25 Premium Plots' },
        { label: 'Min. Plot', value: '6,000 sq.ft' }
      ],
      href: '/projects/nairuthya-whispering-wood',
      linkText: 'Explore Nairuthya Whispering Wood',
      imageSrc:
        nairuthya?.heroImage?.src ||
        'https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/projects/nairuthya-whispering-wood/hero.jpg',
      imageAlt:
        nairuthya?.heroImage?.alt ||
        'Nairuthya Whispering Wood managed farmland estate in Honnasandra, Nelamangala'
    },
    {
      data: coconut,
      fallbackName: 'Coconut Garden',
      location: 'Bidadi',
      category: 'Premium Farm Plots',
      tagline: '6-acre countryside farm plots estate in Bidadi featuring established coconut groves and ongoing maintenance.',
      specs: [
        { label: 'Area', value: '6 Acres' },
        { label: 'Plantation', value: '25+ Trees per Plot' },
        { label: 'Min. Plot', value: '6,000 Sq. Ft.' }
      ],
      href: '/projects/coconut-garden',
      linkText: 'Explore Coconut Garden',
      imageSrc:
        coconut?.heroImage?.src ||
        'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201949/earth-heritage/projects/coconut-garden-hero.jpg',
      imageAlt:
        coconut?.heroImage?.alt ||
        'Coconut Garden premium farm plots in Bidadi'
    }
  ];

  return (
    <section
      id="managed-projects"
      className="relative bg-[#FAF6F0] text-[#111613] pt-14 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Managed Farmland Projects"
    >
      {/* Background Organic Contours */}
      <LandContourPattern variant="biscuit-contours" className="opacity-75 pointer-events-none" />

      <Container size="default" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase mb-5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>OUR FARMLAND INITIATIVES</span>
            </div>
          </MotionReveal>

          <div className="flex justify-center">
            <AnimatedTitle
              as="h2"
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal tracking-tight text-[#111613] leading-[1.14] text-center"
              withUnderline
              underlineColor="#1E460B"
              underlineDelay={0.4}
            >
              Managed farmland in practice
            </AnimatedTitle>
          </div>

          <MotionReveal delay={0.25}>
            <p className="mt-5 font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
              Explore active agricultural communities where Earth Heritage pairs titled land ownership with ongoing farm management and ecological care.
            </p>
          </MotionReveal>
        </div>

        {/* 2-Column Editorial Project Cards with Alternating Directional Reveals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">
          {featuredProjects.map((item, idx) => {
            const isLeft = idx === 0;

            return (
              <MotionReveal
                key={item.href}
                direction={isLeft ? 'left' : 'right'}
                delay={0.15 + idx * 0.1}
                duration={0.7}
                className="h-full"
              >
                <article className="group h-full rounded-2xl sm:rounded-3xl bg-white/85 hover:bg-white border border-[#D5C09D] hover:border-[#1E460B]/50 transition-all duration-300 shadow-[0_6px_24px_rgba(17,22,19,0.04)] hover:shadow-[0_12px_36px_rgba(17,22,19,0.08)] flex flex-col justify-between overflow-hidden backdrop-blur-xs">
                  <div>
                    {/* Visual Aspect Ratio Image Container */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E4D1B5] border-b border-[#E6D8C3]">
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                      {/* Pill Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111613]/80 backdrop-blur-md text-white font-mono text-[11px] font-semibold tracking-wider uppercase border border-white/15">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" />
                          <span>{item.category}</span>
                        </span>
                      </div>

                      {/* Location Chip */}
                      <div className="absolute bottom-3 left-4 z-10 flex items-center gap-1.5 text-white/95 text-xs font-sans font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#55C40D] shrink-0" aria-hidden="true" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 sm:p-8 space-y-4">
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#111613] group-hover:text-[#1E460B] transition-colors">
                        {item.fallbackName}
                      </h3>

                      <p className="font-sans text-sm sm:text-[15px] text-[#38423A] leading-relaxed">
                        {item.tagline}
                      </p>

                      {/* Specifications Grid */}
                      <div className="pt-2 grid grid-cols-3 gap-2 border-t border-[#E6D8C3]">
                        {item.specs.map((spec) => (
                          <div key={spec.label} className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#EAD5B5]/70 text-center">
                            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#5E6960] block font-medium">
                              {spec.label}
                            </span>
                            <span className="font-sans text-xs sm:text-[13px] font-semibold text-[#111613] block mt-0.5 truncate">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Accessible Editorial Action Link */}
                  <div className="p-6 sm:p-8 pt-0">
                    <Link
                      href={item.href}
                      className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-[#FAF6F0] group-hover:bg-[#1E460B] border border-[#D5C09D] group-hover:border-[#1E460B] text-[#1E460B] group-hover:text-white transition-all duration-300 text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider"
                    >
                      <span>{item.linkText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </MotionReveal>
            );
          })}
        </div>

        {/* Global Portfolio Navigation Banner linking to /projects */}
        <MotionReveal delay={0.35} className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 px-6 sm:px-8 py-5 rounded-2xl bg-[#F0E0C6]/70 border border-[#D5C09D] shadow-xs max-w-3xl mx-auto">
            <div className="text-left sm:text-left">
              <span className="font-mono text-xs font-bold text-[#1E460B] uppercase tracking-wider block">
                Full Farmland Portfolio
              </span>
              <p className="mt-1 font-sans text-sm text-[#38423A]">
                Explore all verified agricultural estates and ongoing developments across Karnataka.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E460B] hover:bg-[#2A5C13] text-white text-xs font-mono font-semibold tracking-wider uppercase transition-colors shrink-0 shadow-2xs group"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
