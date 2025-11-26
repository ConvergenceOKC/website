import { revalidateTag } from 'next/cache';

import type { CollectionAfterChangeHook } from 'payload';

export const revalidateForm: CollectionAfterChangeHook = ({
  doc,
  collection,
  context,
  data,
  operation,
  previousDoc,
  req: { payload },
}) => {
  payload.logger.info(`Revalidating form`);
  const formId = doc.id;

  revalidateTag('forms');

  return doc;
};
