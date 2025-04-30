import { CollectionConfig } from 'payload';

import { authenticated } from '@/access/authenticated';

export const Sermons: CollectionConfig<'sermons'> = {
  slug: 'sermons',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'speaker', 'series'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MMMM d, yyy',
        },
      },
    },
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
      name: 'speaker',
      type: 'relationship',
      relationTo: 'staff',
      hasMany: false,
      required: true,
    },
    {
      name: 'series',
      type: 'relationship',
      relationTo: 'sermonSeries',
      hasMany: false,
      required: false,
    },
    {
      name: 'scripture',
      type: 'array',
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: 'book',
          type: 'text',
          required: true,
        },
        {
          name: 'chapter',
          type: 'number',
          required: true,
        },
        {
          name: 'verses',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'thumbnail',
      label: 'Thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'video',
      label: 'Video URL',
      type: 'text',
      required: true,
    },
    {
      name: 'audio',
      label: 'Audio URL',
      type: 'text',
      required: false,
    },
    {
      name: 'notes',
      label: 'Notes URL',
      type: 'text',
      required: false,
    },
  ],
};
