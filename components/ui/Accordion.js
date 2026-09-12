'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Accessible Corporate Accordion Item
 */
export function AccordionItem({ title, children, defaultOpen = false, id }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = `${id}-content`;
  const buttonId = `${id}-button`;

  return (
    <div className="border-b border-border py-4">
      <button
        id={buttonId}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex w-full items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary py-2 group"
      >
        <span className="font-sans text-lg font-medium text-text-primary group-hover:text-black transition-colors">
          {title}
        </span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-text-muted transition-transform duration-200 group-hover:text-text-primary',
            isOpen && 'transform rotate-180 text-brand-primary'
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div id={contentId} role="region" aria-labelledby={buttonId} className="pt-2 pb-4 text-text-secondary text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

export function Accordion({ children, className }) {
  return <div className={cn('w-full border-t border-border', className)}>{children}</div>;
}
