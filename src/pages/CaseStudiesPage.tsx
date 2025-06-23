import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Search,
  MapPin,
  ArrowRight,
  Home,
  ChevronRight,
  Heart,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import BeamsBackground from "@/components/BeamsBackground";
import { caseStudies } from "@/data/caseStudies";

const projects = [
  {
    id: "commonwealth-quezon-city",
    image: "/images/project27.jpg",
    location: "Brgy. Commonwealth, Quezon City, Metro Manila",
    system: "6kW Hybrid Solar",
    date: "2025-05-04",
    specification: [
      "6kW Deye Hybrid Inverter",
      "10 × 615W Canadian Bifacial Solar Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "dasmariñas-cavite",
    image: "/images/project26.jpg",
    location: "Dasmariñas, Cavite, PH",
    system: "8kW Hybrid Solar",
    date: "2025-06-22",
    specification: [
      "8kW Deye Hybrid Inverter",
      "16 × 615W Canadian Bifacial Solar Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "vista-verde-north-caloocan",
    image: "/images/project25.jpg",
    location: "Vista Verde, North Caloocan, Metro Manila, PH",
    system: "8kW Hybrid Solar",
    date: "2025-06-21",
    specification: [
      "8kW Deye Hybrid Inverter",
      "18 × 620W AE Bifacial Solar Panels",
      "2 × 51.2V 314Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "siruma-camarines-sur",
    image: "/images/project16.jpg",
    location: "Siruma, Camarines Sur, PH",
    system: "32kW Hybrid Solar",
    date: "2025-05-31",
    specification: [
      "2 × 16kW Deye Hybrid Inverters",
      "56 × 620W Canadian Bifacial Solar Panels",
      "4 × 51.2V 314Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "sariaya-quezon",
    image: "/images/project1.jpg",
    location: "Sariaya, Quezon, PH",
    system: "32kW Hybrid Solar",
    date: "2025-04-30",
    specification: [
      "2 x 16kW Deye Hybrid Inverter",
      "54 pcs 615W Canadian Bifacial Solar Panels",
      "4 x 51.2v 280Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "goa-camarines-sur",
    image: "/images/project2.jpg",
    location: "Goa, Camarines Sur, PH",
    system: "24kW Hybrid Solar",
    date: "2025-03-18",
    specification: [
      "2 x 12kW Hybrid Inverter",
      "48 pcs 610W Canadian Bifacial Solar Panels",
      "4 x 51.2v 314Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "cabanatuan-nueva-ecija",
    image: "/images/project3.jpg",
    location: "Cabanatuan City, Nueva Ecija, PH",
    system: "12kW Hybrid Solar",
    date: "2025-04-12",
    specification: [
      "12kW Hybrid Inverter",
      "24 x 615W Canadian Bifacial Solar Panels",
      "2 x 51.2v 280Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "porac-pampanga",
    image: "/images/project4.jpg",
    location: "Porac, Pampanga, PH",
    system: "8kW Hybrid Solar",
    date: "2025-03-03",
    specification: [
      "8kW Deye Hybrid Inverter",
      "18 x 615W Canadian Bifacial Solar Panels",
      "51.2v 280Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "birvillage-qc",
    image: "/images/project5.jpg",
    location: "BIR Village, Quezon City, Metro Manila, PH",
    system: "12kW Hybrid Solar",
    date: "2025-03-07",
    specification: [
      "12kW Deye Hybrid Inverter",
      "24 x 615W Canadian Bifacial Solar Panels",
      "3 x 51.2v 280Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "cabanatuan-nueva-ecija-6kw",
    image: "/images/project6.jpg",
    location: "Cabanatuan City, Nueva Ecija, PH",
    system: "6kW Hybrid Solar",
    date: "2025-03-15",
    specification: [
      "6kW Deye Hybrid Inverter",
      "13 x 615W Canadian Bifacial Solar Panels",
      "51.2v 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "lubao-pampanga",
    image: "/images/project7.jpg",
    location: "Lubao, Pampanga, PH",
    system: "8kW Hybrid Solar",
    date: "2025-05-08",
    specification: [
      "8kW Deye Hybrid Inverter",
      "18 x 615W Canadian Bifacial Solar Panels",
      "2 x 51.2v 314Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "umingan-pangasinan",
    image: "/images/project8.jpg",
    location: "Umingan, Pangasinan, PH",
    system: "8kW Hybrid Solar",
    date: "2025-05-13",
    specification: [
      "8kW Deye Hybrid Inverter",
      "16 x 615W Canadian Bifacial Solar Panels",
      "51.2v 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "bacoor-cavite-rescue",
    image: "/images/project9.jpg",
    location: "Bacoor, Cavite, PH (Rescue)",
    system: "12kW Hybrid Solar (Upgraded)",
    date: "2025-05-19",
    specification: [
      "12kW Deye Hybrid Inverter (Upgraded)",
      "14 x 615W Canadian Bifacial Solar Panels",
      "2 x 51.2V 314Ah LiFePO₄ Batteries",
      "Rooftop Truss Expansion",
    ],
  },
  {
    id: "bagumbong-caloocan",
    image: "/images/project10.jpg",
    location: "Bagumbong, Caloocan, Metro Manila, PH",
    system: "6kW Hybrid Solar",
    date: "2025-05-25",
    specification: [
      "6kW Deye Hybrid Inverter",
      "13 × 615W Canadian Solar Bifacial Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "lemery-batangas",
    image: "/images/project11.jpg",
    location: "Lemery, Batangas, PH",
    system: "8kW Hybrid Solar",
    date: "2025-05-10",
    specification: [
      "8kW Deye Hybrid Inverter",
      "16 × 615W Canadian Solar Bifacial Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "pandacan-manila",
    image: "/images/project12.jpg",
    location: "Pandacan, Manila, NCR, PH",
    system: "8kW Hybrid Solar",
    date: "2025-05-26",
    specification: [
      "8kW Deye Hybrid Inverter",
      "16 × 615W Canadian Solar Bifacial Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "alisha-nueva-ecija",
    image: "/images/project13.jpg",
    location: "Alisha, Nueva Ecija, PH",
    system: "6kW Hybrid Solar",
    date: "2025-05-27",
    specification: [
      "6kW Deye Hybrid Inverter",
      "13 × 615W Canadian Bifacial Solar Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "iba-zambales",
    image: "/images/project14.jpg",
    location: "Iba, Zambales, PH",
    system: "8kW Hybrid Solar",
    date: "2025-05-28",
    specification: [
      "8kW Deye Hybrid Inverter",
      "13 × 615W Canadian Solar Bifacial Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "binangonan-rizal",
    image: "/images/project15.jpg",
    location: "Binangonan, Rizal, PH",
    system: "16kW Hybrid Solar",
    date: "2025-05-29",
    specification: [
      "16kW Deye Hybrid Inverter",
      "30 × 615W Canadian Bifacial Solar Panels",
      "2 × 51.2V 314Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "san-antonio-quezon",
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
    id: "upper-bicutan-taguig",
    image: "/images/project18.jpg",
    location: "Upper Bicutan, Taguig City, Metro Manila, PH",
    system: "8kW Hybrid Solar",
    date: "2025-06-06",
    specification: [
      "8kW Deye Hybrid Inverter",
      "18 × 620W AE Bifacial Solar Panels",
      "2 × 51.2V 314Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "taytay-rizal",
    image: "/images/project19.jpg",
    location: "Taytay, Rizal, PH",
    system: "12kW Hybrid Solar",
    date: "2025-06-09",
    specification: [
      "12kW Deye Hybrid Inverter",
      "18 × 620W AE Bifacial Solar Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "batasan-qc",
    image: "/images/project20.jpg",
    location: "Batasan, Quezon City, Metro Manila, PH",
    system: "6kW Hybrid Solar",
    date: "2025-06-10",
    specification: [
      "6kW Deye Hybrid Inverter",
      "13 × 620W AE Bifacial Solar Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "san-mateo-rizal",
    image: "/images/project21.jpg",
    location: "San Mateo, Rizal, PH",
    system: "8kW Hybrid Solar",
    date: "2025-06-13",
    specification: [
      "8kW Deye Hybrid Inverter",
      "16 × 615W Canadian Bifacial Solar Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "san-mateo-rizal-2",
    image: "/images/project22.jpg",
    location: "San Mateo, Rizal, PH",
    system: "8kW Hybrid Solar",
    date: "2025-06-12",
    specification: [
      "8kW Deye Hybrid Inverter",
      "16 × 620W AE Bifacial Solar Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "lemery-batangas-2",
    image: "/images/project23.jpg",
    location: "Lemery, Batangas, PH",
    system: "12kW Hybrid Solar",
    date: "2025-06-15",
    specification: [
      "12kW Deye Hybrid Inverter",
      "20 × 615W Canadian Bifacial Solar Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "san-fernando-pampanga",
    image: "/images/project24.jpg",
    location: "San Fernando, Pampanga, PH",
    system: "18kW Hybrid Solar",
    date: "2025-06-16",
    specification: [
      "18kW Deye Hybrid Inverter",
      "30 × 615W Canadian Bifacial Solar Panels",
      "2 × 51.2V 314Ah LiFePO₄ Batteries",
    ],
  },
];

const CaseStudiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [systemSizeFilter, setSystemSizeFilter] = useState("");
  const [filteredCaseStudies, setFilteredCaseStudies] = useState(
    Object.entries(caseStudies)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const studiesPerPage = 4;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, locationFilter, systemSizeFilter]);

  // Scroll to top when page changes
  useEffect(() => {
    // Smooth scroll to the top of the case studies section
    const element = document.getElementById("case-studies-list");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  // Derive unique locations and system sizes for filters
  const caseStudyProjects = projects.filter((p) =>
    Object.keys(caseStudies).includes(p.id)
  );

  const uniqueLocations = [
    ...new Set(
      caseStudyProjects.map((p) => {
        const parts = p.location.split(",").map((s) => s.trim());
        if (parts.length > 1 && !parts[1].includes("PH")) {
          return parts[1]; // e.g., "Quezon City"
        }
        return parts[0]; // e.g., "Sariaya"
      })
    ),
  ].sort();

  const uniqueSystemSizes = [
    ...new Set(
      caseStudyProjects
        .map((p) => p.system.match(/(\d+(\.\d+)?kW)/)?.[0])
        .filter(Boolean) as string[]
    ),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  useEffect(() => {
    let results = Object.entries(caseStudies);

    // Filter by search term
    if (searchTerm) {
      results = results.filter(([projectId, data]) => {
        const project = projects.find((p) => p.id === projectId);
        const searchContent = `
          ${project?.system || ""}
          ${project?.location || ""}
          ${data.projectOverview.challenge}
          ${data.projectOverview.solution}
          ${data.projectOverview.results}
          ${data.challenges.join(" ")}
          ${data.solutions.join(" ")}
          ${data.testimonials?.quote || ""}
        `.toLowerCase();
        return searchContent.includes(searchTerm.toLowerCase());
      });
    }

    // Filter by location
    if (locationFilter) {
      results = results.filter(([projectId]) => {
        const project = projects.find((p) => p.id === projectId);
        return project?.location.includes(locationFilter);
      });
    }

    // Filter by system size
    if (systemSizeFilter) {
      results = results.filter(([projectId]) => {
        const project = projects.find((p) => p.id === projectId);
        return project?.system.includes(systemSizeFilter);
      });
    }

    setFilteredCaseStudies(results);
  }, [searchTerm, locationFilter, systemSizeFilter]);

  // Calculate paginated results
  const totalPages = Math.ceil(filteredCaseStudies.length / studiesPerPage);
  const paginatedStudies = filteredCaseStudies.slice(
    (currentPage - 1) * studiesPerPage,
    currentPage * studiesPerPage
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <BeamsBackground intensity="medium">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Helmet>
          <title>Solar Case Studies | Sunphil Solar</title>
          <meta
            name="description"
            content="Explore detailed case studies of our solar installations across the Philippines. See real results, financial analysis, and environmental impact."
          />
          <meta
            name="keywords"
            content="solar case studies, solar installation results, solar ROI, solar savings, Philippines solar"
          />
        </Helmet>

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-white/80">
            <li>
              <Link to="/" className="flex items-center hover:text-blue-400">
                <Home size={16} className="mr-2" />
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={16} className="mx-1" />
              <span className="text-blue-400">Case Studies</span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Solar Case Studies
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Explore detailed analysis of our solar installations across the
            Philippines. See real results, financial savings, and environmental
            impact from actual projects.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search case studies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Location Filter */}
            <div className="relative">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-3 px-4 text-white appearance-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" className="text-black">
                  All Locations
                </option>
                {uniqueLocations.map((location) => (
                  <option
                    key={location}
                    value={location}
                    className="text-black"
                  >
                    {location}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
                size={20}
              />
            </div>

            {/* System Size Filter */}
            <div className="relative">
              <select
                value={systemSizeFilter}
                onChange={(e) => setSystemSizeFilter(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-3 px-4 text-white appearance-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" className="text-black">
                  All System Sizes
                </option>
                {uniqueSystemSizes.map((size) => (
                  <option key={size} value={size} className="text-black">
                    {size}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-white/80">
          Showing {filteredCaseStudies.length} case{" "}
          {filteredCaseStudies.length === 1 ? "study" : "studies"}
        </div>

        {/* Case Studies Grid */}
        <main id="case-studies-list">
          {filteredCaseStudies.length > 0 ? (
            <>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {paginatedStudies.map(([projectId, data]) => {
                  const project = projects.find((p) => p.id === projectId);
                  const location =
                    project?.location || projectId.replace(/-/g, " ");
                  const systemSize =
                    project?.system || "Unknown Hybrid Solar System";
                  const isRescueCase = projectId === "bacoor-cavite-rescue";

                  return (
                    <div
                      key={projectId}
                      className={`block p-6 sm:p-8 rounded-2xl transition-all duration-300 relative overflow-hidden bg-white/5 border border-white/10 hover:shadow-2xl ${
                        isRescueCase
                          ? "hover:border-red-400/50"
                          : "hover:border-blue-400/50"
                      }`}
                    >
                      <article>
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                          <div className="flex-grow">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                              {systemSize}
                            </h3>
                            <div className="flex items-center text-white/80 mb-2">
                              <MapPin size={16} className="mr-2" />
                              {location}
                            </div>
                          </div>
                          <div className="text-left sm:text-right flex-shrink-0">
                            <p className="text-xl sm:text-2xl font-bold text-green-400">
                              {data.financialAnalysis.annualROI}%
                            </p>
                            <p className="text-sm sm:text-base text-white/60">
                              Annual ROI
                            </p>
                          </div>
                        </div>

                        {isRescueCase ? (
                          <div className="mb-4 mt-4">
                            <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                              <Heart className="h-3 w-3 mr-1.5" />
                              Rescue Success Story
                            </div>
                          </div>
                        ) : (
                          <div className="mb-4 mt-4">
                            <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-bold rounded-full shadow-lg">
                              <CheckCircle className="h-3 w-3 mr-1.5" />
                              Success Story
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-4 text-center">
                          <div>
                            <p className="text-xl sm:text-2xl font-bold text-white">
                              {formatCurrency(
                                data.financialAnalysis.monthlySavings
                              )}
                            </p>
                            <p className="text-xs sm:text-sm text-white/60">
                              Monthly Savings
                            </p>
                          </div>
                          <div>
                            <p className="text-xl sm:text-2xl font-bold text-white">
                              {data.environmentalImpact.co2Reduction.toLocaleString()}
                            </p>
                            <p className="text-xs sm:text-sm text-white/60">
                              kg CO₂/year
                            </p>
                          </div>
                          <div>
                            <p className="text-xl sm:text-2xl font-bold text-white">
                              {data.financialAnalysis.paybackPeriod}
                            </p>
                            <p className="text-xs sm:text-sm text-white/60">
                              Years Payback
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 border-t border-white/10 pt-6">
                          <h4 className="font-semibold text-white mb-2">
                            {isRescueCase ? "Failed System" : "Challenge"}
                          </h4>
                          <p className="text-white/80 text-sm line-clamp-3">
                            {data.projectOverview.challenge}
                          </p>
                        </div>

                        <div className="mt-4">
                          <h4 className="font-semibold text-white mb-2">
                            {isRescueCase ? "Rescue Solution" : "Solution"}
                          </h4>
                          <p className="text-white/80 text-sm line-clamp-3">
                            {data.projectOverview.solution}
                          </p>
                        </div>

                        <div className="mt-4">
                          <h4 className="font-semibold text-white mb-2">
                            Results
                          </h4>
                          <p className="text-white/80 text-sm line-clamp-3">
                            {data.projectOverview.results}
                          </p>
                        </div>

                        <div className="mt-6">
                          <Link
                            to={`/solarprojects/${projectId}`}
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors group"
                          >
                            <span>
                              {isRescueCase
                                ? "View Rescue Story"
                                : "View Full Case Study"}
                            </span>
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <nav className="flex justify-center items-center space-x-2 sm:space-x-4 mt-12">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-white font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-white/80">
                No case studies found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setLocationFilter("");
                  setSystemSizeFilter("");
                }}
                className="text-blue-400 hover:text-blue-300 transition-colors mt-4"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </BeamsBackground>
  );
};

export default CaseStudiesPage;
