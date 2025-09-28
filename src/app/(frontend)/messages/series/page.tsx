import Link from 'next/link';

import configPromise from '@payload-config';
import { getPayload } from 'payload';
import Balancer from 'react-wrap-balancer';

import { RenderBreadcrumbs } from '@/components/Breadcrumbs';
import { Media } from '@/components/Media';

export default async function Series() {
  const payload = await getPayload({ config: configPromise });
  const series = await payload.find({
    collection: 'messageSeries',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    sort: '-updatedAt',
    select: {
      title: true,
      slug: true,
      thumbnail: true,
    },
  });

  const breadcrumbs = [
    { id: '0', label: 'Home', url: '/' },
    { id: '1', label: 'Messages', url: '/messages' },
    { id: '2', label: 'Series', url: '/messages/series' },
  ];

  return (
    <div className="container flex flex-col pt-16 pb-24 md:pt-28">
      <RenderBreadcrumbs
        breadcrumbs={breadcrumbs}
        variant="light"
        enableGutter={false}
      />
      <h3 className="mt-6 mb-2 md:mt-10">Message Series</h3>
      {/* Series Thumbnails */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {series.docs.map((series) => (
          <Link
            key={series.id}
            href={'/messages/series/' + series.slug}
            className="hover:bg-convergence-beige-darker rounded-lg p-6 transition"
          >
            {series.thumbnail && (
              <div className="mb-2 w-full overflow-hidden rounded-lg">
                <Media
                  resource={series.thumbnail}
                  imgClassName="h-80 w-full object-cover object-center"
                />
              </div>
            )}
            <h5 className="mb-2">
              <Balancer>{series.title}</Balancer>
            </h5>
          </Link>
        ))}
      </div>
    </div>
  );
}
