import Markdown from "markdown-to-jsx";
import { useRouter } from "next/router";
import githubCms from "../../../lib/github-cms";

import { Layout } from "../../../components/layouts/Layout";
import { TedTalk } from "../../../components/TedTalk";

export async function getServerSideProps({ params }) {
  const post = await githubCms.getPost(params.slug);

  return {
    props: {
      post,
    },
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
      <h1>
        {`${post.title}-(${updateTime
          .toDateString()
          .split(" ")
          .slice(1)
          .join(" ")})`}
      </h1>
      <Markdown
        options={{
          overrides: {
            TedTalk: { component: TedTalk },
          },
        }}
      >
        {post.content}
      </Markdown>
    </Layout>
  );
}
