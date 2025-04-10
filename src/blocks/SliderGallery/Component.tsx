import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import type { SliderGalleryBlock as SliderGalleryProps } from '@/payload-types';

export const SliderGalleryBlock: React.FC<SliderGalleryProps> = ({
  megaTitle,
  images,
}) => {
  if (images && images.length >= 1) {
    return (
      <div className="my-16 bg-[url('/images/shapes-discover.svg')] bg-center bg-no-repeat">
        {megaTitle && (
          <h2 className="text-charcoal -mb-28 flex justify-center overflow-hidden text-center text-[27rem] leading-[27rem] mix-blend-color-burn">
            {megaTitle}
          </h2>
        )}
        <div className="grid h-96 w-full grid-cols-[50%_1fr] gap-6 overflow-hidden">
          <Media
            resource={images[0]?.image}
            className="justify-self-end"
            imgClassName="relative object-cover h-96 max-w-[1100px]"
          />
          <div className="relative flex flex-col gap-6">
            <div className="flex flex-row gap-6">
              {images.map((image, i) => {
                if (i > 0) {
                  return (
                    <CMSLink
                      {...images[i]?.link}
                      key={i + 10}
                      className="relative w-80"
                    >
                      <Media
                        resource={images[i]?.image}
                        imgClassName="h-80 object-cover"
                        key={i + 100}
                      />
                      <h4
                        key={i + 1000}
                        className="text-cream absolute right-8 bottom-5 w-full text-right"
                      >
                        {image.title}
                      </h4>
                    </CMSLink>
                  );
                }
                return null;
              })}
            </div>
            <div className="flex h-full flex-row items-end">
              <div className="bg-bright-white flex h-1 w-[550px]">
                <div className="bg-orange w-[25%]" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex w-full">
          <div className="bg-charcoal absolute top-0 right-1/2 h-full w-1/2 max-w-[1100px] mix-blend-plus-darker" />
          <div className="text-cream relative container grid min-h-96 w-full grid-cols-2 gap-4">
            <div className="mr-24 mb-24 flex flex-col items-end gap-16">
              <CMSLink {...images[0]?.link} appearance={'secondary'}>
                Learn More
              </CMSLink>
              <h2 className="text-right">{images[0]?.title}</h2>
            </div>
            <div className="text-deep-green mx-10 mt-28 mb-24 flex items-start">
              {images[0]?.caption}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
