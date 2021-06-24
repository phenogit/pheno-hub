import { promises as fsPromises } from "fs";
import Markdown from "markdown-to-jsx";

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
    fallback: false,
  };
}

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

export default function Post({ post }) {
  return (
    <Layout title="Post">
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
