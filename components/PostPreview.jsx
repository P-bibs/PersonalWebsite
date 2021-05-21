import DateFormater from "./date-formater";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}) {
  return (
    <div className="p-4 shadow rounded border border-gray-600">
      <h2 className="text-3xl mb-3 leading-snug">
        <Link as={`/blog/posts/${slug}`} href="/blog/posts/[slug]">
          <a className="text-black font-bold no-underline hover:underline">
            {title}
          </a>
        </Link>
      </h2>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>

      <div className="text-lg mb-4">
        <DateFormater dateString={date} />
      </div>
      <p className="text-lg leading-relaxed">{excerpt}</p>
      <p>
        <Link as={`/blog/posts/${slug}`} href="/blog/posts/[slug]">
          <a className="text-black font-bold no-underline hover:underline">
            Read more
          </a>
        </Link>
      </p>
    </div>
  );
}
