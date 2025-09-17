'use server';

import { revalidateTag } from 'next/cache';

export const revalidateTags = async () => {
  revalidateTag('global_header');
  revalidateTag('global_footer');
};
