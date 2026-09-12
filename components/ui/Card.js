import { cn } from '@/lib/utils';

export function Card({
  as: Component = 'div',
  children,
  className,
  hoverable = false,
  ...props
}) {
  return (
    <Component
      className={cn(
        'rounded-md border border-border bg-surface p-6 sm:p-8 transition-all duration-200',
        hoverable && 'hover:border-border-strong hover:shadow-card-hover cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('flex flex-col space-y-2 pb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ as: Component = 'h3', children, className, ...props }) {
  return (
    <Component
      className={cn('font-sans text-xl font-medium tracking-tight text-text-primary', className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardDescription({ children, className, ...props }) {
  return (
    <p className={cn('text-sm text-text-secondary leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={cn('text-text-secondary text-sm leading-relaxed', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div className={cn('pt-4 flex items-center border-t border-border-subtle mt-4', className)} {...props}>
      {children}
    </div>
  );
}
