import { useParams, Navigate, useLocation } from "react-router-dom";
import { blogPosts, getPostBySlug } from "@/data/blogPosts";
import Post from "@/components/blog/Post";
import { useEffect, useState } from "react";
import { BlogPost } from "@/types/blog";

export const PostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Debugging: Log the current slug and path
    console.log(`Current slug: ${slug}`);
    console.log(`Current path: ${location.pathname}`);

    const fetchPost = async () => {
      try {
        setIsLoading(true);
        
        if (!slug) {
          throw new Error("Missing slug parameter");
        }

        // Debugging: Log all available slugs
        console.log("Available slugs:", blogPosts.map(post => post.slug));

        // Simulate API delay (remove in production)
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const foundPost = getPostBySlug(slug);
        console.log("Found post:", foundPost);

        if (!foundPost) {
          throw new Error(`Post with slug "${slug}" not found`);
        }

        setPost(foundPost);
        setError(null);
      } catch (err) {
        console.error("Error fetching post:", err);
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
    console.error(`Redirecting to not-found. Error: ${error}`);
    return (
      <Navigate 
        to="/not-found" 
        state={{ 
          from: 'blog',
          attemptedSlug: slug,
          error: error || 'Post not found',
          availableSlugs: blogPosts.map(post => post.slug)
        }} 
        replace 
      />
    );
  }

  // Debugging: Log successful post load
  console.log("Rendering post:", post.title);

  // Success state
  return (
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
  );
};