import { cn } from '@/utilities/ui';

type MapPinProps = {
  className?: string;
  icon: React.ReactNode;
};

const MapPin = ({ className, icon }: MapPinProps) => (
  <div
    className={cn(
      'flex h-10 w-10 items-center justify-center rounded-full',
      className,
    )}
  >
    {icon}
  </div>
);

export default MapPin;
