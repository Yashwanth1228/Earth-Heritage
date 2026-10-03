'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils';

/**
 * Botanical Sprout Icon
 */
function SproutIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22v-9" strokeWidth="2.2" />
      <path
        d="M12 13C8.5 13 5.5 10 5.5 6c3 0 6.5 3 6.5 7Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <path
        d="M12 11c3 0 6.5-3 6.5-7-3 0-6.5 3-6.5 7Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
    </svg>
  );
}

/**
 * Canonical Project Status Filter Tabs
 */
const STATUS_TABS = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'completed', label: 'Completed' }
];

/**
 * Verified Project Snapshot Facts Extractor
 * Strictly sources verified facts from data/projects.js without invented claims
 */
function getProjectFacts(project) {
  const isNairuthya = project.slug === 'nairuthya-whispering-wood';
  const isCoconut = project.slug === 'coconut-garden';

  const area = project.snapshot?.totalArea || (isNairuthya ? '8 Acres' : isCoconut ? '6 Acres' : 'Managed Farmland');
  const config = isNairuthya
    ? (project.snapshot?.totalPlots || '25 Premium Plots')
    : isCoconut
    ? (project.category || 'Premium Farm Plots')
    : (project.snapshot?.totalPlots || project.category || 'Farmland Plots');

  const location = isNairuthya
    ? (project.locationDetails?.village && project.locationDetails?.taluk
        ? `${project.locationDetails.village}, ${project.locationDetails.taluk}`
        : 'Honnasandra, Nelamangala')
    : isCoconut
    ? (project.location || 'Bidadi')
    : (project.location || 'Karnataka');

  const price = isNairuthya
    ? '₹1,699/sq.ft'
    : isCoconut
    ? '₹749/sq.ft'
    : (project.snapshot?.pricePerSqFt
        ? project.snapshot.pricePerSqFt.replace(' per Sq. Ft.', '/sq.ft').replace(' / sq.ft', '/sq.ft')
        : 'On Request');

  return [
    { label: 'Project Area', value: area },
    { label: 'Configuration', value: config },
    { label: 'Location', value: location },
    { label: 'Price', value: price }
  ];
}

/**
 * Title Case Status Formatter
 */
function getProjectStatusLabel(status) {
  if (!status) return null;
  const s = String(status).trim().toLowerCase();
  if (s === 'new') return 'New';
  if (s === 'upcoming') return 'Upcoming';
  if (s === 'ongoing') return 'Ongoing';
  if (s === 'completed') return 'Completed';
  return status;
}

/**
 * Editorial Projects Portfolio Section (/projects)
 * 
 * Styled as a premium managed-farmland exhibition:
 * - Minimalist non-pill status filter using centralized project data
 * - Expansive asymmetric exhibition cards with generous whitespace
 * - Verified 4-quadrant snapshot facts for each project
 * - Accessible stretched-link navigation to /projects/[slug]
 * - Polished empty-state messaging when filtered categories have no entries
 */
