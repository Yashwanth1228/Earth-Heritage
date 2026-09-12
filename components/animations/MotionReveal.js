'use client';

import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

/**
 * MotionReveal component for clean, performant viewport entrance animations
 * Gracefully degrades when prefers-reduced-motion is active
 */
export default function MotionReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  yOffset = 24,
  as = 'div'
}) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Component
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
