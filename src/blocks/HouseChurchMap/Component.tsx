import { getHouseChurches } from '@/blocks/HouseChurchMap/getHouseChurches';
import Map from '@/components/Map';
import { HouseChurchMapBlock as HouseChurchMapProps } from '@/payload-types';

export const HouseChurchMapBlock: React.FC<HouseChurchMapProps> = async ({
  showMainChurch,
}) => {
  const houseChurches = await getHouseChurches();
  const locations = houseChurches.docs;
  return (
    <div className="mb-6 sm:mb-8 md:mb-16 h-[40vh] sm:h-[50vh] md:h-[70vh] lg:h-[80vh] w-full">
      <Map locations={locations} showMainChurch={showMainChurch} />
    </div>
  );
};
