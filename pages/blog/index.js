import styles from "../../styles/Blog.module.css";

import Link from "next/link";
import githubCms from "../../lib/github-cms";

import { Layout } from "../../components/layouts/Layout";

export async function getStaticProps() {
  const postList = await githubCms.getPostList();

  return {
    props: {
      postList,
    },
    revalidate: 2,
  };
}

export default function Blog({ postList }) {
  const sortedPostList = postList.sort((a, b) => b.createdAt - a.createdAt);
  return (
    <Layout title="Blog">
      {sortedPostList.map((post) => {
        const updateTime = new Date(post.createdAt);
        return (
          <div
            key={`${post.createdAt}-${post.slug}`}
            className={styles.postLink}
          >
            <Link href="/blog/post/[slug]" as={`/blog/post/${post.slug}`}>
              <a>
                {`${post.title}`}
                <div className={styles.timeDiff}>
                  {`${updateTime.toDateString().split(" ").slice(1).join(" ")}`}
                </div>
              </a>
            </Link>
          </div>
        );
      })}
    </Layout>
  );
}
