'use client';

import { RowLabelProps, useRowLabel } from '@payloadcms/ui';

import { Social } from '@/payload-types';

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Social['socials']>[number]>();

  const label = data?.data?.platform ? `${data?.data?.platform}` : 'Row';

  return <div>{label}</div>;
};
