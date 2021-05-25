import { createMedia } from '@artsy/fresnel';

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
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </MediaContextProvider>
);
  
ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}