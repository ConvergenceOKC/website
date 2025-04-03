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
      name: 'platforms',
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
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
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
