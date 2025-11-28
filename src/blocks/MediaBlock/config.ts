import type { Block } from 'payload';

import { link } from '@/fields/link';
import { Media } from '@/payload-types';

const sizes: Array<
  (Media extends { sizes?: infer S } ? keyof S : never) | 'original'
> = [
  'original',
  '16:9',
  '4:3',
  'xlarge',
  'large',
  'medium',
  'small',
  'square',
  'thumbnail',
  'og',
];

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'size',
      type: 'select',
      options: sizes.map((key) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        value: key,
      })),
      defaultValue: 'original',
      required: true,
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      defaultValue: false,
    },
    link({
      appearances: false,
      disableLabel: true,
      overrides: {
        admin: {
          condition: (data, siblingData) => {
            return siblingData?.enableLink;
          },
        },
      },
    }),
  ],
};
