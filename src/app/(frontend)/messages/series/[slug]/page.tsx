import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cache } from 'react';

import configPromise from '@payload-config';
import { Dot } from 'lucide-react';
import { getPayload } from 'payload';
import Balancer from 'react-wrap-balancer';

import { Media } from '@/components/Media';
import { PayloadRedirects } from '@/components/PayloadRedirects';
import RichText from '@/components/RichText';
import { Button } from '@/components/ui/button';
import { formatDateTime } from '@/utilities/formatDateTime';
import { generateMeta } from '@/utilities/generateMeta';

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const series = await payload.find({
    collection: 'messageSeries',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = series.docs.map(({ slug }) => {
    return { slug };
  });

  return params;
}

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

export default async function Series({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise;
  const url = '/messages/series/' + slug;
  const series = await querySeriesBySlug({ slug });

  if (!series) return <PayloadRedirects url={url} />;

  const payload = await getPayload({ config: configPromise });
  const seriesMessages = await payload.find({
    collection: 'messages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    where: {
      series: {
        equals: series.id,
      },
    },
    sort: 'date',
    select: {
      id: true,
      title: true,
      slug: true,
      date: true,
      thumbnail: true,
      description: true,
      scripture: true,
      speaker: true,
      series: true,
      video: true,
    },
  });

  if (!seriesMessages || seriesMessages.docs.length === 0) {
    return <div>No messages found for this series.</div>;
  }

  return (
    <div className="container flex flex-col gap-6 pt-28 pb-24 md:pt-48">
      {/* Series Info */}
      {series.thumbnail && (
        <div className="w-full overflow-hidden rounded-lg">
          <Media
            resource={series.thumbnail}
            imgClassName="max-h-[600px] w-full object-cover object-center"
          />
        </div>
      )}
      <h3 className="mb-2">
        <Balancer>{series.title}</Balancer>
      </h3>
      {series.description && (
        <RichText
          data={series.description}
          enableGutter={false}
          enableProse={false}
        />
      )}
      {/* Series Videos */}
      <div className="flex flex-col gap-6">
        {seriesMessages.docs.map((message) => (
          <Link
            href={'/messages/' + message.slug}
            key={message.id}
            className="bg-convergence-beige-darker md:hover:bg-convergence-beige-darker grid grid-cols-1 items-start gap-4 rounded-lg p-6 transition md:grid-cols-[200px_1fr] md:bg-inherit"
          >
            <div className="w-full overflow-hidden rounded-lg">
              <Media
                resource={message.thumbnail}
                imgClassName="h-60 object-cover object-center hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="mt-2 flex flex-col">
              <h5>
                <Balancer>{message.title}</Balancer>
              </h5>
              {/* Message Info Bar */}
              <div className="mb-4 flex flex-wrap items-center gap-0 text-xs uppercase opacity-70 sm:mb-6 sm:text-sm">
                <span>{formatDateTime(message.date)}</span>
                {Array.isArray(message.scripture) &&
                  message.scripture.length > 0 && (
                    <>
                      <Dot className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="break-words">
                        {message.scripture
                          .map((ref) => {
                            if (ref.book && ref.chapter && ref.verses) {
                              return `${ref.book} ${ref.chapter}:${ref.verses}`;
                            } else if (ref.book && ref.chapter) {
                              return `${ref.book} ${ref.chapter}`;
                            } else {
                              return `${ref.book}`;
                            }
                          })
                          .join('; ')}
                      </span>
                    </>
                  )}
                <Dot className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>
                  {typeof message.speaker === 'object' &&
                  'name' in message.speaker
                    ? message.speaker.name
                    : message.speaker}
                </span>
              </div>
              <p>{message.description}</p>
              <div className="flex md:hidden">
                <Button variant={'secondary'}>Watch</Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise;
  const series = await querySeriesBySlug({ slug });

  return generateMeta({ doc: series });
}

const querySeriesBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'messageSeries',
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
