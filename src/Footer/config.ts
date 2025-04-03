import type { GlobalConfig } from 'payload';

import { authenticated } from '@/access/authenticated';
import { FormBlock } from '@/blocks/Form/config';
import { link } from '@/fields/link';

import { revalidateFooter } from './hooks/revalidateFooter';

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'leftColumn',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'navItems',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 5,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/RowLabel#RowLabel',
            },
          },
        },
      ],
    },
    {
      name: 'middleColumn',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'navItems',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 5,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/RowLabel#RowLabel',
            },
          },
        },
      ],
    },
    {
      name: 'rightColumn',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'navItems',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 5,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/RowLabel#RowLabel',
            },
          },
        },
      ],
    },
    {
      name: 'form',
      type: 'blocks',
      blocks: [FormBlock],
      maxRows: 1,
      required: false,
    },
    {
      name: 'privacyPolicy',
      label: 'Privacy Policy Page',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: false,
      required: false,
    },
    {
      name: 'terms',
      label: 'Terms & Conditions Page',
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
