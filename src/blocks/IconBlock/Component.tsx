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

// const iconStyling = {
//   globe: 'h-8',
//   phone: 'h-16',
//   person: 'h-10',
//   email: 'h-12',
//   'arrow-left-right': 'h-14',
// }

export const IconBlock: React.FC<IconBlockProps> = ({ icons }) => {
  if (!icons || icons.length === 0) return null;
  return (
    <div className="container grid grid-cols-1 gap-2 pb-16 md:grid-cols-2 xl:grid-cols-5">
      {icons.map((icon, idx) => {
        const IconComponent = componentMap[icon.icon];
        if (!IconComponent) return null;
        return (
          <div className="flex flex-col" key={idx}>
            <div className="flex h-48 items-center justify-center">
              <IconComponent className="h-24 w-24" />
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

{
  /* <IconComponent className={iconStyling[icon.icon]} /> */
}
