import { Block } from 'payload';

import { link } from '@/fields/link';

export const ImageCarousel: Block = {
  slug: 'imageCarousel',
  interfaceName: 'ImageCarouselBlock',
  fields: [
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
