// src/pages/BlogPage.tsx
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";
import { getSortedPaginatedPosts } from "../data/blogPosts.tsx";
import {
  SunIcon,
  LightbulbIcon,
  ListIcon,
  CarIcon,
  TrendingUpIcon,
  LabIcon,
  HomeIcon,
} from "../components/icons";
import { motion, AnimatePresence } from "framer-motion";

export const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  const postsPerPage = 6;
  const { posts: currentPosts, totalPages } = getSortedPaginatedPosts(
    currentPage,
    postsPerPage,
    sortBy
  );

  const seoData = {
    title: "Blog | SunPhil Solar",
    description:
      "Explore the latest articles about solar energy, sustainable power solutions, and renewable energy trends from SunPhil Solar.",
    url: "https://sunphilsolar.com/blog",
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (newSort: "newest" | "oldest") => {
    setSortBy(newSort);
    setCurrentPage(1); // Reset to first page when changing sort
    setSearchParams({ page: "1" });
  };

  useEffect(() => {
    setCurrentPage(pageParam);
  }, [pageParam]);

  return (
    <section className="py-20 bg-gradient-to-b from-secondary-900 to-secondary-800 min-h-screen">
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

        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-white">Blog</h1>

          {/* Sorting Controls */}
          <div className="flex space-x-4">
            <button
              onClick={() => handleSortChange("newest")}
              className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                sortBy === "newest"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-secondary-800 hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              Newest Posts
            </button>
            <button
              onClick={() => handleSortChange("oldest")}
              className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                sortBy === "oldest"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-secondary-800 hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              Oldest Posts
            </button>
          </div>
        </div>

        {/* Blog Cards with Fade Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPage}-${sortBy}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentPosts.map((post) => (
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
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex justify-center mt-12 gap-2 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-secondary-800 hover:bg-blue-100 hover:text-blue-600"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-secondary-800 hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-secondary-800 hover:bg-blue-100 hover:text-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
