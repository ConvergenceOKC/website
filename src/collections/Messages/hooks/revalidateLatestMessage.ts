import { revalidateTag } from 'next/cache';

import type { CollectionAfterChangeHook } from 'payload';

export const revalidateLatestMessage: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating latest message`);

    revalidateTag('latest-message');
  }

  return doc;
};
