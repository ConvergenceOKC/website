'use client';

import React, { useEffect } from 'react';

import RichText from '@/components/RichText';
import { LowImpactHeroClient } from '@/heros/LowImpact/index.client';
import type { Page } from '@/payload-types';
import { useHeaderTheme } from '@/providers/HeaderTheme';
import { cn } from '@/utilities/ui';

type LowImpactHeroType =
  | {
      children?: React.ReactNode;
      richText?: never;
      variant?: 'light' | 'dark';
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never;
      richText?: Page['hero']['richText'];
      variant?: 'light' | 'dark';
    });

export const LowImpactHero: React.FC<LowImpactHeroType> = ({
  children,
  richText,
  variant = 'light',
}) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme(variant);
  });

  return (
    <div
      className={cn(
        "bg-[url('/images/bg-pattern-white-green.jpg')] bg-cover bg-bottom",
        variant === 'dark' &&
          'bg-convergence-teal text-convergence-beige bg-blend-color-burn',
        variant === 'light' && 'bg-convergence-beige bg-blend-multiply',
      )}
    >
      <div className="container pt-36 pb-16 md:pt-52 md:pb-28 lg:pt-56 lg:pb-40">
        <div className="max-w-[50rem]">
          {children ||
            (richText && (
              <RichText
                data={richText}
                enableGutter={false}
                enableProse={false}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
