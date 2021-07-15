import styles from "../../styles/Blog.module.css";

import { promises as fsPromises } from "fs";
import ms from "ms";
import Link from "next/link";

import { Layout } from "../../components/layouts/Layout";
import { BlogpageView } from "../../components/views/BlogpageView";

export const getStaticProps = async () => {
  const markdownFiles = await fsPromises.readdir("data/blog");
  const postList = markdownFiles.map((filename) => {
    const slug = filename.replace(/.md$/, "");
    const [year, month, date, ...rest] = slug.split("-");
    const updatedAt = new Date(`${year} ${month} ${date}`).getTime();
    const title = rest.join(" ");

    return {
      slug,
      updatedAt,
      title,
    };
  });

  return {
    props: {
      postList,
    },
  };
};

export default function Blog({ postList }) {
  const sortedPostList = postList.sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <Layout title="Blog">
      {sortedPostList.map((post) => {
        const updateTime = new Date(post.updatedAt);
        return (
          <div
            key={`${post.updatedAt}-${post.slug}`}
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
      <BlogpageView />
    </Layout>
  );
}
