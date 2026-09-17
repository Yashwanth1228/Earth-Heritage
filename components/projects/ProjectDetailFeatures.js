'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * Numbered Editorial Project Features Section
 * 
 * Strict Standards:
 * - Renders ONLY features actually present in project.features
 * - Never invents additional features
 * - Formatted with numbered editorial items (01 Feature, 02 Feature...)
 * - Clean, elegant typography and generous whitespace
 */
export default function ProjectDetailFeatures({ project }) {
  if (!project || !Array.isArray(project.features) || project.features.length === 0) {
    return null;
  }

  const { features, name } = project;

  return (
    <section
      id="project-features"
      data-navbar-theme="light"
      className="relative py-16 sm:py-24 bg-[#FAF6F0] text-[#111613] border-b border-[#DCCDB7]/70 overflow-hidden"
      aria-label="Confirmed Project Features"
    >
      {/* Background Ambience */}
      <LandContourPattern variant="biscuit-contours" className="opacity-40" />

      <Container size="default" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>PROJECT FEATURES</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111613] font-normal tracking-tight">
              Confirmed Project Attributes
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed">
              Essential operational and land ownership characteristics established for {name}.
            </p>
          </MotionReveal>
        </div>

        {/* Numbered Editorial Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {features.map((feature, index) => {
            const featureNumber = String(index + 1).padStart(2, '0');

            return (
              <MotionReveal
                key={index}
                delay={0.08 * (index + 1)}
                className="h-full"
              >
                <div className="group relative h-full rounded-3xl bg-[#FAF7F2] border border-[#D5C09D] p-6 sm:p-8 flex flex-col justify-between space-y-8 hover:border-[#1E460B]/40 hover:shadow-sm transition-all duration-300">
                  <div className="flex items-baseline justify-between border-b border-[#DCCDB7]/70 pb-4">
                    <span className="font-mono text-xs font-semibold tracking-widest text-[#1E460B] uppercase">
                      FEATURE
                    </span>
                    <span className="font-serif text-3xl sm:text-4xl text-[#1E460B]/30 group-hover:text-[#1E460B]/50 transition-colors font-light select-none">
                      {featureNumber}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#111613] font-normal leading-snug tracking-tight group-hover:text-[#1E460B] transition-colors">
                      {feature}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-[#DCCDB7]/50 flex items-center justify-between text-[11px] font-mono text-[#7A8A7E] uppercase tracking-wider">
                    <span>Earth Heritage</span>
                    <span>Verified</span>
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
