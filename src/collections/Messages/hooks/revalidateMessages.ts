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
    payload.logger.info(`Revalidating messages - message/${doc.slug}`);
    revalidateTag('messages', 'max');
    revalidateTag(doc.slug || '', 'max'); // This is for the individual message page
  }

  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Message> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag('messages', 'max');
    revalidateTag(doc.slug || '', 'max'); // This is for the individual message page
  }

  return doc;
};
