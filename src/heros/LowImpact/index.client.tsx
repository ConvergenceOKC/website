'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useHeaderTheme } from '@/providers/HeaderTheme';
import { cn } from '@/utilities/ui';

type LowImpactHeroType = { displayMode: 'light' | 'dark' };

export const LowImpactHeroClient: React.FC<LowImpactHeroType> = ({
  displayMode,
}) => {
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
    <div
      className={cn(
        "absolute inset-0 -z-10 bg-[url('/images/bg-pattern-white-green.jpg')] bg-cover bg-bottom bg-blend-color-dodge",
        displayMode === 'light' ? '' : 'bg-convergence-brown',
      )}
    />
  );
};
