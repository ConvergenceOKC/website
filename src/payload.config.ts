import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { Footer } from '@/Footer/config';
import { Header } from '@/Header/config';
import { Socials } from '@/Socials/config';
import { Categories } from '@/collections/Categories';
import { HouseChurches } from '@/collections/HouseChurches';
import { Media } from '@/collections/Media';
import { MessageSeries } from '@/collections/MessageSeries';
import { Messages } from '@/collections/Messages';
import { Pages } from '@/collections/Pages';
import { Posts } from '@/collections/Posts';
import { Roles } from '@/collections/Roles';
import { Staff } from '@/collections/Staff';
import { Users } from '@/collections/Users';
import { defaultLexical } from '@/fields/defaultLexical';
import { plugins } from '@/plugins';
import { getServerSideURL } from '@/utilities/getURL';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    HouseChurches,
    Messages,
    MessageSeries,
    Staff,
    Roles,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, Socials],
  plugins: [
    ...plugins,
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
