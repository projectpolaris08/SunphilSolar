import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  MapPin,
  Sun,
  Calendar,
  Settings,
  Battery,
  Star,
  ChevronRight,
  Home,
  ArrowRight,
  Heart,
  BookOpen,
  Gauge,
  BatteryCharging,
  Home as HomeIcon,
  Leaf,
} from "lucide-react";
import { Helmet } from "react-helmet";
import BeamsBackground from "@/components/BeamsBackground";
import { caseStudies } from "@/data/caseStudies";
import { projects } from "@/data/projects";

projects.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const projectsPerPage = 6;

// Utility functions to extract kW values
function extractKW(str: string): number {
  const match = str.match(/([0-9]+(?:\.[0-9]+)?)\s*kW/i);
  return match ? parseFloat(match[1]) : 0;
}
function extractPanelKW(str: string): number {
  // e.g., "18 × 615W Canadian Bifacial Panels"
  const match = str.match(/([0-9]+)\s*[×x]\s*([0-9]+)W/i);
  if (match) {
    const count = parseInt(match[1], 10);
    const watt = parseInt(match[2], 10);
    return (count * watt) / 1000;
  }
  return extractKW(str); // fallback for kW in string
}
function extractBatteryKW(str: string): number {
  // e.g., "51.2V 314Ah LiFePO₄" or "2 x 51.2V 314Ah LiFePO₄"
  const match = str.match(
    /([0-9]+)\s*[×x]\s*([0-9]+\.?[0-9]*)V\s*([0-9]+\.?[0-9]*)Ah/i
  );
  if (match) {
    const count = parseInt(match[1], 10);
    const voltage = parseFloat(match[2]);
    const ah = parseFloat(match[3]);
    return (count * voltage * ah) / 1000; // kWh
  }
  const match2 = str.match(/([0-9]+\.?[0-9]*)V\s*([0-9]+\.?[0-9]*)Ah/i);
  if (match2) {
    const voltage = parseFloat(match2[1]);
    const ah = parseFloat(match2[2]);
    return (voltage * ah) / 1000;
  }
  return 0;
}

// Utility to extract CO2 reduction from benefits
function extractCO2(benefits: string[] = []): number {
  for (const benefit of benefits) {
    // Match e.g. "1,100–1,300 kg CO₂" or "1,100 kg CO₂" or "1,100–1,300 kg of CO₂"
    const match = benefit.match(
      /([0-9,.]+)(?:–|-)?([0-9,.]+)?\s*kg\s*(?:of)?\s*CO₂/i
    );
    if (match) {
      // If a range, take the average
      const low = parseFloat(match[1].replace(/,/g, ""));
      const high = match[2] ? parseFloat(match[2].replace(/,/g, "")) : low;
      return (low + high) / 2;
    }
    // Match e.g. "1.2 tons CO₂"
    const matchTons = benefit.match(/([0-9,.]+)\s*tons?\s*CO₂/i);
    if (matchTons) {
      return parseFloat(matchTons[1].replace(/,/g, "")) * 1000;
    }
  }
  return 0;
}

const totalInverterKW = projects.reduce(
  (sum, proj) =>
    sum +
    proj.specification
      .filter((s) => /inverter/i.test(s))
      .reduce((s, spec) => s + extractKW(spec), 0),
  0
);
const totalPanelKW = projects.reduce(
  (sum, proj) =>
    sum +
    proj.specification
      .filter((s) => /panel/i.test(s))
      .reduce((s, spec) => s + extractPanelKW(spec), 0),
  0
);
const totalBatteryKW = projects.reduce(
  (sum, proj) =>
    sum +
    proj.specification
      .filter((s) => /batter/i.test(s))
      .reduce((s, spec) => s + extractBatteryKW(spec), 0),
  0
);

const totalCO2Kg = projects.reduce(
  (sum, proj) => sum + extractCO2(proj.benefits),
  0
);
const totalCO2Tons = totalCO2Kg / 1000;

const totalHomes = projects.length;

const ProjectsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const paginated = projects.slice(
    (page - 1) * projectsPerPage,
    page * projectsPerPage
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, [page]);

  // Enhanced structured data for Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Sunphil Solar Projects Portfolio",
    description:
      "Explore our portfolio of hybrid solar installations across the Philippines, featuring residential and commercial projects with premium components from trusted brands.",
    url: window.location.href,
    numberOfItems: projects.length,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: window.location.origin,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: window.location.href,
        },
      ],
    },
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Project",
        name: `${project.system} Installation in ${project.location}`,
        description: `Hybrid solar installation featuring ${project.specification.join(
          ", "
        )}`,
        location: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: project.location,
          },
        },
        startDate: project.date,
        image: {
          "@type": "ImageObject",
          url: project.image,
          width: "800",
          height: "600",
        },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
        },
      },
    })),
  };

  return (
    <BeamsBackground intensity="medium">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <Helmet>
          <title>
            Solar Projects Portfolio | Sunphil Solar - Hybrid Solar
            Installations in Philippines
          </title>
          <meta
            name="description"
            content="Explore Sunphil Solar's portfolio of hybrid solar installations across the Philippines. From residential rooftops to commercial buildings, discover our high-performance solar solutions."
          />
          <meta
            name="keywords"
            content="solar projects, hybrid solar, solar installation, Philippines, SunPhil Solar, solar energy, renewable energy"
          />
          <meta
            property="og:title"
            content="Solar Projects Portfolio | Sunphil Solar"
          />
          <meta
            property="og:description"
            content="Explore our portfolio of hybrid solar installations across the Philippines, featuring residential and commercial projects."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={window.location.href} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Solar Projects Portfolio | SunPhil Solar"
          />
          <meta
            name="twitter:description"
            content="Explore our portfolio of hybrid solar installations across the Philippines."
          />
          <link rel="canonical" href={window.location.href} />
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        </Helmet>
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-white/80">
            <li>
              <Link to="/" className="flex items-center hover:text-blue-400">
                <Home size={14} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={14} className="mx-1" />
              <span className="text-blue-400">Projects</span>
            </li>
          </ol>
        </nav>

        <header className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-center text-white">
            Our Hybrid Solar Installations Across the Philippines
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-center max-w-2xl mx-auto text-white/80 px-2 sm:px-4">
            Sunphil Solar delivers high-performance hybrid solar systems for
            homes and businesses across the Philippines. From city rooftops to
            provincial estates, we provide turnkey solutions using premium
            brands like Deye, Canadian Solar, and LiFePO₄ batteries. Experience
            reliable savings and energy independence—start your solar journey
            with Sunphil today!
          </p>
        </header>
        <main>
          {/* Summary Cards */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
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
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {paginated.map((proj, idx) => {
              const isRescueCase = proj.id === "bacoor-cavite-rescue";
              const hasCaseStudy = Object.keys(caseStudies).includes(proj.id);

              return (
                <article
                  key={idx}
                  className={`flex flex-col backdrop-blur-lg rounded-lg p-3 sm:p-4 shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-2 text-center cursor-pointer min-h-[480px] sm:min-h-[540px] ${
                    isRescueCase
                      ? "bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-400/30"
                      : hasCaseStudy
                      ? "bg-gradient-to-br from-blue-500/10 to-green-500/10 border-2 border-blue-400/30"
                      : "bg-white/10 border border-white/20 hover:border-blue-400"
                  }`}
                >
                  <Link
                    to={`/solarprojects/${proj.id}`}
                    className="flex flex-col h-full"
                  >
                    <div className="relative w-full h-40 sm:h-48 mb-2 bg-gray-900/50 rounded overflow-hidden">
                      <img
                        src={proj.image}
                        alt={`${proj.system} installation in ${proj.location}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width="800"
                        height="600"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/images/placeholder.jpg";
                        }}
                      />
                      {hasCaseStudy && (
                        <div className="absolute top-2 right-2">
                          {isRescueCase ? (
                            <div className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                              <Heart className="h-3 w-3 mr-1" />
                              Rescue
                            </div>
                          ) : (
                            <div className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-blue-500 to-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                              <BookOpen className="h-3 w-3 mr-1" />
                              Case Study
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-1 sm:gap-2 font-bold text-white mb-1 text-sm sm:text-base">
                      <MapPin className="text-blue-400" size={16} />
                      <span className="truncate">{proj.location}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 sm:gap-2 text-white mb-1 text-sm sm:text-base">
                      <Sun className="text-yellow-400" size={16} />
                      <span>{proj.system}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 sm:gap-2 text-white text-sm sm:text-base">
                      <Calendar className="text-blue-400" size={16} />
                      <span>{proj.date}</span>
                    </div>
                    <div className="bg-white/5 rounded p-2 sm:p-3 mt-2 sm:mt-3 text-left flex flex-col flex-grow">
                      <ul className="pl-4 sm:pl-5 text-white font-semibold space-y-1 sm:space-y-2 text-sm sm:text-base">
                        {proj.specification.map((spec, i) => {
                          let Icon = CheckCircle;
                          if (
                            proj.id === "san-pascual-batangas" &&
                            /panel/i.test(spec)
                          )
                            Icon = Sun;
                          else if (/inverter/i.test(spec)) Icon = Settings;
                          else if (/solar.*panel/i.test(spec)) Icon = Sun;
                          else if (/batter/i.test(spec)) Icon = Battery;
                          return (
                            <li
                              key={i}
                              className="flex items-start gap-1 sm:gap-2 text-white font-semibold"
                            >
                              {Icon === Sun ? (
                                <Sun
                                  className="text-yellow-400 mt-1 flex-shrink-0"
                                  size={18}
                                />
                              ) : (
                                <Icon
                                  className="text-blue-400 mt-1 flex-shrink-0"
                                  size={18}
                                />
                              )}
                              <span className="line-clamp-2">{spec}</span>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="flex items-center gap-1 sm:gap-2 mt-auto pt-2 sm:pt-4">
                        <CheckCircle
                          className="text-green-400 flex-shrink-0"
                          size={18}
                        />
                        <span className="font-semibold text-white text-sm sm:text-base">
                          Client Review:
                        </span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="text-yellow-400 fill-yellow-400"
                              size={16}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium mt-2 text-sm sm:text-base transition-colors">
                        {isRescueCase
                          ? "View Rescue Story"
                          : hasCaseStudy
                          ? "View Case Study"
                          : "Read more"}
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </main>
        <nav
          aria-label="Project pagination"
          className="flex justify-center mt-6 sm:mt-8 gap-2"
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-blue-500 text-white disabled:bg-gray-600 text-sm sm:text-base hover:bg-blue-600 transition-colors"
            aria-label="Previous page"
          >
            Prev
          </button>
          <span
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-white"
            aria-current="page"
          >
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-blue-500 text-white disabled:bg-gray-600 text-sm sm:text-base hover:bg-blue-600 transition-colors"
            aria-label="Next page"
          >
            Next
          </button>
        </nav>

        {/* Case Studies CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Want to See Detailed Results?
            </h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Explore our comprehensive case studies with detailed financial
              analysis, environmental impact metrics, and real customer
              testimonials. See exactly how much our clients are saving and the
              challenges we solved.
            </p>
            <Link
              to="/case-studies"
              className="inline-flex items-center px-8 py-3 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/30"
            >
              View Case Studies
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </div>
    </BeamsBackground>
  );
};

export default ProjectsPage;
