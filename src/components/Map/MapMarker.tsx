'use client';

import { useCallback } from 'react';

import {
  AdvancedMarker,
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
  onMarkerClick: (
    markerData: Omit<MapMarkerProps, 'children' | 'onMarkerClick'>,
    marker: google.maps.marker.AdvancedMarkerElement,
  ) => void;
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
  onMarkerClick,
}: MapMarkerProps) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const handleMarkerClick = useCallback(() => {
    if (marker) {
      onMarkerClick(
        {
          position,
          name,
          location,
          facilitator,
          city,
          zip,
          time,
          language,
          notes,
        },
        marker,
      );
    }
  }, [
    marker,
    onMarkerClick,
    position,
    name,
    location,
    facilitator,
    city,
    zip,
    time,
    language,
    notes,
  ]);

  return (
    <AdvancedMarker
      position={position}
      ref={markerRef}
      onClick={handleMarkerClick}
    >
      {children}
    </AdvancedMarker>
  );
};

export default MapMarker;
