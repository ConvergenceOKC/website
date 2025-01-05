import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { GoogleMapsProvider } from './GoogleMaps'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <GoogleMapsProvider>{children}</GoogleMapsProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
