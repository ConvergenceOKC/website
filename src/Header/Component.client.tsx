'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Media } from '@/components/Media';
import type { Header } from '@/payload-types';
import { useHeaderTheme } from '@/providers/HeaderTheme';
import { cn } from '@/utilities/ui';

import { HeaderNav } from './Nav';

interface HeaderClientProps {
  data: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();

  useEffect(() => {
    setHeaderTheme(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme]);

  return (
    <header
      className={cn(
        'text-foreground fixed z-50 w-full text-xs uppercase',
        theme === 'light'
          ? 'from-convergence-beige/100 to-convergence-beige/0 bg-linear-to-b from-50%'
          : 'from-convergence-teal/100 to-convergence-teal/0 bg-linear-to-b from-50%',
      )}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="bg-convergence-bright-orange flex min-h-12 items-center py-3">
        <div className="container font-bold">
          No in-person service on Sunday, January 25 due to inclement weather. A
          virtual service will be held via Zoom at 10am. A link will be provided
          soon.
        </div>
      </div>
      <div className="container h-16 md:h-[7.375rem]">
        <div className="flex h-full items-center justify-between">
          <div className="z-50 flex items-center gap-2 md:gap-4">
            <Link href="/" className="flex-shrink-0">
              <div className="w-24 md:h-auto md:w-auto">
                <Media
                  resource={theme === 'light' ? data.logoLight : data.logoDark}
                  className="h-full w-full object-contain"
                />
              </div>
            </Link>
            <span className="hidden lg:inline">|</span>
            <span className="hidden text-xs lg:block">Oklahoma City</span>
          </div>
          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  );
};
