'use client';

import { useState } from 'react';

import { ChevronRight } from 'lucide-react';

import { LinkedTextBlock } from '@/blocks/LinkedText/Component';
import { BackgroundShapes } from '@/components/BackgroundShapes';
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
            'relative -z-10 -mb-80 flex justify-center overflow-hidden text-center text-[27rem] leading-[38rem] whitespace-nowrap opacity-30',

            megaTitleClass[titleColor || 'none'],
          )}
        >
          {megaTitle}
        </h2>
      )}

      {/* Image Grid */}
      <div className="relative grid h-full w-full grid-cols-[50%_1fr] gap-6 overflow-hidden">
        {/* Subtitle */}
        {showSubtitle && subtitle && (
          <div className="absolute top-36 left-1/2 z-10 container grid w-full -translate-x-1/2 grid-cols-[50%_1fr]">
            <LinkedTextBlock
              blockType="linkedText"
              className="w-full"
              leftText={subtitle}
              rightText=""
            />
          </div>
        )}
        {/* Main Active Image */}
        <Media
          resource={images[activeImageIndex]?.image}
          imgClassName="object-cover object-center h-[840px] w-full max-w-[1100px] rounded-lg justify-self-end opacity-100"
        />

        <div className="relative flex h-full flex-col gap-6">
          {/* Thumbnail Images */}
          <div className="relative flex flex-col gap-6">
            <div className="flex flex-row gap-6">
              {images.map((_, i) => {
                const index = (activeImageIndex + i) % images.length; // Calculate reordered index
                if (index === activeImageIndex) return null; // Skip active image
                return (
                  <div
                    key={index}
                    className="relative h-80 w-80 cursor-pointer overflow-hidden rounded-lg saturate-0 hover:saturate-100"
                    onClick={() => handleClick(index)}
                  >
                    <Media
                      resource={images[index]?.image}
                      imgClassName="absolute h-full w-full object-cover hover:scale-110 transition-transform duration-300 "
                    />
                    <h6 className="text-convergence-beige absolute right-8 bottom-5 w-full text-right">
                      {images[index]?.title}
                    </h6>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image Content */}
          <div className="relative flex h-2/3 max-w-[600px] flex-col pt-32 pl-8">
            <h2 className="text-convergence-brown">
              {images[activeImageIndex]?.title}
            </h2>
            <p className="text-convergence-brown mb-8 line-clamp-7">
              {images[activeImageIndex]?.caption}
            </p>
            <CMSLink
              {...images[activeImageIndex]?.link}
              appearance="ghost"
              className="flex w-36 gap-1"
            >
              Learn More
              <ChevronRight className="h-4 w-4" />
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
