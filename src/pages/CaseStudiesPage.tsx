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
import { caseStudies } from "@/data/caseStudies";
import { projects } from "@/data/projects";

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
    <div className="min-h-screen w-full bg-neutral-950">
      <div className="container mx-auto px-4 py-20">
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
    </div>
  );
};

export default CaseStudiesPage;
