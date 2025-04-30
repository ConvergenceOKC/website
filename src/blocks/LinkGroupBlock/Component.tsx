import type { LinkGroupBlock as LinkGroupBlockProps } from 'src/payload-types';

import { CMSLink } from '@/components/Link';
import { cn } from '@/utilities/ui';

type Props = {
  className?: string;
} & LinkGroupBlockProps;

export const LinkGroupBlock: React.FC<Props> = ({
  className,
  title,
  links,
}) => {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="mb-[0.5rem] font-serif text-[1rem] leading-normal font-[400]">
        {title}
      </div>
      <div className="flex flex-col gap-2">
        {links &&
          links.map(({ link }, i) => {
            return (
              <CMSLink
                key={i}
                className="text-taupe text-xs uppercase"
                appearance={'link'}
                {...link}
              />
            );
          })}
      </div>
    </div>
  );
};
