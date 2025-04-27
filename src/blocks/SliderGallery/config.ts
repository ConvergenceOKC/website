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
      name: 'backgroundShape',
      type: 'select',
      label: 'Background Shape',
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
        afterChange: [revalidatePage],
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
