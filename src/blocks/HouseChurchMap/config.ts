import { Block } from 'payload';

export const HouseChurchMap: Block = {
  slug: 'houseChurchMap',
  interfaceName: 'HouseChurchMapBlock',
  fields: [
    {
      name: 'showMainChurch',
      type: 'checkbox',
      label: 'Show Convergence Church on Map',
      defaultValue: true,
      required: true,
    },
  ],
};
