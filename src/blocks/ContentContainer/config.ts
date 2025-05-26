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
    name: 'backgroundColor',
    type: 'select',
    options: [
      {
        label: 'None',
        value: 'none',
      },
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
    defaultValue: 'none',
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
        label: 'Image Blend Mode',
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
    ],
  },
];

const backgroundShapeFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'backgroundShapes',
        type: 'select',
        options: [
          {
            label: 'None',
            value: 'none',
          },
          {
            label: 'Strata Flow',
            value: 'strataFlow',
          },
          {
            label: 'Strata Ridge (Right)',
            value: 'strataRidgeRight',
          },
          {
            label: 'Strata Ridge (Left)',
            value: 'strataRidgeLeft',
          },
          {
            label: 'Strata Ledge',
            value: 'strataLedge',
          },
          {
            label: 'Strata Clash',
            value: 'strataClash',
          },
        ],
        defaultValue: 'none',
      },
      {
        name: 'position',
        label: 'Anchor Position',
        type: 'select',
        options: [
          {
            label: 'Breakout Top',
            value: 'breakout',
          },
          {
            label: 'Top',
            value: 'top',
          },
          {
            label: 'Center',
            value: 'center',
          },
          {
            label: 'Bottom',
            value: 'bottom',
          },
        ],
        defaultValue: 'top',
        admin: {
          condition: (_, siblingData) => {
            return siblingData?.backgroundShapes !== 'none';
          },
        },
      },
    ],
  },
];

const titleFields: Field[] = [
  {
    name: 'showTitle',
    type: 'checkbox',
    defaultValue: false,
  },
  {
    name: 'title',
    label: 'Title',
    type: 'richText',
    editor: lexicalEditor({
      features: () => {
        return [FixedToolbarFeature(), AlignFeature()];
      },
    }),
    admin: {
      condition: (_, siblingData) => {
        return siblingData?.showTitle;
      },
    },
  },
  {
    type: 'row',
    fields: [
      {
        name: 'size',
        type: 'select',
        options: [
          {
            label: 'Normal',
            value: 'normal',
          },
          {
            label: 'Mega',
            value: 'mega',
          },
        ],
        defaultValue: 'normal',
        admin: {
          condition: (_, siblingData) => {
            return siblingData?.showTitle;
          },
        },
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'color',
        type: 'select',
        options: [
          {
            label: 'Bright White',
            value: 'bright-white',
          },
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
          {
            label: 'Orange',
            value: 'orange',
          },
        ],
        defaultValue: 'deep-green',
        admin: {
          condition: (_, siblingData) => {
            return siblingData?.showTitle;
          },
        },
      },
      {
        name: 'blendMode',
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
            return siblingData?.showTitle;
          },
        },
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'position',
        label: 'Anchor Position',
        type: 'select',
        options: [
          {
            label: 'Above Container',
            value: 'above',
          },
          {
            label: 'Staddle Container',
            value: 'straddle',
          },
          {
            label: 'Inside Container',
            value: 'inside',
          },
        ],
        defaultValue: 'inside',
        admin: {
          condition: (_, siblingData) => {
            return siblingData?.showTitle;
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
    defaultValue: 'full',
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
        condition: (_, siblingData) => {
          return siblingData?.enableLink;
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

export const ContentContainer: Block = {
  slug: 'contentContainer',
  interfaceName: 'ContentContainerBlock',
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
          fields: [
            ...backgroundColorFields,
            ...backgroundImageFields,
            ...backgroundShapeFields,
          ],
        },
        {
          name: 'title',
          label: 'Title',
          fields: titleFields,
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
