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
      name: 'roles',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'role',
          type: 'relationship',
          relationTo: 'roles',
        },
      ],
      admin: {
        description:
          'Select one or more staff roles to display for this block. All staff having this role will be displayed on the site.',
      },
      required: true,
    },
  ],
};
