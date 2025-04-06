import Link from 'next/link';
import React from 'react';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import type { ContentBlock, Footer, Page, Social } from '@/payload-types';
import { getCachedGlobal } from '@/utilities/getGlobals';

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as Footer;
  const blocks = footerData?.layout as ContentBlock[];
  const copyright = footerData?.copyright as string;
  const privacy = footerData?.privacyPolicy as Page;
  const terms = footerData?.terms as Page;
  const socials = (await getCachedGlobal('socials', 1)()) as Social;

  return (
    <footer className="bg-deep-green text-cream bg-[url('/images/shapes-footer.svg')] bg-bottom bg-no-repeat">
      <RenderBlocks blocks={blocks} />
      <div className="text-taupe before:border-taupe relative py-12 text-xs before:pointer-events-none before:absolute before:inset-0 before:w-full before:border-t-[1px] before:mix-blend-overlay">
        <div className="container grid grid-cols-5 items-center gap-8">
          <div className="col-span-2">
            <p>
              &copy; {new Date().getFullYear()} {copyright}
            </p>
          </div>
          <div className="col-span-2 flex gap-2">
            {privacy && (
              <CMSLink
                appearance="link"
                className="text-taupe text-xs font-normal"
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
                className="text-taupe text-xs"
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
