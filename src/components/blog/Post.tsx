import React from "react";
import { Helmet } from "react-helmet";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostContent from "./PostContent";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { BlogPost } from "@/types/blog";
import RelatedArticles from "@/components/RelatedArticles";
import { calculateWordCount, estimateReadingTime } from "@/utils/contentUtils";

type PostProps = Pick<
  BlogPost,
  | "id"
  | "title"
  | "date"
  | "author"
  | "tags"
  | "featuredImage"
  | "excerpt"
  | "slug"
  | "readingTime"
  | "isFeatured"
  | "metaDescription" // Added metaDescription
> & {
  children: React.ReactNode;
};

const Post = ({
  id,
  title,
  date,
  author,
  tags,
  featuredImage,
  excerpt,
  slug,
  readingTime,
  isFeatured,
  children,
}: PostProps) => {
  // Calculate word count and reading time using utilities
  const wordCount = calculateWordCount(children);
  const estimatedReadingTime = readingTime || estimateReadingTime(wordCount);

  // Prepare SEO data
  const postUrl = slug ? `https://sunphilsolar.com/blog/${slug}` : "";
  const siteTitle = "SunPhil Solar";
  const pageTitle = `${title} | ${siteTitle} Blog`;
  const description =
    excerpt ||
    "Learn about solar energy solutions and sustainable power options from SunPhil Solar.";
  const imageUrl = featuredImage?.url
    ? featuredImage.url.startsWith("http")
      ? featuredImage.url
      : `https://sunphilsolar.com${featuredImage.url}`
    : "";

  // Enhanced structured data with word count and reading time
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://sunphilsolar.com/blog/${id}`, // Added ID for better SEO
    headline: title,
    datePublished: date,
    dateModified: date,
    image: imageUrl,
    url: postUrl,
    description: description,
    wordCount: wordCount,
    timeRequired: `PT${estimatedReadingTime}M`, // ISO 8601 duration format
    ...(author && {
      author: {
        "@type": "Person",
        name: author,
      },
    }),
    publisher: {
      "@type": "Organization",
      name: "SunPhil Solar",
      logo: {
        "@type": "ImageObject",
        url: "https://sunphilsolar.com/sunphil.svg",
      },
    },
    ...(tags &&
      tags.length > 0 && {
        keywords: tags.join(", "),
      }),
    ...(isFeatured && {
      isFeatured: true,
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="wordcount" content={wordCount.toString()} />
        <meta name="reading-time" content={`${estimatedReadingTime} minutes`} />

        {/* Open Graph tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        {slug && <meta property="og:url" content={postUrl} />}
        {featuredImage?.url && <meta property="og:image" content={imageUrl} />}
        <meta property="article:published_time" content={date} />
        <meta property="article:modified_time" content={date} />
        {author && <meta property="article:author" content={author} />}
        {tags &&
          tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {featuredImage?.url && <meta name="twitter:image" content={imageUrl} />}

        {/* Canonical URL */}
        {slug && <link rel="canonical" href={postUrl} />}

        {/* Structured Data JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <article
        className="mx-auto my-12 max-w-4xl px-4"
        id={`post-${id}`} // Added ID to the article element
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        {featuredImage?.url && (
          <>
            <img
              src={featuredImage.url}
              alt={featuredImage.alt || `${title} - Featured Image`}
              className="mb-2 h-64 w-full rounded-2xl object-cover shadow-md"
              loading="lazy"
              {...(featuredImage.width && { width: featuredImage.width })}
              {...(featuredImage.height && { height: featuredImage.height })}
              itemProp="image"
            />
            {featuredImage.credits && (
              <div className="mb-6 text-xs text-gray-500">
                Image credit:{" "}
                {featuredImage.credits.link ? (
                  <a
                    href={featuredImage.credits.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary-500"
                  >
                    {featuredImage.credits.author || "Source"}
                  </a>
                ) : (
                  featuredImage.credits.author || "Source"
                )}
                {featuredImage.credits.source
                  ? ` (${featuredImage.credits.source})`
                  : ""}
              </div>
            )}
          </>
        )}

        <PostTitle itemProp="headline">{title}</PostTitle>

        <PostMeta>
          <time dateTime={date} itemProp="datePublished">
            {date}
          </time>
          {author && <span className="mx-2">•</span>}
          {author && <span itemProp="author">{author}</span>}
          {estimatedReadingTime && <span className="mx-2">•</span>}
          {estimatedReadingTime && <span>{estimatedReadingTime} min read</span>}
          {wordCount > 0 && <span className="mx-2">•</span>}
          {wordCount > 0 && <span>{wordCount.toLocaleString()} words</span>}
          {isFeatured && <span className="mx-2">•</span>}
          {isFeatured && <span className="text-primary-500">Featured</span>}
        </PostMeta>

        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={`${id}-${tag}`} // Enhanced key with post ID
                className="rounded-full bg-secondary-100 px-3 py-1 text-xs font-medium text-secondary-700 dark:bg-secondary-800 dark:text-secondary-100"
                itemProp="keywords"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Responsive layout: ToC sidebar on desktop, hidden on mobile */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <PostContent itemProp="articleBody">{children}</PostContent>
            <RelatedArticles currentPostId={id} />
            <div className="mt-12 flex items-center gap-4 text-gray-500 dark:text-gray-400">
              <span>Share:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  postUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
                aria-label="Share on Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  postUrl
                )}&text=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-500"
                aria-label="Share on Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  postUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700"
                aria-label="Share on LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Post;
