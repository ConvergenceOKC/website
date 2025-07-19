'use server';

import config from '@payload-config';
import { getPayload } from 'payload';

import { MessageSery } from '@/payload-types';

export async function getSeriesMessages(
  series: string | MessageSery,
  limit: number = 10,
) {
  const payload = await getPayload({ config });

  try {
    const messages = await payload.find({
      collection: 'messages',
      where: {
        series: {
          equals: series,
        },
      },
      sort: '-createdAt',
      limit,
    });
    return messages;
  } catch (error) {
    throw new Error(`Error getting messages for given series`);
  }
}
