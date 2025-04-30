import { CollectionConfig } from 'payload';

import { authenticated } from '@/access/authenticated';

export const Roles: CollectionConfig<'roles'> = {
  slug: 'roles',
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
      name: 'description',
      type: 'textarea',
      required: false,
    },
  ],
};
