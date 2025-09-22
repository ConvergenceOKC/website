'use client';

import { useState } from 'react';

import Balancer from 'react-wrap-balancer';

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
            'relative -z-50 -mt-5 -mb-10 justify-center overflow-hidden text-center text-[8rem] leading-[8rem] whitespace-nowrap opacity-10 mix-blend-multiply sm:-mt-10 sm:-mb-40 sm:text-[13rem] sm:leading-[18rem] md:-mt-16 md:-mb-60 md:text-[20rem] md:leading-[28rem] xl:-mt-24 xl:-mb-80 xl:text-[27rem] xl:leading-[38rem]',

            megaTitleClass[titleColor || 'none'],
          )}
        >
          {megaTitle}
        </h2>
      )}

      {/* Image Grid */}
      <div className="relative container grid h-full w-full grid-cols-1 gap-4 sm:gap-6 xl:max-w-full xl:grid-cols-[50%_1fr] xl:overflow-hidden">
        {/* Subtitle */}
        {showSubtitle && subtitle && (
          <div className="pointer-events-none absolute top-40 left-1/2 z-10 container hidden w-full -translate-x-1/2 -translate-y-1/2 xl:grid xl:grid-cols-[50%_1fr]">
            <LinkedTextBlock
              blockType="linkedText"
              className="mb-0! w-full pl-6"
              leftText={subtitle}
              rightText=""
            />
          </div>
        )}
        {/* Main Active Image */}
        <Media
          resource={images[activeImageIndex]?.image}
          imgClassName="object-cover object-center h-[400px] lg:h-[500px] xl:h-[800px] w-full xl:max-w-[1100px] rounded-lg xl:justify-self-end opacity-100"
        />

        <div className="relative flex h-full flex-col gap-4 sm:gap-6 xl:max-w-[1100px]">
          {/* Thumbnail Images */}
          <div className="relative flex flex-col gap-4 sm:gap-6">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {images.map((_, i) => {
                const index = (activeImageIndex + i) % images.length; // Calculate reordered index
                if (index === activeImageIndex) return null; // Skip active image
                return (
                  <div
                    key={index}
                    className="relative flex cursor-pointer overflow-hidden rounded-lg saturate-0 transition-all duration-300 hover:saturate-100"
                    onClick={() => handleClick(index)}
                  >
                    <Media
                      resource={images[index]?.image}
                      imgClassName="h-48 lg:h-60 xl:h-80 object-cover object-center hover:scale-110 transition-transform duration-300"
                    />
                    <h6 className="text-convergence-beige absolute bottom-0 hidden w-full p-6 leading-tight sm:block">
                      {images[index]?.title}
                    </h6>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image Content */}
          <div className="relative flex h-auto max-w-full flex-col px-3 pt-4 sm:px-4 sm:pt-8 lg:h-2/3 lg:max-w-[600px] lg:pl-6">
            <h2 className="text-convergence-brown leading-tight">
              <Balancer>{images[activeImageIndex]?.title}</Balancer>
            </h2>
            <p className="text-convergence-brown mb-6 sm:mb-8">
              {images[activeImageIndex]?.caption}
            </p>
            <div className="flex gap-4">
              <CMSLink {...images[activeImageIndex]?.link} />
            </div>
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
