import React from 'react';

import { ArrowLeftRight, Globe, Mail, Smartphone, User } from 'lucide-react';

import RichText from '@/components/RichText';
import type { IconBlock as IconBlockProps } from '@/payload-types';

const componentMap = {
  globe: Globe,
  phone: Smartphone,
  person: User,
  email: Mail,
  'arrow-left-right': ArrowLeftRight,
};

const size = {
  small: 'h-8 w-8',
  medium: 'h-16 w-16',
  large: 'h-16 w-16 md:h-24 md:w-24',
};

export const IconBlock: React.FC<IconBlockProps> = ({
  gridSize,
  iconSize,
  icons,
}) => {
  if (!icons || icons.length === 0) return null;
  return (
    <div
      className={`grid grid-cols-1 gap-6 pb-16 md:grid-cols-2 xl:${gridSize}`}
    >
      {icons.map((icon, idx) => {
        const IconComponent = componentMap[icon.type];
        if (!IconComponent) return null;
        return (
          <div className="flex flex-col" key={idx}>
            <div className="flex items-center justify-center py-16">
              <IconComponent className={size[iconSize]} />
            </div>
            {icon.content && (
              <RichText
                data={icon.content}
                enableGutter={false}
                enableProse={false}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
