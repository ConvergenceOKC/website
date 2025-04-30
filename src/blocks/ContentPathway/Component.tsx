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
        'relative container my-16 flex flex-col gap-24',
        alignment === 'left' ? 'items-start' : 'items-center',
      )}
    >
      {/* Dashed Line Container */}
      <div className="border-taupe absolute top-0 left-1/2 z-0 h-full w-0.5 -translate-x-1/2 border-l-4 border-dashed" />

      {/* Content Items */}
      {contentItems.map((item, index) => {
        if (!item.icon || !item.content) {
          return null;
        }

        return (
          <div key={index} className="relative flex flex-col items-center">
            {item.displayMode === 'popover' && (
              <Popover>
                <PopoverTrigger asChild>
                  <Media resource={item.icon} className="cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent
                  align={item.anchorPoint || 'center'}
                  side={item.popoverSide || 'right'}
                  className="w-[500px] border-none p-6"
                >
                  <RichText
                    data={item.content}
                    enableGutter={false}
                    enableProse={false}
                    className="[&_img]:rounded-sm"
                  />
                  <PopoverArrow className="fill-popover h-6 w-6" />
                </PopoverContent>
              </Popover>
            )}
          </div>
        );
      })}
    </div>
  );
};
