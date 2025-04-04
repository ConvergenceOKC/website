import Link from 'next/link';

import type { BigButtonPair as BigButtonPairProps } from 'src/payload-types';

import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import { cn } from '@/utilities/ui';

type Props = {
  className?: string;
} & BigButtonPairProps;

export const BigButtonPairBlock: React.FC<Props> = ({
  className,
  leftButton,
  rightButton,
}) => {
  return (
    <div className={cn('my-16 flex w-full', className)}>
      <CMSLink
        {...leftButton.link}
        className="group relative flex w-1/2 px-16 py-14 hover:cursor-pointer"
      >
        <div className="absolute right-0 top-0 flex h-full w-full bg-deep-green mix-blend-multiply group-hover:bg-orange group-hover:opacity-95 group-hover:mix-blend-normal" />
        <div className="relative flex">
          <div>
            <Media
              className="flex h-full min-w-20 items-center justify-start"
              resource={leftButton.icon}
            />
          </div>
          <div className="flex flex-col">
            <h5>{leftButton.title}</h5>
            <p>{leftButton.description}</p>
          </div>
        </div>
      </CMSLink>
      <CMSLink
        {...rightButton.link}
        className="group relative flex w-1/2 px-16 py-14 hover:cursor-pointer"
      >
        <div className="absolute right-0 top-0 flex h-full w-full bg-charcoal mix-blend-multiply group-hover:bg-orange group-hover:opacity-95 group-hover:mix-blend-normal" />
        <div className="relative flex">
          <div>
            <Media
              className="flex h-full min-w-20 items-center justify-start"
              resource={rightButton.icon}
            />
          </div>
          <div className="flex flex-col">
            <h5>{rightButton.title}</h5>
            <p>{rightButton.description}</p>
          </div>
        </div>
      </CMSLink>
    </div>
  );
};
