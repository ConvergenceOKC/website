import { revalidatePath, revalidateTag } from 'next/cache';

import type { FieldHook } from 'payload';

export const revalidatePage: FieldHook = ({
  originalDoc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (originalDoc._status === 'published') {
      const path = originalDoc.slug === 'home' ? '/' : `/${originalDoc.slug}`;

      payload.logger.info(`Revalidating page at path: ${path}`);

      revalidatePath(path);
      revalidateTag('pages', 'max');
    }

    return originalDoc;
  }
};
