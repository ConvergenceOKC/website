import { revalidateTag } from 'next/cache';

import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload';

import { Event } from '@/payload-types';

export const revalidateEvents: CollectionAfterChangeHook<Event> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating events - ${doc.name}`);

    revalidateTag('events', 'max');
  }

  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Event> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag('events', 'max');
  }

  return doc;
};
