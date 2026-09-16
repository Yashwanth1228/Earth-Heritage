'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import { Quote, CheckCircle2 } from 'lucide-react';

/**
 * Editorial Content Block Renderer for /blogs/[slug]
 * 
 * Supports semantic content blocks:
 * - lead: prominent introductory thought
 * - paragraph: readable body copy with generous leading
 * - heading: H2 or H3 sectional breaks in Cormorant Garamond
 * - quote: pull quotes with Earth Heritage green accent and attribution
 * - callout: framed editorial takeaways
 * - image: inline authentic photography with captions
 * - list: semantic bulleted items
 */
export default function BlogDetailBody({ content = [] }) {
  if (!Array.isArray(content) || content.length === 0) {
    return null;
  }

  return (
    <article
      id="article-body"
      data-navbar-theme="light"
      className="py-14 sm:py-20 lg:py-24 bg-[#FAF7F2] text-[#111613] border-b border-[#DCCDB7]"
      aria-label="Article content"
    >
      <Container size="default">
        <div className="max-w-3xl mx-auto space-y-8 font-sans text-base sm:text-lg text-[#38423A] leading-[1.8]">
          {content.map((block, index) => {
            if (!block || !block.type) return null;

            switch (block.type) {
              case 'lead':
                return (
                  <MotionReveal key={index} delay={0.05}>
                    <p className="font-serif text-xl sm:text-2xl text-[#111613] font-normal italic leading-relaxed pt-2 pb-4 border-b border-[#DCCDB7]/60">
                      {block.text}
                    </p>
                  </MotionReveal>
                );

              case 'heading':
                if (block.level === 3) {
                  return (
                    <MotionReveal key={index} delay={0.05}>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#111613] font-normal tracking-tight pt-6">
                        {block.text}
                      </h3>
                    </MotionReveal>
                  );
                }
                return (
                  <MotionReveal key={index} delay={0.05}>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#111613] font-normal tracking-tight pt-8 border-t border-[#DCCDB7]/40">
                      {block.text}
                    </h2>
                  </MotionReveal>
                );

              case 'quote':
                return (
                  <MotionReveal key={index} delay={0.05}>
                    <figure className="my-8 pl-6 sm:pl-8 border-l-2 border-[#1E460B] bg-[#FAF6F0]/80 p-6 sm:p-8 rounded-r-2xl">
                      <Quote className="w-8 h-8 text-[#1E460B]/40 mb-3" aria-hidden="true" />
                      <blockquote className="font-serif text-xl sm:text-2xl lg:text-[26px] text-[#111613] font-normal italic leading-snug">
                        &ldquo;{block.text}&rdquo;
                      </blockquote>
                      {block.attribution && (
                        <figcaption className="mt-3 font-mono text-xs uppercase tracking-wider text-[#5A685D]">
                          — {block.attribution}
                        </figcaption>
                      )}
                    </figure>
                  </MotionReveal>
                );

              case 'callout':
                return (
                  <MotionReveal key={index} delay={0.05}>
                    <div className="my-8 p-6 sm:p-8 rounded-3xl bg-[#FAF6F0] border border-[#D5C09D] shadow-xs space-y-2">
                      {block.title && (
                        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#1E460B] block">
                          {block.title}
                        </span>
                      )}
                      <p className="text-sm sm:text-base text-[#38423A] leading-relaxed">
                        {block.text}
                      </p>
                    </div>
                  </MotionReveal>
                );

              case 'list':
                if (!Array.isArray(block.items)) return null;
                return (
                  <MotionReveal key={index} delay={0.05}>
                    <ul className="space-y-3 my-6 pl-2" role="list">
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3 text-base sm:text-lg text-[#38423A]">
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
                    <figure className="my-10 rounded-3xl overflow-hidden border border-[#D5C09D] bg-[#FAF6F0] shadow-sm">
                      <div className="relative w-full aspect-[16/10] overflow-hidden">
                        <Image
                          src={block.src}
                          alt={block.alt || 'Editorial photograph'}
                          fill
                          sizes="(max-width: 768px) 100vw, 768px"
                          className="object-cover object-center"
                        />
                      </div>
                      {block.caption && (
                        <figcaption className="p-4 text-xs font-mono text-[#5A685D] bg-[#FAF6F0] border-t border-[#DCCDB7]/70">
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
                    <p className="whitespace-pre-line">
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
