import { createMedia } from '@artsy/fresnel';
import React from 'react';
import PropTypes from 'prop-types';

import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';

const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
      mobile: 0,
      tablet: 768,
      computer: 1024,
    },
});

export const ResponsiveHeader = ({ children }) => (
    /* Heads up!
     * For large applications it may not be best option to put all page into these containers at
     * they will be rendered twice for SSR.
     */
    <MediaContextProvider>
      <Media at="mobile">
        <MobileHeader>{children}</MobileHeader>
      </Media>
      <Media at="tablet">
        <MobileHeader>{children}</MobileHeader>
      </Media>
      <Media at="computer">
        <DesktopHeader>{children}</DesktopHeader>
      </Media>
    </MediaContextProvider>
);
  
ResponsiveHeader.propTypes = {
    children: PropTypes.node,
}