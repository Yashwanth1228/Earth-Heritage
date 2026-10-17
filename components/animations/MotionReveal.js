'use client';

import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

/**
 * MotionReveal component for clean, performant viewport entrance animations
 * Supports directional reveals (up, down, left, right) and custom offsets
 * Gracefully degrades when prefers-reduced-motion is active
 */
export default function MotionReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  yOffset = 24,
  xOffset = 0,
  direction = 'up',
  as = 'div'
}) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  let initialX = xOffset;
  let initialY = yOffset;

  if (direction === 'left') {
    initialX = xOffset || -40;
    initialY = 0;
  } else if (direction === 'right') {
    initialX = xOffset || 40;
    initialY = 0;
  } else if (direction === 'down') {
    initialY = -Math.abs(yOffset || 24);
    initialX = 0;
  } else if (direction === 'up' && xOffset === 0) {
    initialY = yOffset;
    initialX = 0;
  }

  return (
    <Component
      initial={{ opacity: 0, x: initialX, y: initialY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
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
