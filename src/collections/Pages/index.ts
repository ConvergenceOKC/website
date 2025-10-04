import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields';
import type { CollectionConfig } from 'payload';

import { ContentPathway } from '@/blocks/ContentPathway/config';
import { Embed } from '@/blocks/Embed/config';
import { HouseChurchMap } from '@/blocks/HouseChurchMap/config';
import { IconBlock } from '@/blocks/IconBlock/config';
import { ImageCarousel } from '@/blocks/ImageCarousel/config';
import { MessagesBlock } from '@/blocks/Messages/config';
import { SliderGallery } from '@/blocks/SliderGallery/config';
import { slugField } from '@/fields/slug';
import { hero } from '@/heros/config';

import { authenticated } from '../../access/authenticated';
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished';
import { Archive } from '../../blocks/ArchiveBlock/config';
import { CallToAction } from '../../blocks/CallToAction/config';
import { Content } from '../../blocks/Content/config';
import { FormBlock } from '../../blocks/Form/config';
import { MediaBlock } from '../../blocks/MediaBlock/config';
import { populatePublishedAt } from '../../hooks/populatePublishedAt';
import { generatePreviewPath } from '../../utilities/generatePreviewPath';
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage';

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  defaultSort: 'title',
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        });

        return path;
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                SliderGallery,
                ContentPathway,
                ImageCarousel,
                MessagesBlock,
                HouseChurchMap,
                Embed,
                IconBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
        {
          name: 'settings',
          label: 'Settings',
          fields: [
            {
              name: 'enablePageNavigator',
              type: 'checkbox',
              label: 'Enable Page Navigator',
              defaultValue: false,
              admin: {
                description:
                  'Show a page navigator that displays headings from the page content',
                position: 'sidebar',
              },
            },
            {
              name: 'navigatorHeadingLevel',
              type: 'select',
              label: 'Heading Level to Display',
              defaultValue: '2',
              options: [
                {
                  label: '1',
                  value: '1',
                },
                {
                  label: '2',
                  value: '2',
                },
                {
                  label: '3',
                  value: '3',
                },
                {
                  label: '4',
                  value: '4',
                },
                {
                  label: '5',
                  value: '5',
                },
                {
                  label: '6',
                  value: '6',
                },
              ],
              admin: {
                condition: (data) =>
                  data?.settings?.enablePageNavigator === true,
                description:
                  'Select which heading level to include in the page navigator',
                position: 'sidebar',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
