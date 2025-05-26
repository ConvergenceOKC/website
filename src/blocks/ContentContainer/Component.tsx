import React from 'react';

import { CMSLink } from '@/components/Link';
import RichText from '@/components/RichText';
import type {
  ContentContainerBlock as ContentContainerBlockProps,
  Media,
} from '@/payload-types';
import { cn } from '@/utilities/ui';

export const ContentContainerBlock: React.FC<ContentContainerBlockProps> = ({
  settings,
  background,
  title,
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
    none: 'text-deep-green',
    cream: 'bg-cream text-deep-green',
    taupe: 'bg-taupe text-cream',
    charcoal: 'bg-charcoal text-cream',
    'deep-green': 'bg-deep-green text-cream',
  };

  const bgImage = background?.backgroundImage as Media;

  const bgImageBlendModeClasses = {
    none: '',
    multiply: 'mix-blend-multiply',
    screen: 'mix-blend-screen',
    overlay: 'mix-blend-overlay',
    colorBurn: 'mix-blend-color-burn',
  };

  const bgShapesClasses = {
    none: '',
    strataFlow: `bg-[url(/images/strata-flow.svg)] bg-cover bg-${background?.position}`,
    strataRidgeRight: `bg-[url(/images/strata-ridge-r.svg)] bg-right bg-${background?.position}`,
    strataRidgeLeft: `bg-[url(/images/strata-ridge-l.svg)] bg-left bg-${background?.position}`,
    strataLedge: `bg-[url(/images/strata-ledge.svg)] bg-left bg-top bg-${background?.position}`,
    strataClash: `bg-[url(/images/strata-clash.svg)] bg-bottom bg-${background?.position}`,
  };

  const titleSizeClasses = {
    normal: '',
    mega: 'text-[27rem] leading-[27rem] overflow-hidden whitespace-nowrap text-center',
  };

  const titleWidthClasses = {
    full: 'w-full',
    half: 'w-1/2',
  };

  const titleAlignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const titleColorClasses = {
    cream: 'text-cream',
    taupe: 'text-taupe',
    charcoal: 'text-charcoal',
    'deep-green': 'text-deep-green',
    orange: 'text-orange',
    'bright-white': 'text-bright-white',
  };

  const titleBlendModeClasses = {
    none: '',
    multiply: 'mix-blend-multiply',
    screen: 'mix-blend-screen',
    overlay: 'mix-blend-overlay',
    colorBurn: 'mix-blend-color-burn',
  };

  const titlePositionClasses = {
    above: {
      normal: '',
      mega: '',
    },
    straddle: {
      normal: '',
      mega: '',
    },
    inside: {
      normal: '',
      mega: '',
    },
  };

  const paddingClasses = {
    none: '',
    small: 'py-8',
    medium: 'py-16',
    large: 'py-32',
  };

  return (
    <>
      {/* {title?.showTitle && title?.position === 'above' && (
        <div className={cn(settings?.enableGutter ? 'container' : '')}>
          <h2
            className={cn(
              titleSizeClasses[title?.size!],
              titleWidthClasses[title?.width!],
              titleColorClasses[title?.color!],
              titleBlendModeClasses[title?.blendMode!],
              titleAlignmentClasses[title?.alignment!],
              titlePositionClasses[title?.position!][title?.size!],
            )}
          >
            {title.title}
          </h2>
        </div>
      )} */}
      <div
        className={cn(
          'relative',
          background?.backgroundShapes !== 'none' &&
            background?.position === 'breakout' &&
            'mt-80',
        )}
      >
        {background?.backgroundImage && (
          <div
            className={cn(
              'absolute inset-0 bg-cover bg-no-repeat',
              bgImageBlendModeClasses[background?.blendMode!],
            )}
            style={{
              backgroundImage: `url(${bgImage.url || ''})`,
            }}
          />
        )}
        {background?.backgroundShapes && (
          <div
            className={cn(
              bgShapesClasses[background.backgroundShapes!],
              'absolute inset-0 bg-no-repeat mix-blend-multiply',
              background?.position === 'breakout' && '-mt-80',
            )}
          />
        )}
        <div
          className={cn(
            bgColorClasses[background?.backgroundColor!],
            paddingClasses[settings?.padding!],
          )}
        >
          <div
            className={cn(
              'relative',
              settings?.enableGutter ? 'container' : '',
            )}
          >
            {/* {title?.showTitle &&
              title?.title &&
              title?.position === 'inside' && (
                <div className={cn(settings?.enableGutter ? 'container' : '')}>
                  <h2
                    className={cn(
                      titleSizeClasses[title?.size!],
                      titleColorClasses[title?.color!],
                      titleBlendModeClasses[title?.blendMode!],
                      titlePositionClasses[title?.position!][title?.size!],
                    )}
                  >
                    <RichText
                      data={title?.title}
                      enableGutter={false}
                      enableProse={false}
                    />
                  </h2>
                </div>
              )} */}
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
