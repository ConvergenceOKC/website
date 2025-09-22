import { CMSLink } from '@/components/Link';
import { ButtonBlock as ButtonBlockProps } from '@/payload-types';
import { cn } from '@/utilities/ui';

export const ButtonBlock: React.FC<ButtonBlockProps> = ({
  links,
  alignment,
}) => {
  if (!links) {
    return null;
  }

  let alignmentClass;
  switch (alignment) {
    case 'center':
      alignmentClass = 'justify-center';
      break;
    case 'left':
      alignmentClass = 'justify-start';
      break;
    case 'right':
      alignmentClass = 'justify-end';
      break;
    default:
      alignmentClass = '';
      break;
  }

  return (
    <div className={cn('my-4 flex gap-4', alignmentClass)}>
      {Array.isArray(links) && links.length > 0 && (
        <ul className="flex flex-col gap-2 sm:flex-row">
          {links.map(({ link }, i) => {
            return (
              <li key={i} className={cn('flex', alignmentClass)}>
                <CMSLink {...link} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
