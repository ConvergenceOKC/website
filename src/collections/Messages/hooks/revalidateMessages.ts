import { revalidateTag } from 'next/cache';

import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload';

import { Message } from '@/payload-types';

export const revalidateMessages: CollectionAfterChangeHook<Message> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(
      `Revalidating messages - message/${doc.slug} & series/${doc.series}`,
    );
    const series = await payload.findByID({
      collection: 'messageSeries',
      id: doc.series as string,
    });
    revalidateTag('messages', 'max');
    revalidateTag(doc.slug || '', 'max'); // This is for the individual message page
    revalidateTag(series.slug || '', 'max'); // This is for the series page
  }

  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Message> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const series = await payload.findByID({
      collection: 'messageSeries',
      id: doc.series as string,
    });
    revalidateTag('messages', 'max');
    revalidateTag(doc.slug || '', 'max'); // This is for the individual message page
    revalidateTag(series.slug || '', 'max'); // This is for the series page
  }

  return doc;
};
