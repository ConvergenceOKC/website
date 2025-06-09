import { Block } from 'payload';

export const MessagesBlock: Block = {
  slug: 'messagesBlock',
  interfaceName: 'MessagesBlock',
  fields: [
    {
      name: 'block',
      label: 'Select Message Block',
      type: 'select',
      options: [
        {
          label: 'Latest Message',
          value: 'latest',
        },
        {
          label: 'More From Series',
          value: 'moreSeries',
        },
        {
          label: 'Recent Series',
          value: 'recentSeries',
        },
        {
          label: 'Message Archive',
          value: 'archive',
        },
      ],
      defaultValue: 'latest',
      required: true,
    },
    {
      name: 'series',
      label: 'Series',
      type: 'relationship',
      relationTo: 'messageSeries',
      hasMany: false,
      required: false,
      admin: {
        condition: (_, { block }) => block === 'moreSeries',
      },
    },
  ],
};
