import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import { draftMode } from 'next/headers';
import React from 'react';

import { cn } from 'src/utilities/cn';

import { Footer } from '@/Footer/Component';
import { Header } from '@/Header/Component';
import { AdminBar } from '@/components/AdminBar';
import { Providers } from '@/providers';
import { InitTheme } from '@/providers/Theme/InitTheme';
import { getServerSideURL } from '@/utilities/getURL';
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph';

import './globals.css';

export const sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const serif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-serif',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html
      className={cn(sans.variable, serif.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          {/* <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          /> */}
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
};
