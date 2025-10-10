'use server';

import { unstable_cache } from 'next/cache';

import config from '@payload-config';
import { getPayload } from 'payload';

export const getRecentSeries = unstable_cache(
  async (limit: number = 3) => {
    const payload = await getPayload({ config });

    try {
      const series = await payload.find({
        collection: 'messageSeries',
        sort: '-updatedAt',
        limit,
        depth: 2,
      });
      return series;
    } catch (error) {
      throw new Error(`Error getting recent series: ${error}`);
    }
  },
  ['recent-series'],
  { tags: ['recent-series'] },
);
