import { Layout } from "../components/layouts/Layout";
import { HomepageView } from "../components/views/HomepageView";

/* problem with zenquote
export const getStaticProps = async () => {
  const res = await fetch("https://zenquotes.io/api/random");
  const data = await res.json();
  return {
    props: {
      quote: data[0],
    },
  };
};
*/

export default function Home() {
  return (
    <div>
      <Layout title="Home">
        <HomepageView />
      </Layout>
    </div>
  );
}
