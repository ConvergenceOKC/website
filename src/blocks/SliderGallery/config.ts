import { Block } from 'payload';

import { link } from '@/fields/link';

export const SliderGallery: Block = {
  slug: 'sliderGallery',
  interfaceName: 'SliderGalleryBlock',
  fields: [
    {
      name: 'autoPlayInterval',
      type: 'number',
      defaultValue: 5,
    },
    {
      name: 'source',
      type: 'select',
      options: [
        {
          label: 'Images',
          value: 'images',
        },
        {
          label: 'Events',
          value: 'events',
        },
      ],
      defaultValue: 'images',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      admin: {
        condition: (_, siblingData) => {
          return siblingData?.source === 'images';
        },
      },
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
