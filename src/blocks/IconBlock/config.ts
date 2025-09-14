import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import type { Block } from 'payload';

export const IconBlock: Block = {
  slug: 'iconBlock',
  interfaceName: 'IconBlock',
  fields: [
    {
      name: 'icons',
      type: 'array',
      label: 'Icons',
      required: true,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
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
              ];
            },
          }),
        },
      ],
    },
  ],
};
