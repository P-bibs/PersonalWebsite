import unified from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import stringify from 'rehype-stringify'
import slug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";

export default async function markdownToHtml(content) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(slug)
    .use(rehypeHighlight)
    .use(stringify)
    .process(content);
  return result.toString();
}
