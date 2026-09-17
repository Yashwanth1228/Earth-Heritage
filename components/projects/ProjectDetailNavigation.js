'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Grid } from 'lucide-react';
import Container from '@/components/ui/Container';
import { getAdjacentProjects } from '@/data/projects';

/**
 * Previous / Next Project Navigation Bar
 * 
 * Strict Standards:
 * - Derives navigation directly from centralized data/projects.js
 * - Links strictly to confirmed project routes (no nonexistent links)
 * - Center "Back to All Projects" catalog link
 * - Fully accessible keyboard focus states
 */
export default function ProjectDetailNavigation({ currentSlug }) {
  if (!currentSlug) return null;

  const { prev, next } = getAdjacentProjects(currentSlug);

  return (
    <nav
      className="py-10 sm:py-14 bg-[#FAF6F0] border-b border-[#DCCDB7]/70"
      aria-label="Adjacent Projects Navigation"
    >
      <Container size="default">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Previous Project Link */}
          <div className="w-full sm:w-auto flex justify-start">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group inline-flex items-center gap-3.5 p-3 sm:p-4 rounded-2xl bg-[#FAF7F2] border border-[#D5C09D] hover:border-[#1E460B]/40 hover:shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                aria-label={`Previous project: ${prev.name}`}
              >
                <div className="w-9 h-9 rounded-full bg-[#FAF6F0] border border-[#D5C09D] flex items-center justify-center text-[#1E460B] group-hover:bg-[#1E460B] group-hover:text-[#FAF6F0] transition-colors">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                </div>
                <div className="text-left">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#7A8A7E] block">
                    Previous Project
                  </span>
                  <span className="font-serif text-sm sm:text-base text-[#111613] group-hover:text-[#1E460B] transition-colors font-medium">
                    {prev.name}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="hidden sm:block w-40" aria-hidden="true" />
            )}
          </div>

          {/* Central Catalog Link */}
          <div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1E460B] hover:text-[#FAF6F0] hover:bg-[#1E460B] font-semibold py-2.5 px-5 rounded-full bg-[#EAD5B5]/60 border border-[#D5C09D] transition-all shadow-2xs"
            >
              <Grid className="w-3.5 h-3.5" aria-hidden="true" />
              <span>All Projects</span>
            </Link>
          </div>

          {/* Next Project Link */}
          <div className="w-full sm:w-auto flex justify-end">
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group inline-flex items-center justify-end gap-3.5 p-3 sm:p-4 rounded-2xl bg-[#FAF7F2] border border-[#D5C09D] hover:border-[#1E460B]/40 hover:shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                aria-label={`Next project: ${next.name}`}
              >
                <div className="text-right">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#7A8A7E] block">
                    Next Project
                  </span>
                  <span className="font-serif text-sm sm:text-base text-[#111613] group-hover:text-[#1E460B] transition-colors font-medium">
                    {next.name}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#FAF6F0] border border-[#D5C09D] flex items-center justify-center text-[#1E460B] group-hover:bg-[#1E460B] group-hover:text-[#FAF6F0] transition-colors">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
              </Link>
            ) : (
              <div className="hidden sm:block w-40" aria-hidden="true" />
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
}
