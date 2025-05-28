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
        'fixed z-10 w-full text-xs uppercase',
        theme === 'light'
          ? 'from-convergence-beige/100 to-convergence-beige/0 text-convergence-brown bg-linear-to-b from-50%'
          : 'from-convergence-teal/100 to-convergence-teal/0 text-convergence-beige bg-linear-to-b from-50%',
      )}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container h-[7.375rem] pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Media
                resource={theme === 'light' ? data.logoLight : data.logoDark}
              />
            </Link>
            <p>|</p>
            <p>Oklahoma City</p>
          </div>
          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  );
};
