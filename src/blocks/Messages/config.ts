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
          label: 'Recent Messages',
          value: 'recentMessages',
        },
      ],
      defaultValue: 'latest',
      required: true,
    },
    {
      name: 'useLatestMessage',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        condition: (_, { block }) => block === 'moreSeries',
      },
    },
    {
      name: 'excludeLatestMessage',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        condition: (_, { block }) => block === 'recentMessages',
      },
    },
    {
      name: 'message',
      label: 'Message',
      type: 'relationship',
      relationTo: 'messages',
      hasMany: false,
      required: false,
      admin: {
        condition: (_, { block, useLatestMessage }) =>
          block === 'moreSeries' && !useLatestMessage,
      },
    },
  ],
};
