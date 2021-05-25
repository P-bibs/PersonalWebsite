import MoreStories from "../../components/more-stories";
import HeroPost from "../../components/hero-post";
import Intro from "../../components/intro";
import Layout from "../../components/layout";
import PostPreview from "../../components/PostPreview";
import { getAllPosts } from "../../lib/blog-api";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function Index({ allPosts }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Head>
        <title>Paul Biberstein</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="w-1/3 mx-auto space-y-4">
        {allPosts.map(
          (post) => !post.released && <PostPreview key={post.title} {...post} />
        )}
      </div>
      <Footer />
    </>
  );
  // eslint-disable-next-line
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
}
