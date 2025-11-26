'use server';

import { unstable_cache } from 'next/cache';

import config from '@payload-config';
import { getPayload } from 'payload';

export const getLatestMessage = unstable_cache(
  async () => {
    const payload = await getPayload({ config });

    try {
      const message = await payload.find({
        collection: 'messages',
        sort: '-date',
        limit: 1,
        depth: 2,
      });
      return message;
    } catch (error) {
      throw new Error(`Error getting latest message: ${error}`);
    }
  },
  ['latest-message'],
  { tags: ['messages'] },
);
