import { cn } from '@/lib/utils';

/**
 * Standardized responsive layout container wrapper
 */
export default function Container({
  children,
  className,
  size = 'default',
  as: Component = 'div',
  ...props
}) {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-8xl',
    full: 'max-w-full'
  };

  return (
    <Component
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8',
        sizeClasses[size] || sizeClasses.default,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
