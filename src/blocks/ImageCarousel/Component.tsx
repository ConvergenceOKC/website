'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { BackgroundShapes } from '@/components/BackgroundShapes';
import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import { ImageCarouselBlock as ImageCarouselProps } from '@/payload-types';
import { cn } from '@/utilities/ui';

export const ImageCarouselBlock: React.FC<ImageCarouselProps> = ({
  showTitle,
  title,
  backgroundShape,
  autoPlayInterval,
  images,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const goToPrevious = useCallback(() => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  const goToNext = useCallback(() => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  const goToImage = (imageIndex: number) => {
    setCurrentIndex(imageIndex);
  };

  // Handle touch events for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.touches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, go next
        goToNext();
      } else {
        // Swipe right, go previous
        goToPrevious();
      }
      touchStartX.current = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  // Pause autoplay when user interacts with slider
  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
  };

  const resumeAutoPlay = () => {
    setIsAutoPlaying(true);
  };

  // Auto play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(
      () => {
        goToNext();
      },
      (autoPlayInterval || 5) * 1000,
    );

    return () => clearInterval(interval);
  }, [goToNext, isAutoPlaying, autoPlayInterval]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <BackgroundShapes shape={backgroundShape}>
      {/* Show Title */}
      {showTitle && title && (
        <h2 className="text-charcoal mb-16 flex justify-center text-center mix-blend-color-burn">
          {title}
        </h2>
      )}

      <div className="container">
        {/* Image Carousel */}
        <div
          className={cn('relative h-[450px] w-full overflow-hidden rounded-lg')}
          ref={carouselRef}
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carousel"
        >
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative h-full w-full flex-shrink-0 overflow-hidden"
                aria-roledescription="slide"
              >
                <CMSLink {...image.link}>
                  <Media
                    resource={image.image}
                    imgClassName="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="text-cream bg-charcoal/30 absolute inset-0 flex flex-col justify-end px-16 pb-10">
                    <h4>{image.title}</h4>
                    {image.description && <p>{image.description}</p>}
                  </div>
                </CMSLink>
              </div>
            ))}
          </div>
          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="bg-charcoal/30 text-cream hover:bg-charcoal/50 absolute top-1/2 left-4 -translate-y-1/2 rounded-full p-2 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="bg-charcoal/30 text-cream hover:bg-charcoal/50 absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-2 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          {/* Dots/Indicators */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, imageIndex) => (
              <button
                key={imageIndex}
                onClick={() => goToImage(imageIndex)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  currentIndex === imageIndex
                    ? 'bg-orange'
                    : 'bg-cream/50 hover:bg-cream/80'
                }`}
                aria-label={`Go to image ${imageIndex + 1}`}
                aria-current={currentIndex === imageIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>
      </div>
    </BackgroundShapes>
  );
};
