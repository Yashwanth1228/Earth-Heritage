'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/projects/ProjectCard';

/**
 * Editorial Projects Portfolio Section
 * 
 * Implements a premium editorial project hierarchy:
 * - Project 01: Large Featured Project (Dominant 12-col exhibition layout)
 * - Project 02 & 03: Smaller Supporting Projects in a clean 2-column layout
 * 
 * Logic:
 * - if projects.length === 0: Preserves approved production Empty-State exhibition
 * - if projects.length === 1: Grand Featured Exhibition only
 * - if projects.length >= 2: First project = featured, remaining projects = supporting grid
 */
export default function ProjectsPortfolio({ projects: propProjects } = {}) {
  const activeProjects = Array.isArray(propProjects) ? propProjects : projects;
  const hasProjects = activeProjects && activeProjects.length > 0;
  const count = activeProjects ? activeProjects.length : 0;

  const featuredProject = hasProjects ? activeProjects[0] : null;
  const supportingProjects = hasProjects && activeProjects.length > 1 ? activeProjects.slice(1) : [];

  return (
    <section
      id="portfolio"
      data-navbar-theme="light"
      className="relative pt-6 sm:pt-8 lg:pt-10 pb-16 sm:pb-20 lg:pb-24 bg-[#FAF7F2] border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Earth Heritage Project Portfolio"
    >
      {/* Background Topographic Ambience */}
      <LandContourPattern variant="biscuit-topography" className="opacity-70" />

      <Container size="default" className="relative z-10">
        {hasProjects ? (
          /* Populated Editorial Showcase: Featured + Supporting Hierarchy */
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {/* 1. Large Featured Project (Project 01) */}
            {featuredProject && (
              <div className="space-y-4">
                <MotionReveal delay={0.08}>
                  <ProjectCard
                    project={featuredProject}
                    variant="featured"
                    priority={true}
                    index="01"
                  />
                </MotionReveal>
              </div>
            )}

            {/* 2. Supporting Projects Section (Project 02, Project 03, etc.) */}
            {supportingProjects.length > 0 && (
              <div className="pt-10 sm:pt-14 lg:pt-16 border-t border-[#DCCDB7]/80 space-y-8 sm:space-y-10">
                {/* Supporting Section Eyebrow / Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#DCCDB7]/60">
                  <div className="space-y-2">
                    <MotionReveal delay={0.1}>
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/60 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                        <span>PROJECT PREVIEWS</span>
                      </div>
                    </MotionReveal>
                    <MotionReveal delay={0.15}>
                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111613] font-normal tracking-tight">
                        Other Project Previews
                      </h2>
                    </MotionReveal>
                  </div>
                  <MotionReveal delay={0.2}>
                    <p className="font-sans text-xs sm:text-sm text-[#5A685D] max-w-md">
                      Concept explorations demonstrating how Earth Heritage project stories, land care, and managed farmland are presented.
                    </p>
                  </MotionReveal>
                </div>

                {/* Two-Column Supporting Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
                  {supportingProjects.map((project, idx) => (
                    <MotionReveal
                      key={project.slug || `supporting-${idx}`}
                      delay={0.1 * (idx + 1)}
                      className="h-full"
                    >
                      <ProjectCard
                        project={project}
                        variant="standard"
                        index={String(idx + 2).padStart(2, '0')}
                        className="w-full h-full"
                      />
                    </MotionReveal>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Monumental Editorial Brand-Story Exhibition: PROJECTS · 2026 COMING SOON */
          <div className="space-y-12 sm:space-y-16">
            <MotionReveal delay={0.08}>
              <div className="relative rounded-3xl bg-[#102B17] border border-[#2B4E2E]/60 overflow-hidden shadow-2xl">
                {/* Subtle Authentic Land Photography Texture */}
                <div className="absolute inset-0 -z-0 opacity-20 mix-blend-luminosity pointer-events-none">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('/images/landing/statement-landscape.jpg')` }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#102B17]/90 via-[#102B17]/70 to-[#102B17]" />
                </div>

                {/* Restrained Organic Contour-Line Detail */}
                <div className="absolute inset-0 pointer-events-none opacity-20 -z-0 select-none">
                  <svg viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
                    <path d="M-100,500 C300,320 700,580 1300,280" stroke="#55C40D" strokeWidth="1.5" strokeDasharray="6 6" />
                    <path d="M-50,560 C350,380 750,620 1350,340" stroke="#FAF7F2" strokeWidth="1" strokeDasharray="3 5" />
                    <path d="M0,420 C400,240 800,480 1400,200" stroke="#F8C32C" strokeWidth="1.2" strokeOpacity="0.4" />
                    <ellipse cx="600" cy="300" rx="420" ry="180" stroke="#FAF7F2" strokeWidth="0.8" strokeDasharray="4 8" strokeOpacity="0.25" />
                  </svg>
                </div>

                <div className="relative z-10 p-6 sm:p-12 lg:p-16 flex flex-col justify-between min-h-[460px] sm:min-h-[520px]">
                  {/* Top Meta Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 sm:pb-12 border-b border-white/10">
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm self-start">
                      <span className="w-2 h-2 rounded-full bg-[#55C40D] animate-pulse" aria-hidden="true" />
                      <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#FAF7F2] uppercase">
                        PROJECTS &middot; 2026
                      </span>
                    </div>

                    <span className="font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase text-white/50 font-medium">
                      EARTH HERITAGE DEVELOPMENTS
                    </span>
                  </div>

                  {/* Centerpiece Display: Large COMING SOON Typography */}
                  <div className="my-auto py-10 sm:py-14 text-center max-w-3xl mx-auto space-y-6">
                    <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-normal tracking-tight text-[#FAF7F2] leading-none select-none">
                      <span className="block">COMING</span>
                      <span className="block italic text-[#F8C32C] font-normal mt-1 sm:mt-2">
                        SOON
                      </span>
                    </h2>

                    <p className="font-sans text-base sm:text-lg md:text-xl text-[#FAF7F2]/85 font-normal leading-relaxed max-w-xl mx-auto">
                      We are preparing the first Earth Heritage developments. Details will be shared as each project takes shape.
                    </p>
                  </div>

                  {/* Bottom Three Foundational Pillars */}
                  <div className="pt-8 sm:pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
                    <div className="space-y-1.5">
                      <span className="font-mono text-[11px] tracking-widest text-[#F8C32C] uppercase font-semibold">
                        01 &middot; OWNERSHIP
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl text-[#FAF7F2] font-normal">
                        Titled Farmland Ownership
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#FAF7F2]/65 leading-relaxed">
                        Direct, registered legal ownership of the farmland property for every family.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-mono text-[11px] tracking-widest text-[#F8C32C] uppercase font-semibold">
                        02 &middot; STEWARDSHIP
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl text-[#FAF7F2] font-normal">
                        Professional Farm Care
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#FAF7F2]/65 leading-relaxed">
                        Comprehensive agrarian oversight, living soil health, and ongoing maintenance.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-mono text-[11px] tracking-widest text-[#F8C32C] uppercase font-semibold">
                        03 &middot; LEGACY
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl text-[#FAF7F2] font-normal">
                        Multi-Generational Roots
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#FAF7F2]/65 leading-relaxed">
                        Grounded in ecological responsibility, mindful community, and enduring pride.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>
        )}
      </Container>
    </section>
  );
}
