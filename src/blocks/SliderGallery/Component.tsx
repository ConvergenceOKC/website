import type { SliderGalleryBlock as SliderGalleryProps } from '@/payload-types';

export const SliderGalleryBlock: React.FC<SliderGalleryProps> = ({
  megaTitle,
  images,
}) => {
  return (
    <div className="container">
      <div className="flex flex-col gap-8">
        {megaTitle && (
          <h2 className="text-center text-4xl font-bold">{megaTitle}</h2>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image, i) => (
            <div key={i} className="relative">
              <img
                src={image.image}
                alt={image.title}
                className="h-auto w-full"
              />
              {image.caption && (
                <p className="absolute bottom-0 left-0 bg-black p-2 text-white">
                  {image.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
