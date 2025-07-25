'use server';

import config from '@payload-config';
import { getPayload } from 'payload';

export async function getHouseChurches() {
  const payload = await getPayload({ config });

  try {
    const houseChurches = await payload.find({
      collection: 'house-churches',
      limit: 1000,
      pagination: false,
    });
    return houseChurches;
  } catch (error) {
    throw new Error(`Error getting house churches`);
  }
}
