'use client';

import { useState } from 'react';

import { ChevronRight } from 'lucide-react';

import { LinkedTextBlock } from '@/blocks/LinkedText/Component';
import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import type { SliderGalleryBlock as SliderGalleryProps } from '@/payload-types';
import { cn } from '@/utilities/ui';

export const SliderGalleryBlock: React.FC<SliderGalleryProps> = ({
  showMegaTitle,
  megaTitle,
  showSubtitle,
  subtitle,
  titleColor,
  images,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Handle image click to set the active image
  const handleClick = (index: number) => {
    setActiveImageIndex(index);
  };

  // Early return if no images are provided
  if (!images || images.length === 0) {
    return null;
  }

  const megaTitleClass = {
    brown: 'text-convergence-brown',
    teal: 'text-convergence-teal',
    beige: 'text-convergence-beige',
    orange: 'text-convergence-bright-orange',
    blue: 'text-convergence-blue',
    none: '',
  };

  return (
    <>
      {/* Mega Title */}
      {showMegaTitle && megaTitle && (
        <h2
          className={cn(
            'relative -z-10 -mb-12 sm:-mb-20 md:-mb-80 flex justify-center overflow-hidden text-center text-[4rem] sm:text-[6rem] md:text-[20rem] lg:text-[27rem] leading-[4rem] sm:leading-[6rem] md:leading-[28rem] lg:leading-[38rem] whitespace-nowrap opacity-30',

            megaTitleClass[titleColor || 'none'],
          )}
        >
          {megaTitle}
        </h2>
      )}

      {/* Image Grid */}
      <div className="relative grid h-full w-full grid-cols-1 lg:grid-cols-[50%_1fr] gap-4 sm:gap-6 overflow-hidden px-3 sm:px-4 md:px-0">
        {/* Subtitle */}
        {showSubtitle && subtitle && (
          <div className="absolute top-6 sm:top-10 md:top-36 left-1/2 z-10 container grid w-full -translate-x-1/2 grid-cols-1 lg:grid-cols-[50%_1fr]">
            <LinkedTextBlock
              blockType="linkedText"
              className="w-full px-3 sm:px-4 lg:px-0"
              leftText={subtitle}
              rightText=""
            />
          </div>
        )}
        {/* Main Active Image */}
        <Media
          resource={images[activeImageIndex]?.image}
          imgClassName="object-cover object-center h-[300px] sm:h-[400px] md:h-[600px] lg:h-[840px] w-full lg:max-w-[1100px] rounded-lg lg:justify-self-end opacity-100"
        />

        <div className="relative flex h-full flex-col gap-4 sm:gap-6">
          {/* Thumbnail Images */}
          <div className="relative flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-row gap-3 sm:gap-4 md:gap-6 overflow-x-auto pb-3 sm:pb-4 scrollbar-hide">
              {images.map((_, i) => {
                const index = (activeImageIndex + i) % images.length; // Calculate reordered index
                if (index === activeImageIndex) return null; // Skip active image
                return (
                  <div
                    key={index}
                    className="relative h-20 w-20 sm:h-32 sm:w-32 md:h-64 lg:h-80 md:w-64 lg:w-80 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg saturate-0 hover:saturate-100 transition-all duration-300"
                    onClick={() => handleClick(index)}
                  >
                    <Media
                      resource={images[index]?.image}
                      imgClassName="absolute h-full w-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <h6 className="text-convergence-beige absolute right-1 sm:right-2 md:right-8 bottom-1 sm:bottom-2 md:bottom-5 w-full text-right text-[10px] sm:text-xs md:text-base leading-tight">
                      {images[index]?.title}
                    </h6>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image Content */}
          <div className="relative flex h-auto lg:h-2/3 max-w-full lg:max-w-[600px] flex-col pt-4 sm:pt-8 md:pt-32 px-3 sm:px-4 lg:pl-8">
            <h2 className="text-convergence-brown text-lg sm:text-2xl md:text-4xl lg:text-5xl leading-tight">
              {images[activeImageIndex]?.title}
            </h2>
            <p className="text-convergence-brown mb-6 sm:mb-8 line-clamp-3 sm:line-clamp-4 md:line-clamp-7 text-xs sm:text-sm md:text-base">
              {images[activeImageIndex]?.caption}
            </p>
            <CMSLink
              {...images[activeImageIndex]?.link}
              appearance="ghost"
              className="flex w-32 sm:w-48 gap-1 text-sm sm:text-base"
            >
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </CMSLink>
          </div>

          {/* Progress Bar */}
          {/* <div className="flex h-full flex-row items-end">
            <div className="bg-cream flex h-1 w-[550px]">
              <div
                className="bg-orange"
                style={{
                  width: `${(1 / images.length) * 100}%`,
                  transform: `translateX(${activeImageIndex * 100}%)`,
                }}
              />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
