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
      <h6>{title}</h6>
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
