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
  console.log(links);
  return (
    <div className={cn('flex flex-col', className)}>
      <h6>{title}</h6>
      {links &&
        links.length > 0 &&
        links.map((link, i) => {
          return <CMSLink key={i} appearance={'link'} {...link} />;
        })}
    </div>
  );
};
