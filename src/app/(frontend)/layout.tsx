import type { Metadata } from 'next';
import { DM_Sans, League_Spartan } from 'next/font/google';
import localFont from 'next/font/local';
import React from 'react';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Footer } from '@/Footer/Component';
import { Header } from '@/Header/Component';
import { TailwindIndicator } from '@/components/TailwindIndicator';
import { Providers } from '@/providers';
import { InitTheme } from '@/providers/Theme/InitTheme';
import { getServerSideURL } from '@/utilities/getURL';
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph';
import { cn } from '@/utilities/ui';

import './globals.css';

export const heading = localFont({
  src: '../../../public/fonts/NeueMontreal-Bold.otf',
  variable: '--font-heading',
});

export const subheading = localFont({
  src: '../../../public/fonts/NeueMontreal-Medium.otf',
  variable: '--font-subheading',
});

export const body = localFont({
  src: '../../../public/fonts/NeueMontreal-Regular.otf',
  variable: '--font-body',
});

// export const subheading = League_Spartan({
//   subsets: ['latin'],
//   display: 'swap',
//   weight: '700',
//   variable: '--font-subheading',
// });

// export const body = DM_Sans({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-body',
// });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={cn(heading.variable, subheading.variable, body.variable)}
      lang="en"
      suppressHydrationWarning={true}
    >
      <head>
        <InitTheme />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/assets/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/assets/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
          <TailwindIndicator />
          <Analytics />
          <SpeedInsights />
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
    creator: 'Convergence Church OKC',
  },
};
