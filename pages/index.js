import styles from "../styles/Home.module.css";

import { Layout } from "../components/layouts/Layout";
import { RandomQuote } from "../components/RandomQuote";

export const getStaticProps = async () => {
  const res = await fetch("https://zenquotes.io/api/random");
  const data = await res.json();
  return {
    props: {
      quote: data[0],
    },
  };
};

export default function Home() {
  return (
    <div>
      <Layout title="Home">
        <RandomQuote className={styles.title} />
      </Layout>
    </div>
  );
}
