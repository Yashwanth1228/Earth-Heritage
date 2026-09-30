'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
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
                    'w-48 sm:w-52 rounded-2xl p-2 overflow-hidden transition-colors duration-300',
                    isInverse
                      ? 'bg-[#0E2413] border border-[#245832] shadow-[0_16px_36px_rgba(0,0,0,0.5)]'
                      : 'bg-[#FAF6F0] border border-[#D5C09D]/80 shadow-[0_16px_36px_rgba(26,22,17,0.14)]'
                  )}
                >
                  <div className="space-y-0.5" role="none">
                    {PROJECT_STATUS_CATEGORIES.map((cat) => {
                      const catProjects = getProjectsByStatus(cat.key);
                      const hasProjects = catProjects.length > 0;
                      const targetHref = hasProjects
                        ? `/projects/${catProjects[0].slug}`
                        : '/projects';

                      return (
                        <Link
                          key={cat.key}
                          href={targetHref}
                          onClick={() => setIsProjectsOpen(false)}
                          className={cn(
                            'flex items-center justify-between px-3 py-2 text-[14px] font-sans font-medium rounded-xl transition-all duration-150 group/item focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary',
                            isInverse
                              ? 'text-[#FAF7F2]/90 hover:text-white hover:bg-[#163A20]'
                              : 'text-text-primary/90 hover:text-[#1E460B] hover:bg-surface-subtle'
                          )}
                          role="menuitem"
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className={cn(
                                'w-2 h-2 rounded-full transition-colors shrink-0',
                                hasProjects
                                  ? isInverse
                                    ? 'bg-[#76e52c]'
                                    : 'bg-[#1E460B]'
                                  : isInverse
                                  ? 'bg-[#2A4833]'
                                  : 'bg-[#D2C5AE]'
                              )}
                              aria-hidden="true"
                            />
                            <span>{cat.label}</span>
                          </div>

                          {hasProjects && (
                            <span
                              className={cn(
                                'text-[10px] font-mono px-1.5 py-0.2 rounded-full font-semibold',
                                isInverse
                                  ? 'bg-[#0E2413] text-[#76e52c] border border-[#245832]'
                                  : 'bg-[#E0D3BC] text-[#1E460B]'
                              )}
                            >
                              {catProjects.length}
                            </span>
                          )}
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
