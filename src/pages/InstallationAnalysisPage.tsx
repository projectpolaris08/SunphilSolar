import React from "react";
import { Helmet } from "react-helmet";
import {
  Home as HomeIcon,
  ChevronRight,
  MapPin,
  Leaf,
  Zap,
  DollarSign,
  Award,
  BarChart3,
  Globe,
  Clock,
  Shield,
  Battery,
  Sun,
} from "lucide-react";
import { projects } from "@/data/projects";

// Calculate statistics from projects data
const totalInstallations = projects.length;
const totalInverterKW = projects.reduce((sum, p) => {
  const match = p.system.match(/(\d+)(kW)/i);
  return sum + (match ? parseInt(match[1], 10) : 0);
}, 0);

// Geographic distribution analysis - Group by province
const provinceCounts = projects.reduce((acc, project) => {
  const location = project.location;
  // Extract province from location string
  let province = location;
  if (location.includes("Cavite")) province = "Cavite Province";
  else if (location.includes("Batangas")) province = "Batangas Province";
  else if (location.includes("Rizal")) province = "Rizal Province";
  else if (
    location.includes("Manila") ||
    location.includes("Quezon City") ||
    location.includes("Caloocan") ||
    location.includes("Pasig")
  )
    province = "Metro Manila";
  else if (location.includes("Nueva Ecija")) province = "Nueva Ecija Province";
  else if (location.includes("Pangasinan")) province = "Pangasinan Province";
  else if (location.includes("Bulacan")) province = "Bulacan Province";
  else if (location.includes("Laguna")) province = "Laguna Province";
  else province = location.split(",")[1]?.trim() || location;

  acc[province] = (acc[province] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const topLocations = Object.entries(provinceCounts)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 5);

// System size analysis
const systemSizes = projects.reduce(
  (acc, project) => {
    const match = project.system.match(/(\d+)(kW)/i);
    if (match) {
      const size = parseInt(match[1], 10);
      if (size <= 9) acc.small++;
      else if (size <= 19) acc.medium++;
      else acc.large++;
    }
    return acc;
  },
  { small: 0, medium: 0, large: 0 }
);

const InstallationAnalysisPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-neutral-950">
      <div className="container mx-auto px-4 py-20">
        <Helmet>
          <title>Installation Analysis | Sunphil Solar</title>
          <meta
            name="description"
            content="Comprehensive analysis of Sunphil Solar's nationwide deployment across 63 installations, showcasing the transformation of Filipino households from grid dependency to energy independence."
          />
        </Helmet>

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-white/80">
            <li>
              <a href="/" className="flex items-center hover:text-blue-400">
                <HomeIcon className="mr-2" size={16} />
                Home
              </a>
            </li>
            <li className="flex items-center">
              <ChevronRight size={16} className="mx-1" />
              <span className="text-blue-400">Installation Analysis</span>
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
              Installation Analysis
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A comprehensive analysis of Sunphil Solar's nationwide deployment
            across{" "}
            <span className="text-blue-300 font-bold">
              {totalInstallations} installations
            </span>
            , showcasing the remarkable transformation of Filipino households
            from grid dependency to energy independence across{" "}
            <span className="text-green-300 font-bold">15+ provinces</span>.
          </p>
        </div>

        {/* Key Statistics Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-2xl p-6 text-center border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
            <div className="text-3xl font-bold text-blue-300 mb-2">
              {totalInstallations}
            </div>
            <div className="text-blue-100 text-sm font-medium">
              Total Installations
            </div>
            <div className="text-blue-200/60 text-xs mt-1">
              Nationwide Coverage
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 rounded-2xl p-6 text-center border border-green-500/30 hover:border-green-400/50 transition-all duration-300">
            <div className="text-3xl font-bold text-green-300 mb-2">
              {totalInverterKW}+
            </div>
            <div className="text-green-100 text-sm font-medium">
              Total kW Capacity
            </div>
            <div className="text-green-200/60 text-xs mt-1">
              Solar Power Generated
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 rounded-2xl p-6 text-center border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300">
            <div className="text-3xl font-bold text-yellow-300 mb-2">
              ₱315K+
            </div>
            <div className="text-yellow-100 text-sm font-medium">
              Monthly Savings
            </div>
            <div className="text-yellow-200/60 text-xs mt-1">
              Collective Impact
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 rounded-2xl p-6 text-center border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
            <div className="text-3xl font-bold text-purple-300 mb-2">99.9%</div>
            <div className="text-purple-100 text-sm font-medium">
              Success Rate
            </div>
            <div className="text-purple-200/60 text-xs mt-1">
              Customer Satisfaction
            </div>
          </div>
        </div>

        {/* Main Analysis Sections */}
        <div className="space-y-12">
          {/* Nationwide Impact Section */}
          <section className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-3xl shadow-2xl p-8 overflow-hidden border border-gray-700/50">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-green-500/5 to-purple-500/5 animate-pulse" />
            <div className="absolute left-0 top-0 h-full w-3 bg-gradient-to-b from-blue-400 via-green-400 to-purple-400 rounded-l-3xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    Nationwide Impact
                  </h2>
                  <p className="text-gray-300">
                    Transforming Filipino households across the archipelago
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-blue-900/30 rounded-xl p-6 border border-blue-500/20 h-full flex flex-col">
                  <h3 className="text-lg font-semibold text-blue-200 mb-3">
                    Geographic Coverage
                  </h3>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    Sunphil Solar has successfully deployed{" "}
                    <span className="text-blue-300 font-bold text-lg">
                      {totalInstallations} installations
                    </span>{" "}
                    across{" "}
                    <span className="text-blue-300 font-bold">
                      15+ provinces
                    </span>{" "}
                    with a combined capacity of{" "}
                    <span className="text-blue-300 font-bold text-lg">
                      {totalInverterKW}+ kW
                    </span>
                    .
                  </p>
                </div>
                <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20 h-full flex flex-col">
                  <h3 className="text-lg font-semibold text-purple-200 mb-3">
                    Energy Independence
                  </h3>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    Complete transformation from grid dependency to energy
                    independence, providing reliable backup power during outages
                    and reducing reliance on traditional energy sources.
                  </p>
                </div>
                <div className="bg-green-900/30 rounded-xl p-6 border border-green-500/20 h-full flex flex-col">
                  <h3 className="text-lg font-semibold text-green-200 mb-3">
                    Market Value
                  </h3>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    Total market value estimated at{" "}
                    <span className="text-green-300 font-bold">
                      ₱25-35 million
                    </span>
                    , representing a significant investment in renewable energy
                    infrastructure.
                  </p>
                </div>
                <div className="bg-yellow-900/30 rounded-xl p-6 border border-yellow-500/20 h-full flex flex-col">
                  <h3 className="text-lg font-semibold text-yellow-200 mb-3">
                    Community Impact
                  </h3>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    Empowering communities with sustainable energy solutions,
                    creating jobs, and contributing to the Philippines'
                    renewable energy goals.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Geographic Distribution Section */}
          <section className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-3xl shadow-2xl p-8 overflow-hidden border border-gray-700/50">
            <div className="absolute left-0 top-0 h-full w-3 bg-gradient-to-b from-green-400 via-blue-400 to-purple-400 rounded-l-3xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    Geographic Distribution
                  </h2>
                  <p className="text-gray-300">
                    Strategic deployment across urban and provincial areas
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-green-900/30 rounded-xl p-6 border border-green-500/20 h-full flex flex-col">
                  <h3 className="text-xl font-bold text-green-200 mb-4">
                    Top Installation Locations
                  </h3>
                  <div className="space-y-3 flex-1">
                    {topLocations.map(([location, count], index) => (
                      <div
                        key={location}
                        className="flex justify-between items-center p-3 bg-green-900/20 rounded-lg border border-green-500/20"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-green-300 font-bold">
                            #{index + 1}
                          </span>
                          <span className="text-green-100">{location}</span>
                        </div>
                        <span className="text-green-300 font-bold">
                          {count} installations
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col space-y-4 h-full">
                  <div className="bg-blue-900/30 rounded-xl p-4 border border-blue-500/20 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-blue-200 mb-2">
                      Urban Concentration
                    </h3>
                    <p className="text-gray-300 leading-relaxed flex-1">
                      Metro Manila leads with{" "}
                      <span className="text-blue-300 font-bold">
                        25+ installations (39.7%)
                      </span>
                      , demonstrating strong adoption in urban areas with high
                      electricity costs.
                    </p>
                  </div>
                  <div className="bg-green-900/30 rounded-xl p-4 border border-green-500/20 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-green-200 mb-2">
                      Provincial Growth
                    </h3>
                    <p className="text-gray-300 leading-relaxed flex-1">
                      Growing adoption in provincial regions including Cavite,
                      Batangas, and Rizal, showing the universal appeal of solar
                      solutions across different environments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* System Size Analysis Section */}
          <section className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-3xl shadow-2xl p-8 overflow-hidden border border-gray-700/50">
            <div className="absolute left-0 top-0 h-full w-3 bg-gradient-to-b from-lime-400 via-yellow-400 to-orange-400 rounded-l-3xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-lime-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    System Size Distribution
                  </h2>
                  <p className="text-gray-300">
                    Optimized solutions for different energy needs
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-lime-900/30 rounded-xl p-6 border border-lime-500/20 text-center">
                  <div className="text-4xl font-bold text-lime-300 mb-2">
                    {systemSizes.small}
                  </div>
                  <div className="text-lime-100 text-lg font-semibold mb-2">
                    Small Systems
                  </div>
                  <div className="text-lime-200/60 text-sm">≤9kW</div>
                  <div className="text-lime-200/60 text-xs mt-2">
                    Residential Focus
                  </div>
                </div>
                <div className="bg-yellow-900/30 rounded-xl p-6 border border-yellow-500/20 text-center">
                  <div className="text-4xl font-bold text-yellow-300 mb-2">
                    {systemSizes.medium}
                  </div>
                  <div className="text-yellow-100 text-lg font-semibold mb-2">
                    Medium Systems
                  </div>
                  <div className="text-yellow-200/60 text-sm">10-19kW</div>
                  <div className="text-yellow-200/60 text-xs mt-2">
                    Small Business
                  </div>
                </div>
                <div className="bg-orange-900/30 rounded-xl p-6 border border-orange-500/20 text-center">
                  <div className="text-4xl font-bold text-orange-300 mb-2">
                    {systemSizes.large}
                  </div>
                  <div className="text-orange-100 text-lg font-semibold mb-2">
                    Large Systems
                  </div>
                  <div className="text-orange-200/60 text-sm">≥20kW</div>
                  <div className="text-orange-200/60 text-xs mt-2">
                    Commercial Scale
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-lime-900/30 rounded-xl p-6 border border-lime-500/20 h-full flex flex-col">
                  <h3 className="text-lg font-semibold text-lime-200 mb-3">
                    Small Systems Focus
                  </h3>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    Small systems dominate with{" "}
                    <span className="text-lime-300 font-bold">
                      {systemSizes.small} installations (55.6%)
                    </span>
                    , reflecting the residential focus of Sunphil Solar's
                    customer base.
                  </p>
                </div>
                <div className="bg-orange-900/30 rounded-xl p-6 border border-orange-500/20 h-full flex flex-col">
                  <h3 className="text-lg font-semibold text-orange-200 mb-3">
                    Commercial Capability
                  </h3>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    Medium and large systems showcase the company's capability
                    to handle commercial projects while maintaining the same
                    quality and reliability standards.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Financial Performance Section */}
          <section className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-3xl shadow-2xl p-8 overflow-hidden border border-gray-700/50">
            <div className="absolute left-0 top-0 h-full w-3 bg-gradient-to-b from-yellow-400 via-green-400 to-blue-400 rounded-l-3xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-yellow-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    Financial Performance
                  </h2>
                  <p className="text-gray-300">
                    Exceptional returns and proven ROI
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-yellow-900/30 rounded-xl p-6 border border-yellow-500/20 h-full flex flex-col">
                  <h3 className="text-lg font-semibold text-yellow-200 mb-3">
                    Monthly Savings
                  </h3>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    Average monthly savings range from{" "}
                    <span className="text-yellow-300 font-bold">
                      ₱5,000-₱16,000
                    </span>{" "}
                    per household, with total monthly savings exceeding{" "}
                    <span className="text-yellow-300 font-bold">₱315,000</span>{" "}
                    across all installations.
                  </p>
                </div>
                <div className="bg-blue-900/30 rounded-xl p-6 border border-blue-500/20 h-full flex flex-col">
                  <h3 className="text-lg font-semibold text-blue-200 mb-3">
                    Long-term Value
                  </h3>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    Solar installations provide{" "}
                    <span className="text-blue-300 font-bold">25+ years</span>{" "}
                    of reliable energy generation, ensuring long-term financial
                    benefits and protection against rising electricity costs.
                  </p>
                </div>
                <div className="bg-green-900/30 rounded-xl p-6 border border-green-500/20 h-full flex flex-col">
                  <h3 className="text-lg font-semibold text-green-200 mb-3">
                    Return on Investment
                  </h3>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    Average ROI of{" "}
                    <span className="text-green-300 font-bold">
                      20-40% annually
                    </span>{" "}
                    with payback periods of{" "}
                    <span className="text-green-300 font-bold">
                      3.5-5 years
                    </span>
                    , demonstrating exceptional financial returns.
                  </p>
                </div>
                <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20 h-full flex flex-col">
                  <h3 className="text-lg font-semibold text-purple-200 mb-3">
                    Property Value
                  </h3>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    Solar installations increase property value by{" "}
                    <span className="text-purple-300 font-bold">3-4%</span> on
                    average, providing additional financial benefits beyond
                    energy savings.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Environmental Impact Section */}
          <section className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-3xl shadow-2xl p-8 overflow-hidden border border-gray-700/50">
            <div className="absolute left-0 top-0 h-full w-3 bg-gradient-to-b from-green-400 via-blue-400 to-purple-400 rounded-l-3xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    Environmental Impact
                  </h2>
                  <p className="text-gray-300">
                    Contributing to a sustainable future
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-900/30 rounded-xl p-6 border border-green-500/20 text-center">
                  <div className="text-4xl font-bold text-green-300 mb-2">
                    1.75M
                  </div>
                  <div className="text-green-100 text-lg font-semibold mb-2">
                    kWh Generated
                  </div>
                  <div className="text-green-200/60 text-sm">Annually</div>
                </div>
                <div className="bg-blue-900/30 rounded-xl p-6 border border-blue-500/20 text-center">
                  <div className="text-4xl font-bold text-blue-300 mb-2">
                    1.9M
                  </div>
                  <div className="text-blue-100 text-lg font-semibold mb-2">
                    kg CO₂ Reduced
                  </div>
                  <div className="text-blue-200/60 text-sm">Per Year</div>
                </div>
                <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20 text-center">
                  <div className="text-4xl font-bold text-purple-300 mb-2">
                    91K+
                  </div>
                  <div className="text-purple-100 text-lg font-semibold mb-2">
                    Trees Equivalent
                  </div>
                  <div className="text-purple-200/60 text-sm">Planted</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-900/30 rounded-xl p-6 border border-green-500/20 h-full flex flex-col">
                  <h3 className="text-lg font-semibold text-green-200 mb-3">
                    Clean Energy Generation
                  </h3>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    The installations generate{" "}
                    <span className="text-green-300 font-bold">
                      1.75 million kWh
                    </span>{" "}
                    annually, providing clean, renewable energy while reducing
                    reliance on fossil fuel-based electricity generation.
                  </p>
                </div>
                <div className="bg-blue-900/30 rounded-xl p-6 border border-blue-500/20 h-full flex flex-col">
                  <h3 className="text-lg font-semibold text-blue-200 mb-3">
                    Environmental Impact
                  </h3>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    CO₂ reduction equivalent to planting{" "}
                    <span className="text-blue-300 font-bold">
                      91,429 trees
                    </span>
                    , making a substantial contribution to environmental
                    sustainability and climate change mitigation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Excellence Section */}
          <section className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-3xl shadow-2xl p-8 overflow-hidden border border-gray-700/50">
            <div className="absolute left-0 top-0 h-full w-3 bg-gradient-to-b from-purple-400 via-pink-400 to-red-400 rounded-l-3xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    Technology Excellence
                  </h2>
                  <p className="text-gray-300">
                    Industry-leading technology with proven performance
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <Sun className="h-5 w-5 text-purple-300" />
                    <h3 className="text-lg font-semibold text-purple-200">
                      Solar Panels
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    <span className="text-purple-300 font-bold">
                      Canadian Bifacial Solar Panels
                    </span>{" "}
                    (615W-620W) with high efficiency and durability for optimal
                    energy generation.
                  </p>
                </div>
                <div className="bg-blue-900/30 rounded-xl p-6 border border-blue-500/20 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="h-5 w-5 text-blue-300" />
                    <h3 className="text-lg font-semibold text-blue-200">
                      System Reliability
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    <span className="text-blue-300 font-bold">
                      99.7-99.9% uptime
                    </span>{" "}
                    with bill reductions of{" "}
                    <span className="text-blue-300 font-bold">60-99%</span>{" "}
                    across all installations.
                  </p>
                </div>
                <div className="bg-pink-900/30 rounded-xl p-6 border border-pink-500/20 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <Battery className="h-5 w-5 text-pink-300" />
                    <h3 className="text-lg font-semibold text-pink-200">
                      Battery Storage
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    <span className="text-pink-300 font-bold">
                      LiFePO₄ Batteries
                    </span>{" "}
                    providing 8-12 hours of reliable backup power during
                    outages.
                  </p>
                </div>
                <div className="bg-green-900/30 rounded-xl p-6 border border-green-500/20 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-5 w-5 text-green-300" />
                    <h3 className="text-lg font-semibold text-green-200">
                      Performance Monitoring
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    Real-time monitoring and maintenance ensuring optimal
                    performance and early detection of any issues.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Market Leadership Section */}
          <section className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-3xl shadow-2xl p-8 overflow-hidden border border-gray-700/50">
            <div className="absolute left-0 top-0 h-full w-3 bg-gradient-to-b from-pink-400 via-purple-400 to-blue-400 rounded-l-3xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    Market Leadership
                  </h2>
                  <p className="text-gray-300">
                    Leading the renewable energy revolution in the Philippines
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-pink-900/30 rounded-xl p-6 border border-pink-500/20 text-center">
                  <div className="text-4xl font-bold text-pink-300 mb-2">
                    100%
                  </div>
                  <div className="text-pink-100 text-lg font-semibold mb-2">
                    Success Rate
                  </div>
                  <div className="text-pink-200/60 text-sm">
                    All Installations
                  </div>
                </div>
                <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20 text-center">
                  <div className="text-4xl font-bold text-purple-300 mb-2">
                    15+
                  </div>
                  <div className="text-purple-100 text-lg font-semibold mb-2">
                    Provinces
                  </div>
                  <div className="text-purple-200/60 text-sm">
                    Nationwide Coverage
                  </div>
                </div>
                <div className="bg-blue-900/30 rounded-xl p-6 border border-blue-500/20 text-center">
                  <div className="text-4xl font-bold text-blue-300 mb-2">
                    95%+
                  </div>
                  <div className="text-blue-100 text-lg font-semibold mb-2">
                    Customer Satisfaction
                  </div>
                  <div className="text-blue-200/60 text-sm">
                    High Referral Rate
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-pink-900/30 rounded-xl p-6 border border-pink-500/20 h-full flex flex-col">
                  <h3 className="text-lg font-semibold text-pink-200 mb-3">
                    Market Leadership
                  </h3>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    Sunphil Solar demonstrates exceptional market leadership
                    with{" "}
                    <span className="text-pink-300 font-bold">
                      100% success rate
                    </span>{" "}
                    across all installations, high customer satisfaction, and
                    strong referral rates.
                  </p>
                </div>
                <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20 h-full flex flex-col">
                  <h3 className="text-lg font-semibold text-purple-200 mb-3">
                    Comprehensive Approach
                  </h3>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    The company's comprehensive approach—combining
                    high-efficiency technology, custom design, and reliable
                    backup power—has created a sustainable model for renewable
                    energy adoption in the Philippines.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-2xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Join the Solar Revolution?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Experience the same success as our 63+ satisfied customers. Get
              your free solar consultation and join thousands of Filipino
              households enjoying energy independence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-300"
              >
                Get Free Consultation
              </a>
              <a
                href="/projects"
                className="bg-transparent border border-blue-500 text-blue-300 px-8 py-3 rounded-xl font-semibold hover:bg-blue-500/10 transition-all duration-300"
              >
                View All Projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallationAnalysisPage;
