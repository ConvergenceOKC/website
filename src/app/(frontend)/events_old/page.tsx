import Link from 'next/link';

import configPromise from '@payload-config';
import { getPayload } from 'payload';

export default async function EventsPage() {
  const payload = await getPayload({ config: configPromise });
  const { docs } = await payload.find({
    collection: 'events',
    draft: false,
    limit: 20,
    overrideAccess: false,
    pagination: false,
    select: {
      date: true,
      description: true,
      image: true,
      name: true,
      location: true,
    },
    where: {
      date: { greater_than: new Date().toISOString() },
    },
    sort: 'date',
  });

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-2 text-4xl font-bold">Events</h1>
        <p className="mb-12 text-gray-600">
          Join us for upcoming events and gatherings
        </p>

        {docs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {docs.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <div className="group relative h-80 cursor-pointer overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl">
                  {event.image ? (
                    <div className="absolute inset-0">
                      <img
                        src={event.image.url}
                        alt={event.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="mb-2 line-clamp-2 text-xl font-bold text-white">
                      {event.name}
                    </h3>

                    <p className="mb-3 text-sm text-gray-200">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>

                    {event.description && (
                      <p className="line-clamp-2 text-sm text-gray-300">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600">
              No upcoming events at this time.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
