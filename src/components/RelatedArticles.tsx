import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getNewestPosts } from "@/data/blogPosts";

interface RelatedArticlesProps {
  currentPostId: number;
  count?: number;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  currentPostId,
  count = 3,
}) => {
  const related = getNewestPosts()
    .filter((post) => post.id !== currentPostId)
    .slice(0, count);

  if (related.length === 0) return null;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
  };

  const articleCard = (post: any, idx: number) => (
    <a
      key={post.id + "-" + idx}
      href={`/blog/${post.slug}`}
      className="block border border-secondary-200 rounded-lg overflow-hidden shadow hover:shadow-xl transform hover:scale-105 transition-all duration-200 bg-white hover:border-primary-500 w-full max-w-full"
    >
      {post.featuredImage && post.featuredImage.url && (
        <img
          src={post.featuredImage.url}
          alt={post.featuredImage.alt || post.title}
          className="w-full h-40 object-cover"
          style={{ minHeight: 160 }}
        />
      )}
      <div className="p-4">
        <h4 className="font-semibold text-lg mb-2 line-clamp-2 text-secondary-900">
          {post.title}
        </h4>
        <p className="text-secondary-700 text-sm line-clamp-3 mb-2">
          {post.excerpt}
        </p>
      </div>
    </a>
  );

  return (
    <section className="mt-10">
      <h3 className="text-2xl font-semibold text-secondary-900 mb-4">
        Related Articles
      </h3>
      {/* Mobile Carousel */}
      <div className="block md:hidden w-full">
        <Slider {...sliderSettings}>
          {related.map((post, idx) => (
            <div key={post.id + "-slide-" + idx} className="w-full">
              {articleCard(post, idx)}
            </div>
          ))}
        </Slider>
      </div>
      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {related.map((post, idx) => articleCard(post, idx))}
      </div>
    </section>
  );
};

export default RelatedArticles;
