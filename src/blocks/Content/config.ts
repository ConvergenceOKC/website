import {
  AlignFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import type { Block, Field } from 'payload';

import { ContentPathway } from '@/blocks/ContentPathway/config';
import { Embed } from '@/blocks/Embed/config';
import { HouseChurchMap } from '@/blocks/HouseChurchMap/config';
import { IconBlock } from '@/blocks/IconBlock/config';
import { ImageCarousel } from '@/blocks/ImageCarousel/config';
import { MessagesBlock } from '@/blocks/Messages/config';
import { SliderGallery } from '@/blocks/SliderGallery/config';
import { StaffBlock } from '@/blocks/StaffBlock/config';
import { link } from '@/fields/link';

import { ButtonBlock } from '../ButtonBlock/config';
import { FormBlock } from '../Form/config';
import { LinkGroupBlock } from '../LinkGroupBlock/config';
import { MediaBlock } from '../MediaBlock/config';

const settingsFields: Field[] = [
  {
    name: 'paddingTop',
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
    name: 'paddingBottom',
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
    name: 'backgroundImage',
    type: 'upload',
    relationTo: 'media',
  },
  {
    type: 'row',
    fields: [
      {
        name: 'blendMode',
        label: 'Background Image Blend Mode',
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
        name: 'imageOpacity',
        type: 'select',
        options: [
          { label: 'Opaque', value: '100' },
          { label: '75% Opaque', value: '75' },
          { label: '50% Opaque', value: '50' },
          { label: '25% Opaque', value: '25' },
          { label: '10% Opaque', value: '10' },
        ],
        defaultValue: '100',
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
    defaultValue: 'full',
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
        label: 'One Fourth',
        value: 'oneFourth',
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
              ImageCarousel,
              MessagesBlock,
              HouseChurchMap,
              Embed,
              IconBlock,
              StaffBlock,
            ],
          }),
          AlignFeature(),
          OrderedListFeature(),
          UnorderedListFeature(),
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
      initCollapsed: false,
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
