'use server';

import { unstable_cache } from 'next/cache';

import config from '@payload-config';
import { getPayload } from 'payload';

export const getHouseChurches = unstable_cache(
  async () => {
    const payload = await getPayload({ config });

    try {
      const houseChurches = await payload.find({
        collection: 'house-churches',
        limit: 1000,
        pagination: false,
      });
      return houseChurches;
    } catch (error) {
      throw new Error(`Error getting house churches: ${error}`);
    }
  },
  ['house-churches'],
  { tags: ['house-churches'] },
);
