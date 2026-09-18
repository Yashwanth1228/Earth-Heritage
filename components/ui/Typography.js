import { cn } from '@/lib/utils';

/**
 * Editorial Hero / Display Headline
 * Uses Fraunces editorial serif with controlled line-height and fluid responsive scale.
 */
export function Display({
  as: Component = 'h1',
  children,
  className,
  size = 'default',
  ...props
}) {
  const sizeClasses = {
    hero: 'type-display-hero',
    lg: 'text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight leading-[1.08]',
    default: 'type-page-display',
    sm: 'text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.14]'
  };

  return (
    <Component
      className={cn(
        'font-serif text-text-primary font-normal',
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
 * Levels 1 & 2 use Fraunces editorial serif, Levels 3-6 use refined architectural hierarchy.
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
    1: 'font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-tight leading-[1.12]',
    2: 'font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal tracking-tight leading-[1.15]',
    3: 'font-serif text-xl sm:text-2xl md:text-3xl font-normal tracking-tight leading-snug',
    4: 'font-sans text-lg sm:text-xl font-medium leading-snug',
    5: 'font-sans text-base sm:text-lg font-medium leading-normal',
    6: 'font-sans text-sm sm:text-base font-medium leading-normal'
  };

  return (
    <Tag
      className={cn(
        'text-text-primary',
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
 * Uses Inter supporting sans with crisp uppercase tracking.
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
 * Uses Inter supporting sans for maximum readability and comfortable line-height.
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

/**
 * Editorial Number (01, 02, 03)
 * Uses Fraunces light serif for distinctive chapter/step numbering.
 */
export function EditorialNumber({
  children,
  className,
  ...props
}) {
  return (
    <span
      className={cn('type-number-editorial text-brand-deep select-none', className)}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * Editorial Pull Quote
 */
export function Quote({
  children,
  className,
  ...props
}) {
  return (
    <blockquote
      className={cn('type-quote text-text-primary', className)}
      {...props}
    >
      {children}
    </blockquote>
  );
}
