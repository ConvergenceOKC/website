import Link from 'next/link';

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
    <footer className="text-convergence-beige [&_h6]:text-convergence-beige [&_label]:text-convergence-beige/60 relative [&_h6]:text-[1rem]">
      <div className="bg-convergence-brown absolute inset-0 -z-10 h-full w-full overflow-hidden" />
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-[url('/images/bg-pattern-blue-red.jpg')] bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay" />
      <RenderBlocks blocks={blocks} />
      <div className="text-convergence-beige/60 before:border-convergence-beige relative py-12 text-xs before:pointer-events-none before:absolute before:inset-0 before:w-full before:border-t-[1px] before:mix-blend-overlay">
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
                className="text-convergence-beige/60 text-xs font-normal"
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
                className="text-convergence-beige/60 text-xs"
                reference={{
                  relationTo: 'pages',
                  value: terms,
                }}
                type={'reference'}
                label="Terms of Service"
              />
            )}
          </div>
          <div className="flex justify-end gap-4 opacity-60">
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
