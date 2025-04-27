import React from 'react';

import RichText from '@/components/RichText';
import type { ContentBlock as ContentBlockProps } from '@/payload-types';
import { cn } from '@/utilities/ui';

import { CMSLink } from '../../components/Link';

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props;

  const colsSpanClasses = {
    full: '10',
    half: '5',
    oneThird: '4',
    twoThirds: '6',
    oneFifth: '2',
  };

  return (
    <div className="container my-16">
      <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4 xl:grid-cols-10">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col;
            console.log('size:', size, colsSpanClasses[size!]);

            return (
              <div
                className={cn(
                  `col-span-2 xl:col-span-${colsSpanClasses[size!]}`,
                  {
                    'md:col-span-4': size === 'full',
                  },
                )}
                key={index}
              >
                {richText && (
                  <RichText
                    data={richText}
                    enableGutter={false}
                    enableProse={false}
                  />
                )}

                {enableLink && <CMSLink {...link} />}
              </div>
            );
          })}
      </div>
    </div>
  );
};
