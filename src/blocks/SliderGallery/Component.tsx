'use client';

import { useState } from 'react';

import { BackgroundShapes } from '@/components/BackgroundShapes';
import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import type { SliderGalleryBlock as SliderGalleryProps } from '@/payload-types';

export const SliderGalleryBlock: React.FC<SliderGalleryProps> = ({
  showMegaTitle,
  megaTitle,
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
    <>
      {/* Mega Title */}
      {showMegaTitle && megaTitle && (
        <h2 className="text-convergence-bright-orange -mb-64 flex justify-center text-center text-[27rem] leading-[40rem] whitespace-nowrap opacity-70 mix-blend-multiply">
          {megaTitle}
        </h2>
      )}

      {/* Image Grid */}
      <div className="grid h-[800px] w-full grid-cols-[50%_1fr] gap-6 overflow-hidden">
        {/* Main Active Image */}
        <div className="h-full w-full overflow-hidden">
          <Media
            resource={images[activeImageIndex]?.image}
            className="h-full w-full"
            imgClassName="relative object-cover h-full w-full max-w-[1100px] rounded-tr-lg rounded-br-lg"
          />
        </div>

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
                    className="relative h-80 w-80 cursor-pointer overflow-hidden rounded-lg opacity-20 hover:opacity-100"
                    onClick={() => handleClick(index)}
                  >
                    <Media
                      resource={images[index]?.image}
                      imgClassName="absolute h-full w-full object-cover hover:scale-110 transition-transform duration-300 "
                    />
                    <h6 className="text-cream absolute right-8 bottom-5 w-full text-right">
                      {images[index]?.title}
                    </h6>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image Content */}
          <div className="relative flex h-2/3 max-w-[600px] flex-col pt-8">
            <h3 className="text-convergence-bright-orange">
              {images[activeImageIndex]?.title}
            </h3>
            <p className="text-convergence-brown mb-4 line-clamp-7">
              {images[activeImageIndex]?.caption}
            </p>
            {/* <CMSLink {...images[activeImageIndex]?.link} appearance="secondary">
              Learn More
            </CMSLink> */}
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
