import { useMemo } from 'react';

import { cn } from '@/utilities/ui';

interface BackgroundShapeProps {
  shape: string | undefined | null;
  children?: React.ReactNode;
  className?: string;
}

export const BackgroundShapes: React.FC<BackgroundShapeProps> = ({
  shape,
  children,
  className,
}) => {
  const backgroundStyle = useMemo(
    () => (shape ? { backgroundImage: `url('/images/${shape}.svg')` } : {}),
    [shape],
  );

  const shapeStyle = useMemo(
    () =>
      cn(
        'relative bg-no-repeat py-24',
        shape === 'shape1' && 'bg-cover bg-left',
        shape === 'shape2' && 'bg-right',
        shape === 'shape3' && 'bg-left',
        shape === 'shape4' && 'bg-cover',
        className,
      ),
    [shape],
  );

  if (!shape || shape === 'none') {
    return <>{children}</>;
  }

  return (
    <div className={shapeStyle} style={backgroundStyle}>
      {children}
    </div>
  );
};
