import React from 'react';

import { HighImpactHero } from '@/heros/HighImpact';
import { LowImpactHero } from '@/heros/LowImpact';
import { MediumImpactHero } from '@/heros/MediumImpact';
import type { Page } from '@/payload-types';

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
};

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {};

  if (!type || type === 'none') return <div className="pt-16 md:pt-28" />;

  const HeroToRender = heroes[type];

  if (!HeroToRender) return <div className="pt-16 md:pt-28" />;

  return <HeroToRender {...props} />;
};
