import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import path from 'path';
import type { CollectionConfig } from 'payload';
import { fileURLToPath } from 'url';

import { anyone } from '../access/anyone';
import { authenticated } from '../access/authenticated';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  folders: true,
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
    },
  ],
  defaultSort: '-updatedAt',
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: ({ doc }: { doc: any }) => {
      // Fixes some media thumbnail URLs still pointing to the old API route instead of the new Vercel Storage URL
      // This workaround prevents having to reupload all media to update the thumbnail URLs
      if (doc?.sizes?.thumbnail?.url?.includes('api/media')) {
        return `https://wyjpvuoo7aiqaczo.public.blob.vercel-storage.com/${doc?.sizes?.thumbnail?.filename}`;
      } else {
        return doc?.sizes?.thumbnail?.url;
      }
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: '16:9',
        width: 1400,
        height: 788,
      },
      {
        name: '4:3',
        width: 900,
        height: 675,
      },
      {
        name: 'panoramic',
        width: 1400,
        height: 560,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
};
