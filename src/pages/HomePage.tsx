import { Hero } from '../components/sections/Hero';
import { Stats } from '../components/sections/Stats';
import { Features } from '../components/sections/Features';
import { Services } from '../components/sections/Services';
import { ContactForm } from '../components/sections/ContactForm';
import { Link } from 'react-router-dom'; // or 'next/link' if using Next.js

// Mock data array for 3 featured blogs
const featuredBlogs = [
  {
    id: 6,
    title: "Japan's Perovskite Solar Revolution: Matching 20 Nuclear Reactors by 2040",
    excerpt: "Japan aims to generate 20 GW with perovskite solar cells by 2040, equivalent to 20 nuclear reactors...",
    slug: "japan-perovskite-solar-revolution-2040",
    featuredImage: "/images/perovskite.jpg",
    readingTime: 3,
    date: "2025-04-10"
  },
  {
    id: 7,
    title: "World's Most Powerful Flexible Solar Cell Hits 26.5% Efficiency",
    excerpt: "Japanese researchers break efficiency records with bendable perovskite solar cells...",
    slug: "japan-flexible-solar-cell-26-percent-efficiency",
    featuredImage: "/images/flexible-perovskite-solar.jpg",
    readingTime: 4,
    date: "2025-04-15"
  },
  {
    id: 8,
    title: "How Solar Energy is Powering EVs in the Philippines",
    excerpt: "With electric vehicles (EVs) becoming increasingly popular in the Philippines, many are now exploring how solar energy can power their eco-friendly rides.",
    slug: "solar-energy-powering-evs-philippines",
    featuredImage: "/images/ev-charging.jpg",
    readingTime: 5,
    date: "2025-04-20"
  }
];

export const HomePage = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      
      {/* Featured Blogs Section - 3-column grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <img
                  className="w-full h-48 object-cover"
                  src={blog.featuredImage}
                  alt={blog.title}
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-gray-500">{blog.date}</span>
                    <span className="text-sm text-gray-500">{blog.readingTime} min read</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
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

      <Services /> {/* "Our Solar Energy Solutions" section */}
      <ContactForm />
    </>
  );
};