import {
  AlignFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import type { Block, Field } from 'payload';

import { ContentPathway } from '@/blocks/ContentPathway/config';
import { SliderGallery } from '@/blocks/SliderGallery/config';
import { link } from '@/fields/link';

import { ButtonBlock } from '../ButtonBlock/config';
import { FormBlock } from '../Form/config';
import { LinkGroupBlock } from '../LinkGroupBlock/config';
import { MediaBlock } from '../MediaBlock/config';

const settingsFields: Field[] = [
  {
    name: 'padding',
    type: 'select',
    options: [
      {
        label: 'None',
        value: 'none',
      },
      {
        label: 'Small',
        value: 'small',
      },
      {
        label: 'Medium',
        value: 'medium',
      },
      {
        label: 'Large',
        value: 'large',
      },
    ],
    defaultValue: 'medium',
  },
  {
    name: 'enableGutter',
    type: 'checkbox',
    defaultValue: true,
  },
];

const backgroundColorFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'backgroundColor',
        type: 'select',
        options: [
          {
            label: 'None',
            value: 'none',
          },
          {
            label: 'Beige',
            value: 'beige',
          },
          {
            label: 'Teal',
            value: 'teal',
          },
          {
            label: 'Brown',
            value: 'brown',
          },
          {
            label: 'Orange',
            value: 'orange',
          },
          {
            label: 'Blue',
            value: 'blue',
          },
          {
            label: 'Beige Darker',
            value: 'beigeDarker',
          },
        ],
        defaultValue: 'none',
      },
    ],
  },
];

const backgroundImageFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'backgroundImage',
        type: 'upload',
        relationTo: 'media',
      },
      {
        name: 'blendMode',
        label: 'Blend Mode',
        type: 'select',
        options: [
          {
            label: 'None',
            value: 'none',
          },
          {
            label: 'Multiply',
            value: 'multiply',
          },
          {
            label: 'Screen',
            value: 'screen',
          },
          {
            label: 'Overlay',
            value: 'overlay',
          },
          {
            label: 'Color Burn',
            value: 'colorBurn',
          },
        ],
        defaultValue: 'none',
        admin: {
          condition: (_, siblingData) => {
            return siblingData?.backgroundImage;
          },
        },
      },
      {
        name: 'backgroundImageOpacity',
        type: 'number',
        defaultValue: 1,
        admin: {
          condition: (_, siblingData) => {
            return siblingData?.backgroundImage;
          },
        },
      },
    ],
  },
];

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
            blocks: [
              FormBlock,
              MediaBlock,
              LinkGroupBlock,
              ButtonBlock,
              SliderGallery,
              ContentPathway,
            ],
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

const contentFields: Field[] = [
  {
    name: 'columns',
    type: 'array',
    admin: {
      initCollapsed: true,
    },
    fields: columnFields,
  },
];

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'settings',
          label: 'Settings',
          fields: settingsFields,
        },
        {
          name: 'background',
          label: 'Background',
          fields: [...backgroundColorFields, ...backgroundImageFields],
        },
        {
          name: 'content',
          label: 'Content',
          fields: contentFields,
        },
      ],
    },
  ],
};
