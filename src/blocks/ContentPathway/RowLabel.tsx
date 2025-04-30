'use client';

import { RowLabelProps, useRowLabel } from '@payloadcms/ui';

import { ContentPathwayBlock } from '@/payload-types';

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data =
    useRowLabel<NonNullable<ContentPathwayBlock['contentItems']>[number]>();

  const label = data?.data.title
    ? `Item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.title}`
    : 'Row';

  return <div>{label}</div>;
};
