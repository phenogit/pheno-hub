import { promises as fsPromises } from "fs";
import Markdown from "markdown-to-jsx";
import { useRouter } from "next/router";

import { Layout } from "../../../components/layouts/Layout";
import { TedTalk } from "../../../components/TedTalk";

export async function getStaticPaths() {
  const markdownFiles = await fsPromises.readdir("data/blog");
  const paths = markdownFiles.map((filename) => {
    const slug = filename.replace(/.md$/, "");
    return {
      params: { slug },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const [year, month, day, ...rest] = params.slug.split("-");
  const updatedAt = new Date(`${year} ${month} ${day}`).getTime();
  const title = rest.join(" ");
  let content = null;

  try {
    content = await fsPromises.readFile(`data/blog/${params.slug}.md`, "utf8");
  } catch (err) {
    return {
      props: {
        post: null,
      },
    };
  }

  return {
    props: {
      post: {
        slug: params.slug,
        title,
        content,
        updatedAt,
      },
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

  const updateTime = new Date(post.updatedAt);
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
