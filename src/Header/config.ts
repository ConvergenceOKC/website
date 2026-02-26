import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
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
      name: 'showBanner',
      label: 'Show Banner',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'banner',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      admin: {
        condition: (_, siblingData) => Boolean(siblingData.showBanner),
      },
    },
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
        {
          name: 'hasSubItems',
          label: 'Has Dropdown Menu',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'subItems',
          type: 'array',
          label: 'Dropdown Menu Items',
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 8,
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.hasSubItems),
            initCollapsed: true,
            components: {
              RowLabel: '@/Header/SubItemRowLabel#SubItemRowLabel',
            },
          },
        },
      ],
      maxRows: 8,
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
