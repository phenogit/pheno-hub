import { createMedia } from '@artsy/fresnel';
import React from 'react';
import PropTypes from 'prop-types';

import { DesktopContainer } from './DesktopContainer';
import { MobileContainer } from './MobileContainer';

const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
      mobile: 0,
      tablet: 768,
      computer: 1024,
    },
});

export const ResponsiveContainer = ({ children }) => (
    /* Heads up!
     * For large applications it may not be best option to put all page into these containers at
     * they will be rendered twice for SSR.
     */
    <MediaContextProvider>
      <Media at="mobile">
        <MobileContainer>{children}</MobileContainer>
      </Media>
      <Media at="tablet">
        <MobileContainer>{children}</MobileContainer>
      </Media>
      <Media at="computer">
        <DesktopContainer>{children}</DesktopContainer>
      </Media>
    </MediaContextProvider>
);
  
ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}