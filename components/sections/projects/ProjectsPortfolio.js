'use client';

import Link from 'next/link';
import { ArrowRight, Compass, Sprout, ShieldCheck } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/projects/ProjectCard';

/**
 * Editorial Projects Portfolio Section
 * 
 * Replaces the rigid 3-column grid with a responsive, asymmetrical editorial exhibition.
 * Dynamically adapts layout according to project count:
 * - 1 project:  Grand Featured Exhibition (full-width showcase)
 * - 2 projects: Asymmetric Duo (7-col feature + 5-col companion)
 * - 3 projects: Featured Lead Showcase + Asymmetric Pair
 * - 4+ projects: Alternating editorial rhythm (Featured -> Asymmetric Pairs -> Reversed Featured)
 * 
 * When projects = [], preserves the approved production Coming-Soon / Portfolio Taking Shape state.
 */
export default function ProjectsPortfolio({ projects: propProjects } = {}) {
  const activeProjects = Array.isArray(propProjects) ? propProjects : projects;
  const hasProjects = activeProjects && activeProjects.length > 0;
  const count = activeProjects ? activeProjects.length : 0;

  return (
    <section
      id="portfolio"
      data-navbar-theme="light"
      className="relative py-16 sm:py-24 lg:py-28 bg-[#FAF7F2] border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Earth Heritage Project Portfolio"
    >
      {/* Background Topographic Ambience */}
      <LandContourPattern variant="biscuit-topography" className="opacity-70" />

      <Container size="default" className="relative z-10">
        {hasProjects ? (
          /* Populated Editorial Showcase */
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {/* Case 1: Exactly 1 Project -> Grand Featured Exhibition */}
            {count === 1 && (
              <div className="max-w-5xl mx-auto">
                <MotionReveal delay={0.1}>
                  <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                    <span>FEATURED INITIATIVE</span>
                  </div>
                  <ProjectCard project={activeProjects[0]} variant="featured" priority={true} />
                </MotionReveal>
              </div>
            )}

            {/* Case 2: Exactly 2 Projects -> Asymmetric Editorial Duo */}
            {count === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                <MotionReveal delay={0.1} className="lg:col-span-7 flex flex-col">
                  <ProjectCard project={activeProjects[0]} variant="featured" priority={true} className="w-full h-full" />
                </MotionReveal>
                <MotionReveal delay={0.2} className="lg:col-span-5 flex flex-col">
                  <ProjectCard project={activeProjects[1]} variant="standard" className="w-full h-full" />
                </MotionReveal>
              </div>
            )}

            {/* Case 3: Exactly 3 Projects -> Lead Showcase + Asymmetric Pair */}
            {count === 3 && (
              <div className="space-y-10 sm:space-y-12">
                {/* 1. Lead Project */}
                <MotionReveal delay={0.1}>
                  <ProjectCard project={activeProjects[0]} variant="featured" priority={true} />
                </MotionReveal>
                {/* 2. Asymmetric Secondary Duo */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                  <MotionReveal delay={0.15} className="lg:col-span-7 flex flex-col">
                    <ProjectCard project={activeProjects[1]} variant="standard" className="w-full h-full" />
                  </MotionReveal>
                  <MotionReveal delay={0.25} className="lg:col-span-5 flex flex-col">
                    <ProjectCard project={activeProjects[2]} variant="standard" className="w-full h-full" />
                  </MotionReveal>
                </div>
              </div>
            )}

            {/* Case 4: 4+ Projects -> Alternating Editorial Rhythm */}
            {count >= 4 && (
              <EditorialRhythmShowcase projects={activeProjects} />
            )}
          </div>
        ) : (
          /* Large Editorial Empty-State Exhibition */
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {/* 1. Opening Editorial Statement */}
            <div className="max-w-4xl mx-auto text-center">
              <MotionReveal delay={0.05}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/70 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase mb-6 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                  <span>THE EARTH HERITAGE APPROACH</span>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.15}>
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-[54px] text-[#111613] font-normal tracking-tight leading-[1.14]">
                  Land is more than a place.<br className="hidden sm:inline" />{' '}
                  <span className="text-[#1E460B] italic font-normal">
                    It is something to own, care for, and build with purpose.
                  </span>
                </h2>
              </MotionReveal>

              <MotionReveal delay={0.25}>
                <p className="mt-6 font-sans text-base sm:text-lg md:text-xl text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
                  Earth Heritage brings together land ownership, managed farmland, thoughtful farm care, and a long-term connection to nature and place.
                </p>
              </MotionReveal>
            </div>

            {/* 2. Asymmetric Editorial Exhibition Composition */}
            <div className="space-y-8 sm:space-y-10">
              {/* Row 1: Asymmetric Duo (7-col LAND + 5-col CARE) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-stretch">
                {/* Block 01 — LAND */}
                <MotionReveal delay={0.1} className="lg:col-span-7 flex flex-col">
                  <div className="group relative rounded-3xl bg-[#FAF6F0] border border-[#D5C09D] p-8 sm:p-12 lg:p-14 shadow-sm hover:shadow-md hover:border-[#1E460B]/40 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden">
                    {/* Abstract Topographic Geometry Accent */}
                    <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-25 select-none -z-0 translate-x-12 -translate-y-12">
                      <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <circle cx="160" cy="160" r="140" stroke="#1E460B" strokeWidth="1.5" strokeDasharray="6 6" />
                        <path d="M40,160 C90,80 230,80 280,160 C230,240 90,240 40,160 Z" stroke="#5E7748" strokeWidth="2" />
                        <circle cx="160" cy="160" r="80" stroke="#1E460B" strokeWidth="1.5" />
                        <circle cx="160" cy="160" r="24" fill="#1E460B" fillOpacity="0.15" />
                      </svg>
                    </div>

                    <div className="relative z-10 space-y-6">
                      <div className="flex items-baseline justify-between border-b border-[#DCCDB7]/70 pb-5">
                        <span className="font-mono text-xs font-semibold tracking-widest text-[#1E460B] uppercase">
                          01 — LAND
                        </span>
                        <span className="font-serif text-5xl sm:text-6xl text-[#1E460B]/20 font-light select-none">
                          01
                        </span>
                      </div>

                      <div className="space-y-4 max-w-xl">
                        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111613] font-normal tracking-tight">
                          Own the Land
                        </h3>
                        <p className="font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed">
                          You acquire and retain ownership of the farmland property.
                        </p>
                      </div>
                    </div>

                    <div className="relative z-10 pt-8 mt-8 border-t border-[#DCCDB7]/70">
                      <Link
                        href="/managed-farmland"
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-brand-dark text-[#FAF6F0] font-sans font-semibold text-xs sm:text-sm tracking-wide hover:bg-brand-primary transition-all duration-200 shadow-xs group/btn"
                      >
                        <span>Explore Managed Farmland</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </MotionReveal>

                {/* Block 02 — CARE */}
                <MotionReveal delay={0.2} className="lg:col-span-5 flex flex-col">
                  <div className="group relative rounded-3xl bg-[#FAF6F0] border border-[#D5C09D] p-8 sm:p-12 shadow-sm hover:shadow-md hover:border-[#1E460B]/40 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden">
                    {/* Subtle Organic Wave Accent */}
                    <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none opacity-20 select-none -z-0 translate-x-10 translate-y-10">
                      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M20,220 C60,140 180,140 220,220" stroke="#1E460B" strokeWidth="2" />
                        <path d="M40,230 C80,170 160,170 200,230" stroke="#5E7748" strokeWidth="1.5" strokeDasharray="4 4" />
                        <ellipse cx="120" cy="100" rx="90" ry="50" stroke="#1E460B" strokeWidth="1.2" strokeDasharray="6 6" />
                      </svg>
                    </div>

                    <div className="relative z-10 space-y-6">
                      <div className="flex items-baseline justify-between border-b border-[#DCCDB7]/70 pb-5">
                        <span className="font-mono text-xs font-semibold tracking-widest text-[#1E460B] uppercase">
                          02 — CARE
                        </span>
                        <span className="font-serif text-5xl sm:text-6xl text-[#1E460B]/20 font-light select-none">
                          02
                        </span>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111613] font-normal tracking-tight">
                          Care for the Farm
                        </h3>
                        <p className="font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed">
                          Earth Heritage manages agreed farm operations and coordinates the people and activities required to care for the farm.
                        </p>
                      </div>
                    </div>

                    <div className="relative z-10 pt-8 mt-8 border-t border-[#DCCDB7]/70">
                      <Link
                        href="/how-it-works"
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-surface border border-border text-text-primary font-sans font-medium text-xs sm:text-sm tracking-wide hover:bg-surface-subtle hover:border-border-strong transition-all duration-200 shadow-2xs group/btn"
                      >
                        <span>See How It Works</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </MotionReveal>
              </div>

              {/* Row 2: Wide Panoramic Statement Block (12-col PURPOSE) */}
              <MotionReveal delay={0.15}>
                <div className="relative rounded-3xl bg-[#FAF6F0] border border-[#D5C09D] p-8 sm:p-12 lg:p-14 shadow-sm overflow-hidden">
                  {/* Subtle Background Organic Motif */}
                  <div className="absolute -top-12 -right-12 w-96 h-96 pointer-events-none opacity-15 select-none -z-0">
                    <svg viewBox="0 0 380 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <circle cx="190" cy="190" r="170" stroke="#1E460B" strokeWidth="2" strokeDasharray="12 10" />
                      <circle cx="190" cy="190" r="120" stroke="#5E7748" strokeWidth="1.5" />
                      <circle cx="190" cy="190" r="70" stroke="#1E460B" strokeWidth="1" strokeDasharray="4 6" />
                    </svg>
                  </div>

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Column */}
                    <div className="lg:col-span-5 space-y-3">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs font-semibold tracking-widest text-[#1E460B] uppercase">
                          03 — PURPOSE
                        </span>
                        <span className="font-serif text-4xl sm:text-5xl text-[#1E460B]/20 font-light select-none">
                          03
                        </span>
                      </div>
                      <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111613] font-normal tracking-tight">
                        Build a Legacy
                      </h3>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-7 space-y-5 lg:border-l lg:border-[#DCCDB7]/70 lg:pl-10">
                      <p className="font-sans text-base sm:text-lg lg:text-xl text-[#38423A] font-normal leading-relaxed">
                        Our approach brings together land, nature, ownership, and ongoing care with a long-term sense of purpose.
                      </p>
                      <div className="pt-2">
                        <span className="font-mono text-xs tracking-widest uppercase text-[#5A685D] font-medium block">
                          BACK TO ROOTS. FORWARD WITH PURPOSE.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionReveal>
            </div>

            {/* 3. Subtle Project Profiles Status Notice */}
            <MotionReveal delay={0.2}>
              <div className="max-w-2xl mx-auto text-center pt-4">
                <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-6 py-4 rounded-2xl bg-surface/70 border border-[#D5C09D]/60 backdrop-blur-xs">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#1E460B] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D] animate-pulse" aria-hidden="true" />
                    <span>PROJECT PROFILES</span>
                  </div>
                  <span className="hidden sm:inline text-[#D5C09D]" aria-hidden="true">|</span>
                  <p className="text-xs sm:text-sm font-sans text-text-secondary">
                    Project stories will be shared here as Earth Heritage initiatives are ready to be officially presented.
                  </p>
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
 * Editorial Rhythm Showcase for 4+ Projects
 * Groups items into alternating Featured showcases and Asymmetric pairs
 */
function EditorialRhythmShowcase({ projects }) {
  const sections = [];
  let i = 0;
  let cycle = 0;

  while (i < projects.length) {
    const remaining = projects.length - i;
    
    // Check if we should render a featured item or a pair
    if (cycle % 2 === 0 || remaining === 1) {
      // Single featured item
      const project = projects[i];
      const isReversed = Math.floor(cycle / 2) % 2 === 1;
      sections.push(
        <MotionReveal key={project.slug || `proj-${i}`} delay={0.1}>
          <ProjectCard
            project={project}
            variant={isReversed ? 'reversed' : 'featured'}
            priority={i === 0}
          />
        </MotionReveal>
      );
      i += 1;
    } else {
      // Asymmetric pair (2 items)
      const p1 = projects[i];
      const p2 = projects[i + 1];
      const isEvenPair = Math.floor(cycle / 2) % 2 === 0;
      const col1 = isEvenPair ? 'lg:col-span-7' : 'lg:col-span-5';
      const col2 = isEvenPair ? 'lg:col-span-5' : 'lg:col-span-7';

      sections.push(
        <div key={`pair-${i}`} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <MotionReveal delay={0.1} className={`${col1} flex flex-col`}>
            <ProjectCard project={p1} variant="standard" className="w-full h-full" />
          </MotionReveal>
          <MotionReveal delay={0.2} className={`${col2} flex flex-col`}>
            <ProjectCard project={p2} variant="standard" className="w-full h-full" />
          </MotionReveal>
        </div>
      );
      i += 2;
    }
    cycle += 1;
  }

  return <div className="space-y-12 sm:space-y-16 lg:space-y-20">{sections}</div>;
}
