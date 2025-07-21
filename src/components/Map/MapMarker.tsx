'use client';

import { useCallback, useState } from 'react';

import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

const MapMarker = ({
  position,
  name,
  facilitator,
  location,
  city,
  zip,
  time,
  children,
}) => {
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
          <h3 className="mb-2 text-lg font-semibold">{name}</h3>
          <p>
            {location}
            <br />
            {`${city}, OK ${zip}`}
          </p>
          <ul>
            <li>
              <span className="font-bold">Facilitator: </span>
              {facilitator}
            </li>
            <li>
              <span className="font-bold">Time: </span>
              {time}
            </li>
          </ul>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
};

export default MapMarker;
