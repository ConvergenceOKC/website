import React from 'react';

import { Provider as BalancerProvider } from 'react-wrap-balancer';

import { GoogleMapsProvider } from './GoogleMaps';
import { HeaderThemeProvider } from './HeaderTheme';
import { ReCaptchaProvider } from './Recaptcha';
import { ThemeProvider } from './Theme';

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <BalancerProvider>
          <GoogleMapsProvider>
            <ReCaptchaProvider>{children}</ReCaptchaProvider>
          </GoogleMapsProvider>
        </BalancerProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  );
};
