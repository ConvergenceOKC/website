import { CollectionConfig } from 'payload';

import { anyone } from '@/access/anyone';
import { authenticated } from '@/access/authenticated';

import { revalidateDelete, revalidateMap } from './hooks/revalidateMap';

export const HouseChurches: CollectionConfig = {
  slug: 'house-churches',
  labels: {
    singular: 'House Church',
    plural: 'House Churches',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'facilitator', 'status'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'facilitator',
      label: 'Facilitator(s)',
      type: 'text',
      required: true,
    },
    {
      name: 'locationDescription',
      type: 'text',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'zip',
      type: 'number',
      required: true,
    },
    {
      name: 'time',
      type: 'text',
      required: true,
    },
    {
      name: 'language',
      label: 'Language(s)',
      type: 'text',
      defaultValue: 'English',
      required: true,
    },
    {
      name: 'notes',
      type: 'text',
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
    {
      name: 'lat',
      label: 'Latitude',
      type: 'number',
      required: true,
      defaultValue: 35.54078384255158,
    },
    {
      name: 'lng',
      label: 'Longitude',
      type: 'number',
      required: true,
      defaultValue: -97.45800992201534,
    },
  ],
  hooks: {
    afterChange: [revalidateMap],
    afterDelete: [revalidateDelete],
  },
};
