'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { headerNavRoutes } from '@/data/routes';
import { PROJECT_STATUS_CATEGORIES, getProjectsByStatus } from '@/data/projects';
import { cn } from '@/lib/utils';

/**
 * Accessible desktop navigation menu with active route tracking,
 * subtle inverse state support, and 4-status direct category dropdown for Projects.
 */
export default function Navigation({ className, isInverse = false }) {
  const pathname = usePathname();
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState('new');
  const timeoutRef = useRef(null);
  const projectsContainerRef = useRef(null);

  // Close dropdown on outside click or route change
  useEffect(() => {
    setIsProjectsOpen(false);
  }, [pathname]);

  // Clean up any pending hover timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsProjectsOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // Smooth 150ms debounce prevents flickering when gliding between link and dropdown
    timeoutRef.current = setTimeout(() => {
      setIsProjectsOpen(false);
    }, 150);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsProjectsOpen(false);
      // Refocus the trigger link
      const triggerLink = projectsContainerRef.current?.querySelector('a');
      if (triggerLink) triggerLink.focus();
    }
  };

  return (
    <nav
      className={cn(
        'hidden lg:flex items-center space-x-3 lg:space-x-3.5 xl:space-x-5 2xl:space-x-6.5',
        className
      )}
      aria-label="Main Navigation"
    >
      {headerNavRoutes.map((route) => {
        const isProjects = route.path === '/projects';
        const isActive = pathname === route.path || (route.path !== '/' && pathname.startsWith(route.path));

        const linkClasses = cn(
          'text-[14.5px] xl:text-[15.5px] 2xl:text-[16.5px] font-sans tracking-normal whitespace-nowrap transition-colors duration-300 ease-out relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm',
          isInverse
            ? isActive
              ? 'text-[#FAF7F2] font-bold'
              : 'text-[#FAF7F2]/85 hover:text-white font-semibold'
            : isActive
            ? 'text-text-primary font-bold'
            : 'text-text-primary/90 hover:text-text-primary font-semibold'
        );

        if (isProjects) {
          return (
            <div
              key={route.path}
              ref={projectsContainerRef}
              className="relative py-1 group/projects"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onFocus={handleMouseEnter}
              onBlur={(e) => {
                // If focus leaves the container entirely, close dropdown
                if (!projectsContainerRef.current?.contains(e.relatedTarget)) {
                  setIsProjectsOpen(false);
                }
              }}
              onKeyDown={handleKeyDown}
            >
              {/* Primary Link with Down Arrow Symbol */}
              <Link
                href={route.path}
                className={cn(linkClasses, 'inline-flex items-center gap-1.5')}
                aria-current={isActive ? 'page' : undefined}
                aria-haspopup="true"
                aria-expanded={isProjectsOpen}
                id="nav-projects-trigger"
              >
                <span>{route.title}</span>
                <ChevronDown
                  className={cn(
                    'w-3.5 h-3.5 transition-transform duration-200 shrink-0 opacity-75',
                    isProjectsOpen && 'rotate-180 opacity-100',
                    isInverse ? 'text-[#FAF7F2]' : 'text-text-primary'
                  )}
                  aria-hidden="true"
                />
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>

              {/* Invisible hover bridge + 4-Status Dropdown Panel */}
              <div
                className={cn(
                  'absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 transition-all duration-200 ease-out',
                  isProjectsOpen
                    ? 'opacity-100 translate-y-0 visible pointer-events-auto'
                    : 'opacity-0 -translate-y-1.5 invisible pointer-events-none group-hover/projects:opacity-100 group-hover/projects:translate-y-0 group-hover/projects:visible group-hover/projects:pointer-events-auto'
                )}
                role="menu"
                aria-labelledby="nav-projects-trigger"
              >
                <div
                  className={cn(
                    'w-72 sm:w-80 rounded-2xl p-3 overflow-hidden transition-colors duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.18)]',
                    isInverse
                      ? 'bg-[#0E2413] border border-[#245832]'
                      : 'bg-[#FAF6F0] border border-[#D5C09D]/80'
                  )}
                >
                  {/* Status Selection Pills */}
                  <div
                    className={cn(
                      'grid grid-cols-4 gap-1 p-1 rounded-xl mb-2.5',
                      isInverse ? 'bg-[#08170C] border border-[#1A3F22]' : 'bg-[#EFE6D7] border border-[#D5C09D]/60'
                    )}
                    role="tablist"
                    aria-label="Project Status Tabs"
                  >
                    {PROJECT_STATUS_CATEGORIES.map((cat) => {
                      const isSelected = activeStatus === cat.key;
                      const count = getProjectsByStatus(cat.key).length;

                      return (
                        <button
                          key={cat.key}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          onClick={() => setActiveStatus(cat.key)}
                          onMouseEnter={() => setActiveStatus(cat.key)}
                          className={cn(
                            'py-1.5 px-1 rounded-lg text-xs font-sans font-medium text-center transition-all duration-150 cursor-pointer flex flex-col items-center justify-center gap-0.5',
                            isSelected
                              ? isInverse
                                ? 'bg-[#1E460B] text-[#FAF7F2] font-semibold shadow-xs'
                                : 'bg-[#15341C] text-[#FAF7F2] font-semibold shadow-xs'
                              : isInverse
                              ? 'text-[#FAF7F2]/65 hover:text-[#FAF7F2] hover:bg-white/5'
                              : 'text-[#4E5C50] hover:text-[#111613] hover:bg-black/5'
                          )}
                        >
                          <span className="leading-none">{cat.label}</span>
                          <span
                            className={cn(
                              'text-[9px] font-mono leading-none',
                              isSelected
                                ? isInverse
                                  ? 'text-[#76e52c]'
                                  : 'text-[#55C40D]'
                                : 'opacity-60'
                            )}
                          >
                            ({count})
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Status Projects Lists */}
                  <div className="min-h-[85px] flex flex-col justify-center">
                    {PROJECT_STATUS_CATEGORIES.map((cat) => {
                      const statusProjects = getProjectsByStatus(cat.key);
                      const isSelected = activeStatus === cat.key;

                      if (statusProjects.length > 0) {
                        return (
                          <div
                            key={cat.key}
                            className={cn('space-y-1.5', isSelected ? 'block' : 'hidden')}
                            role="none"
                          >
                            {statusProjects.map((proj) => (
                              <Link
                                key={proj.slug}
                                href={`/projects/${proj.slug}`}
                                onClick={() => setIsProjectsOpen(false)}
                                className={cn(
                                  'flex items-center justify-between p-2.5 rounded-xl transition-all duration-150 group/proj border',
                                  isInverse
                                    ? 'bg-[#132E1A]/80 hover:bg-[#1A3F22] border-[#245832]/60 hover:border-[#38844D] text-[#FAF7F2]'
                                    : 'bg-[#F2EAE0] hover:bg-[#EAE0D0] border-[#D5C09D]/70 hover:border-[#BFAF93] text-[#111613]'
                                )}
                                role="menuitem"
                              >
                                <div className="space-y-0.5 pr-2">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D] shrink-0" aria-hidden="true" />
                                    <span className="font-serif text-[13.5px] font-medium leading-tight">
                                      {proj.name}
                                    </span>
                                  </div>
                                  <p className="text-[10.5px] font-mono text-[#7A6A4E] pl-3">
                                    {proj.snapshot?.totalArea || proj.category} &bull; {proj.locationDetails?.village ? `${proj.locationDetails.village}, ${proj.locationDetails.taluk}` : proj.location}
                                  </p>
                                </div>
                                <ArrowUpRight
                                  className={cn(
                                    'w-4 h-4 shrink-0 transition-transform duration-200 group-hover/proj:translate-x-0.5 group-hover/proj:-translate-y-0.5',
                                    isInverse ? 'text-[#76e52c]' : 'text-[#1E460B]'
                                  )}
                                  aria-hidden="true"
                                />
                              </Link>
                            ))}
                          </div>
                        );
                      }

                      // Empty state for status categories without projects (Upcoming, Completed)
                      return (
                        <div
                          key={cat.key}
                          className={cn('py-4 px-3 text-center space-y-1 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]', isSelected ? 'block' : 'hidden')}
                        >
                          <p className={cn(
                            'text-xs font-sans italic',
                            isInverse ? 'text-[#FAF7F2]/60' : 'text-[#7A6A4E]'
                          )}>
                            {cat.emptyMessage || 'No projects currently in this category'}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dropdown Footer: All Projects Navigation */}
                  <div
                    className={cn(
                      'pt-2 mt-2 border-t flex items-center justify-between px-1',
                      isInverse ? 'border-[#1E460B]' : 'border-[#D5C09D]/60'
                    )}
                  >
                    <Link
                      href="/projects"
                      onClick={() => setIsProjectsOpen(false)}
                      className={cn(
                        'flex items-center justify-between w-full px-2 py-1 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-colors',
                        isInverse
                          ? 'text-[#76e52c] hover:bg-white/5'
                          : 'text-[#1E460B] hover:bg-black/5'
                      )}
                    >
                      <span>Explore All Projects</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return (
          <Link
            key={route.path}
            href={route.path}
            className={linkClasses}
            aria-current={isActive ? 'page' : undefined}
          >
            {route.title}
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full"
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
