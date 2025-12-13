import React from 'react';

import { Provider as BalancerProvider } from 'react-wrap-balancer';

import { GoogleMapsProvider } from './GoogleMaps';
import { HeaderThemeProvider } from './HeaderTheme';
import { ThemeProvider } from './Theme';
import { ReCaptchaProvider } from './Recaptcha';

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <BalancerProvider>
          <GoogleMapsProvider>
            <ReCaptchaProvider>
              {children}
            </ReCaptchaProvider>
          </GoogleMapsProvider>
        </BalancerProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  );
};
