import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Search,
  TrendingUp,
  DollarSign,
  Leaf,
  MapPin,
  ArrowRight,
  Home,
  ChevronRight,
  Heart,
} from "lucide-react";
import BeamsBackground from "@/components/BeamsBackground";
import { caseStudies } from "@/data/caseStudies";

const CaseStudiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSystemSize, setSelectedSystemSize] = useState("");

  // Get unique locations and system sizes for filters
  const locations = useMemo(() => {
    const locs = Object.keys(caseStudies).map((key) => {
      const projectId = key;
      // Extract location from project ID (you might want to store this in the case study data)
      const locationMap: { [key: string]: string } = {
        "bacoor-cavite-rescue": "Bacoor, Cavite (Rescue)",
        "vista-verde-north-caloocan": "Vista Verde, North Caloocan",
        "sariaya-quezon": "Sariaya, Quezon",
        "goa-camarines-sur": "Goa, Camarines Sur",
        "cabanatuan-nueva-ecija": "Cabanatuan, Nueva Ecija",
        "porac-pampanga": "Porac, Pampanga",
      };
      return locationMap[projectId] || projectId;
    });
    return Array.from(new Set(locs)).sort();
  }, []);

  const systemSizes = useMemo(() => {
    const sizes = Object.keys(caseStudies).map((key) => {
      const projectId = key;
      // Extract system size from project ID
      const sizeMap: { [key: string]: string } = {
        "bacoor-cavite-rescue": "12kW (Upgraded)",
        "vista-verde-north-caloocan": "8kW",
        "sariaya-quezon": "32kW",
        "goa-camarines-sur": "24kW",
        "cabanatuan-nueva-ecija": "12kW",
        "porac-pampanga": "8kW",
      };
      return sizeMap[projectId] || "Unknown";
    });
    return Array.from(new Set(sizes)).sort((a, b) => {
      const aNum = parseInt(a.replace("kW", "").replace(" (Upgraded)", ""));
      const bNum = parseInt(b.replace("kW", "").replace(" (Upgraded)", ""));
      return aNum - bNum;
    });
  }, []);

  // Filter case studies based on search and filters
  const filteredCaseStudies = useMemo(() => {
    return Object.entries(caseStudies).filter(([projectId, data]) => {
      const locationMap: { [key: string]: string } = {
        "bacoor-cavite-rescue": "Bacoor, Cavite (Rescue)",
        "vista-verde-north-caloocan": "Vista Verde, North Caloocan",
        "sariaya-quezon": "Sariaya, Quezon",
        "goa-camarines-sur": "Goa, Camarines Sur",
        "cabanatuan-nueva-ecija": "Cabanatuan, Nueva Ecija",
        "porac-pampanga": "Porac, Pampanga",
      };

      const sizeMap: { [key: string]: string } = {
        "bacoor-cavite-rescue": "12kW (Upgraded)",
        "vista-verde-north-caloocan": "8kW",
        "sariaya-quezon": "32kW",
        "goa-camarines-sur": "24kW",
        "cabanatuan-nueva-ecija": "12kW",
        "porac-pampanga": "8kW",
      };

      const location = locationMap[projectId] || projectId;
      const systemSize = sizeMap[projectId] || "Unknown";

      const matchesSearch =
        location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        systemSize.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.projectOverview.challenge
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        data.projectOverview.solution
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesLocation =
        !selectedLocation || location === selectedLocation;
      const matchesSystemSize =
        !selectedSystemSize || systemSize === selectedSystemSize;

      return matchesSearch && matchesLocation && matchesSystemSize;
    });
  }, [searchTerm, selectedLocation, selectedSystemSize]);

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
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            {/* System Size Filter */}
            <select
              value={selectedSystemSize}
              onChange={(e) => setSelectedSystemSize(e.target.value)}
              className="px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All System Sizes</option>
              {systemSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-white/80">
            Showing {filteredCaseStudies.length} case study
            {filteredCaseStudies.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCaseStudies.map(([projectId, data]) => {
            const locationMap: { [key: string]: string } = {
              "bacoor-cavite-rescue": "Bacoor, Cavite (Rescue)",
              "vista-verde-north-caloocan": "Vista Verde, North Caloocan",
              "sariaya-quezon": "Sariaya, Quezon",
              "goa-camarines-sur": "Goa, Camarines Sur",
              "cabanatuan-nueva-ecija": "Cabanatuan, Nueva Ecija",
              "porac-pampanga": "Porac, Pampanga",
            };

            const sizeMap: { [key: string]: string } = {
              "bacoor-cavite-rescue": "12kW (Upgraded)",
              "vista-verde-north-caloocan": "8kW",
              "sariaya-quezon": "32kW",
              "goa-camarines-sur": "24kW",
              "cabanatuan-nueva-ecija": "12kW",
              "porac-pampanga": "8kW",
            };

            const location = locationMap[projectId] || projectId;
            const systemSize = sizeMap[projectId] || "Unknown";
            const isRescueCase = projectId === "bacoor-cavite-rescue";

            return (
              <div
                key={projectId}
                className={`backdrop-blur-lg rounded-lg p-6 hover:bg-white/15 transition-all duration-300 ${
                  isRescueCase
                    ? "bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-400/30"
                    : "bg-white/10 border border-white/20"
                }`}
              >
                {isRescueCase && (
                  <div className="mb-4">
                    <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold rounded-full">
                      <Heart className="h-4 w-4 mr-1" />
                      Rescue Success Story
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {systemSize} Hybrid Solar System
                    </h3>
                    <div className="flex items-center text-white/80 mb-2">
                      <MapPin size={16} className="mr-2" />
                      {location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">
                      {data.financialAnalysis.annualROI}%
                    </div>
                    <div className="text-sm text-white/60">Annual ROI</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <DollarSign className="text-green-400" size={20} />
                    </div>
                    <div className="text-lg font-bold text-white">
                      {formatCurrency(data.financialAnalysis.monthlySavings)}
                    </div>
                    <div className="text-xs text-white/60">Monthly Savings</div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Leaf className="text-green-400" size={20} />
                    </div>
                    <div className="text-lg font-bold text-white">
                      {data.environmentalImpact.co2Reduction.toLocaleString()}
                    </div>
                    <div className="text-xs text-white/60">kg CO₂/year</div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="text-blue-400" size={20} />
                    </div>
                    <div className="text-lg font-bold text-white">
                      {data.financialAnalysis.paybackPeriod}
                    </div>
                    <div className="text-xs text-white/60">Years Payback</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-2">
                    {isRescueCase ? "Failed System" : "Challenge"}
                  </h4>
                  <p className="text-white/80 text-sm line-clamp-3">
                    {data.projectOverview.challenge}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-2">
                    {isRescueCase ? "Rescue Solution" : "Solution"}
                  </h4>
                  <p className="text-white/80 text-sm line-clamp-3">
                    {data.projectOverview.solution}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-2">Results</h4>
                  <p className="text-white/80 text-sm line-clamp-3">
                    {data.projectOverview.results}
                  </p>
                </div>

                <Link
                  to={`/solarprojects/${projectId}`}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {isRescueCase ? "View Rescue Story" : "View Full Case Study"}
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredCaseStudies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-white/60 text-lg mb-4">
              No case studies found matching your criteria.
            </div>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedLocation("");
                setSelectedSystemSize("");
              }}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </BeamsBackground>
  );
};

export default CaseStudiesPage;
