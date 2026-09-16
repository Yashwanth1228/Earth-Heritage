import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Earth Heritage Official Logo Component
 * 
 * Supports:
 * - 'dark': for light backgrounds (green emblem + dark corporate obsidian wordmark)
 * - 'light': for dark backgrounds (green emblem + white wordmark)
 * - 'mark': emblem mark only (the stylized H with leaf 'e')
 */
export default function Logo({
  variant = 'dark',
  size = 'md',
  className,
  asLink = true,
  href = '/',
  priority = false
}) {
  // Proportional sizing based on authentic logo aspect ratio (555w x 618h = 0.898)
  const sizes = {
    sm: { height: 36, width: variant === 'mark' ? 36 : 32 },
    navbar: { height: 48, width: variant === 'mark' ? 48 : 43 },
    md: { height: 48, width: variant === 'mark' ? 48 : 43 },
    lg: { height: 68, width: variant === 'mark' ? 68 : 61 },
    xl: { height: 88, width: variant === 'mark' ? 88 : 79 },
    footer: { height: 104, width: variant === 'mark' ? 104 : 93 }
  };

  const currentSize = sizes[size] || sizes.md;

  const logoSrcs = {
    dark: '/images/earth-heritage-logo-dark-cropped.png',
    light: '/images/earth-heritage-logo-light-cropped.png',
    mark: '/images/earth-heritage-mark.png'
  };

  const src = logoSrcs[variant] || logoSrcs.dark;

  // Specialized Navbar Logo rendering: emblem on top with prominently scaled authentic wordmark below
  if (size === 'navbar') {
    const wordmarkSrc = variant === 'light'
      ? '/images/earth-heritage-wordmark-light.png'
      : '/images/earth-heritage-wordmark-dark.png';

    const content = (
      <div
        className={cn(
          'inline-flex flex-col items-center justify-center select-none flex-shrink-0 transition-transform duration-200',
          className
        )}
      >
        {/* Emblem on top */}
        <div className="relative h-[23px] w-[23px] sm:h-[26px] sm:w-[26px] flex-shrink-0">
          <Image
            src="/images/earth-heritage-mark.png"
            alt="Earth Heritage Emblem"
            fill
            sizes="64px"
            priority={priority}
            className="object-contain object-center"
          />
        </div>

        {/* Wordmark below emblem: prominently scaled with seamless 300ms opacity cross-fade */}
        <div className="relative h-[13px] w-[66px] sm:h-[15px] sm:w-[76px] mt-0.5 flex-shrink-0">
          <Image
            src="/images/earth-heritage-wordmark-dark.png"
            alt="Earth Heritage"
            fill
            sizes="160px"
            priority={priority}
            className={cn(
              'object-contain object-center transition-opacity duration-300 ease-out',
              variant === 'light' ? 'opacity-0 pointer-events-none' : 'opacity-100'
            )}
          />
          <Image
            src="/images/earth-heritage-wordmark-light.png"
            alt="Earth Heritage"
            fill
            sizes="160px"
            priority={priority}
            className={cn(
              'object-contain object-center transition-opacity duration-300 ease-out',
              variant === 'light' ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
          />
        </div>
      </div>
    );

    if (asLink) {
      return (
        <Link
          href={href}
          className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm transition-opacity hover:opacity-95"
          aria-label="Earth Heritage Pvt. Ltd. — Return to Homepage"
        >
          {content}
        </Link>
      );
    }

    return content;
  }

  const content = (
    <div
      className={cn(
        'relative inline-flex items-center select-none flex-shrink-0 transition-transform duration-200',
        size === 'footer' && 'h-[76px] w-[68px] sm:h-[90px] sm:w-[81px] lg:h-[104px] lg:w-[93px]',
        className
      )}
      style={
        size !== 'footer'
          ? { height: `${currentSize.height}px`, width: `${currentSize.width}px` }
          : undefined
      }
    >
      <Image
        src={src}
        alt="Earth Heritage Pvt. Ltd."
        fill
        sizes={size === 'footer' ? '200px' : '96px'}
        priority={priority}
        className="object-contain object-center"
      />
    </div>
  );

  if (asLink) {
    return (
      <Link
        href={href}
        className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm transition-opacity hover:opacity-95"
        aria-label="Earth Heritage Pvt. Ltd. — Return to Homepage"
      >
        {content}
      </Link>
    );
  }

  return content;
}

