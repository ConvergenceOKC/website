import { Block } from 'payload';

export const StaffBlock: Block = {
  slug: 'staffBlock',
  interfaceName: 'StaffBlock',
  fields: [
    {
      name: 'layout',
      type: 'select',
      options: [
        {
          label: '2-Column with Bios',
          value: '2-col',
        },
        {
          label: '3-Column without Bios',
          value: '3-col',
        },
      ],
      defaultValue: '2-col',
      required: true,
    },
    {
      name: 'staff',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'staffMember',
          type: 'relationship',
          relationTo: 'staff',
        },
      ],
      admin: {
        description: 'Select one or more staff members to display.',
      },
      required: true,
    },
  ],
};
