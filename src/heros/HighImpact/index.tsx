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
    <div
      className="text-convergence-beige relative flex h-[80vh] min-h-[900px] overflow-hidden pt-[7.375rem]"
      data-theme="dark"
    >
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
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden select-none">
        {media && typeof media === 'object' && (
          <Media
            fill
            imgClassName="object-cover w-full h-full"
            videoClassName="object-cover w-full h-full"
            priority
            className="h-full w-full"
            resource={media}
          />
        )}
      </div>
      <div className="bg-convergence-teal/70 absolute inset-0 -z-10 h-full w-full overflow-hidden" />
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-[url(/images/bg-pattern-white-green.jpg)] bg-cover bg-center bg-blend-multiply mix-blend-multiply" />
    </div>
  );
};
