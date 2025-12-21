import { revalidateTag } from 'next/cache';

import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload';

import { MessageSery } from '@/payload-types';

export const revalidateSeries: CollectionAfterChangeHook<MessageSery> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating message series`);
    revalidateTag('messages', 'max');
  }

  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<MessageSery> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag('messages', 'max');
  }

  return doc;
};
