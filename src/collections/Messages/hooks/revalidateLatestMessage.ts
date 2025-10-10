import { revalidateTag } from 'next/cache';

import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload';

import { Message } from '@/payload-types';

export const revalidateLatestMessage: CollectionAfterChangeHook<Message> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating latest message`);
    revalidateTag('latest-message');
  }

  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Message> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag('latest-message');
  }

  return doc;
};
