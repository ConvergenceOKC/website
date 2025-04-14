'use client';

import React, { useEffect } from 'react';

import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import type { Page } from '@/payload-types';
import { useHeaderTheme } from '@/providers/HeaderTheme';

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
}) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme('dark');
  });

  return (
    <div className="text-cream relative flex pt-[7.375rem]" data-theme="dark">
      <div className="relative container mt-20 mb-24 flex">
        <div className="">
          {richText && (
            <RichText
              className="mb-6"
              data={richText}
              enableGutter={false}
              enableProse={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[50vh] select-none">
        {media && typeof media === 'object' && (
          <Media
            fill
            imgClassName="-z-10 object-cover mix-blend-luminosity"
            priority
            resource={media}
          />
        )}
      </div>
    </div>
  );
};
