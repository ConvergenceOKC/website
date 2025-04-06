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
    <div className={cn('flex flex-col gap-1.5', className)}>
      <h6>{title}</h6>
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
  );
};
