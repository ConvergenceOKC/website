import React from 'react';

import { CMSLink } from '@/components/Link';
import RichText from '@/components/RichText';
import type { ContentBlock as ContentBlockProps, Media } from '@/payload-types';
import { cn } from '@/utilities/ui';

export const ContentBlock: React.FC<ContentBlockProps> = ({
  settings,
  background,
  content,
}) => {
  const colsSpanClasses = {
    full: '10',
    half: '5',
    oneThird: '4',
    twoThirds: '6',
    oneFifth: '2',
  };

  const bgColorClasses = {
    none: 'text-convergence-brown',
    beige: 'bg-convergence-beige text-convergence-brown',
    teal: 'bg-convergence-teal text-convergence-beige',
    brown: 'bg-convergence-brown text-convergence-beige',
    orange: 'bg-convergence-bright-orange text-convergence-beige',
    blue: 'bg-convergence-blue text-convergence-beige',
  };

  const bgImage = background?.backgroundImage as Media;

  const bgImageBlendModeClasses = {
    none: '',
    multiply: 'mix-blend-multiply',
    screen: 'mix-blend-screen',
    overlay: 'mix-blend-overlay',
    colorBurn: 'mix-blend-color-burn',
  };

  const paddingClasses = {
    none: '',
    small: 'py-8',
    medium: 'py-16',
    large: 'py-32',
  };

  return (
    <>
      <div className={cn('relative')}>
        {background?.backgroundImage && (
          <div
            className={cn(
              'absolute inset-0 bg-cover bg-no-repeat',
              bgImageBlendModeClasses[background?.blendMode || 'none'],
            )}
            style={{
              backgroundImage: `url(${bgImage.url || ''})`,
            }}
          />
        )}
        <div
          className={cn(
            bgColorClasses[background?.backgroundColor || 'none'],
            paddingClasses[settings?.padding || 'medium'],
          )}
        >
          <div
            className={cn(
              'relative',
              settings?.enableGutter ? 'container' : '',
            )}
          >
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4 xl:grid-cols-10">
              {content?.columns &&
                content.columns.length > 0 &&
                content.columns.map((col, index) => {
                  const { enableLink, link, richText, size } = col;
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
        </div>
      </div>
    </>
  );
};
