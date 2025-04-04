import { cn } from '@/utilities/ui';

const MapPin = ({ className, icon }) => (
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
