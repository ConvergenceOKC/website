import type { Metadata } from 'next';
import { DM_Sans, League_Spartan } from 'next/font/google';
import localFont from 'next/font/local';
import { draftMode } from 'next/headers';
import React from 'react';

import { cn } from 'src/utilities/ui';

import { Footer } from '@/Footer/Component';
import { Header } from '@/Header/Component';
import { TailwindIndicator } from '@/components/TailwindIndicator';
import { Providers } from '@/providers';
import { InitTheme } from '@/providers/Theme/InitTheme';
import { getServerSideURL } from '@/utilities/getURL';
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph';

import './globals.css';

export const heading = localFont({
  src: '../../../public/fonts/TAN-Jambore.woff',
  weight: '400',
  variable: '--font-heading',
});

export const subheading = League_Spartan({
  subsets: ['latin'],
  display: 'swap',
  weight: '700',
  variable: '--font-subheading',
});

export const body = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={cn(heading.variable, subheading.variable, body.variable)}
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
          <Header />
          {children}
          <Footer />
          <TailwindIndicator />
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
