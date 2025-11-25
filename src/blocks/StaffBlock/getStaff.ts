'use server';

import { unstable_cache } from 'next/cache';

import config from '@payload-config';
import { getPayload } from 'payload';

import { Role } from '@/payload-types';

export const getStaff = unstable_cache(
  async (roles: Role[]) => {
    const payload = await getPayload({ config });
    const roleIds = roles.map((role) => role.id);

    try {
      const staff = await payload.find({
        collection: 'staff',
        where: {
          role: {
            in: roleIds,
          },
        },
        limit: 1000,
        pagination: false,
        sort: ['name'],
      });
      return staff;
    } catch (error) {
      throw new Error(`Error getting staff: ${error}`);
    }
  },
  ['staff'],
  { tags: ['staff'] },
);
