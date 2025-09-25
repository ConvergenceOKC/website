'use server';

import config from '@payload-config';
import { getPayload } from 'payload';

export async function getRecentSeries(limit: number = 3) {
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
    throw new Error(`Error getting recent series`);
  }
}
