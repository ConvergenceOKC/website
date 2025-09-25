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
        'relative container my-8 flex flex-col gap-8 md:my-16 md:gap-14',
        alignment === 'left' ? 'items-start' : 'items-center',
      )}
    >
      {/* Dashed Line Container */}
      <div
        className={cn(
          'border-convergence-teal absolute top-0 z-0 h-full w-0.5 -translate-x-1/2 border-l-2 border-dashed md:border-l-4',
          alignment === 'left' ? 'left-[35px] md:left-[71px]' : 'left-1/2',
        )}
      />

      {/* Content Items */}
      {contentItems.map((item, index) => {
        if (!item.icon || !item.content) {
          return null;
        }

        return (
          <div
            key={index}
            className="relative flex w-full flex-col items-center"
          >
            {item.displayMode === 'popover' && (
              <>
                {/* Popover for desktop size screens */}
                <div className="hidden xl:block">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="cursor-pointer">
                        <Media
                          resource={item.icon}
                          className="h-12 w-12 sm:h-16 sm:w-16 md:h-auto md:w-auto"
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      align={item.anchorPoint || 'center'}
                      side={item.popoverSide || 'right'}
                      className="w-[85vw] max-w-[500px] border-none p-3 sm:w-[90vw] sm:p-4 md:p-6"
                    >
                      {item.popoverImage && (
                        <div className="mb-6 w-full overflow-hidden rounded-lg">
                          <Media
                            resource={item.popoverImage}
                            imgClassName="object-cover object-center max-h-80"
                          />
                        </div>
                      )}
                      <RichText
                        data={item.content}
                        enableGutter={false}
                        enableProse={false}
                        className="text-sm sm:text-base [&_img]:rounded-sm"
                      />
                      <PopoverArrow className="fill-popover h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    </PopoverContent>
                  </Popover>
                </div>
                {/* Popover for mobile size screens */}
                <div className="xl:hidden">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="cursor-pointer">
                        <Media
                          resource={item.icon}
                          className="h-12 w-12 sm:h-16 sm:w-16 md:h-auto md:w-auto"
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      align="center"
                      side="bottom"
                      className="w-[85vw] max-w-[500px] border-none p-3 sm:w-[90vw] sm:p-4 md:p-6"
                    >
                      {item.popoverImage && (
                        <div className="mb-6 w-full overflow-hidden rounded-lg">
                          <Media
                            resource={item.popoverImage}
                            imgClassName="object-cover object-center max-h-56"
                          />
                        </div>
                      )}
                      <RichText
                        data={item.content}
                        enableGutter={false}
                        enableProse={false}
                        className="text-sm sm:text-base [&_img]:rounded-sm"
                      />
                      <PopoverArrow className="fill-popover h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            )}
            {item.displayMode === 'inline' && (
              <div className="flex w-full flex-col gap-3 px-4 sm:flex-row sm:gap-4 sm:px-6 md:gap-10 md:px-0">
                <Media
                  resource={item.icon}
                  className="mx-auto h-12 w-12 shrink-0 sm:mx-0 sm:h-16 sm:w-16 md:h-auto md:w-auto"
                />
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
