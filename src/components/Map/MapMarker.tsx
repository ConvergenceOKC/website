'use client'

import { useCallback, useState } from 'react'

import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps'

const MapMarker = ({
  position,
  name,
  location,
  facilitator,
  time,
  children,
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef()
  const [infoWindowShown, setInfoWindowShown] = useState(false)
  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    [],
  )
  const handleClose = useCallback(() => setInfoWindowShown(false), [])

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
          <h2 className="mb-2 text-lg font-semibold">{name}</h2>
          <p>{location}</p>
          <p>{facilitator}</p>
          <p>{time}</p>
        </InfoWindow>
      )}
    </AdvancedMarker>
  )
}

export default MapMarker
