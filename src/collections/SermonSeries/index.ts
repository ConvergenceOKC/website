import { CollectionConfig } from 'payload';

import { authenticated } from '@/access/authenticated';

export const SermonSeries: CollectionConfig<'sermonSeries'> = {
  slug: 'sermonSeries',
  labels: {
    singular: 'Sermon Series',
    plural: 'Sermon Series',
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
};
