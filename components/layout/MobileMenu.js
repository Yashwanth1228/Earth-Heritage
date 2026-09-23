'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X,
  ChevronDown,
  ArrowRight,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Facebook
} from 'lucide-react';
import { headerNavRoutes } from '@/data/routes';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/Logo';
import { useEnquiry } from '@/context/EnquiryContext';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * Premium Mobile Navigation Drawer for Earth Heritage
 * 
 * Refinements:
 * 1. Background Scroll-Lock & Independent Drawer Scrolling:
 *    - Uses unified lockScroll / unlockScroll to pause Lenis and lock body/html scrolling.
 *    - data-lenis-prevent="true" prevents touch/wheel interception by Lenis.
 *    - overscroll-contain & touch-pan-y ensure user can scroll down through all menu items smoothly.
 * 2. Signature Earth Heritage Aesthetic:
 *    - Warm biscuit/ivory gradient background (#FAF7F2 -> #F6EEE2 -> #EFE5D3).
 *    - Subtle topographic contour vector watermark (LandContourPattern).
 *    - Editorial serif typography with mono index stamps [01, 02, ...].
 *    - Warm pill indicators for active items and expandable project cards.
 *    - Earth Heritage luxury Talk to Us button with company green gradient.
 *    - Social media connection icons with signature logo green hover (#55C40D).
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

  // Robust body & Lenis scroll locking when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute('data-mobile-menu-open', 'true');
      window.dispatchEvent(new CustomEvent('mobile-menu-toggle', { detail: { isOpen: true } }));
      lockScroll();
    } else {
      document.body.removeAttribute('data-mobile-menu-open');
      window.dispatchEvent(new CustomEvent('mobile-menu-toggle', { detail: { isOpen: false } }));
      unlockScroll();
      setIsProjectsExpanded(false);
    }
    return () => {
      document.body.removeAttribute('data-mobile-menu-open');
      window.dispatchEvent(new CustomEvent('mobile-menu-toggle', { detail: { isOpen: false } }));
      unlockScroll();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden pointer-events-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      {/* 1. Dark Translucent Organic Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-[#0B170E]/65 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        onTouchMove={(e) => {
          if (e.target === e.currentTarget) e.preventDefault();
        }}
        onWheel={(e) => {
          if (e.target === e.currentTarget) e.preventDefault();
        }}
        aria-hidden="true"
      />

      {/* 2. Premium Drawer Panel with Topographic Texture */}
      <div
        ref={drawerRef}
        data-lenis-prevent="true"
        className={cn(
          'fixed inset-y-0 right-0 w-full max-w-[340px] sm:max-w-md h-full',
          'bg-gradient-to-b from-[#FAF7F2] via-[#F6EEE2] to-[#EFE5D3]',
          'border-l border-[#DECDB3] shadow-[-16px_0_40px_rgba(14,36,19,0.22)]',
          'flex flex-col z-50 overflow-hidden touch-pan-y overscroll-contain',
          'transition-transform duration-300 ease-out'
        )}
      >
        {/* Background Topographic Living-Land Contour Pattern */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-35 overflow-hidden">
          <LandContourPattern variant="biscuit-contours" />
        </div>

        {/* A. Fixed/Sticky Header in Drawer */}
        <div className="relative z-10 shrink-0 px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between border-b border-[#DECDB3]/80 bg-[#FAF7F2]/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Logo variant="dark" size="navbar" onClick={onClose} />
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EAE0CD]/70 border border-[#DACBB0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#5E523C] font-semibold">
                Menu
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-1 rounded-full bg-[#EAE0CD]/80 hover:bg-[#DDCFB5] text-[#15341C] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary active:scale-95"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* B. Independent Scrollable Content Area */}
        <div
          data-lenis-prevent="true"
          className="relative z-10 flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 py-5 space-y-6 touch-pan-y"
        >
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation Links">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C7A5A] font-semibold px-3 pb-1">
              Index & Navigation
            </span>

            {headerNavRoutes.map((route, idx) => {
              const isProjects = route.path === '/projects';
              const isActive = pathname === route.path || (route.path !== '/' && pathname.startsWith(route.path));
              const indexStr = `0${idx + 1}`;

              if (isProjects) {
                return (
                  <div key={route.path} className="flex flex-col">
                    <div
                      className={cn(
                        'flex items-center justify-between rounded-xl transition-all duration-150',
                        isActive
                          ? 'bg-[#EDE2CD] text-[#15341C] border-l-4 border-[#1E460B] shadow-2xs font-semibold'
                          : 'text-[#334237] hover:bg-[#EDE2CD]/60 hover:text-[#15341C]'
                      )}
                    >
                      <Link
                        href={route.path}
                        onClick={onClose}
                        className="flex-1 flex items-center gap-3 py-3 px-3.5"
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className="font-mono text-xs font-semibold text-[#8C7A5A]">
                          {indexStr}
                        </span>
                        <span className="font-serif text-lg sm:text-xl font-medium tracking-tight">
                          {route.title}
                        </span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => setIsProjectsExpanded((prev) => !prev)}
                        className="p-3 mr-1 text-[#8C7A5A] hover:text-[#15341C] focus-visible:outline-none rounded-lg"
                        aria-label="Toggle projects submenu"
                        aria-expanded={isProjectsExpanded}
                      >
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 transition-transform duration-200',
                            isProjectsExpanded && 'rotate-180 text-[#1E460B]'
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    {/* Expandable Projects Submenu Card */}
                    {isProjectsExpanded && (
                      <div className="ml-3 pl-3 pr-2 py-2 mt-1 mb-2 rounded-xl bg-[#EBE0CC]/70 border border-[#DACBB0] flex flex-col space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C7A5A] font-semibold px-2 pt-1 pb-0.5">
                          Selected Properties
                        </span>
                        {projects.length > 0 ? (
                          projects.map((project) => (
                            <Link
                              key={project.slug}
                              href={`/projects/${project.slug}`}
                              onClick={onClose}
                              className="text-xs sm:text-[13px] font-sans py-2 px-2.5 text-[#334237] hover:text-[#15341C] hover:bg-[#E0D3BC]/60 rounded-lg transition-colors flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1E460B] shrink-0" />
                              <span className="font-medium line-clamp-1">{project.name}</span>
                            </Link>
                          ))
                        ) : (
                          <span className="text-xs font-sans py-2 px-2 text-[#8C7A5A] italic select-none">
                            No projects available yet
                          </span>
                        )}
                        <Link
                          href="/projects"
                          onClick={onClose}
                          className="text-xs font-sans font-semibold pt-2 pb-1.5 px-2.5 text-[#1E460B] hover:text-[#15341C] transition-colors inline-flex items-center gap-1.5 border-t border-[#D6C5A6] mt-1"
                        >
                          <span>Explore All Farmland Projects</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
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
                    'flex items-center gap-3 py-3 px-3.5 rounded-xl transition-all duration-150',
                    isActive
                      ? 'bg-[#EDE2CD] text-[#15341C] border-l-4 border-[#1E460B] shadow-2xs font-semibold'
                      : 'text-[#334237] hover:bg-[#EDE2CD]/60 hover:text-[#15341C]'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="font-mono text-xs font-semibold text-[#8C7A5A]">
                    {indexStr}
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-medium tracking-tight">
                    {route.title}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Brand Creed Pill */}
          <div className="p-3.5 rounded-2xl bg-[#EBE0CC]/50 border border-[#DECDB3] text-center space-y-1">
            <p className="font-serif italic text-xs sm:text-[13px] text-[#15341C] font-medium">
              &ldquo;Land is more than an asset. It is a living legacy.&rdquo;
            </p>
            <span className="block font-mono text-[9px] uppercase tracking-widest text-[#8C7A5A]">
              Earth Heritage Stewardship
            </span>
          </div>
        </div>

        {/* C. Drawer Bottom Sticky Action Strip */}
        <div className="relative z-10 shrink-0 px-5 sm:px-6 py-4 sm:py-5 border-t border-[#DECDB3] bg-[#F5EDE0]/95 backdrop-blur-md space-y-3.5">
          <button
            type="button"
            onClick={(e) => {
              onClose();
              openEnquiryModal('General Enquiry', e.currentTarget);
            }}
            className={cn(
              'w-full inline-flex items-center justify-center font-sans font-semibold select-none rounded-full',
              'py-3.5 px-6 text-sm tracking-wide text-[#FAF6F0]',
              'bg-[linear-gradient(135deg,#163A20_0%,#24552A_50%,#1E460B_100%)]',
              'border border-[#2E6838]/60 shadow-[0_4px_16px_rgba(22,58,32,0.22)]',
              'transition-all duration-200 ease-out',
              'hover:bg-[linear-gradient(135deg,#1C4627_0%,#2B6132_50%,#24540E_100%)]',
              'hover:border-[#3E824A]/80 hover:shadow-[0_6px_20px_rgba(22,58,32,0.30)]',
              'hover:scale-[1.01] active:scale-[0.99]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
            )}
          >
            Talk to Us
          </button>

          {/* Social Icons Strip matching Footer with Logo Green Hover */}
          <div className="flex items-center justify-center gap-2.5 pt-1" aria-label="Social connections">
            {[
              { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
              { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
              { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
              { icon: Twitter, label: 'X (Twitter)', href: 'https://x.com' },
              { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#E6DBCA] border border-[#DACAB0] text-[#3A4A3C] hover:bg-[#55C40D] hover:border-[#55C40D] hover:text-[#0E2413] hover:scale-110 shadow-2xs hover:shadow-[0_4px_12px_rgba(85,196,13,0.35)] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                <social.icon className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>

          <p className="text-center font-sans text-[11px] text-[#8C7A5A]">
            Back to roots. Forward with purpose.
          </p>
        </div>
      </div>
    </div>
  );
}
