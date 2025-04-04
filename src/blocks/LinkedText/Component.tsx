import type { LinkedText as LinkedTextProps } from 'src/payload-types';

import { cn } from '@/utilities/ui';

type Props = {
  className?: string;
} & LinkedTextProps;

export const LinkedTextBlock: React.FC<Props> = ({
  className,
  leftText,
  rightText,
}) => {
  return (
    <div
      className={cn(
        'subtitle mx-auto mb-24 flex w-full gap-2 text-cream',
        className,
      )}
    >
      <div className="w-56 flex-none">{leftText}</div>
      <div className="mt-2 w-full grow border-t-[1px] border-cream" />
      <div className="w-[410px] flex-none">{rightText}</div>
    </div>
  );
};
