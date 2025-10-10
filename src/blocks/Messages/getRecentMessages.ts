'use server';

import config from '@payload-config';
import { unstable_cache } from 'next/dist/server/web/spec-extension/unstable-cache';
import { getPayload } from 'payload';

export const getRecentMessages = unstable_cache(
  async (limit: number = 3) => {
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
  },
  ['recent-messages'],
  { tags: ['recent-messages'] },
);
