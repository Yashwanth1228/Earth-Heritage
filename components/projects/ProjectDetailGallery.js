'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';

/**
 * Editorial Gallery Section for Project Detail
 * 
 * Strict Standards:
 * - Renders ONLY when verified project gallery photography is supplied
 * - If data is absent, returns null cleanly without empty placeholders
 * - Alternating warm biscuit tone (#F0E0C6)
 * - Authentic photography only; Next/Image responsive sizing
 */
export default function ProjectDetailGallery({ project }) {
  if (!project) return null;

  // Use gallery array, or images slice beyond the hero image
  const galleryItems = project.gallery || (project.images && project.images.length > 1 ? project.images.slice(1) : []);

  if (!galleryItems || galleryItems.length === 0) {
    return null;
  }

  return (
    <section
      id="project-gallery"
      data-navbar-theme="light"
      className="relative py-16 sm:py-24 bg-[#F0E0C6] text-[#111613] border-b border-[#DCCDB7]"
      aria-label="Project Visual Gallery"
    >
      <Container size="default">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>VISUAL DOCUMENTATION</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#111613] font-normal tracking-tight">
              Landscapes &amp; Cultivation
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.25}>
            <p className="font-sans text-base sm:text-lg text-[#38423A] leading-relaxed">
              Curated field photography showcasing the authentic environment and development of {project.name}.
            </p>
          </MotionReveal>
        </div>

        {/* Editorial Photo Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {galleryItems.map((item, index) => {
            // Editorial rhythm: alternate wide (7 cols) and tall/standard (5 cols)
            const isWide = index % 3 === 0;
            const colSpan = isWide ? 'md:col-span-12 lg:col-span-8' : 'md:col-span-6 lg:col-span-4';
            const aspect = isWide ? 'aspect-[16/9]' : 'aspect-[4/3]';

            return (
              <MotionReveal
                key={index}
                delay={0.1 * (index % 4)}
                className={colSpan}
              >
                <figure className="group relative rounded-3xl overflow-hidden border border-[#D5C09D] bg-[#FAF7F2] shadow-sm flex flex-col h-full">
                  <div className={`relative w-full ${aspect} overflow-hidden`}>
                    <Image
                      src={item.src}
                      alt={item.alt || `${project.name} photography`}
                      fill
                      sizes={isWide ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                    />
                  </div>
                  {item.caption && (
                    <figcaption className="p-4 text-xs font-mono text-text-secondary bg-[#FAF7F2] border-t border-[#DCCDB7]">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              </MotionReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
