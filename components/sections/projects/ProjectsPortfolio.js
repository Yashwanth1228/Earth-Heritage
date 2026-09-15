'use client';

import Link from 'next/link';
import { ArrowRight, Compass, Sprout, ShieldCheck } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/projects/ProjectCard';

/**
 * Projects Portfolio Section
 * 
 * If projects exist, renders a responsive catalog grid of ProjectCard components.
 * If projects array is empty, gracefully presents a refined, professional portfolio status.
 */
export default function ProjectsPortfolio() {
  const hasProjects = projects && projects.length > 0;

  return (
    <section
      id="portfolio"
      className="relative py-16 sm:py-24 bg-[#EAD5B5]/30 border-b border-[#DCCDB7]"
      aria-label="Earth Heritage Project Portfolio"
    >
      <Container size="default">
        {hasProjects ? (
          /* Populated Projects Grid (for future confirmed projects) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          /* Tasteful Coming-Soon / Portfolio Taking Shape State */
          <div className="max-w-3xl mx-auto">
            <MotionReveal delay={0.1}>
              <div className="bg-surface/90 backdrop-blur-sm border border-[#D5C09D] rounded-3xl p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
                
                {/* Decorative Topographic Accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#163A20]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/70 border border-[#D5C09D] text-xs font-mono font-semibold tracking-wider text-[#1E460B] uppercase mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D] animate-pulse" aria-hidden="true" />
                  <span>PORTFOLIO STATUS</span>
                </div>

                {/* Main Heading */}
                <h2 className="font-serif text-2xl sm:text-4xl text-text-primary font-normal tracking-tight mb-4">
                  Our project portfolio is taking shape.
                </h2>

                {/* Supporting Copy */}
                <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto mb-8">
                  More Earth Heritage projects will be introduced here as they become ready to share.
                </p>

                {/* Editorial Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left my-8 pt-6 border-t border-border-subtle">
                  <div className="p-4 rounded-2xl bg-surface-subtle border border-border-subtle space-y-2">
                    <div className="w-8 h-8 rounded-full bg-[#163A20]/10 flex items-center justify-center text-brand-primary">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h3 className="font-sans font-semibold text-sm text-text-primary">Titled Land</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">Clear registered ownership held directly in your name.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-subtle border border-border-subtle space-y-2">
                    <div className="w-8 h-8 rounded-full bg-[#163A20]/10 flex items-center justify-center text-brand-primary">
                      <Sprout className="w-4 h-4" />
                    </div>
                    <h3 className="font-sans font-semibold text-sm text-text-primary">Active Care</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">Comprehensive agronomic management and ongoing maintenance.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-subtle border border-border-subtle space-y-2">
                    <div className="w-8 h-8 rounded-full bg-[#163A20]/10 flex items-center justify-center text-brand-primary">
                      <Compass className="w-4 h-4" />
                    </div>
                    <h3 className="font-sans font-semibold text-sm text-text-primary">Enduring Value</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">Agricultural living assets built for generational continuity.</p>
                  </div>
                </div>

                {/* Explore Links */}
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
