'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ChevronDown, ArrowRight } from 'lucide-react';
import { headerNavRoutes } from '@/data/routes';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/Logo';
import { useEnquiry } from '@/context/EnquiryContext';

/**
 * Accessible mobile drawer navigation menu with expandable Projects section
 */
export default function MobileMenu({ isOpen, onClose }) {
  const pathname = usePathname();
  const drawerRef = useRef(null);
  const { openEnquiryModal } = useEnquiry();
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsProjectsExpanded(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface-dark/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        className="fixed inset-y-0 right-0 w-full max-w-sm bg-surface border-l border-border p-6 shadow-elevation flex flex-col justify-between overflow-y-auto"
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-border-subtle">
            <Logo variant="dark" size="navbar" onClick={onClose} />
            <button
              type="button"
              onClick={onClose}
              className="p-2 -mr-2 text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col space-y-2" aria-label="Mobile Navigation Links">
            {headerNavRoutes.map((route) => {
              const isProjects = route.path === '/projects';
              const isActive = pathname === route.path || (route.path !== '/' && pathname.startsWith(route.path));

              if (isProjects) {
                return (
                  <div key={route.path} className="flex flex-col">
                    <div
                      className={cn(
                        'flex items-center justify-between rounded-sm transition-colors',
                        isActive
                          ? 'bg-surface-subtle border-l-2 border-brand-primary'
                          : 'hover:bg-surface-subtle'
                      )}
                    >
                      <Link
                        href={route.path}
                        onClick={onClose}
                        className={cn(
                          'flex-1 text-base font-sans font-medium py-2.5 px-3 transition-colors',
                          isActive
                            ? 'text-text-primary font-semibold'
                            : 'text-text-secondary hover:text-text-primary'
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {route.title}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setIsProjectsExpanded((prev) => !prev)}
                        className="p-2.5 mr-1 text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
                        aria-label="Toggle projects submenu"
                        aria-expanded={isProjectsExpanded}
                      >
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 transition-transform duration-200',
                            isProjectsExpanded && 'rotate-180 text-brand-primary'
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    {/* Expandable Submenu */}
                    {isProjectsExpanded && (
                      <div className="ml-4 pl-3 border-l border-border-subtle mt-1.5 mb-2 flex flex-col space-y-1 animate-in fade-in duration-200">
                        {projects.length > 0 ? (
                          projects.map((project) => (
                            <Link
                              key={project.slug}
                              href={`/projects/${project.slug}`}
                              onClick={onClose}
                              className="text-sm font-sans py-2 px-2 text-text-secondary hover:text-brand-primary rounded-sm transition-colors"
                            >
                              {project.name}
                            </Link>
                          ))
                        ) : (
                          <span className="text-xs font-sans py-2 px-2 text-text-muted italic select-none">
                            No projects available yet
                          </span>
                        )}
                        <Link
                          href="/projects"
                          onClick={onClose}
                          className="text-xs font-sans font-semibold py-2 px-2 text-brand-primary hover:text-brand-dark transition-colors inline-flex items-center gap-1.5"
                        >
                          <span>View All Projects</span>
                          <ArrowRight className="w-3 h-3" aria-hidden="true" />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={route.path}
                  href={route.path}
                  onClick={onClose}
                  className={cn(
                    'text-base font-sans font-medium py-2.5 px-3 rounded-sm transition-colors',
                    isActive
                      ? 'bg-surface-subtle text-text-primary font-semibold border-l-2 border-brand-primary'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-subtle'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {route.title}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-border-subtle space-y-3">
          <button
            type="button"
            onClick={(e) => {
              onClose();
              openEnquiryModal('General Enquiry', e.currentTarget);
            }}
            className={cn(
              'w-full inline-flex items-center justify-center font-sans font-semibold select-none rounded-full',
              'py-3 px-5 text-sm tracking-wide text-[#FAF6F0]',
              'bg-[linear-gradient(135deg,#163A20_0%,#24552A_50%,#1E460B_100%)]',
              'border border-[#2E6838]/50 shadow-[0_2px_8px_rgba(22,58,32,0.18)]',
              'transition-all duration-250 ease-out',
              'hover:bg-[linear-gradient(135deg,#1C4627_0%,#2B6132_50%,#24540E_100%)]',
              'hover:border-[#3E824A]/80 hover:scale-[1.01] active:scale-[0.99]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
            )}
          >
            Talk to Us
          </button>
          <p className="text-center font-sans text-xs text-text-muted">
            Back to roots. Forward with purpose.
          </p>
        </div>
      </div>
    </div>
  );
}