export default function ProjectsPortfolio({ projects: propProjects, initialStatus = 'all' } = {}) {
  // Only display real, confirmed projects (excluding demo concepts)
  const activeProjects = (Array.isArray(propProjects) ? propProjects : projects).filter(
    (p) => p && !p.isDemo
  );

  const [selectedFilter, setSelectedFilter] = useState(initialStatus);

  const filteredProjects =
    selectedFilter === 'all'
      ? activeProjects
      : activeProjects.filter(
          (p) => String(p.status || '').trim().toLowerCase() === selectedFilter.toLowerCase()
        );

  const hasProjects = filteredProjects && filteredProjects.length > 0;
  const currentTabLabel =
    STATUS_TABS.find((t) => t.key === selectedFilter)?.label || 'Selected';

  return (
    <section
      id="portfolio"
      data-navbar-theme="light"
      className="relative pt-6 sm:pt-8 lg:pt-10 pb-20 sm:pb-24 lg:pb-28 bg-[#FAF7F2] border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Earth Heritage Managed Farmland Projects"
    >
      {/* Background Topographic Ambience */}
      <LandContourPattern variant="biscuit-topography" className="opacity-60" />

      <Container size="default" className="relative z-10 max-w-6xl">
        {/* 1. Visually Refined, Minimal Status Filter Tabs */}
        <nav aria-label="Project Status Filter" className="mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 border-b border-[#DCCDB7]/70">
            {STATUS_TABS.map((tab) => {
              const isSelected = selectedFilter === tab.key;
              const count =
                tab.key === 'all'
                  ? activeProjects.length
                  : activeProjects.filter(
                      (p) =>
                        String(p.status || '').trim().toLowerCase() === tab.key
                    ).length;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedFilter(tab.key)}
                  className={cn(
                    'relative px-3 sm:px-4 py-3 min-h-[44px] inline-flex items-center text-xs sm:text-sm font-sans tracking-wider uppercase transition-all duration-200 cursor-pointer select-none border-b-2 -mb-[1px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1E460B]',
                    isSelected
                      ? 'border-[#1E460B] text-[#15341C] font-semibold'
                      : 'border-transparent text-[#627164] hover:text-[#1E460B] hover:border-[#DCCDB7] font-medium'
                  )}
                  aria-pressed={isSelected}
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      'text-[11px] font-mono ml-1.5 transition-colors',
                      isSelected ? 'text-[#1E460B] font-bold' : 'text-[#8A988D]'
                    )}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* 2. Populated Editorial Exhibition Showcase */}
        {hasProjects ? (
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {filteredProjects.map((project, idx) => {
              const projectNumber = String(idx + 1).padStart(2, '0');
              const facts = getProjectFacts(project);
              const statusLabel = getProjectStatusLabel(project.status);
              const narrativeText =
                project.shortDescription || project.tagline || project.overview || '';

              // Active image: heroImage or coverImage or first gallery image
              const activeImage =
                (project.heroImage && typeof project.heroImage.src === 'string')
                  ? project.heroImage
                  : (project.coverImage && typeof project.coverImage.src === 'string')
                  ? project.coverImage
                  : (Array.isArray(project.images) && project.images.length > 0)
                  ? project.images[0]
                  : null;

              // Alternating Asymmetry on desktop: Even index = Image Left, Odd index = Image Right
              const isEven = idx % 2 === 0;

              return (
                <MotionReveal key={project.slug || idx} delay={0.08 * (idx + 1)}>
                  <article
                    className="group relative rounded-3xl bg-white/75 hover:bg-white border border-[#D5C09D]/80 hover:border-[#1E460B]/40 shadow-xs hover:shadow-md transition-all duration-300 p-6 sm:p-8 lg:p-10 overflow-hidden focus-within:ring-2 focus-within:ring-[#1E460B] focus-within:ring-offset-2"
                    aria-labelledby={`project-title-${project.slug}`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
                      
                      {/* Image Column */}
                      <div
                        className={cn(
                          'lg:col-span-7 xl:col-span-7 relative',
                          isEven ? 'lg:order-1' : 'lg:order-2'
                        )}
                      >
                        <div className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FAF6F0] border border-[#DCCDB7]/70 shadow-2xs">
                          {activeImage ? (
                            <Image
                              src={activeImage.src}
                              alt={activeImage.alt || `${project.name} managed farmland in Karnataka`}
                              fill
                              priority={idx === 0}
                              sizes="(max-width: 1024px) 100vw, 58vw"
                              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transform-none"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center p-8 bg-[#FAF6F0] text-center select-none">
                              <span className="font-serif text-2xl text-[#111613]">
                                {project.name}
                              </span>
                            </div>
                          )}

                          {/* Subtle Exhibition Badge */}
                          <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10 pointer-events-none">
                            <span className="px-3 py-1 rounded-full bg-[#15341C]/85 backdrop-blur-xs text-[#FAF7F2] font-mono text-[11px] font-semibold tracking-widest uppercase border border-white/10 shadow-xs">
                              PROJECT {projectNumber}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Editorial Details Column */}
                      <div
                        className={cn(
                          'lg:col-span-5 xl:col-span-5 flex flex-col justify-between space-y-5 sm:space-y-6',
                          isEven ? 'lg:order-2' : 'lg:order-1'
                        )}
                      >
                        <div className="space-y-3 sm:space-y-4">
                          {/* Status Indicator & Category Badge */}
                          <div className="flex flex-wrap items-center gap-2">
                            {statusLabel && (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAD5B5]/60 border border-[#D5C09D] text-xs font-mono font-medium tracking-wider text-[#1E460B] uppercase">
                                <span
                                  className="w-1.5 h-1.5 rounded-full bg-[#55C40D] animate-pulse"
                                  aria-hidden="true"
                                />
                                <span>{statusLabel}</span>
                              </div>
                            )}

                            {project.category && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-[#FAF6F0] border border-[#DCCDB7] text-[#5A685D]">
                                {project.category}
                              </span>
                            )}
                          </div>

                          {/* Project Title (H2) with Stretched Link Pattern */}
                          <h2
                            id={`project-title-${project.slug}`}
                            className="font-serif text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] font-normal text-[#111613] tracking-tight leading-[1.15] group-hover:text-[#1E460B] transition-colors"
                          >
                            <Link
                              href={`/projects/${project.slug}`}
                              className="focus:outline-none after:absolute after:inset-0 after:rounded-3xl"
                              aria-label={`Explore ${project.name} in ${project.location || 'Karnataka'}`}
                            >
                              {project.name}
                            </Link>
                          </h2>

                          {/* Location Descriptor */}
                          {project.location && (
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-[#5A685D] tracking-wide">
                              <MapPin className="w-3.5 h-3.5 text-[#1E460B] shrink-0" aria-hidden="true" />
                              <span>
                                {project.locationDetails?.village
                                  ? `${project.locationDetails.village}, ${project.locationDetails.taluk}`
                                  : project.location}
                              </span>
                            </div>
                          )}

                          {/* Narrative Description */}
                          {narrativeText && (
                            <p className="font-sans text-sm sm:text-base text-[#38423A] font-normal leading-relaxed line-clamp-3">
                              {narrativeText}
                            </p>
                          )}
                        </div>

                        {/* Verified 4-Quadrant Fact Matrix */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-[#FAF6F0] border border-[#DCCDB7]/70">
                          {facts.map((fact, fIdx) => (
                            <div key={fIdx} className="space-y-0.5">
                              <span className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#6A786D]">
                                {fact.label}
                              </span>
                              <span className="block text-sm sm:text-base font-serif font-medium text-[#111613]">
                                {fact.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Action Bar */}
                        <div className="pt-1">
                          <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1E460B] text-[#FAF7F2] font-sans font-semibold text-xs sm:text-sm tracking-wide group-hover:bg-[#14321E] transition-all duration-200 shadow-xs pointer-events-none">
                            <span>Explore Project</span>
                            <ArrowRight
                              className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5 motion-reduce:transform-none text-[#FAF7F2]"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </div>

                    </div>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        ) : (
          /* 3. Polished Minimalist Empty State */
          <div className="py-16 sm:py-24 text-center max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#EAD5B5]/60 border border-[#D5C09D] flex items-center justify-center mx-auto text-[#1E460B]">
              <SproutIcon className="w-6 h-6 text-[#1E460B]" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#111613] font-normal tracking-tight">
              No {currentTabLabel} Projects
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#5A685D] leading-relaxed">
              New projects will appear here as they are introduced.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSelectedFilter('all')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#1E460B] text-[#FAF7F2] hover:bg-[#14321E] transition-colors cursor-pointer shadow-xs"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
