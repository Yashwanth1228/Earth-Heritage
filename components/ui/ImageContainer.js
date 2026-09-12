import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Accessible Next.js Image wrapper with aspect ratio and fallback handling
 */
export default function ImageContainer({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  aspectRatio = '16/9',
  className,
  imageClassName,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}) {
  if (!alt && process.env.NODE_ENV !== 'production') {
    console.warn('ImageContainer: alt text is required for accessibility.');
  }

  const aspectStyles = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '3/2': 'aspect-[3/2]',
    '21/9': 'aspect-[21/9]',
    auto: 'aspect-auto'
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-surface-subtle',
        aspectStyles[aspectRatio] || 'aspect-[16/9]',
        className
      )}
    >
      <Image
        src={src}
        alt={alt || ''}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        sizes={sizes}
        className={cn('object-cover transition-opacity duration-300', imageClassName)}
        {...props}
      />
    </div>
  );
}
