'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { headerNavRoutes } from '@/data/routes';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils';

/**
 * Accessible desktop navigation menu with active route tracking,
 * subtle inverse state support, and compact hover/keyboard dropdown for Projects.
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
          'text-[13px] xl:text-[14px] 2xl:text-[14.5px] font-sans tracking-normal whitespace-nowrap transition-colors duration-300 ease-out relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm',
          isInverse
            ? isActive
              ? 'text-[#FAF7F2] font-semibold'
              : 'text-[#FAF7F2]/80 hover:text-white font-[520]'
            : isActive
            ? 'text-text-primary font-semibold'
            : 'text-text-primary/85 hover:text-text-primary font-[520]'
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
              {/* Primary Link: clicking navigates directly to /projects */}
              <Link
                href={route.path}
                className={linkClasses}
                aria-current={isActive ? 'page' : undefined}
                aria-haspopup="true"
                aria-expanded={isProjectsOpen}
                id="nav-projects-trigger"
              >
                {route.title}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>

              {/* Invisible hover bridge + Compact Dropdown Panel */}
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
                    'w-56 sm:w-60 rounded-2xl p-2.5 overflow-hidden transition-colors duration-300',
                    isInverse
                      ? 'bg-[#0E2413] border border-[#245832] shadow-[0_16px_36px_rgba(0,0,0,0.5)]'
                      : 'bg-[#FAF6F0] border border-[#D5C09D]/80 shadow-[0_16px_36px_rgba(26,22,17,0.14)]'
                  )}
                >
                  {/* List of projects if populated */}
                  {projects.length > 0 ? (
                    <div className="space-y-0.5" role="none">
                      {projects.map((project) => (
                        <Link
                          key={project.slug}
                          href={`/projects/${project.slug}`}
                          onClick={() => setIsProjectsOpen(false)}
                          className={cn(
                            'flex items-center justify-between px-3 py-2 text-[13px] font-sans rounded-xl transition-all duration-150 group/item focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary',
                            isInverse
                              ? 'text-[#FAF7F2]/90 hover:text-brand-primary hover:bg-[#163A20]'
                              : 'text-text-primary/90 hover:text-brand-primary hover:bg-surface-subtle'
                          )}
                          role="menuitem"
                        >
                          <span className="truncate">{project.name}</span>
                          <ArrowRight
                            className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-brand-primary flex-shrink-0 ml-2"
                            aria-hidden="true"
                          />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div
                      className={cn(
                        'px-3 py-2.5 text-xs font-sans italic select-none',
                        isInverse ? 'text-[#8A9C90]' : 'text-text-muted'
                      )}
                    >
                      No projects available yet
                    </div>
                  )}

                  {/* Divider */}
                  <div
                    className={cn(
                      'my-1.5 border-t',
                      isInverse ? 'border-[#1E4D2A]' : 'border-border-subtle'
                    )}
                    role="separator"
                  />

                  {/* View All Projects link */}
                  <Link
                    href="/projects"
                    onClick={() => setIsProjectsOpen(false)}
                    className={cn(
                      'flex items-center justify-between px-3 py-2 text-xs font-sans font-semibold rounded-xl transition-all duration-150 group/all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary',
                      isInverse
                        ? 'text-brand-primary hover:text-[#76e52c] hover:bg-[#163A20]'
                        : 'text-brand-primary hover:text-brand-dark hover:bg-surface-subtle'
                    )}
                    role="menuitem"
                  >
                    <span>View All Projects</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-transform duration-150 group-hover/all:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
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
