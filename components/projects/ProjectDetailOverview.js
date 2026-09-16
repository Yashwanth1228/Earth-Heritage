'use client';

import { CheckCircle2, ShieldCheck, Compass } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';

/**
 * Editorial Overview Section for Project Detail
 * 
 * Strict Standards:
 * - Renders ONLY when verified project overview or description data is supplied
 * - If data is absent, returns null cleanly without empty headings or placeholder text
 * - Alternating warm biscuit tone (#F0E0C6) creating natural visual rhythm after light hero
 * - Renders verified features if available; omits cleanly if empty
 */
export default function ProjectDetailOverview({ project }) {
  if (!project) return null;

  const {
    overview,
    description,
    features = []
  } = project;

  const contentText = overview || description;

  // If no verified content exists, omit section entirely
  if (!contentText && (!features || features.length === 0)) {
    return null;
  }

  return (
    <section
      id="project-overview"
      data-navbar-theme="light"
      className="relative py-16 sm:py-24 bg-[#F0E0C6] text-[#111613] border-b border-[#DCCDB7]"
      aria-label="The Land and Vision"
    >
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Editorial Land Narrative (7 cols) */}
          {contentText && (
            <div className={features.length > 0 ? 'lg:col-span-7 space-y-6' : 'lg:col-span-10 max-w-3xl space-y-6'}>
              <MotionReveal delay={0.05}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                  <span>THE LAND &amp; VISION</span>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.15}>
                <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#111613] font-normal tracking-tight leading-[1.18]">
                  Rooted in the land. Managed with enduring care.
                </h2>
              </MotionReveal>

              <MotionReveal delay={0.25}>
                <div className="font-sans text-base sm:text-lg text-[#38423A] leading-relaxed space-y-4 whitespace-pre-line">
                  {contentText}
                </div>
              </MotionReveal>

              {/* Verified Ownership Philosophy Note */}
              <MotionReveal delay={0.35}>
                <div className="p-5 rounded-2xl bg-[#FAF6F0]/90 border border-[#D5C09D] flex items-start gap-3 text-xs sm:text-sm text-[#38423A]">
                  <ShieldCheck className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-[#111613] font-semibold block mb-0.5">
                      Landowner Ownership Reality
                    </strong>
                    <span>
                      You own the titled farmland. Earth Heritage provides structured agricultural management, ongoing maintenance, and operations coordination without speculative return claims.
                    </span>
                  </div>
                </div>
              </MotionReveal>
            </div>
          )}

          {/* Right Column: Confirmed Project Features (5 cols) */}
          {features.length > 0 && (
            <div className={contentText ? 'lg:col-span-5' : 'lg:col-span-8'}>
              <MotionReveal delay={0.2}>
                <div className="rounded-3xl bg-[#FAF7F2] border border-[#D5C09D] p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-2 pb-4 border-b border-[#DCCDB7]">
                    <Compass className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[#1E460B] font-semibold">
                      Confirmed Features
                    </h3>
                  </div>

                  <ul className="space-y-3.5" role="list">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-[#38423A]">
                        <CheckCircle2 className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </MotionReveal>
            </div>
          )}

        </div>
      </Container>
    </section>
  );
}
