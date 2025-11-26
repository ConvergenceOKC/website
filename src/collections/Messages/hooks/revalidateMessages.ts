import { revalidateTag } from 'next/cache';

import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload';

import { Message } from '@/payload-types';

export const revalidateMessages: CollectionAfterChangeHook<Message> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating messages`);
    revalidateTag('messages');
  }

  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Message> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag('messages');
  }

  return doc;
};
