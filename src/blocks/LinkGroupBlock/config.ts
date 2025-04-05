import { Block } from 'payload';

import { linkGroup } from '@/fields/linkGroup';

export const LinkGroupBlock: Block = {
  slug: 'linkGroupBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    linkGroup({
      appearances: false,
    }),
  ],
  interfaceName: 'LinkGroupBlock',
};
