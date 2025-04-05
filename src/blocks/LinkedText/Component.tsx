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
        'text-cream mx-auto mb-24 flex w-full gap-2 text-xs uppercase',
        className,
      )}
    >
      <div className="w-56 flex-none">{leftText}</div>
      <div className="border-cream mt-2 w-full grow border-t-[1px]" />
      <div className="w-[410px] flex-none">{rightText}</div>
    </div>
  );
};
