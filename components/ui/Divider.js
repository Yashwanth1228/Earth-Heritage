import { cn } from '@/lib/utils';

/**
 * Architectural Divider Component
 */
export default function Divider({ className, subtle = false, orientation = 'horizontal' }) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn(
          'w-px h-full',
          subtle ? 'bg-border-subtle' : 'bg-border',
          className
        )}
      />
    );
  }

  return (
    <hr
      role="separator"
      className={cn(
        'w-full border-0',
        subtle ? 'h-px bg-border-subtle' : 'h-px bg-border',
        className
      )}
    />
  );
}
