import { Hero } from "../components/sections/Hero";
import { Features } from "../components/sections/Features";
import { Services } from "../components/sections/Services";
import { ContactForm } from "../components/sections/ContactForm";
import { BrandLogos } from "../components/sections/BrandLogos";
import { Link } from "react-router-dom"; // or 'next/link' if using Next.js
import {
  MapPin,
  Sun,
  Calendar,
  Settings,
  PanelTop,
  Battery,
  CheckCircle,
  Star,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { Testimonials } from "../components/sections/Testimonials";

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
    id: 16,
    title:
      "SSS Main Office Goes Solar with 500 Panels—Here's Why You Should Too",
    excerpt:
      "The SSS Main Office in Quezon City now runs on solar with 500 panels and 285 kW capacity. Here's what it means for homeowners and businesses thinking of going solar.",
    slug: "sss-main-office-goes-solar-2025",
    featuredImage: "/images/sss-solar-panel-installation-quezon-city.jpg",
    readingTime: 4,
    date: "2025-05-17",
  },
  {
    id: 15,
    title: "Solar Panel Installation Guide for Homes in the Philippines (2025)",
    excerpt:
      "Learn how to install solar panels for your home in the Philippines in 2025. This updated guide covers everything—costs, types, steps, and local tips to help you go solar efficiently.",
    slug: "solar-panel-installation-guide-philippines-2025",
    featuredImage: "/images/solar-panel-installation-philippines-guide.jpg",
    readingTime: 4,
    date: "2025-05-14",
  },
];

// Mock data array for 3 featured projects
const featuredProjects = [
  {
    image: "/images/project1.jpg",
    location: "Sariaya, Quezon, PH",
    system: "32kW Hybrid Solar",
    date: "2024-04-30",
    specification: [
      "2 x 16kW Deye Hybrid Inverter",
      "54 pcs 615W Canadian Bifacial Solar Panel",
      "4 x 51.2v 280Ah LiFePO4 Battery",
    ],
  },
  {
    image: "/images/project2.jpg",
    location: "Goa, Camarines Sur, PH",
    system: "24kW Hybrid Solar",
    date: "2024-03-18",
    specification: [
      "2 x 12kW Hybrid Inverter",
      "48 pcs 610W Canadian Bifacial Solar Panel",
      "4 x 51.2v 314Ah LiFePO4 Battery",
    ],
  },
  {
    image: "/images/project3.jpg",
    location: "Cabanatuan City, PH",
    system: "12kW Hybrid Solar",
    date: "2024-04-12",
    specification: [
      "12kW Hybrid Inverter",
      "24 pcs 615W Canadian Bifacial Solar Panel",
      "2 x 51.2v 280Ah LiFePO4 Battery",
    ],
  },
];

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home | SunPhil Solar</title>
      </Helmet>
      <Hero />
      {/* Featured Projects Section - 3-column grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((proj, idx) => (
              <Link
                to="/solarprojects"
                key={idx}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 hover:ring-2 hover:ring-blue-400"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={proj.image}
                    alt={proj.location}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 font-bold text-black mb-1">
                    <MapPin className="text-primary-500" size={18} />
                    <span>{proj.location}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-black mb-1">
                    <Sun className="text-yellow-500" size={18} />
                    <span>{proj.system}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-black mb-2">
                    <Calendar className="text-primary-500" size={18} />
                    <span>{proj.date}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <ul className="text-left pl-5 space-y-2">
                      {proj.specification.map((spec, i) => {
                        let Icon = Settings;
                        if (/inverter/i.test(spec)) Icon = Settings;
                        else if (/solar panel/i.test(spec)) Icon = PanelTop;
                        else if (/battery/i.test(spec)) Icon = Battery;
                        return (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-black font-semibold mb-2 last:mb-0"
                          >
                            <Icon className="text-primary-500 mt-1" size={20} />
                            <span>{spec}</span>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="flex items-center gap-2 mt-4">
                      <CheckCircle className="text-green-500" size={20} />
                      <span className="font-semibold text-black">
                        Client Review:
                      </span>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="text-yellow-400 fill-yellow-400"
                          size={20}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/solarprojects"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>
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
      <Features />
      <Services />
      <BrandLogos />
      <Testimonials />
      <ContactForm />
    </>
  );
};
