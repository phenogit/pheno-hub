import Markdown from "markdown-to-jsx";
import { useRouter } from "next/router";
import githubCms from "../../../lib/github-cms";

import styles from "../../../styles/Blog.module.css";
import { Layout } from "../../../components/layouts/Layout";
import { TedTalk } from "../../../components/TedTalk";
import Comments from "../../../components/Comments";

export async function getStaticPaths() {
  const postList = await githubCms.getPostList();
  const paths = postList.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const post = await githubCms.getPost(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 2,
  };
}

export default function Post({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return <Layout title="hmmm...">Loading...</Layout>;
  }
  if (!post) {
    return <Layout title="post not exist">What article is this?</Layout>;
  }

  const updateTime = new Date(post.createdAt);
  return (
    <Layout title="Post">
      <div className={styles.time}>
        Updated {`${updateTime.toDateString()}`}
      </div>
      <h1>{`${post.title}`}</h1>
      <Markdown
        options={{
          overrides: {
            TedTalk: { component: TedTalk },
          },
        }}
      >
        {post.content}
      </Markdown>
      <b>Comments</b>
      <Comments slug={post.slug} />
    </Layout>
  );
}
