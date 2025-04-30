import { Block } from 'payload';

import { link } from '@/fields/link';

export const ImageCarousel: Block = {
  slug: 'imageCarousel',
  interfaceName: 'ImageCarouselBlock',
  fields: [
    {
      name: 'showTitle',
      type: 'checkbox',
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        condition: (data, siblingData) => siblingData.showTitle,
      },
    },
    {
      name: 'backgroundShape',
      type: 'select',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Shape 1',
          value: 'shape1',
        },
        {
          label: 'Shape 2',
          value: 'shape2',
        },
        {
          label: 'Shape 3',
          value: 'shape3',
        },
        {
          label: 'Shape 4',
          value: 'shape4',
        },
      ],
      defaultValue: 'none',
      hooks: {
        afterChange: [],
      },
    },
    {
      name: 'autoPlayInterval',
      type: 'number',
      defaultValue: 5,
    },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        link({
          appearances: false,
          disableLabel: true,
        }),
      ],
    },
  ],
};
