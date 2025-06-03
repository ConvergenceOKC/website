import { Block } from 'payload';

import { link } from '@/fields/link';

import { revalidatePage } from './revalidatePage';

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
      type: 'row',
      fields: [
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
          name: 'titleColor',
          type: 'select',
          options: [
            {
              label: 'Brown',
              value: 'brown',
            },
            {
              label: 'Teal',
              value: 'teal',
            },
            {
              label: 'Beige',
              value: 'beige',
            },
            {
              label: 'Orange',
              value: 'orange',
            },
            {
              label: 'Blue',
              value: 'blue',
            },
          ],
          defaultValue: 'orange',
          admin: {
            condition: (data, siblingData, { blockData }) => {
              return blockData?.showMegaTitle;
            },
          },
        },
      ],
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
