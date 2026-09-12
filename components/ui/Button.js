import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Earth Heritage Corporate Button & Link Component
 * 
 * Variants:
 * - 'primary': Confident corporate dark button with subtle hover elevation
 * - 'brand': High-energy accent button in official Earth Heritage green
 * - 'secondary': Subtle surface button for secondary actions
 * - 'outline': Border-only button for tertiary actions
 * - 'text': Understated inline action
 */
export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  loading = false,
  iconLeft: IconLeft,
  iconRight: IconRight,
  type = 'button',
  target,
  rel,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants = {
    primary: 'bg-brand-secondary text-text-inverse hover:bg-black hover:shadow-subtle border border-transparent',
    brand: 'bg-brand-primary text-brand-secondary font-semibold hover:bg-brand-primary-hover hover:shadow-subtle border border-transparent',
    secondary: 'bg-surface-subtle text-text-primary hover:bg-surface border border-border hover:border-border-strong',
    outline: 'bg-transparent text-text-primary hover:bg-surface-subtle border border-border-strong hover:border-brand-secondary',
    text: 'bg-transparent text-text-primary hover:text-brand-deep underline-offset-4 hover:underline p-0'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-2 rounded-sm gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-sm gap-2',
    lg: 'text-base px-6 py-3.5 rounded-md gap-2.5'
  };

  const appliedClasses = cn(
    baseStyles,
    variants[variant] || variants.primary,
    variant !== 'text' && (sizes[size] || sizes.md),
    variant === 'text' && 'inline-flex items-center gap-1.5',
    className
  );

  const content = (
    <>
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
      )}
      {!loading && IconLeft && <IconLeft className="w-4 h-4 flex-shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {!loading && IconRight && <IconRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
    if (isExternal) {
      return (
        <a
          href={href}
          className={appliedClasses}
          target={target || '_blank'}
          rel={rel || 'noopener noreferrer'}
          aria-disabled={disabled}
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={appliedClasses} aria-disabled={disabled} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className={appliedClasses}
      {...props}
    >
      {content}
    </button>
  );
}
