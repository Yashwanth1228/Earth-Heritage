import { cn } from '@/lib/utils';

/**
 * Accessible Skip to Main Content Link for keyboard users
 */
export default function SkipLink({ targetId = 'main-content', label = 'Skip to main content', className }) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        'sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50',
        'focus:px-4 focus:py-2.5 focus:rounded-md',
        'focus:bg-surface-elevated focus:text-content-primary',
        'focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-accent',
        'text-sm font-medium transition-transform duration-200',
        className
      )}
    >
      {label}
    </a>
  );
}
