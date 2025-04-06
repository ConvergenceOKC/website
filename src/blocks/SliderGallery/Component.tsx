import { Media } from '@/components/Media';
import type { SliderGalleryBlock as SliderGalleryProps } from '@/payload-types';

export const SliderGalleryBlock: React.FC<SliderGalleryProps> = ({
  megaTitle,
  images,
}) => {
  return (
    <div className="my-16 flex flex-col">
      {megaTitle && (
        <h2 className="text-charcoal -mb-28 flex justify-center text-center text-[27rem] leading-[27rem] mix-blend-color-burn">
          {megaTitle}
        </h2>
      )}
      {images &&
        images.map(({ image }, i) => <Media key={i} resource={image} />)}
    </div>
  );
};
