import styles from '../styles/Blog.module.css';
import { promises as fsPromises } from 'fs';

import { Layout } from '../components/layouts/Layout';
import { BlogpageView } from '../components/views/BlogpageView';

export const getStaticProps = async () => {
  const markdownFiles = await fsPromises.readdir('data/blog');
  const postList = markdownFiles.map(filename => {
    const slug = filename.replace(/.md$/, '');
    const [year, month, date, ...rest] = slug.split('-');
    const updatedAt = (new Date(`${year} ${month} ${date}`)).getTime();
    const title = rest.join(' ');

    return {
      slug,
      updatedAt,
      title
    };
  });

  return {
    props: {
      postList
    }
  };
}

export default function Blog({ postList }) {
  return (
    <Layout title="Blog">
      {
        postList.map(post => (
          <div className={styles.single} key={`${post.updatedAt}-${post.slug}`}>
            {`${post.updatedAt}: ${post.title}`}
          </div>
        ))
      }
      <BlogpageView />
    </Layout>
  );
}