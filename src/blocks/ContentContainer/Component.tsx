import {
  AlignFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import { Block, Field } from 'payload';

import { ButtonBlock } from '@/blocks/ButtonBlock/config';
import { FormBlock } from '@/blocks/Form/config';
import { LinkGroupBlock } from '@/blocks/LinkGroupBlock/config';
import { MediaBlock } from '@/blocks/MediaBlock/config';
import { link } from '@/fields/link';

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'Full',
        value: 'full',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'One Fifth',
        value: 'oneFifth',
      },
    ],
  },
  {
    name: 'richText',
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
          BlocksFeature({
            blocks: [FormBlock, MediaBlock, LinkGroupBlock, ButtonBlock],
          }),
          AlignFeature(),
        ];
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    appearances: [
      'link',
      'secondary',
      'ghost',
      'destructive',
      'default',
      'outline',
    ],
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink);
        },
      },
    },
  }),
];

export const ContentContainer: Block = {
  slug: 'contentContainer',
  interfaceName: 'ContentContainerBlock',
  fields: [
    {
      name: 'backgroundColor',
      type: 'select',
      options: [
        {
          label: 'Cream',
          value: 'cream',
        },
        {
          label: 'Taupe',
          value: 'taupe',
        },
        {
          label: 'Charcoal',
          value: 'charcoal',
        },
        {
          label: 'Deep Green',
          value: 'deep-green',
        },
      ],
      defaultValue: 'cream',
    },
    {
      name: 'backgroundTexture',
      type: 'select',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Shapes',
          value: 'shapes',
        },
      ],
      defaultValue: 'none',
    },
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
};
