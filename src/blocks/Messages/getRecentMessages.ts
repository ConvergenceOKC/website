'use server';

import config from '@payload-config';
import { getPayload } from 'payload';

export async function getRecentMessages(limit: number = 3) {
  const payload = await getPayload({ config });

  try {
    const messages = await payload.find({
      collection: 'messages',
      sort: '-date',
      limit,
      depth: 2,
    });
    return messages;
  } catch (error) {
    throw new Error(`Error getting recent messages: ${error}`);
  }
}
