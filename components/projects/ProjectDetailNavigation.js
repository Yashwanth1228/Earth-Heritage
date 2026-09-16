'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import { getAdjacentProjects } from '@/data/projects';

/**
 * Previous / Next Project Navigation Bar
 * 
 * Strict Standards:
 * - Derives navigation directly from centralized data/projects.js
 * - If only 1 or 0 projects exist, returns null cleanly without empty wrappers
 * - Full keyboard accessibility with visible focus rings
 */
export default function ProjectDetailNavigation({ currentSlug }) {
  if (!currentSlug) return null;

  const { prev, next } = getAdjacentProjects(currentSlug);

  // If no adjacent projects exist, omit entirely
  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      className="py-10 bg-[#FAF6F0] border-b border-[#DCCDB7]"
      aria-label="Adjacent Projects Navigation"
    >
      <Container size="default">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Previous Project Link */}
          <div className="w-full sm:w-auto text-left">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group inline-flex items-center gap-3 p-3 rounded-2xl hover:bg-[#EAD5B5]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                aria-label={`Previous project: ${prev.name}`}
              >
                <div className="w-9 h-9 rounded-full bg-surface border border-[#D5C09D] flex items-center justify-center text-text-secondary group-hover:text-brand-primary group-hover:border-brand-primary transition-colors">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted block">
                    Previous Project
                  </span>
                  <span className="font-serif text-base sm:text-lg text-text-primary group-hover:text-brand-dark transition-colors font-medium">
                    {prev.name}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="invisible" aria-hidden="true" />
            )}
          </div>

          {/* Central Catalog Link */}
          <Link
            href="/projects"
            className="text-xs font-mono uppercase tracking-widest text-[#1E460B] hover:text-brand-primary font-semibold py-2 px-4 rounded-full bg-[#EAD5B5]/50 border border-[#D5C09D] transition-colors"
          >
            All Projects
          </Link>

          {/* Next Project Link */}
          <div className="w-full sm:w-auto text-right">
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group inline-flex items-center justify-end gap-3 p-3 rounded-2xl hover:bg-[#EAD5B5]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                aria-label={`Next project: ${next.name}`}
              >
                <div className="text-right">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted block">
                    Next Project
                  </span>
                  <span className="font-serif text-base sm:text-lg text-text-primary group-hover:text-brand-dark transition-colors font-medium">
                    {next.name}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-surface border border-[#D5C09D] flex items-center justify-center text-text-secondary group-hover:text-brand-primary group-hover:border-brand-primary transition-colors">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ) : (
              <div className="invisible" aria-hidden="true" />
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
}
