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
      revalidateTag('pages-sitemap');
    }

    // If the page was previously published, we need to revalidate the old path
    if (
      previousDoc?._status === 'published' &&
      originalDoc._status !== 'published'
    ) {
      const oldPath =
        previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`;

      payload.logger.info(`Revalidating old page at path: ${oldPath}`);

      revalidatePath(oldPath);
      revalidateTag('pages-sitemap');
    }
  }
  return originalDoc;
};
