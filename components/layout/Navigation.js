'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { headerNavRoutes } from '@/data/routes';
import { cn } from '@/lib/utils';

/**
 * Accessible desktop navigation menu with active route tracking and inverse state support
 */
export default function Navigation({ className, isInverse = false }) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'hidden lg:flex items-center space-x-4 lg:space-x-4.5 xl:space-x-6 2xl:space-x-7.5',
        className
      )}
      aria-label="Main Navigation"
    >
      {headerNavRoutes.map((route) => {
        const isActive = pathname === route.path || (route.path !== '/' && pathname.startsWith(route.path));
        return (
          <Link
            key={route.path}
            href={route.path}
            className={cn(
              'text-[13.5px] xl:text-[14.5px] 2xl:text-[15px] font-sans tracking-normal whitespace-nowrap transition-colors duration-150 relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm',
              isInverse
                ? isActive
                  ? 'text-text-inverse font-semibold'
                  : 'text-text-inverse-secondary hover:text-text-inverse font-[520]'
                : isActive
                ? 'text-text-primary font-semibold'
                : 'text-text-primary/85 hover:text-text-primary font-[520]'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {route.title}
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full"
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
