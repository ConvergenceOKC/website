import { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import Link from 'next/link';

import configPromise from '@payload-config';
import { getPayload } from 'payload';
import Balancer from 'react-wrap-balancer';

import { MessageInfoBar } from '@/blocks/Messages/MessageInfoBar';
import { MoreFromSeries } from '@/blocks/Messages/MoreFromSeries';
import { RenderBreadcrumbs } from '@/components/Breadcrumbs';
import { MediaPlayer } from '@/components/MediaPlayer';
import { PayloadRedirects } from '@/components/PayloadRedirects';
import { Button } from '@/components/ui/button';
import { generateMeta } from '@/utilities/generateMeta';

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const messages = await payload.find({
    collection: 'messages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = messages.docs.map(({ slug }) => {
    return { slug };
  });

  return params;
}

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

export default async function Message({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise;
  const url = '/messages/' + slug;
  const message = await queryMessageBySlug({ slug });

  if (!message) return <PayloadRedirects url={url} />;

  const breadcrumbs = [
    { id: '0', label: 'Home', url: '/' },
    { id: '1', label: 'Messages', url: '/messages' },
  ];

  if (message.series) {
    breadcrumbs.push(
      {
        id: '2',
        label: 'Series',
        url: '/messages/series',
      },
      {
        id: '3',
        label: message.series.title,
        url: `/messages/series/${message.series.slug}`,
      },
    );
  }

  return (
    <>
      <div className="container pt-16 pb-24 md:pt-28">
        <RenderBreadcrumbs
          breadcrumbs={breadcrumbs}
          variant="light"
          enableGutter={false}
        />
        <h3 className="mt-6 mb-2 md:mt-10">
          <Balancer>{message.title}</Balancer>
        </h3>
        {/* Message Info Bar */}
        <MessageInfoBar message={message} />
        <p>{message.description}</p>
        {/* Message Button Bar */}
        <div className="mb-10 flex flex-col gap-3 sm:flex-row">
          {message.notes && (
            <Button asChild variant={'secondary'}>
              <Link href={message.notes}>Sermon Notes</Link>
            </Button>
          )}
          {message.series && (
            <Button asChild variant={'secondary'}>
              <Link href={`/messages/series/${message.series.slug}`}>
                More In This Series
              </Link>
            </Button>
          )}
          {/* <Button variant={'secondary'}>
              <Link href={'/messages'}>All Messages</Link>
            </Button> */}
        </div>
        {/* Message Player */}
        <MediaPlayer message={message} />
      </div>
      <div className="bg-convergence-beige-darker flex flex-col gap-16 py-24">
        <div className="container">
          <MoreFromSeries message={message} />
        </div>
      </div>
    </>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise;
  const message = await queryMessageBySlug({ slug });

  return generateMeta({ doc: message });
}

const queryMessageBySlug = ({ slug }: { slug: string }) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config: configPromise });

      const result = await payload.find({
        collection: 'messages',
        draft: false,
        limit: 1,
        overrideAccess: false,
        pagination: false,
        where: {
          slug: {
            equals: slug,
          },
        },
      });

      return result.docs?.[0] || null;
    },
    [`${slug}`],
    { tags: [`${slug}`] },
  )();
