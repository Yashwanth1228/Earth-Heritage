import { cn } from '@/lib/utils';
import Container from '@/components/ui/Container';

/**
 * Standardized semantic section wrapper
 */
export default function SectionWrapper({
  id,
  children,
  className,
  containerSize = 'default',
  containerClassName,
  as: Component = 'section',
  padding = 'default',
  pattern,
  ...props
}) {
  const paddingStyles = {
    none: 'py-0',
    sm: 'py-12 sm:py-16',
    default: 'py-16 sm:py-24',
    lg: 'py-20 sm:py-32'
  };

  return (
    <Component
      id={id}
      className={cn('relative w-full overflow-hidden', paddingStyles[padding], className)}
      {...props}
    >
      {pattern}
      <Container size={containerSize} className={cn('relative z-10', containerClassName)}>
        {children}
      </Container>
    </Component>
  );
}
