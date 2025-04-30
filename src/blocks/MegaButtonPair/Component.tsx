import type { MegaButtonPair as MegaButtonPairProps } from 'src/payload-types';

import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import { cn } from '@/utilities/ui';

type Props = {
  className?: string;
} & MegaButtonPairProps;

export const MegaButtonPairBlock: React.FC<Props> = ({
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
        <div className="bg-deep-green group-hover:bg-orange absolute top-0 right-0 flex h-full w-full mix-blend-multiply group-hover:opacity-95 group-hover:mix-blend-normal" />
        <div className="relative flex">
          <div>
            <Media
              className="flex h-full min-w-20 items-center justify-start"
              resource={leftButton.icon}
            />
          </div>
          <div className="flex flex-col">
            <h6>{leftButton.title}</h6>
            <p>{leftButton.description}</p>
          </div>
        </div>
      </CMSLink>
      <CMSLink
        {...rightButton.link}
        className="group relative flex w-1/2 px-16 py-14 hover:cursor-pointer"
      >
        <div className="bg-charcoal group-hover:bg-orange absolute top-0 right-0 flex h-full w-full mix-blend-multiply group-hover:opacity-95 group-hover:mix-blend-normal" />
        <div className="relative flex">
          <div>
            <Media
              className="flex h-full min-w-20 items-center justify-start"
              resource={rightButton.icon}
            />
          </div>
          <div className="flex flex-col">
            <h6>{rightButton.title}</h6>
            <p>{rightButton.description}</p>
          </div>
        </div>
      </CMSLink>
    </div>
  );
};
