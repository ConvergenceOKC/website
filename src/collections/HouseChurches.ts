import { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

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
    defaultColumns: [
      'name',
      'locationDescription',
      'facilitator',
      'time',
      'status',
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'locationDescription',
      type: 'text',
      required: true,
    },
    {
      name: 'facilitator',
      type: 'text',
      required: true,
    },
    {
      name: 'time',
      type: 'text',
      required: true,
    },
    {
      name: 'language',
      type: 'select',
      options: [
        {
          label: 'English',
          value: 'english',
        },
        {
          label: 'Spanish',
          value: 'spanish',
        },
      ],
      defaultValue: 'english',
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
}
