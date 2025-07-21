import configPromise from '@payload-config';
import { getPayload } from 'payload';

import Map from '@/components/Map';

export default async function Page() {
  const payload = await getPayload({ config: configPromise });
  const houseChurches = await payload.find({
    collection: 'house-churches',
    limit: 1000,
    pagination: false,
  });

  const locations = houseChurches.docs;

  return <Map locations={locations} />;
}
