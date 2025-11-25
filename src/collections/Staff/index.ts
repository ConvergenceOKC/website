import { ParagraphFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { CollectionConfig } from 'payload';

import { authenticated } from '@/access/authenticated';
import { revalidateStaff } from '@/collections/Staff/hooks/revalidateStaff';

export const Staff: CollectionConfig<'staff'> = {
  slug: 'staff',
  labels: {
    singular: 'Staff',
    plural: 'Staff',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'email', 'phone', 'status'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  defaultSort: 'name',
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
      name: 'isSpeaker',
      label: 'Show in list of message speakers?',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'If checked, this staff member will be available to select as a speaker on messages.',
      },
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
      type: 'richText',
      required: false,
      editor: lexicalEditor({
        features: () => {
          return [ParagraphFeature()];
        },
      }),
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
  hooks: {
    afterChange: [revalidateStaff],
    afterDelete: [revalidateStaff],
  },
};
