import { DefaultLayout } from '../components/layouts/DefaultLayout';
import { HomepageView } from '../components/views/HomepageView';

export default function Home() {
  return (
    <DefaultLayout>
      <HomepageView />
    </DefaultLayout>
  );
}