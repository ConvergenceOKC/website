'use client';

import { Map as GoogleMap } from '@vis.gl/react-google-maps';
import { Church, Home } from 'lucide-react';

import { HouseChurch } from '@/payload-types';

import MapMarker from './MapMarker';
import MapPin from './MapPin';

const convergenceInfo = {
  name: 'Convergence Church',
  street: '6800 N Bryant Avenue',
  city: 'Oklahoma City',
  zip: '73121',
  serviceTime: 'Sunday 5:30pm',
  lat: 35.54078384255158,
  lng: -97.45800992201534,
};

export default function Map({ locations }: { locations: HouseChurch[] }) {
  return (
    <GoogleMap
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
      style={{ width: '100vw', height: '100vh' }}
      defaultCenter={{ lat: convergenceInfo.lat, lng: convergenceInfo.lng }}
      defaultZoom={10}
      gestureHandling={'greedy'}
    >
      <MapMarker
        position={{ lat: convergenceInfo.lat, lng: convergenceInfo.lng }}
        name={convergenceInfo.name}
        location={convergenceInfo.street}
        city={convergenceInfo.city}
        zip={convergenceInfo.zip}
        facilitator={convergenceInfo.name}
        time={convergenceInfo.serviceTime}
      >
        <MapPin
          className={'bg-convergence-teal text-convergence-beige'}
          icon={<Church />}
        />
      </MapMarker>
      {locations &&
        locations.map(
          (location, index) =>
            location.status === 'active' && (
              <MapMarker
                key={index}
                position={{ lat: location.lat, lng: location.lng }}
                name={location.name}
                facilitator={location.facilitator}
                location={location.locationDescription}
                city={location.city}
                zip={location.zip}
                time={location.time}
              >
                <MapPin
                  className={
                    'bg-convergence-bright-orange text-convergence-beige'
                  }
                  icon={<Home />}
                />
              </MapMarker>
            ),
        )}
    </GoogleMap>
  );
}
