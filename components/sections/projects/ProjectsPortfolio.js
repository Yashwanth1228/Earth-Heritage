'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { projects, PROJECT_STATUS_CATEGORIES } from '@/data/projects';
import ProjectCard from '@/components/projects/ProjectCard';
import { cn } from '@/lib/utils';

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
export default function ProjectsPortfolio({ projects: propProjects, initialStatus = 'all' } = {}) {
  const activeProjects = Array.isArray(propProjects) ? propProjects : projects;
  const [selectedFilter, setSelectedFilter] = useState(initialStatus);

  const filteredProjects = selectedFilter === 'all'
    ? activeProjects
    : activeProjects.filter((p) => String(p.status || '').toLowerCase() === selectedFilter.toLowerCase());

  const hasProjects = filteredProjects && filteredProjects.length > 0;
  const featuredProject = hasProjects ? filteredProjects[0] : null;
  const supportingProjects = hasProjects && filteredProjects.length > 1 ? filteredProjects.slice(1) : [];

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
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-12">
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-sans font-medium transition-all duration-200 cursor-pointer',
              selectedFilter === 'all'
                ? 'bg-[#15341C] text-[#FAF7F2] font-semibold shadow-xs'
                : 'bg-white hover:bg-[#F5EFE6] text-[#4E5C50] border border-[#D5C09D]/80 shadow-2xs'
            )}
          >
            All Projects ({activeProjects.length})
          </button>

          {PROJECT_STATUS_CATEGORIES.map((cat) => {
            const count = activeProjects.filter(
              (p) => String(p.status || '').toLowerCase() === cat.key
            ).length;
            const isSelected = selectedFilter === cat.key;

            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedFilter(cat.key)}
                className={cn(
                  'px-4 py-2 rounded-full text-xs font-sans font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5',
                  isSelected
                    ? 'bg-[#15341C] text-[#FAF7F2] font-semibold shadow-xs'
                    : 'bg-white hover:bg-[#F5EFE6] text-[#4E5C50] border border-[#D5C09D]/80 shadow-2xs'
                )}
              >
                <span>{cat.label}</span>
                <span className={cn('text-[10px] font-mono', isSelected ? 'text-[#55C40D]' : 'opacity-60')}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

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
        ) : null}
      </Container>
    </section>
  );
}
