import styles from '../styles/Home.module.css';

import { Layout } from '../components/layouts/Layout';
import { HomepageView } from '../components/views/HomepageView';

export default function Home() {
  return (
    <div>
      <Layout title="Home">
        <h1 className={styles.title}>Cool Quote</h1>
        <HomepageView />
      </Layout>
    </div>
  );
}