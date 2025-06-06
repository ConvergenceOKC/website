import { Block } from 'payload';

import { linkGroup } from '@/fields/linkGroup';

export const ButtonBlock: Block = {
  slug: 'buttonBlock',
  interfaceName: 'ButtonBlock',
  fields: [
    {
      type: 'select',
      name: 'alignment',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
      defaultValue: 'left',
    },
    linkGroup(),
  ],
};
