import { cn } from '@/utilities/cn'

const MapPin = ({ className, icon }) => (
  <div
    className={cn(
      'flex h-10 w-10 items-center justify-center rounded-full',
      className,
    )}
  >
    {icon}
  </div>
)

export default MapPin
