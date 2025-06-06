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
        <ul className="flex gap-4">
          {links.map(({ link }, i) => {
            return (
              <li key={i}>
                <CMSLink {...link} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
