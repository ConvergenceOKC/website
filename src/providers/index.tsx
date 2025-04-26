import React from 'react';

import { GoogleMapsProvider } from './GoogleMaps';
import { HeaderThemeProvider } from './HeaderTheme';
import { ThemeProvider } from './Theme';

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <GoogleMapsProvider>{children}</GoogleMapsProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  );
};
