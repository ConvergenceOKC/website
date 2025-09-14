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
    <div className={cn('my-6 sm:my-8 md:my-16 flex flex-col md:flex-row w-full gap-2 sm:gap-4 md:gap-0', className)}>
      <CMSLink
        {...leftButton.link}
        className="group relative flex w-full md:w-1/2 px-4 py-6 sm:px-6 sm:py-8 md:px-16 md:py-14 hover:cursor-pointer min-h-[120px] sm:min-h-[140px] md:min-h-auto"
      >
        <div className="bg-deep-green group-hover:bg-orange absolute top-0 right-0 flex h-full w-full mix-blend-multiply group-hover:opacity-95 group-hover:mix-blend-normal" />
        <div className="relative flex gap-3 sm:gap-4 items-center w-full">
          <div className="flex-shrink-0">
            <Media
              className="flex h-full w-12 sm:w-16 md:w-20 items-center justify-start"
              resource={leftButton.icon}
            />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <h6 className="text-sm sm:text-base md:text-lg font-medium leading-tight">{leftButton.title}</h6>
            <p className="text-xs sm:text-sm md:text-base mt-1 line-clamp-3">{leftButton.description}</p>
          </div>
        </div>
      </CMSLink>
      <CMSLink
        {...rightButton.link}
        className="group relative flex w-full md:w-1/2 px-4 py-6 sm:px-6 sm:py-8 md:px-16 md:py-14 hover:cursor-pointer min-h-[120px] sm:min-h-[140px] md:min-h-auto"
      >
        <div className="bg-charcoal group-hover:bg-orange absolute top-0 right-0 flex h-full w-full mix-blend-multiply group-hover:opacity-95 group-hover:mix-blend-normal" />
        <div className="relative flex gap-3 sm:gap-4 items-center w-full">
          <div className="flex-shrink-0">
            <Media
              className="flex h-full w-12 sm:w-16 md:w-20 items-center justify-start"
              resource={rightButton.icon}
            />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <h6 className="text-sm sm:text-base md:text-lg font-medium leading-tight">{rightButton.title}</h6>
            <p className="text-xs sm:text-sm md:text-base mt-1 line-clamp-3">{rightButton.description}</p>
          </div>
        </div>
      </CMSLink>
    </div>
  );
};
