import { ParagraphFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { CollectionConfig } from 'payload';

import { authenticated } from '@/access/authenticated';
import {
  revalidateDelete,
  revalidateSeries,
} from '@/collections/MessageSeries/hooks/revalidateSeries';
import { slugField } from '@/fields/slug';

export const MessageSeries: CollectionConfig<'messageSeries'> = {
  slug: 'messageSeries',
  labels: {
    singular: 'Message Series',
    plural: 'Message Series',
  },
  admin: {
    useAsTitle: 'title',
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  defaultSort: '-updatedAt',
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
      type: 'richText',
      required: false,
      editor: lexicalEditor({
        features: () => {
          return [ParagraphFeature()];
        },
      }),
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateSeries],
    afterDelete: [revalidateDelete],
  },
};
