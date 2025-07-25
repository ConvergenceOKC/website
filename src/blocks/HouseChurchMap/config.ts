import { Block } from 'payload';

export const HouseChurchMap: Block = {
  slug: 'houseChurchMap',
  interfaceName: 'HouseChurchMapBlock',
  fields: [
    {
      name: 'showMainChurch',
      type: 'checkbox',
      label: 'Show Main Church Location',
      defaultValue: true,
      required: true,
    },
  ],
};
