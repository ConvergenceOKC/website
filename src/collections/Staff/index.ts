import { CollectionConfig } from 'payload';

import { authenticated } from '@/access/authenticated';

export const Staff: CollectionConfig<'staff'> = {
  slug: 'staff',
  labels: {
    singular: 'Staff',
    plural: 'Staff',
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Role(s)',
      type: 'relationship',
      relationTo: 'roles',
      hasMany: true,
      required: false,
    },
    {
      name: 'email',
      type: 'text',
      required: false,
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
    },
    {
      name: 'headshot',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'bio',
      type: 'textarea',
      required: false,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Inactive',
          value: 'inactive',
        },
      ],
      defaultValue: 'active',
      required: true,
    },
  ],
};
