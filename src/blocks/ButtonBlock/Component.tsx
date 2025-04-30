import { CMSLink } from '@/components/Link';
import { ButtonBlock as ButtonBlockProps } from '@/payload-types';

export const ButtonBlock: React.FC<ButtonBlockProps> = ({ links }) => {
  if (!links) {
    return null;
  }

  return (
    <div className="my-4 flex gap-4">
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
