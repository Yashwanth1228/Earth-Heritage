import { cn } from '@/lib/utils';

/**
 * Corporate Badge Component
 * 
 * Variants:
 * - 'brand': Subtle Earth Heritage green background with high-contrast forest text
 * - 'neutral': Subtle stone background with slate text
 * - 'dark': Dark obsidian background with inverse text
 */
export default function Badge({
  children,
  variant = 'brand',
  size = 'md',
  className
}) {
  const variants = {
    brand: 'bg-brand-light text-brand-deep border border-brand-primary/20',
    neutral: 'bg-surface-subtle text-text-secondary border border-border',
    dark: 'bg-surface-dark text-text-inverse border border-border-dark'
  };

  const sizes = {
    sm: 'text-[11px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
    lg: 'text-sm px-3.5 py-1.5'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-sans font-medium tracking-wide uppercase rounded-sm',
        variants[variant] || variants.brand,
        sizes[size] || sizes.md,
        className
      )}
    >
      {children}
    </span>
  );
}
