import { getHouseChurches } from '@/blocks/HouseChurchMap/getHouseChurches';
import Map from '@/components/Map';
import { HouseChurchMapBlock as HouseChurchMapProps } from '@/payload-types';

export const HouseChurchMapBlock: React.FC<HouseChurchMapProps> = async ({
  showMainChurch,
}) => {
  const houseChurches = await getHouseChurches();
  const locations = houseChurches.docs;
  return (
    <div className="mb-16 h-[80vh] w-full">
      <Map locations={locations} showMainChurch={showMainChurch} />
    </div>
  );
};
