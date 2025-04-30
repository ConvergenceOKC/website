import { Block } from 'payload';

import { linkGroup } from '@/fields/linkGroup';

export const ButtonBlock: Block = {
  slug: 'buttonBlock',
  interfaceName: 'ButtonBlock',
  fields: [linkGroup()],
};
