import { Hero } from "../components/sections/Hero";
import { ContactForm } from "../components/sections/ContactForm";
import { BrandLogos } from "../components/sections/BrandLogos";
import { Link } from "react-router-dom"; // or 'next/link' if using Next.js
import {
  MapPin,
  Sun,
  Calendar,
  Settings,
  Battery,
  CheckCircle,
  Star,
  Gauge,
  BatteryCharging,
  Home as HomeIcon,
  Leaf,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { Testimonials } from "../components/sections/Testimonials";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { projects } from "../data/projects";

// Mock data array for 3 featured blogs
const featuredBlogs = [
  {
    id: 12,
    title:
      "Can Solar Panels Work During Rainy Weather? Insights for the Philippines",
    excerpt:
      "Despite the Philippines' prolonged rainy seasons and frequent typhoons, solar panels continue to generate power even during overcast and rainy conditions. With proper system design, energy storage solutions, and grid integration, solar energy remains a viable and essential renewable energy solution for the archipelago's 7,641 islands seeking energy independence and climate resilience.",
    slug: "solar-panels-rainy-weather-philippines-insights",
    featuredImage: "/images/solar-panels-rain.jpg",
    readingTime: 18,
    date: "2025-05-09",
  },
  {
    id: 10,
    title:
      "Net Metering vs. Battery Storage in the Philippines: Which One Saves More?",
    excerpt:
      "Discover whether net metering or battery storage is the better option for maximizing your solar energy investment in the Philippines. Learn about costs, ROI, and when batteries make sense.",
    slug: "net-metering-vs-battery-storage-philippines",
    featuredImage: "/images/net-metering-vs-battery.jpg",
    readingTime: 6,
    date: "2025-05-04",
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

type Project = {
  image: string;
  location: string;
  system: string;
  date: string;
  specification: string[];
};

// Mock data array for 3 featured projects
const featuredProjects: Project[] = [
  {
    image: "/images/project1.jpg",
    location: "Sariaya, Quezon, PH",
    system: "32kW Hybrid Solar",
    date: "2025-04-30",
    specification: [
      "2 x 16kW Deye Hybrid Inverter",
      "54 pcs 615W Canadian Bifacial Solar Panel",
      "4 x 51.2v 280Ah LiFePO₄ Batteries",
    ],
  },
  {
    image: "/images/project17.jpg",
    location: "San Antonio, Quezon, PH",
    system: "32kW Hybrid Solar",
    date: "2025-06-04",
    specification: [
      "2 × 16kW Deye Hybrid Inverters",
      "56 × 615W Canadian Bifacial Solar Panels",
      "5 × 51.2V 314Ah LiFePO₄ Batteries",
    ],
  },
  {
    image: "/images/project16.jpg",
    location: "Siruma, Camarines Sur, PH",
    system: "32kW Hybrid Solar",
    date: "2025-05-31",
    specification: [
      "2 × 16kW Deye Hybrid Inverters",
      "56 × 620W Canadian Bifacial Solar Panels",
      "4 x 51.2v 314Ah LiFePO₄ Batteries",
    ],
  },
];

// Utility functions for summary data
const totalHomes = projects.length;
const totalInverterKW = projects.reduce((sum, p) => {
  const match = p.system.match(/(\d+)(kW)/i);
  return sum + (match ? parseInt(match[1], 10) : 0);
}, 0);
const totalPanelKW = projects.reduce((sum, proj) => {
  // Find all specs that mention "panel" (case-insensitive)
  const panelSpecs = proj.specification.filter((s) => /panel/i.test(s));
  let projectTotal = 0;
  for (const spec of panelSpecs) {
    // Match patterns like "13 × 615W" or "18 x 615W" or "18 x 615 watt"
    let match = spec.match(/(\d+)\s*[×x]\s*(\d+(?:\.\d+)?)\s*(W|watt)/i);
    if (match) {
      const count = parseInt(match[1], 10);
      const watt = parseFloat(match[2]);
      projectTotal += (count * watt) / 1000;
      continue;
    }
    // Fallback: match single panel, e.g., "615W Panel" or "615 watt panel"
    match = spec.match(/(\d+(?:\.\d+)?)\s*(W|watt)/i);
    if (match) {
      const watt = parseFloat(match[1]);
      projectTotal += watt / 1000;
    }
  }
  return sum + projectTotal;
}, 0);
const totalBatteryKW = projects.reduce((sum, p) => {
  const batterySpecs = p.specification.filter((s) => /batter/i.test(s));
  let projectTotal = 0;
  for (const spec of batterySpecs) {
    // Try to match multiplier pattern first
    let match = spec.match(/(\d+)\s*[×x]\s*(\d+\.?\d*)V.*?(\d+\.?\d*)Ah/i);
    if (match) {
      const count = parseInt(match[1], 10);
      const voltage = parseFloat(match[2]);
      const ah = parseFloat(match[3]);
      projectTotal += (count * voltage * ah) / 1000;
      continue;
    }
    // Fallback: match single battery
    match = spec.match(/(\d+\.?\d*)V.*?(\d+\.?\d*)Ah/i);
    if (match) {
      const voltage = parseFloat(match[1]);
      const ah = parseFloat(match[2]);
      projectTotal += (voltage * ah) / 1000;
    }
  }
  return sum + projectTotal;
}, 0);
const totalCO2Tons = (projects.length * 700) / 1000;

export const HomePage = () => {
  const projectCard = (proj: Project, idx: number) => (
    <Link
      to="/solarprojects"
      key={idx}
      className="group bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-blue-400 relative"
    >
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
        <img
          src={proj.image}
          alt={proj.location}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay with summary on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300">
          <div className="flex items-center gap-2 text-white text-lg font-bold mb-1">
            <MapPin className="text-primary-400" size={20} />
            <span>{proj.location}</span>
          </div>
          <div className="text-white text-base">{proj.system}</div>
        </div>
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
            {proj.specification.map((spec: string, i: number) => {
              let Icon = Settings;
              if (/inverter/i.test(spec)) Icon = Settings;
              else if (/solar.*panel/i.test(spec)) Icon = Sun;
              else if (/batter/i.test(spec)) Icon = Battery;
              return (
                <li
                  key={i}
                  className="flex items-start gap-2 text-black font-semibold mb-2 last:mb-0"
                >
                  {Icon === Sun ? (
                    <Sun className="text-yellow-400 mt-1" size={20} />
                  ) : Icon === Battery ? (
                    <Battery className="text-blue-500 mt-1" size={20} />
                  ) : (
                    <Icon className="text-primary-500 mt-1" size={20} />
                  )}
                  <span>{spec}</span>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2 mt-4">
            <CheckCircle className="text-green-500" size={20} />
            <span className="font-semibold text-black">Client Review:</span>
            {[...Array(5)].map((_, i: number) => (
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
  );

  const projectSliderSettings = {
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

  return (
    <>
      <Helmet>
        <title>Home | Sunphil Solar</title>
      </Helmet>
      <Hero />
      {/* Featured Projects Section - Carousel on mobile, grid on desktop */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Projects
          </h2>
          {/* Summary Cards (auto-updating) - now before the project grid */}
          <section className="mb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full max-w-7xl mx-auto">
            {/* Total Homes */}
            <div className="w-full bg-blue-100/80 border border-blue-100 rounded-xl p-4 flex flex-col items-start shadow min-w-[120px] min-h-[80px] transition-all">
              <div className="flex items-center w-full justify-between mb-2">
                <span className="text-gray-700 text-sm font-medium">
                  Total Homes
                </span>
                <HomeIcon className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {totalHomes.toLocaleString()}
              </div>
            </div>
            {/* Total Inverter kW */}
            <div className="w-full bg-yellow-100/80 border border-yellow-100 rounded-xl p-4 flex flex-col items-start shadow min-w-[120px] min-h-[80px] transition-all">
              <div className="flex items-center w-full justify-between mb-2">
                <span className="text-gray-700 text-sm font-medium">
                  Total Inverter kW
                </span>
                <Gauge className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="text-2xl font-extrabold text-yellow-600">
                {totalInverterKW.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}{" "}
                <span className="font-bold">kW</span>
              </div>
            </div>
            {/* Total Solar Panel kW */}
            <div className="w-full bg-green-100/80 border border-green-100 rounded-xl p-4 flex flex-col items-start shadow min-w-[120px] min-h-[80px] transition-all">
              <div className="flex items-center w-full justify-between mb-2">
                <span className="text-gray-700 text-sm font-medium">
                  Total Solar Panel kW
                </span>
                <Sun className="h-6 w-6 text-green-500" />
              </div>
              <div className="text-2xl font-extrabold text-green-600">
                {totalPanelKW.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}{" "}
                <span className="font-bold">kW</span>
              </div>
            </div>
            {/* Total Battery kWh */}
            <div className="w-full bg-purple-100/80 border border-purple-100 rounded-xl p-4 flex flex-col items-start shadow min-w-[120px] min-h-[80px] transition-all">
              <div className="flex items-center w-full justify-between mb-2">
                <span className="text-gray-700 text-sm font-medium">
                  Total Battery kWh
                </span>
                <BatteryCharging className="h-6 w-6 text-purple-500" />
              </div>
              <div className="text-2xl font-extrabold text-purple-600">
                {totalBatteryKW.toLocaleString(undefined, {
                  maximumFractionDigits: 1,
                })}{" "}
                <span className="font-bold">kWh</span>
              </div>
            </div>
            {/* Total CO₂ Reduction */}
            <div className="w-full bg-green-100 border border-green-200 rounded-xl p-4 flex flex-col items-start shadow min-w-[120px] min-h-[80px] transition-all">
              <div className="flex items-center w-full justify-between mb-2">
                <span className="text-gray-700 text-sm font-medium">
                  Total CO₂ Reduction
                </span>
                <Leaf className="h-6 w-6 text-green-700" />
              </div>
              <div className="text-2xl font-extrabold text-green-700">
                {totalCO2Tons.toLocaleString(undefined, {
                  maximumFractionDigits: 1,
                })}{" "}
                <span className="font-bold">tons</span>
              </div>
            </div>
          </section>
          {/* Mobile Carousel */}
          <div className="block md:hidden">
            <Slider {...projectSliderSettings}>
              {featuredProjects.map((proj, idx) => projectCard(proj, idx))}
            </Slider>
          </div>
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((proj, idx) => projectCard(proj, idx))}
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
      <BrandLogos />
      <Testimonials />
      <ContactForm />
    </>
  );
};
