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
      <div className="font-subheading mb-[0.5rem] text-[1rem] leading-normal uppercase">
        {title}
      </div>
      <div className="flex flex-col gap-2">
        {links &&
          links.map(({ link }, i) => {
            return (
              <CMSLink
                key={i}
                className="text-convergence-beige/60 text-xs uppercase"
                appearance={'link'}
                {...link}
              />
            );
          })}
      </div>
    </div>
  );
};
