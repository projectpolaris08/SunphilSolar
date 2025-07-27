import { useParams, Navigate, useLocation, Link } from "react-router-dom";
import { blogPosts, getPostBySlug } from "@/data/blogPosts";
import Post from "@/components/blog/Post";
import TableOfContents from "@/components/blog/TableOfContents";
import { Home } from "lucide-react";
import { useEffect, useState } from "react";
import { BlogPost } from "@/types/blog";

export const PostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);

        if (!slug) {
          throw new Error("Missing slug parameter");
        }

        // Simulate API delay (remove in production)
        await new Promise((resolve) => setTimeout(resolve, 200));

        const foundPost = getPostBySlug(slug);

        if (!foundPost) {
          throw new Error(`Post with slug \"${slug}\" not found`);
        }

        setPost(foundPost);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();

    // Cleanup function
    return () => {
      // Cancel any pending operations if component unmounts
    };
  }, [slug, location.pathname]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
        <p className="text-lg text-gray-600">Loading post...</p>
      </div>
    );
  }

  // Error state - redirect to not-found page if slug doesn't exist
  if (error || !post) {
    return (
      <Navigate
        to="/not-found"
        state={{
          from: "blog",
          attemptedSlug: slug,
          error: error || "Post not found",
          availableSlugs: blogPosts.map((post) => post.slug),
        }}
        replace
      />
    );
  }

  // Success state - Layout with ToC sidebar (desktop) and main content
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-2 md:px-6 py-8 gap-8">
      {/* Sidebar ToC: only visible on desktop */}
      <aside className="hidden md:block md:w-1/4 lg:w-1/5">
        <div className="sticky top-24">
          <TableOfContents contentRootSelector=".prose" />
        </div>
      </aside>
      {/* Main blog content */}
      <main className="w-full md:w-3/4 lg:w-4/5">
        {/* Breadcrumbs */}
        <nav
          className="mb-6 text-sm flex items-center space-x-2 text-gray-600"
          aria-label="Breadcrumb"
        >
          <Link
            to="/"
            className="hover:text-blue-600 font-medium flex items-center"
          >
            <Home size={16} className="mr-1" /> Home
          </Link>
          <span className="mx-1">&gt;</span>
          <Link to="/blog" className="hover:text-blue-600 font-medium">
            Blog
          </Link>
          <span className="mx-1">&gt;</span>
          <span
            className="text-gray-900 font-semibold truncate max-w-xs md:max-w-md lg:max-w-lg"
            title={post.title}
          >
            {post.title}
          </span>
        </nav>
        <Post
          id={post.id}
          title={post.title}
          author={post.author}
          date={post.date}
          slug={post.slug}
          tags={post.tags}
          excerpt={post.excerpt}
          metaDescription={post.metaDescription}
          featuredImage={post.featuredImage}
          readingTime={post.readingTime}
          isFeatured={post.isFeatured}
        >
          {post.fullContent}
        </Post>
      </main>
    </div>
  );
};
