'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { galleryProjects } from '@/data/galleryImages';
import { Maximize2, ArrowLeft, ArrowRight, Camera, MapPin, Grid } from 'lucide-react';

/**
 * Section 2 — Project-Categorized Photographic Exhibition (/gallery)
 * 
 * Flow:
 * 1. Default/Overview Mode (selectedProjectId === null):
 *    - Showcases each Earth Heritage project by its primary main image card
 *    - Badges for project number, category, location, and verified photograph count
 *    - Direct click on any project card (or tab) opens that project's photo gallery
 * 
 * 2. Project Photo Mode (selectedProjectId === 'nairuthya-whispering-wood' | 'coconut-garden'):
 *    - Contextual header with "← Back to All Projects" and project tabs
 *    - Responsive equal-sized 4:3 photographic grid for that project's verified photos
 *    - Accessible keyboard triggers & hover overlays
 *    - Fullscreen lightbox trigger with project-scoped photo sequencing
 *    - Seamless switcher to jump between projects
 */
export default function GalleryExhibition({
  selectedProjectId = null,
  onSelectProject,
  onSelectImage
}) {
  const scrollToGrid = useCallback(() => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('exhibition-grid');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  const handleSelectProject = useCallback(
    (projectId) => {
      if (onSelectProject) {
        onSelectProject(projectId);
      }
      scrollToGrid();
    },
    [onSelectProject, scrollToGrid]
  );

  const handleBackToAll = useCallback(() => {
    if (onSelectProject) {
      onSelectProject(null);
    }
    scrollToGrid();
  }, [onSelectProject, scrollToGrid]);

  const activeProject = selectedProjectId
    ? galleryProjects.find((p) => p.id === selectedProjectId) || null
    : null;

  const currentProjectIndex = activeProject
    ? galleryProjects.findIndex((p) => p.id === activeProject.id)
    : -1;
  const nextProject =
    currentProjectIndex >= 0
      ? galleryProjects[(currentProjectIndex + 1) % galleryProjects.length]
      : null;

  return (
    <section
      id="exhibition-grid"
      className="relative bg-[#FAF6F0] py-14 sm:py-20 lg:py-24 overflow-hidden scroll-mt-20"
      aria-label="Photographic Exhibition Grid"
    >
      {/* Background Subtle Organic Topography */}
      <LandContourPattern variant="biscuit-topography" className="opacity-70" />

      <Container size="default" className="relative z-10">
        {/* 1. Main Navigation & Project Switcher Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 sm:pb-12 border-b border-[#E4D1B5]">
          <div>
            <span className="font-mono text-xs font-semibold text-[#1E460B] tracking-widest uppercase block mb-1">
              Curated Series
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111613] font-normal tracking-tight">
              {activeProject ? activeProject.name : 'Exhibition by Project'}
            </h2>
          </div>

          {/* Interactive Project Switcher Tabs */}
          <nav
            aria-label="Gallery project categories"
            className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none"
          >
            {/* All Projects Tab */}
            <button
              type="button"
              onClick={() => handleSelectProject(null)}
              aria-pressed={selectedProjectId === null}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 shrink-0 select-none focus:outline-hidden focus:ring-2 focus:ring-[#1E460B] ${
                selectedProjectId === null
                  ? 'bg-[#1E460B] text-[#FAF6F0] shadow-sm'
                  : 'bg-[#EBDDC8]/70 hover:bg-[#DECAB0] text-[#2B352E]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>All Projects</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  selectedProjectId === null
                    ? 'bg-white/20 text-white'
                    : 'bg-black/5 text-[#5A655D]'
                }`}
              >
                {galleryProjects.length}
              </span>
            </button>

            {/* Individual Project Tabs */}
            {galleryProjects.map((project) => {
              const isActive = selectedProjectId === project.id;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => handleSelectProject(project.id)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 shrink-0 select-none focus:outline-hidden focus:ring-2 focus:ring-[#1E460B] ${
                    isActive
                      ? 'bg-[#1E460B] text-[#FAF6F0] shadow-sm'
                      : 'bg-[#EBDDC8]/70 hover:bg-[#DECAB0] text-[#2B352E]'
                  }`}
                >
                  <span>{project.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-black/5 text-[#5A655D]'
                    }`}
                  >
                    {project.images.length}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ---------------------------------------------------- */}
        {/* VIEW A: PROJECT MAIN IMAGES OVERVIEW (Default)        */}
        {/* ---------------------------------------------------- */}
        {activeProject === null ? (
          <div className="mt-10 sm:mt-14">
            <MotionReveal delay={0.05}>
              <div className="mb-8 max-w-2xl">
                <p className="font-sans text-sm sm:text-base text-[#38423A] font-normal leading-relaxed">
                  Select a project below to explore its on-ground photography, landscape architecture, and agrarian features.
                </p>
              </div>
            </MotionReveal>

            {/* Two-Column Project Exhibition Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {galleryProjects.map((project, index) => (
                <MotionReveal key={project.id} delay={index * 0.1}>
                  <article
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelectProject(project.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectProject(project.id);
                      }
                    }}
                    aria-label={`View gallery for ${project.name}`}
                    className="group relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-[#E4D1B5] border border-[#D5C09D] shadow-[0_12px_40px_rgba(17,22,19,0.08)] hover:shadow-[0_24px_60px_rgba(17,22,19,0.18)] cursor-pointer transition-all duration-500 focus:outline-hidden focus:ring-2 focus:ring-[#1E460B]"
                  >
                    {/* Project Main Cover Image */}
                    <Image
                      src={project.coverImage.src}
                      alt={project.coverImage.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay for Editorial Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090D0A]/95 via-[#090D0A]/40 to-black/25 group-hover:via-[#090D0A]/50 transition-all duration-300" />

                    {/* Top Badges Bar */}
                    <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between pointer-events-none z-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111613]/70 backdrop-blur-md border border-white/20 text-xs font-mono font-semibold tracking-wider text-[#FAF6F0]">
                        <span>{project.number}</span>
                        <span className="text-[#55C40D]">·</span>
                        <span className="uppercase">{project.category}</span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-mono tracking-wider text-[#FAF6F0]">
                        <Camera className="w-3.5 h-3.5 text-[#55C40D]" />
                        <span>{project.images.length} Photos</span>
                      </div>
                    </div>

                    {/* Bottom Editorial Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white z-10">
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D5C09D] uppercase tracking-widest mb-2">
                        <MapPin className="w-3.5 h-3.5 text-[#55C40D]" />
                        <span>{project.location}</span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#FAF6F0] tracking-tight leading-tight group-hover:text-white transition-colors">
                        {project.name}
                      </h3>

                      <p className="mt-2 font-sans text-xs sm:text-sm text-[#FAF6F0]/80 font-light line-clamp-1">
                        {project.tagline}
                      </p>

                      <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E460B] group-hover:bg-[#2A5E10] text-[#FAF6F0] text-xs font-mono font-medium tracking-wider shadow-sm transition-all duration-300 transform group-hover:translate-x-1">
                        <span>Explore Project Gallery</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#55C40D] transform group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </article>
                </MotionReveal>
              ))}
            </div>
          </div>
        ) : (
          /* ---------------------------------------------------- */
          /* VIEW B: SELECTED PROJECT PHOTO GALLERY                */
          /* ---------------------------------------------------- */
          <div className="mt-8 sm:mt-10">
            {/* Top Back Action & Project Meta Banner */}
            <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl bg-[#EBDDC8]/60 border border-[#D5C09D]">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleBackToAll}
                  aria-label="Back to all projects overview"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF6F0] hover:bg-[#1E460B] hover:text-[#FAF6F0] text-[#111613] text-xs font-mono font-semibold tracking-wider transition-all duration-300 border border-[#D5C09D] shadow-2xs group cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform text-[#1E460B] group-hover:text-[#55C40D]" />
                  <span>Back to All Projects</span>
                </button>

                <div className="hidden sm:block h-6 w-px bg-[#D5C09D]" />

                <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#38423A]">
                  <MapPin className="w-3.5 h-3.5 text-[#1E460B]" />
                  <span>{activeProject.location}</span>
                  <span>·</span>
                  <span>{activeProject.tagline}</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#1E460B] font-semibold">
                <Camera className="w-3.5 h-3.5 text-[#55C40D]" />
                <span>Showing all {activeProject.images.length} photographs</span>
              </div>
            </div>

            {/* Responsive 3-Column Photographic Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {activeProject.images.map((item, index) => (
                <MotionReveal
                  key={item.id}
                  delay={(index % 3) * 0.08}
                  className="col-span-1"
                >
                  <article
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectImage && onSelectImage(item, activeProject.images)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectImage && onSelectImage(item, activeProject.images);
                      }
                    }}
                    aria-label={`View photograph: ${item.title}`}
                    className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#E4D1B5] border border-[#D5C09D] shadow-[0_8px_30px_rgba(17,22,19,0.06)] hover:shadow-[0_16px_40px_rgba(17,22,19,0.14)] cursor-pointer transition-all duration-500 focus:outline-hidden focus:ring-2 focus:ring-[#1E460B]"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay for Caption Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0C]/85 via-[#0B0F0C]/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                    {/* Category Stamp (Top Left) */}
                    <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-[#111613]/70 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-widest text-[#E4D1B5] uppercase">
                      {item.category}
                    </div>

                    {/* Expand Indicator (Top Right) */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>

                    {/* Caption Overlay (Bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-serif text-lg sm:text-xl font-normal tracking-tight text-[#FAF6F0] leading-snug drop-shadow-xs">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs text-[#FAF6F0]/75 line-clamp-1 mt-1 font-light">
                        {item.description || item.alt}
                      </p>
                    </div>
                  </article>
                </MotionReveal>
              ))}
            </div>

            {/* Bottom Project Switcher & Back Control */}
            <div className="mt-12 sm:mt-16 pt-8 border-t border-[#E4D1B5] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleBackToAll}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF6F0] hover:bg-[#1E460B] hover:text-[#FAF6F0] text-[#111613] text-xs font-mono font-semibold tracking-wider transition-all duration-300 border border-[#D5C09D] shadow-2xs group cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform text-[#1E460B] group-hover:text-[#55C40D]" />
                <span>Back to All Projects Overview</span>
              </button>

              {nextProject && (
                <button
                  type="button"
                  onClick={() => handleSelectProject(nextProject.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E460B] hover:bg-[#2A5E10] text-[#FAF6F0] text-xs font-mono font-medium tracking-wider shadow-sm transition-all duration-300 transform hover:translate-x-1 cursor-pointer"
                >
                  <span>Next Gallery: {nextProject.name} ({nextProject.images.length} Photos)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#55C40D] transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
