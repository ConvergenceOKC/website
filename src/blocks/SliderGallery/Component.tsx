import { SliderGallery } from '@/components/SliderGallery';
import { SliderGalleryBlock as SliderGalleryProps } from '@/payload-types';
import { formatDateTime } from '@/utilities/formatDateTime';

import { getUpcomingEvents } from './getEvents';

export const SliderGalleryBlock: React.FC<SliderGalleryProps> = async ({
  autoPlayInterval,
  images,
  source,
}) => {
  if (source === 'events') {
    const events = await getUpcomingEvents();
    const images: SliderGalleryProps['images'] = events.docs.map((event) => ({
      id: event.id,
      image: event.image,
      title: event.name,
      description: `${formatDateTime(event.date)}${event.description ? ` - ${event.description}` : ''}`,
      link: event.url
        ? {
            type: 'custom',
            url: event.url,
          }
        : undefined,
    }));

    return (
      <SliderGallery autoPlayInterval={autoPlayInterval} images={images} />
    );
  } else {
    return (
      <SliderGallery autoPlayInterval={autoPlayInterval} images={images} />
    );
  }
};
