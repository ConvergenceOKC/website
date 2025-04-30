'use client';

import { useState } from 'react';

import { BackgroundShapes } from '@/components/BackgroundShapes';
import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import type { SliderGalleryBlock as SliderGalleryProps } from '@/payload-types';

export const SliderGalleryBlock: React.FC<SliderGalleryProps> = ({
  showMegaTitle,
  megaTitle,
  backgroundShape,
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

  return (
    <BackgroundShapes shape={backgroundShape}>
      {/* Mega Title */}
      {showMegaTitle && megaTitle && (
        <h2 className="text-charcoal -mt-24 -mb-28 flex justify-center overflow-hidden text-center text-[27rem] leading-[27rem] whitespace-nowrap mix-blend-color-burn">
          {megaTitle}
        </h2>
      )}

      {/* Image Grid */}
      <div className="grid h-96 w-full grid-cols-[50%_1fr] gap-6 overflow-hidden">
        {/* Main Active Image */}
        <div className="w-full justify-self-end overflow-hidden">
          <Media
            resource={images[activeImageIndex]?.image}
            imgClassName="relative object-cover h-96 w-full max-w-[1100px]"
          />
        </div>

        {/* Thumbnail Images */}
        <div className="relative flex flex-col gap-6">
          <div className="flex flex-row gap-6">
            {images.map((_, i) => {
              const index = (activeImageIndex + i) % images.length; // Calculate reordered index
              if (index === activeImageIndex) return null; // Skip active image
              return (
                <div
                  key={index}
                  className="relative h-80 w-80 cursor-pointer overflow-hidden opacity-100"
                  onClick={() => handleClick(index)}
                >
                  <Media
                    resource={images[index]?.image}
                    imgClassName="absolute h-full w-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <h5 className="text-cream absolute right-8 bottom-5 w-full text-right">
                    {images[index]?.title}
                  </h5>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="flex h-full flex-row items-end">
            <div className="bg-cream flex h-1 w-[550px]">
              <div
                className="bg-orange"
                style={{
                  width: `${(1 / images.length) * 100}%`,
                  transform: `translateX(${activeImageIndex * 100}%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Content */}
      <div className="relative flex w-full">
        <div className="bg-charcoal absolute top-0 right-1/2 h-full w-1/2 max-w-[1100px] mix-blend-multiply" />
        <div className="text-cream relative container grid min-h-96 w-full grid-cols-2 gap-4">
          <div className="mt-16 mr-24 mb-24 flex flex-col items-end gap-16">
            <h3 className="text-right">{images[activeImageIndex]?.title}</h3>
          </div>
          <div className="mx-10 mt-16 mb-24 h-56 overflow-hidden">
            <p className="text-deep-green mb-4 line-clamp-7">
              {images[activeImageIndex]?.caption}
            </p>
            <CMSLink {...images[activeImageIndex]?.link} appearance="secondary">
              Learn More
            </CMSLink>
          </div>
        </div>
      </div>
    </BackgroundShapes>
  );
};
