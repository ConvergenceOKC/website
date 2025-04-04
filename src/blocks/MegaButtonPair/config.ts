import { Block } from 'payload';

import { link } from '@/fields/link';

export const MegaButtonPair: Block = {
  slug: 'megaButtonPair',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'leftButton',
          label: 'Left Button',
          fields: [
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            link({
              appearances: false,
              disableLabel: true,
            }),
          ],
        },
        {
          name: 'rightButton',
          label: 'Right Button',
          fields: [
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            link({
              appearances: false,
              disableLabel: true,
            }),
          ],
        },
      ],
    },
  ],
  interfaceName: 'MegaButtonPair',
};
