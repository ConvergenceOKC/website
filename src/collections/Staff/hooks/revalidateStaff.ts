import { revalidateTag } from 'next/cache';

import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload';

export const revalidateStaff: CollectionAfterChangeHook &
  CollectionAfterDeleteHook = ({ doc, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating staff`);
    revalidateTag('staff', 'max');
  }
  return doc;
};
