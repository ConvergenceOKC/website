'use client';

import React from 'react';

import { CMSLink } from '@/components/Link';
import type { Header as HeaderType } from '@/payload-types';

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || [];

  return (
    <nav className="flex items-center gap-6">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance={link.appearance}
            className="text-xs text-inherit"
          />
        );
      })}
    </nav>
  );
};
