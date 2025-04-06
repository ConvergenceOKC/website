'use client';

import { RowLabelProps, useRowLabel } from '@payloadcms/ui';

import { LinkGroupBlock } from '@/payload-types';

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<LinkGroupBlock['links']>[number]>();

  const label = data?.data?.link?.label
    ? `Link ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.link?.label}`
    : 'Row';

  return <div>{label}</div>;
};
