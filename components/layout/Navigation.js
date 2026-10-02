'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { headerNavRoutes } from '@/data/routes';
import { getAllProjects } from '@/data/projects';
import { cn } from '@/lib/utils';

/**
 * Accessible desktop navigation menu with active route tracking,
 * subtle inverse state support, and direct project list dropdown on Projects hover.
 */
export default function Navigation({ className, isInverse = false }) {
  const pathname = usePathname();
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const projectsContainerRef = useRef(null);

  const confirmedProjects = getAllProjects().filter((p) => p && !p.isDemo);

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

              {/* Invisible hover bridge + Dropdown Panel matching reference image */}
              <div
                className={cn(
                  'absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 transition-all duration-200 ease-out',
                  isProjectsOpen
                    ? 'opacity-100 translate-y-0 visible pointer-events-auto'
                    : 'opacity-0 -translate-y-1 invisible pointer-events-none group-hover/projects:opacity-100 group-hover/projects:translate-y-0 group-hover/projects:visible group-hover/projects:pointer-events-auto'
                )}
                role="menu"
                aria-labelledby="nav-projects-trigger"
              >
                <div
                  className={cn(
                    'w-max min-w-[200px] rounded-2xl py-3.5 sm:py-4 px-5 sm:px-5.5 transition-colors duration-300 shadow-[0_16px_36px_rgba(20,38,25,0.14)]',
                    isInverse
                      ? 'bg-[#122A18] border border-[#245832]/70 text-[#FAF7F2]'
                      : 'bg-[#EDE4D5] border border-[#D8C7B0]/70 text-[#0F382A]'
                  )}
                >
                  <div className="flex flex-col space-y-3 sm:space-y-3.5" role="none">
                    {confirmedProjects.map((proj) => {
                      const isCurrentProject = pathname === `/projects/${proj.slug}`;
                      return (
                        <Link
                          key={proj.slug}
                          href={`/projects/${proj.slug}`}
                          onClick={() => setIsProjectsOpen(false)}
                          className={cn(
                            'block text-[15px] sm:text-[16px] font-sans font-medium tracking-normal transition-colors duration-200 leading-snug whitespace-nowrap',
                            isInverse
                              ? isCurrentProject
                                ? 'text-[#F3D079]'
                                : 'text-[#FAF7F2] hover:text-[#F3D079]'
                              : isCurrentProject
                              ? 'text-[#C59B27]'
                              : 'text-[#0F382A] hover:text-[#C59B27]'
                          )}
                          role="menuitem"
                        >
                          {proj.name}
                        </Link>
                      );
                    })}
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
