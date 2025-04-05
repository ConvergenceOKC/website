import type { GlobalConfig } from 'payload';

import { authenticated } from '@/access/authenticated';
import { Content } from '@/blocks/Content/config';

import { revalidateFooter } from './hooks/revalidateFooter';

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Content],
    },
    {
      name: 'privacyPolicy',
      label: 'Privacy Policy',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: false,
      required: false,
    },
    {
      name: 'terms',
      label: 'Terms & Conditions',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: false,
      required: false,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
};
