import type { Block } from 'payload';

import { link } from '@/fields/link';

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
