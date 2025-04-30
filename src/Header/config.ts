import type { GlobalConfig } from 'payload';

import { authenticated } from '@/access/authenticated';
import { link } from '@/fields/link';

import { revalidateHeader } from './hooks/revalidateHeader';

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'logoLight',
      label: 'Logo (Light Header)',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'logoDark',
      label: 'Logo (Dark Header)',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: [
            'link',
            'secondary',
            'ghost',
            'destructive',
            'default',
            'outline',
          ],
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
