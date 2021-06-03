import PropTypes from 'prop-types';
import React from 'react';
import {
  Container,
  Header,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import useSWR from 'swr';

const randomQuoteFetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error('quote fetcher error');
  }
  return res.json();
}

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
export const HomepageHeading = ({ mobile }) => {
  const { data, error } = useSWR('/api/randomQuote', randomQuoteFetcher, {
    refreshInterval: 20000
  });
  if (error) {
    return (
      <Dimmer active>
        <Loader content="Error" />
      </Dimmer>
    );
  } else if (!data) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  } else {
    const quote = data.quote[0].q;
    const author = data.quote[0].a;
    return (
      <Container text>
        <Header
          as='h1'
          content={quote}
          inverted
          style={{
            fontSize: mobile ? '2em' : '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: mobile ? '1.5em' : '3em',
          }}
        />
        <Header
          as='h2'
          content={`- ${author}`}
          inverted
          style={{
            fontSize: mobile ? '1.5em' : '1.7em',
            fontWeight: 'normal',
            marginTop: mobile ? '0.5em' : '1.5em',
            textAlign: 'right'
          }}
        />
        
      </Container>
    );
  }
  
}
  
  HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
  }