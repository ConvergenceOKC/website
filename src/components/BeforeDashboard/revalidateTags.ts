'use server';

import { revalidateTag } from 'next/cache';

export const revalidateTags = async () => {
  revalidateTag('global_header', 'max');
  revalidateTag('global_footer', 'max');
};
