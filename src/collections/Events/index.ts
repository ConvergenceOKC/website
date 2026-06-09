import { CollectionConfig } from 'payload';

import { anyone } from '@/access/anyone';
import { authenticated } from '@/access/authenticated';

import { revalidateDelete, revalidateEvents } from './hooks/revalidateEvents';

export const Events: CollectionConfig<'events'> = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['date', 'name', 'description', 'location'],
  },
  defaultSort: '-date',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'MMMM d, yyy h:mm a',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'requiresRegistration',
      label: 'Requires Registration',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'url',
      label: 'Registration URL',
      type: 'text',
      required: false,
      admin: {
        description: 'Link to the registration page for this event.',
        condition: (data) => data?.requiresRegistration === true,
      },
    },
    {
      name: 'image',
      label: 'Hero Background Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
  hooks: {
    afterChange: [revalidateEvents],
    afterDelete: [revalidateDelete],
  },
};
