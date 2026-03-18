import Link from 'next/link';

import { getUpcomingEvents } from '../SliderGallery/getEvents';

export const EventsBlock: React.FC = async () => {
  const events = await getUpcomingEvents();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.docs.map((event) => (
        <Link key={event.id} href={event.url || '#'}>
          <div className="group relative h-80 cursor-pointer overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl">
            {event.image ? (
              <div className="absolute inset-0">
                <img
                  src={event.image.url}
                  alt={event.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
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
  );
};
