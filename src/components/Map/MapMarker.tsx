'use client';

import { useCallback, useState } from 'react';

import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

interface MapMarkerProps {
  position: { lat: number; lng: number };
  name: string;
  location: string;
  facilitator: string;
  city: string;
  zip: number;
  time: string;
  language: string;
  notes?: string;
  children: React.ReactNode;
}

const MapMarker = ({
  position,
  name,
  location,
  facilitator,
  city,
  zip,
  time,
  language,
  notes,
  children,
}: MapMarkerProps) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    [],
  );
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <AdvancedMarker
      position={position}
      ref={markerRef}
      onClick={handleMarkerClick}
    >
      {children}
      {infoWindowShown && (
        <InfoWindow
          anchor={marker}
          onClose={handleClose}
          className="text-base text-black"
        >
          <h6>{name}</h6>
          <p>
            {location}
            <br />
            {city}, OK {zip}
          </p>
          <ul>
            <li>
              <strong>Facilitator:</strong> {facilitator}
            </li>
            <li>
              <strong>Time:</strong> {time}
            </li>
            <li>
              <strong>Language(s):</strong> {language}
            </li>
            {notes && (
              <li>
                <strong>Notes:</strong> {notes}
              </li>
            )}
          </ul>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
};

export default MapMarker;
