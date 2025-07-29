import { Block } from 'payload';

export const Embed: Block = {
  slug: 'embed',
  interfaceName: 'EmbedBlock',
  fields: [
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Privacy Policy',
          value: 'privacy',
        },
        {
          label: 'Terms of Service',
          value: 'terms',
        },
      ],
    },
  ],
};
