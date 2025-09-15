import {
  AlignFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import type { Block } from 'payload';

import { ButtonBlock } from '@/blocks/ButtonBlock/config';

export const IconBlock: Block = {
  slug: 'iconBlock',
  interfaceName: 'IconBlock',
  fields: [
    {
      name: 'gridSize',
      type: 'select',
      required: true,
      options: [
        { label: '3 Column', value: 'grid-cols-3' },
        { label: '4 Column', value: 'grid-cols-4' },
        { label: '5 Column', value: 'grid-cols-5' },
      ],
      defaultValue: 'grid-cols-3',
    },
    {
      name: 'iconSize',
      type: 'select',
      required: true,
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
      defaultValue: 'medium',
    },
    {
      name: 'icons',
      type: 'array',
      label: 'Icons',
      required: true,
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Globe', value: 'globe' },
            { label: 'Phone', value: 'phone' },
            { label: 'Person', value: 'person' },
            { label: 'Email', value: 'email' },
            { label: 'Arrow Left/Right', value: 'arrow-left-right' },
          ],
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({
                  enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'],
                }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                AlignFeature(),
                BlocksFeature({
                  blocks: [ButtonBlock],
                }),
              ];
            },
          }),
        },
      ],
    },
  ],
};
