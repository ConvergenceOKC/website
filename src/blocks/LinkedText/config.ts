import { Block } from 'payload';

export const LinkedText: Block = {
  slug: 'linkedText',
  fields: [
    {
      name: 'leftText',
      label: 'Left Text Block',
      type: 'text',
      required: true,
    },
    {
      name: 'rightText',
      label: 'Right Text Block',
      type: 'text',
      required: true,
    },
  ],
  interfaceName: 'LinkedText',
};
