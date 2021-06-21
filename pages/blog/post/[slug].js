import { promises as fsPromises } from "fs";
import Markdown from "markdown-to-jsx";

import { Layout } from "../../../components/layouts/Layout";

export async function getStaticProps({ params }) {
  const [year, month, day, ...rest] = params.slug.split("-");
  const updatedAt = new Date(`${year} ${month} ${day}`).getTime();
  const title = rest.join(" ");

  const content = await fsPromises.readFile(
    `data/blog/${params.slug}.md`,
    "utf8"
  );

  return {
    props: {
      post: {
        slug: params.slug,
        title,
        content,
        updatedAt,
      },
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { slug: "2021-01-26-Kit-Korner-Notes" },
      },
    ],
    fallback: false,
  };
}

export default function Post({ post }) {
  return (
    <Layout title="Post">
      <Markdown>{post.content}</Markdown>
    </Layout>
  );
}
