import Link from 'next/link';
import React from 'react';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import type { Footer, Page, Social } from '@/payload-types';
import { getCachedGlobal } from '@/utilities/getGlobals';

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as Footer;
  const leftNavItems = footerData?.leftColumn.navItems || [];
  const middleNavItems = footerData?.middleColumn.navItems || [];
  const rightNavItems = footerData?.rightColumn.navItems || [];
  const form = footerData?.form;
  const privacy = footerData?.privacyPolicy as Page;
  const terms = footerData?.terms as Page;
  const socials = (await getCachedGlobal('socials', 1)()) as Social;

  return (
    <footer className="bg-deep-green bg-[url('/images/shapes-footer.svg')] bg-bottom bg-no-repeat text-cream">
      <div className="py-16">
        <div className="container grid grid-cols-5 items-start gap-8">
          <Link className="flex items-center" href="/">
            <Media resource={footerData.logo} />
          </Link>
          <div className="flex flex-col">
            <h6>{footerData.leftColumn.title}</h6>
            <nav className="flex flex-col gap-1">
              {leftNavItems.map(({ link }, i) => {
                return (
                  <CMSLink
                    className="!subtitle text-taupe"
                    appearance={'link'}
                    key={i}
                    {...link}
                  />
                );
              })}
            </nav>
          </div>
          <div className="flex flex-col">
            <h6>{footerData.middleColumn.title}</h6>
            <nav className="flex flex-col gap-1">
              {middleNavItems.map(({ link }, i) => {
                return (
                  <CMSLink
                    className="!subtitle text-taupe"
                    appearance={'link'}
                    key={i}
                    {...link}
                  />
                );
              })}
            </nav>
          </div>
          <div className="flex flex-col">
            <h6>{footerData.rightColumn.title}</h6>
            <nav className="flex flex-col gap-1">
              {rightNavItems.map(({ link }, i) => {
                return (
                  <CMSLink
                    className="!subtitle text-taupe"
                    appearance={'link'}
                    key={i}
                    {...link}
                  />
                );
              })}
            </nav>
          </div>
          {form && (
            <div className="flex flex-col">
              <h6>Subscribe to our Newsletter</h6>
              <span className="text-xs text-taupe">
                <RenderBlocks blocks={form} />
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="subtitle relative py-16 text-taupe before:pointer-events-none before:absolute before:inset-0 before:w-full before:border-t-[1px] before:border-taupe before:mix-blend-overlay">
        <div className="container grid grid-cols-5 items-start gap-8">
          <div className="col-span-2">
            <p>
              &copy; {new Date().getFullYear()} Convergence OKC. All rights
              reserved.
            </p>
          </div>
          <div className="col-span-2 flex gap-2">
            {privacy && (
              <CMSLink
                appearance="link"
                className="text-xs text-taupe"
                reference={{
                  relationTo: 'pages',
                  value: privacy,
                }}
                type={'reference'}
                label="Privacy Policy"
              />
            )}
            {privacy && terms && <span>|</span>}
            {terms && (
              <CMSLink
                appearance="link"
                className="text-xs text-taupe"
                reference={{
                  relationTo: 'pages',
                  value: terms,
                }}
                type={'reference'}
                label="Terms of Service"
              />
            )}
          </div>
          <div className="flex justify-end gap-4">
            {socials.platforms &&
              socials.platforms.map((social, i) => {
                return (
                  <Link href={social.url} key={i} target="_blank">
                    <Media resource={social.icon} placeholder={false} />
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </footer>
  );
}
