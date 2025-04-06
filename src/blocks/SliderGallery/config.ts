import { Block } from 'payload';
import { block } from 'sharp';

import { link } from '@/fields/link';

import { linkGroup } from '../../fields/linkGroup';

export const SliderGallery: Block = {
  slug: 'sliderGallery',
  interfaceName: 'SliderGalleryBlock',
  fields: [
    {
      name: 'showMegaTitle',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'megaTitle',
      type: 'text',
      label: 'Mega Title',
      required: false,
      admin: {
        condition: (data, siblingData, { blockData }) => {
          return blockData?.showMegaTitle;
        },
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      minRows: 1,
      maxRows: 10,
      admin: {
        components: {
          RowLabel: '@/blocks/SliderGallery/RowLabel#RowLabel',
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
          name: 'caption',
          type: 'textarea',
          label: 'Caption',
          required: false,
        },
        link({
          appearances: false,
          disableLabel: true,
        }),
      ],
    },
  ],
};
