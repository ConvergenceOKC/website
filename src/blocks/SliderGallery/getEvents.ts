'use server';

import { unstable_cache } from 'next/cache';

import config from '@payload-config';
import { getPayload } from 'payload';

export const getUpcomingEvents = unstable_cache(
  async () => {
    const payload = await getPayload({ config });

    try {
      const events = await payload.find({
        collection: 'events',
        limit: 5,
        pagination: false,
        where: {
          date: {
            greater_than: new Date().toISOString(),
          },
        },
        sort: 'date',
      });
      return events;
    } catch (error) {
      throw new Error(`Error getting events: ${error}`);
    }
  },
  ['events'],
  { tags: ['events'], revalidate: 60 * 60 * 24 }, // Revalidate once every 24 hours,
);
