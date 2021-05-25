import Link from "next/link";

export default function Header() {
  return (
    <h2 className="w-full h-24 bg-gray-700 flex flex-row items-center justify-between text-2xl md:text-4xl font-bold mb-12">
      <Link href="/blog">
        <a className="mx-4 text-blog-accent font-bold hover:underline no-underline">
          Blog
        </a>
      </Link>
      <Link href="/">
        <a className="mx-4 text-white hover:underline no-underline">
          Return to Home Page
        </a>
      </Link>
    </h2>
  );
}
