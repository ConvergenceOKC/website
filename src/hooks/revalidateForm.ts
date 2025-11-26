import { revalidatePath } from 'next/cache';

import type { CollectionAfterChangeHook } from 'payload';

export const revalidateForm: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req: { payload },
}) => {
  payload.logger.info(
    `Revalidating form: ${doc.title || doc.id} (${operation})`,
  );

  try {
    // Get all pages to search through their layout structure
    const allPages = await payload.find({
      collection: 'pages',
      limit: 1000,
      select: {
        slug: true,
        layout: true,
      },
    });

    // Helper function to recursively search for form blocks
    const findFormInContent = (content: any): boolean => {
      if (!content) return false;

      // Handle arrays
      if (Array.isArray(content)) {
        return content.some((item) => findFormInContent(item));
      }

      // Handle objects
      if (typeof content === 'object') {
        // Check if this is a form block
        if (
          content.type === 'block' &&
          content.fields?.blockType === 'formBlock' &&
          content.fields?.form?.id === doc.id
        ) {
          return true;
        }

        // Recursively search all object properties
        return Object.values(content).some((value) => findFormInContent(value));
      }

      return false;
    };

    // Find pages that contain this specific form
    const pagesWithForm = allPages.docs.filter((page) => {
      if (!page.layout) return false;
      return findFormInContent(page.layout);
    });
    console.log('pagesWithForm:', pagesWithForm);

    // Revalidate each page that contains this form
    for (const page of pagesWithForm) {
      const pagePath = page.slug === 'home' ? '/' : `/${page.slug}`;
      payload.logger.info(`Revalidating page path: ${pagePath}`);

      // Directly revalidate the specific page path
      revalidatePath(pagePath);
    }
  } catch (error) {
    payload.logger.error(`Error finding pages with form ${doc.id}: ${error}`);
  }

  return doc;
};
