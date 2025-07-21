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
      <div className="text-convergence-beige/60 before:border-convergence-beige relative py-6 text-xs before:pointer-events-none before:absolute before:inset-0 before:w-full before:border-t-[1px] before:mix-blend-overlay md:py-12">
        <div className="container grid grid-cols-1 items-center gap-4 md:grid-cols-5 md:gap-8">
          <div className="text-center md:col-span-2 md:text-left">
            &copy; {new Date().getFullYear()} {copyright}
          </div>
          <div className="flex flex-col justify-center gap-2 sm:flex-row md:col-span-2 md:justify-start">
            {privacy && (
              <CMSLink
                appearance="link"
                className="text-convergence-beige/60 text-center text-xs font-normal md:text-left"
                reference={{
                  relationTo: 'pages',
                  value: privacy,
                }}
                type={'reference'}
                label="Privacy Policy"
              />
            )}
            {privacy && terms && <span className="hidden sm:inline">|</span>}
            {terms && (
              <CMSLink
                appearance="link"
                className="text-convergence-beige/60 text-center text-xs md:text-left"
                reference={{
                  relationTo: 'pages',
                  value: terms,
                }}
                type={'reference'}
                label="Terms of Service"
              />
            )}
          </div>
          <div className="flex justify-center gap-4 opacity-60 md:justify-end">
            {socials.platforms &&
              socials.platforms.map((social, i) => {
                return (
                  <Link
                    href={social.url}
                    key={i}
                    target="_blank"
                    className="transition-opacity hover:opacity-80"
                  >
                    <Media
                      resource={social.icon}
                      placeholder={false}
                      className="h-5 w-5 md:h-6 md:w-6"
                    />
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </footer>
  );
}
