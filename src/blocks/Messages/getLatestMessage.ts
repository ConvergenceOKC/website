'use server';

import config from '@payload-config';
import { getPayload } from 'payload';

export async function getLatestMessage() {
  const payload = await getPayload({ config });

  try {
    const message = await payload.find({
      collection: 'messages',
      sort: '-publishedAt',
      limit: 1,
      depth: 2,
    });
    return message;
  } catch (error) {
    throw new Error(`Error getting latest message`);
  }
}
