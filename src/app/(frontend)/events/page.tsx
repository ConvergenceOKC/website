import { getUpcomingEvents } from "@/blocks/SliderGallery/getEvents";
import { RenderBreadcrumbs } from "@/components/Breadcrumbs";
import { Media } from "@/components/Media";
import { formatDateTime } from "@/utilities/formatDateTime";
import Link from "next/link";
import { Balancer } from "react-wrap-balancer";

export default async function Events() {
  const upcomingEvents = await getUpcomingEvents();

  const breadcrumbs = [
    { id: '0', label: 'Home', url: '/' },
    { id: '1', label: 'Events', url: '/events' },
  ];

  return (
    <div className="container flex flex-col pt-16 pb-24 md:pt-28">
      <RenderBreadcrumbs
        breadcrumbs={breadcrumbs}
        variant="light"
        enableGutter={false}
      />
      <h3 className="mb-6 mt-6 md:mt-10">Upcoming Events</h3>
      <div className="flex flex-col gap-6">
        {upcomingEvents.docs.map((event) => (
          <Link
            href={event.url || '#'}
            key={event.id}
            className="bg-convergence-beige-darker md:hover:bg-convergence-beige-darker grid grid-cols-1 items-start gap-6 rounded-lg p-6 transition md:grid-cols-[1fr_2fr] md:bg-inherit"
          >
            <div className="relative w-full overflow-hidden rounded-lg">
              <Media
                resource={event.image}
                imgClassName="h-60 object-cover object-center hover:scale-110 transition-transform duration-300"
                size="4:3"
              />
            </div>
            <div className="mt-2 flex flex-col">
              <h5>
                <Balancer>{event.name}</Balancer>
              </h5>
              <div className="mb-4 flex flex-wrap items-center gap-0 text-xs uppercase opacity-70 sm:mb-6 sm:text-sm">
                <span>{formatDateTime(event.date)}</span>
              </div>
              <p>{event.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}