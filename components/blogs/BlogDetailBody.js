'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import { Quote, CheckCircle2 } from 'lucide-react';

/**
 * Editorial Content Block Renderer for /blogs/[slug]
 * 
 * Supports semantic content blocks with balanced horizontal distribution:
 * - Uses max-w-6xl to eliminate wasted empty side spaces
 * - lead: prominent introductory thought
 * - paragraph: readable body copy with generous leading
 * - heading: H2 or H3 sectional breaks in Cormorant Garamond
 * - quote: pull quotes with Earth Heritage green accent and attribution
 * - callout: framed editorial takeaways spanning full container width
 * - image: inline authentic photography with captions
 * - list: 2-column balanced check-bullet grid utilizing horizontal space
 */
export default function BlogDetailBody({ content = [] }) {
  if (!Array.isArray(content) || content.length === 0) {
    return null;
  }

  return (
    <article
      id="article-body"
      data-navbar-theme="light"
      className="relative py-14 sm:py-20 lg:py-24 bg-[#FAF7F2] text-[#111613] border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Article content"
    >
      {/* Signature Earth Heritage Topographic & Botanical Contours */}
      {/* 1. Upper Reading Zone: Flowing Land Elevation Contours & Botanical Silhouette */}
      <div
        className="absolute top-0 inset-x-0 h-[900px] pointer-events-none overflow-hidden select-none z-0"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Botanical Leaf Silhouette (Top-Left, ~550px) */}
          <path
            d="M-80,-60 C120,-30 320,80 380,240 C430,370 340,490 220,530 C100,570 -40,510 -90,400 Z"
            fill="#5E7748"
            fillOpacity="0.14"
          />
          {/* Sweeping Elevation Contours */}
          <path
            d="M-50,160 C320,80 680,250 1060,150 C1280,90 1420,190 1520,170"
            stroke="#1E460B"
            strokeOpacity="0.16"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M-50,290 C340,200 710,370 1100,270 C1320,210 1440,310 1520,290"
            stroke="#1E460B"
            strokeOpacity="0.13"
            strokeWidth="1.6"
            strokeDasharray="12 10"
          />
          <path
            d="M-50,450 C300,370 670,520 1040,420 C1270,360 1410,460 1520,440"
            stroke="#1E460B"
            strokeOpacity="0.15"
            strokeWidth="2.2"
          />
          <path
            d="M-50,620 C360,540 730,690 1120,590 C1340,530 1450,630 1520,610"
            stroke="#1E460B"
            strokeOpacity="0.12"
            strokeWidth="1.5"
            strokeDasharray="8 8"
          />
        </svg>
      </div>

      {/* 2. Mid Reading Zone: Topographic Elevation Loops & Agricultural Furrows */}
      <div
        className="absolute top-[32%] inset-x-0 h-[1000px] pointer-events-none overflow-hidden select-none z-0"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Warm Earth Organic Pod Form (Right Margin) */}
          <path
            d="M1060,280 C1220,240 1400,310 1500,440 C1570,550 1530,700 1400,750 C1270,800 1110,730 1030,620 C960,510 970,300 1060,280 Z"
            fill="#D5C09D"
            fillOpacity="0.18"
          />
          {/* Concentric Elevation Loops (Left Margin) */}
          <ellipse
            cx="120"
            cy="480"
            rx="260"
            ry="180"
            transform="rotate(-15 120 480)"
            stroke="#1E460B"
            strokeOpacity="0.16"
            strokeWidth="2"
          />
          <ellipse
            cx="120"
            cy="480"
            rx="440"
            ry="300"
            transform="rotate(-15 120 480)"
            stroke="#1E460B"
            strokeOpacity="0.13"
            strokeWidth="1.6"
            strokeDasharray="10 8"
          />
          <ellipse
            cx="120"
            cy="480"
            rx="640"
            ry="430"
            transform="rotate(-15 120 480)"
            stroke="#1E460B"
            strokeOpacity="0.14"
            strokeWidth="2.2"
          />
          {/* Furrow Lines Across Middle */}
          <path
            d="M-60,220 Q360,350 820,250 T1520,300"
            stroke="#1E460B"
            strokeOpacity="0.14"
            strokeWidth="2"
          />
          <path
            d="M-60,560 Q360,690 820,590 T1520,640"
            stroke="#1E460B"
            strokeOpacity="0.12"
            strokeWidth="1.5"
            strokeDasharray="14 8"
          />
        </svg>
      </div>

      {/* 3. Lower Reading Zone: Organic Flow & Terminal Ridge Curves */}
      <div
        className="absolute bottom-0 inset-x-0 h-[900px] pointer-events-none overflow-hidden select-none z-0"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Terraced Silhouette (Lower Left) */}
          <path
            d="M-80,480 C100,420 340,470 500,580 C620,660 640,790 500,830 C340,870 -20,790 -100,670 Z"
            fill="#D5C09D"
            fillOpacity="0.18"
          />
          {/* Botanical Accent (Lower Right) */}
          <path
            d="M1120,420 C1250,370 1400,430 1480,550 C1550,650 1520,780 1400,840 C1280,890 1140,830 1070,720 C1020,620 1040,460 1120,420 Z"
            fill="#5E7748"
            fillOpacity="0.14"
          />
          {/* Sweeping Lower Ridge Lines */}
          <path
            d="M-50,240 C330,160 700,310 1080,210 C1310,150 1430,240 1520,230"
            stroke="#1E460B"
            strokeOpacity="0.15"
            strokeWidth="2"
          />
          <path
            d="M-50,410 C360,330 730,480 1120,380 C1340,320 1450,420 1520,400"
            stroke="#1E460B"
            strokeOpacity="0.13"
            strokeWidth="1.6"
            strokeDasharray="10 8"
          />
          <path
            d="M-50,600 C320,520 680,670 1060,570 C1280,510 1420,610 1520,590"
            stroke="#1E460B"
            strokeOpacity="0.16"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <Container size="default" className="relative z-10">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10 font-sans text-base sm:text-lg lg:text-xl text-[#38423A] leading-[1.85]">
          {content.map((block, index) => {
            if (!block || !block.type) return null;

            switch (block.type) {
              case 'lead':
                return (
                  <MotionReveal key={index} delay={0.05}>
                    <p className="font-serif text-2xl sm:text-3xl lg:text-[34px] text-[#111613] font-normal italic leading-relaxed pt-2 pb-6 border-b border-[#DCCDB7]/60">
                      {block.text}
                    </p>
                  </MotionReveal>
                );

              case 'heading':
                if (block.level === 3) {
                  return (
                    <MotionReveal key={index} delay={0.05}>
                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] text-[#111613] font-normal tracking-tight pt-6">
                        {block.text}
                      </h3>
                    </MotionReveal>
                  );
                }
                return (
                  <MotionReveal key={index} delay={0.05}>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#111613] font-normal tracking-tight pt-10 border-t border-[#DCCDB7]/40">
                      {block.text}
                    </h2>
                  </MotionReveal>
                );

              case 'quote':
                return (
                  <MotionReveal key={index} delay={0.05}>
                    <figure className="my-10 pl-8 sm:pl-12 border-l-4 border-[#1E460B] bg-[#FAF6F0] p-8 sm:p-12 rounded-r-3xl shadow-xs">
                      <Quote className="w-10 h-10 text-[#1E460B]/40 mb-4" aria-hidden="true" />
                      <blockquote className="font-serif text-2xl sm:text-3xl lg:text-[32px] text-[#111613] font-normal italic leading-snug">
                        &ldquo;{block.text}&rdquo;
                      </blockquote>
                      {block.attribution && (
                        <figcaption className="mt-4 font-mono text-xs sm:text-sm uppercase tracking-wider text-[#5A685D]">
                          — {block.attribution}
                        </figcaption>
                      )}
                    </figure>
                  </MotionReveal>
                );

              case 'callout':
                return (
                  <MotionReveal key={index} delay={0.05}>
                    <div className="my-10 p-8 sm:p-10 rounded-3xl bg-[#FAF6F0] border border-[#D5C09D] shadow-xs space-y-3">
                      {block.title && (
                        <span className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#1E460B] block">
                          {block.title}
                        </span>
                      )}
                      <p className="text-base sm:text-lg text-[#38423A] leading-relaxed">
                        {block.text}
                      </p>
                    </div>
                  </MotionReveal>
                );

              case 'list':
                if (!Array.isArray(block.items)) return null;
                return (
                  <MotionReveal key={index} delay={0.05}>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-8" role="list">
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3.5 p-5 rounded-2xl bg-[#FAF6F0] border border-[#E8DFC8] text-base sm:text-lg text-[#38423A] shadow-xs">
                          <CheckCircle2 className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </MotionReveal>
                );

              case 'image':
                if (!block.src) return null;
                return (
                  <MotionReveal key={index} delay={0.05}>
                    <figure className="my-12 rounded-3xl overflow-hidden border border-[#D5C09D] bg-[#FAF6F0] shadow-sm">
                      <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
                        <Image
                          src={block.src}
                          alt={block.alt || 'Editorial photograph'}
                          fill
                          sizes="(max-width: 1400px) 100vw, 1152px"
                          className="object-cover object-center"
                        />
                      </div>
                      {block.caption && (
                        <figcaption className="p-4 text-xs sm:text-sm font-mono text-[#5A685D] bg-[#FAF6F0] border-t border-[#DCCDB7]/70">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  </MotionReveal>
                );

              case 'paragraph':
              default:
                return (
                  <MotionReveal key={index} delay={0.05}>
                    <p className="whitespace-pre-line text-base sm:text-lg lg:text-xl text-[#38423A] leading-[1.85]">
                      {block.text}
                    </p>
                  </MotionReveal>
                );
            }
          })}
        </div>
      </Container>
    </article>
  );
}
