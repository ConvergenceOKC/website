'use client';

import { RowLabelProps, useRowLabel } from '@payloadcms/ui';

import { ShowcaseGalleryBlock } from '@/payload-types';

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data =
    useRowLabel<NonNullable<ShowcaseGalleryBlock['images']>[number]>();

  const label = data?.data.image
    ? `Image ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.title}`
    : 'Row';

  return <div>{label}</div>;
};
