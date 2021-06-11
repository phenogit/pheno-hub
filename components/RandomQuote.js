import PropTypes from 'prop-types';
import React from 'react';
import {
  Dimmer,
  Loader
} from 'semantic-ui-react';
import useSWR from 'swr';

import styles from '../styles/RandomQuote.module.css';

const randomQuoteFetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error('quote fetcher error');
  }
  return res.json();
}

/* Heads up!
 * RandomQuote uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
export const RandomQuote = ({ mobile }) => {
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
      <>
        <div className={styles.quote}>
          {quote}
        </div>
        <div className={styles.author}>
          {`-${author}`}
        </div>
      </>
    );
  }
  
}
  
RandomQuote.propTypes = {
  mobile: PropTypes.bool,
}