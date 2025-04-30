import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import { Block } from 'payload';

import { ButtonBlock } from '../ButtonBlock/config';
import { LinkedText } from '../LinkedText/config';
import { MediaBlock } from '../MediaBlock/config';

export const ContentPathway: Block = {
  slug: 'contentPathway',
  interfaceName: 'ContentPathwayBlock',
  fields: [
    {
      name: 'alignment',
      type: 'select',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
      ],
      defaultValue: 'left',
      required: true,
    },
    {
      name: 'contentItems',
      label: 'Content Items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({
                  enabledHeadingSizes: ['h3', 'h4', 'h5', 'h6'],
                }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                BlocksFeature({
                  blocks: [LinkedText, MediaBlock, ButtonBlock],
                }),
              ];
            },
          }),
        },
        {
          name: 'displayMode',
          type: 'select',
          options: [
            {
              label: 'Inline',
              value: 'inline',
            },
            {
              label: 'Popover',
              value: 'popover',
            },
          ],
          defaultValue: 'inline',
          required: true,
        },
        {
          name: 'popoverSide',
          type: 'select',
          options: [
            {
              label: 'Left',
              value: 'left',
            },
            {
              label: 'Right',
              value: 'right',
            },
          ],
          defaultValue: 'left',
          required: true,
          admin: {
            condition: (data, siblingData) => {
              return siblingData?.displayMode === 'popover';
            },
          },
        },
        {
          name: 'anchorPoint',
          type: 'select',
          options: [
            {
              label: 'Top',
              value: 'start',
            },
            {
              label: 'Center',
              value: 'center',
            },
            {
              label: 'Bottom',
              value: 'end',
            },
          ],
          defaultValue: 'center',
          required: true,
          admin: {
            condition: (data, siblingData) => {
              return siblingData?.displayMode === 'popover';
            },
          },
        },
      ],
      admin: {
        components: {
          RowLabel: '@/blocks/ContentPathway/RowLabel#RowLabel',
        },
      },
    },
  ],
};
