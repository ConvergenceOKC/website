import type { GlobalConfig } from 'payload';

import { authenticated } from '@/access/authenticated';
import { link } from '@/fields/link';

import { revalidateSocials } from './hooks/revalidateSocials';

export const Socials: GlobalConfig = {
  slug: 'socials',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'socials',
      label: 'Social Platforms',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Socials/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateSocials],
  },
};
