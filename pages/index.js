import styles from '../styles/Home.module.css';

import { Layout } from '../components/layouts/Layout';
import { HomepageView } from '../components/views/HomepageView';

export default function Home() {
  return (
    <div>
      <Layout title="Home">
        <HomepageView />
      </Layout>
    </div>
  );
}