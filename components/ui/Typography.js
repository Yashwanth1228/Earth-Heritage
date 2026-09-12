import { cn } from '@/lib/utils';

/**
 * Editorial Hero / Display Headline
 */
export function Display({
  as: Component = 'h1',
  children,
  className,
  size = 'default',
  ...props
}) {
  const sizeClasses = {
    lg: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-display',
    default: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-display',
    sm: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-heading'
  };

  return (
    <Component
      className={cn(
        'font-sans text-text-primary font-medium',
        sizeClasses[size] || sizeClasses.default,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Semantic Heading (H1 - H6)
 */
export function Heading({
  level = 2,
  as,
  children,
  className,
  size,
  ...props
}) {
  const Tag = as || `h${level}`;

  const defaultSizes = {
    1: 'text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-heading',
    2: 'text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-heading',
    3: 'text-xl sm:text-2xl md:text-3xl font-medium tracking-tight leading-snug',
    4: 'text-lg sm:text-xl font-medium leading-snug',
    5: 'text-base sm:text-lg font-medium leading-normal',
    6: 'text-sm sm:text-base font-medium leading-normal'
  };

  return (
    <Tag
      className={cn(
        'font-sans text-text-primary',
        size ? size : defaultSizes[level],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/**
 * Section Eyebrow / Label
 */
export function Subtitle({
  as: Component = 'p',
  children,
  className,
  ...props
}) {
  return (
    <Component
      className={cn(
        'font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase text-brand-deep',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Body Paragraph
 */
export function Body({
  as: Component = 'p',
  children,
  className,
  size = 'default',
  ...props
}) {
  const sizeClasses = {
    lead: 'text-lg sm:text-xl leading-relaxed text-text-secondary font-normal',
    default: 'text-base leading-relaxed text-text-secondary font-normal',
    sm: 'text-sm leading-normal text-text-secondary font-normal'
  };

  return (
    <Component
      className={cn(
        'font-sans',
        sizeClasses[size] || sizeClasses.default,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Caption & Meta text
 */
export function Caption({
  as: Component = 'span',
  children,
  className,
  ...props
}) {
  return (
    <Component
      className={cn('font-sans text-xs text-text-muted leading-tight', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
