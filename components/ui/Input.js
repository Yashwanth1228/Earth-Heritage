import { cn } from '@/lib/utils';

/**
 * Accessible Corporate Form Input & Textarea
 */
export default function Input({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  error,
  required = false,
  className,
  as = 'input',
  rows = 4,
  ...props
}) {
  const Component = as === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={id}
          className="block font-sans text-xs font-medium uppercase tracking-wider text-text-primary"
        >
          {label} {required && <span className="text-error" aria-hidden="true">*</span>}
        </label>
      )}

      <Component
        id={id}
        name={name}
        type={as !== 'textarea' ? type : undefined}
        rows={as === 'textarea' ? rows : undefined}
        placeholder={placeholder}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'w-full bg-surface border border-border rounded-sm px-4 py-3 text-sm text-text-primary',
          'placeholder:text-text-muted transition-colors duration-150',
          'focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary',
          error && 'border-error focus:border-error focus:ring-error',
          className
        )}
        {...props}
      />

      {error && (
        <p id={`${id}-error`} className="text-xs text-error font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
