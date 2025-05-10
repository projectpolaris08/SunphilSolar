import { Hero } from "../components/sections/Hero";
import { Stats } from "../components/sections/Stats";
import { Features } from "../components/sections/Features";
import { Services } from "../components/sections/Services";
import { ContactForm } from "../components/sections/ContactForm";
import { Link } from "react-router-dom"; // or 'next/link' if using Next.js

// Mock data array for 3 featured blogs
const featuredBlogs = [
  {
    id: 12,
    title:
      "Can Solar Panels Work During Rainy Weather? Insights for the Philippines' Unusual Summer Rain Pattern",
    excerpt:
      "Is solar energy still effective in rainy weather? Learn how solar panels perform in the Philippines' current rainy-but-summer weather system and why they remain a smart investment.",
    slug: "solar-panels-in-rainy-weather-philippines",
    featuredImage: "/images/solar-panels-rain.jpg",
    readingTime: 6,
    date: "2025-05-09",
  },
  {
    id: 11,
    title: "Is Solar Worth It? Understanding the Return on Investment (ROI) of Solar Installations in the Philippines",
    excerpt:
      "Is solar worth the investment in the Philippines? This article breaks down ROI, costs, savings, payback periods, and includes a real-life example from Cavite.",
    slug: "solar-roi-philippines",
    featuredImage: "/images/solar-roi-philippines.jpg",
    readingTime: 6,
    date: "2025-05-05",
  },
  {
    id: 13,
    title: "How a Trump Presidency in 2025 Could Impact the Solar Industry in the Philippines",
    excerpt:
      "Donald Trump’s return to the White House in 2025 could create ripple effects in the Philippine solar market—from rising solar panel prices to shifts in global investment. Here’s what you need to know.",
    featuredImage: "/images/trump-solar-impact.jpg",
    readingTime: 8,
    date: "2025-05-10",
  },
];

export const HomePage = () => {
  return (
    <>
      <Hero />
      {/* Featured Blogs Section - 3-column grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog) => (
              <Link
                to={`/blog/${blog.slug}`}
                key={blog.id}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 hover:ring-2 hover:ring-blue-400"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2 text-sm text-gray-500">
                    <span>{blog.date}</span>
                    <span>{blog.readingTime} min read</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <span className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                    Read More
                    <svg
                      className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/blog"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>
      <Stats />
      <Features />
      <Services /> {/* "Our Solar Energy Solutions" section */}
      <ContactForm />
    </>
  );
};
