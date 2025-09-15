import { PopoverArrow } from '@radix-ui/react-popover';

import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ContentPathwayBlock as ContentPathwayProps } from '@/payload-types';
import { cn } from '@/utilities/ui';

export const ContentPathwayBlock: React.FC<ContentPathwayProps> = ({
  alignment,
  contentItems,
}) => {
  if (!contentItems) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative container my-8 md:my-16 flex flex-col gap-8 md:gap-14',
        alignment === 'left' ? 'items-start' : 'items-center',
      )}
    >
      {/* Dashed Line Container */}
      <div
        className={cn(
          'border-convergence-teal absolute top-0 z-0 h-full w-0.5 -translate-x-1/2 border-l-2 md:border-l-4 border-dashed',
          alignment === 'left' ? 'left-[35px] md:left-[71px]' : 'left-1/2',
        )}
      />

      {/* Content Items */}
      {contentItems.map((item, index) => {
        if (!item.icon || !item.content) {
          return null;
        }

        return (
          <div key={index} className="relative flex flex-col items-center w-full">
            {item.displayMode === 'popover' && (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="cursor-pointer">
                    <Media resource={item.icon} className="w-12 h-12 sm:w-16 sm:h-16 md:w-auto md:h-auto" />
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  align={item.anchorPoint || 'center'}
                  side={item.popoverSide || 'right'}
                  className="w-[85vw] sm:w-[90vw] max-w-[500px] border-none p-3 sm:p-4 md:p-6"
                >
                  <RichText
                    data={item.content}
                    enableGutter={false}
                    enableProse={false}
                    className="[&_img]:rounded-sm text-sm sm:text-base"
                  />
                  <PopoverArrow className="fill-popover h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </PopoverContent>
              </Popover>
            )}
            {item.displayMode === 'inline' && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-10 w-full px-4 sm:px-6 md:px-0">
                <Media resource={item.icon} className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 md:w-auto md:h-auto mx-auto sm:mx-0" />
                <RichText
                  data={item.content}
                  enableGutter={false}
                  enableProse={false}
                  className="text-sm sm:text-base"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
