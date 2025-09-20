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
    sort: '-date',
    select: {
      id: true,
      title: true,
      slug: true,
      date: true,
      thumbnail: true,
    },
  });

  if (!seriesMessages || seriesMessages.docs.length === 0) {
    return <div>No messages found for this series.</div>;
  }

  return (
    <div className="container pt-48 pb-32">
      <h4 className="mb-2">
        <Balancer>{series.title}</Balancer>
      </h4>
      <RichText data={series.description} />
      {/* Series Videos */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {seriesMessages.docs.map((message) => (
          <Link
            href={`/messages/${message.slug}`}
            key={message.id}
            className="flex flex-col items-start gap-3"
          >
            <Media resource={message.thumbnail} size="sm" />
            <h5>
              <Balancer>{message.title}</Balancer>
            </h5>
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
