'use client'

import { APIProvider } from '@vis.gl/react-google-maps'

export const GoogleMapsProvider = ({ children }: { children: React.ReactNode }) => (
  <APIProvider
    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
    onLoad={() => console.log('Maps API has loaded.')}
  >
    {children}
  </APIProvider>
)
