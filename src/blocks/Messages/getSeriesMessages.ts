'use server';

import config from '@payload-config';
import { getPayload } from 'payload';

import { MessageSery } from '@/payload-types';

export async function getSeriesMessages(series: string | MessageSery) {
  const payload = await getPayload({ config });

  try {
    const messages = await payload.find({
      collection: 'messages',
      where: {
        series: {
          equals: series,
        },
      },
      limit: 1,
    });
    return messages;
  } catch (error) {
    throw new Error(`Error getting messages for given series`);
  }
}
