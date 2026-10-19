'use client';

import { cn } from '@/lib/utils';

/**
 * AnimatedTitle: Displays title and heading words naturally as before,
 * ensuring complete font fidelity with full descenders (never cutting off letters like 'y', 'g', 'p', 'q')
 * and preserving all two-tone colors, italics, responsive scaling, and typography.
 */
export default function AnimatedTitle({
  children,
  className,
  as: Component = 'h2',
  theme,
  delay,
  duration,
  withUnderline,
  underlineColor,
  underlineDelay,
  ...props
}) {
  return (
    <Component className={cn(className)} {...props}>
      {children}
    </Component>
  );
}
