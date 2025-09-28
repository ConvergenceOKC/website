'use client';

import { useCallback, useState } from 'react';

import { Map as GoogleMap, InfoWindow } from '@vis.gl/react-google-maps';
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

interface SelectedMarker {
  position: { lat: number; lng: number };
  name: string;
  location: string;
  facilitator: string;
  city: string;
  zip: number;
  time: string;
  language: string;
  notes?: string;
  marker: google.maps.marker.AdvancedMarkerElement;
}

export default function Map({ locations, showMainChurch }: MapProps) {
  const [selectedMarker, setSelectedMarker] = useState<SelectedMarker | null>(
    null,
  );

  const handleMarkerClick = useCallback(
    (
      markerData: Omit<SelectedMarker, 'marker'>,
      marker: google.maps.marker.AdvancedMarkerElement,
    ) => {
      // Check if clicking the same marker that's already selected
      if (selectedMarker && selectedMarker.marker === marker) {
        // Toggle: close if same marker clicked
        setSelectedMarker(null);
      } else {
        // Open new marker info window
        setSelectedMarker({ ...markerData, marker });
      }
    },
    [selectedMarker],
  );

  const handleMapClick = useCallback(() => {
    // Close info window when clicking on empty map area
    setSelectedMarker(null);
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  return (
    <GoogleMap
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
      style={{ width: '100%', height: '100%' }}
      defaultCenter={{ lat: convergenceInfo.lat, lng: convergenceInfo.lng }}
      defaultZoom={10}
      gestureHandling={'greedy'}
      onClick={handleMapClick}
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
          onMarkerClick={handleMarkerClick}
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
                onMarkerClick={handleMarkerClick}
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

      {selectedMarker && (
        <InfoWindow
          anchor={selectedMarker.marker}
          onCloseClick={handleInfoWindowClose}
          className="text-base text-black"
        >
          <h6>{selectedMarker.name}</h6>
          <p>
            {selectedMarker.location}
            <br />
            {selectedMarker.city}, OK {selectedMarker.zip}
          </p>
          <ul>
            <li>
              <strong>Facilitator:</strong> {selectedMarker.facilitator}
            </li>
            <li>
              <strong>Time:</strong> {selectedMarker.time}
            </li>
            <li>
              <strong>Language(s):</strong> {selectedMarker.language}
            </li>
            {selectedMarker.notes && (
              <li>
                <strong>Notes:</strong> {selectedMarker.notes}
              </li>
            )}
          </ul>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
