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
  zip: 73121,
  serviceTime: 'Sunday, 10:00 AM - 11:30 AM',
  lat: 35.54078384255158,
  lng: -97.45800992201534,
};

interface MapProps {
  locations: HouseChurch[];
  showMainChurch: boolean;
}

export default function Map({ locations, showMainChurch }: MapProps) {
  return (
    <GoogleMap
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
      style={{ width: '100%', height: '100%' }}
      defaultCenter={{ lat: convergenceInfo.lat, lng: convergenceInfo.lng }}
      defaultZoom={10}
      gestureHandling={'greedy'}
    >
      {showMainChurch && (
        <MapMarker
          position={{ lat: convergenceInfo.lat, lng: convergenceInfo.lng }}
          name={convergenceInfo.name}
          location={convergenceInfo.street}
          city={convergenceInfo.city}
          zip={convergenceInfo.zip}
          facilitator={convergenceInfo.name}
          time={convergenceInfo.serviceTime}
          language={'English, Spanish'}
        >
          <MapPin
            className={'bg-convergence-teal text-convergence-beige'}
            icon={<Church />}
          />
        </MapMarker>
      )}
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
                language={location.language}
                notes={location.notes ?? undefined}
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
