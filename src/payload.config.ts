import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { resendAdapter } from '@payloadcms/email-resend';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { attachDatabasePool } from '@vercel/functions';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { Footer } from '@/Footer/config';
import { Header } from '@/Header/config';
import { Socials } from '@/Socials/config';
import { Categories } from '@/collections/Categories';
import { Events } from '@/collections/Events';
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
    autoLogin:
      process.env.NODE_ENV === 'development'
        ? {
            email: process.env.AUTOLOGIN_EMAIL || '',
          }
        : false,
    meta: {
      titleSuffix: ' - Convergence CMS',
      icons: {
        icon: 'assets/favicon.ico',
      },
    },
    components: {
      // beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
      graphics: {
        Icon: '/graphics/Icon/index.tsx#Icon',
        Logo: '/graphics/Logo/index.tsx#Logo',
      },
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
    afterOpenConnection: async (adapter) => {
      const client = adapter.connection.getClient();
      attachDatabasePool(client);
    },
  }),
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    HouseChurches,
    Events,
    Messages,
    MessageSeries,
    Staff,
    Roles,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  email: resendAdapter({
    defaultFromAddress: 'no-reply@convergenceokc.church',
    defaultFromName: 'Convergence Church OKC',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  globals: [Header, Footer, Socials],
  plugins: [
    ...plugins,
    vercelBlobStorage({
      collections: {
        media: {
          generateFileURL: ({ filename }) => {
            return `${process.env.BLOB_STORAGE_BASE_URL}/${filename}`;
          },
        },
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
