import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cache } from 'react';

import configPromise from '@payload-config';
import { Dot } from 'lucide-react';
import { getPayload } from 'payload';
import Balancer from 'react-wrap-balancer';

import { MoreFromSeries } from '@/blocks/Messages/MoreFromSeries';
import { RecentSeries } from '@/blocks/Messages/RecentSeries';
import { Media } from '@/components/Media';
import { PayloadRedirects } from '@/components/PayloadRedirects';
import { Button } from '@/components/ui/button';
import { formatDateTime } from '@/utilities/formatDateTime';
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

  return (
    <div className="container pt-48 pb-32">
      <h4 className="mb-2">
        <Balancer>{message.title}</Balancer>
      </h4>
      <div className="mb-6 flex items-center gap-0 text-sm uppercase opacity-70">
        <span>
          {typeof message.speaker === 'object' && 'name' in message.speaker
            ? message.speaker.name
            : message.speaker}
        </span>
        <Dot />
        <span>{formatDateTime(message.date)}</span>
        {message.series && (
          <>
            <Dot />
            <span>
              {typeof message.series === 'object' && 'title' in message.series
                ? message.series.title
                : message.series}
            </span>
          </>
        )}
        {Array.isArray(message.scripture) && message.scripture.length > 0 && (
          <>
            <Dot />
            <span>
              {message.scripture.map(
                (ref) => `${ref.book} ${ref.chapter}:${ref.verses}`,
              )}
            </span>
          </>
        )}
      </div>
      <p>{message.description}</p>
      {/* Message Button Bar */}
      <div className="mb-10 flex gap-3">
        {message.notes && (
          <Button variant={'secondary'}>
            <Link href={message.notes}>Sermon Notes</Link>
          </Button>
        )}
        {message.series && (
          <Button variant={'secondary'}>
            <Link href={'#more-from-series'}>More In This Series</Link>
          </Button>
        )}
        {/* <Button variant={'secondary'}>
              <Link href={'/messages'}>All Messages</Link>
            </Button> */}
      </div>
      {/* Message Thumbnail */}
      <Link
        href={message.video}
        className="relative cursor-pointer"
        target="_blank"
      >
        <div className="absolute z-10 flex h-full w-full items-center justify-center">
          <Image
            src="/images/play-icon.svg"
            alt="Play button"
            width={100}
            height={100}
          />
        </div>
        <Media resource={message.thumbnail} size="og" className="mb-24" />
      </Link>
      <div className="flex flex-col gap-24">
        <MoreFromSeries message={message} />
        <RecentSeries />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise;
  const message = await queryMessageBySlug({ slug });

  return generateMeta({ doc: message });
}

const queryMessageBySlug = cache(async ({ slug }: { slug: string }) => {
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
});
