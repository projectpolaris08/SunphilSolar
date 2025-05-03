// src/pages/BlogPage.tsx
import { useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts.tsx";
import {
  SunIcon,
  LightbulbIcon,
  ListIcon,
  CarIcon,
  TrendingUpIcon,
  LabIcon,
  HomeIcon
} from '../components/icons';

export const BlogPage = () => {
  const postRef = useRef<HTMLDivElement>(null);

  const seoData = {
    title: "Blog | SunPhil Solar",
    description: "Explore the latest articles about solar energy, sustainable power solutions, and renewable energy trends from SunPhil Solar.",
    url: "https://sunphilsolar.com/blog"
  };

  return (
    <section className="py-20 bg-gradient-to-b from-secondary-900 to-secondary-800">
      <div className="container mx-auto px-4">
        <Helmet>
          <title>{seoData.title}</title>
          <meta name="description" content={seoData.description} />
          <meta property="og:title" content={seoData.title} />
          <meta property="og:description" content={seoData.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={seoData.url} />
          <link rel="canonical" href={seoData.url} />
        </Helmet>

        <h1 className="text-4xl font-bold text-white mb-12">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-blue-400"
            >
              {post.featuredImage && (
                <div className="relative overflow-hidden h-48">
                  <img
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="text-blue-500 mb-4 transition-transform duration-300 group-hover:scale-110">
                  {post.id === 1 && <SunIcon />}
                  {post.id === 2 && <LightbulbIcon />}
                  {post.id === 3 && <ListIcon />}
                  {post.id === 4 && <CarIcon />}
                  {post.id === 5 && <TrendingUpIcon />}
                  {post.id === 6 && <LabIcon />}
                  {post.id === 7 && <HomeIcon />}
                </div>
                <h2 className="text-xl font-semibold text-secondary-900 mb-2 transition-colors duration-300 group-hover:text-blue-600">
                  {post.title}
                </h2>

                {post.date && (
                  <p className="text-secondary-500 text-xs mb-2">
                    <time dateTime={post.date}>{post.date}</time>
                  </p>
                )}

                <p className="text-secondary-700 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary-100 px-2 py-1 text-xs font-medium text-secondary-700"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="text-xs text-secondary-500">
                        +{post.tags.length - 2} more
                      </span>
                    )}
                  </div>
                )}

                <span className="text-blue-500 font-medium inline-flex items-center transition-transform duration-300 group-hover:translate-x-1">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
