import { projects as importedProjects } from "../data/projects";
import {
  Home,
  Zap,
  Sun,
  BatteryCharging,
  Leaf,
  MapPin,
  Calendar,
  Search,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

// Custom hook to detect mobile screen
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

const ProjectsPage = () => {
  const projects = importedProjects;
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedInverterSize, setSelectedInverterSize] = useState("");
  const [projectsPerPage, setProjectsPerPage] = useState(isMobile ? 3 : 6);

  // Update projectsPerPage on screen size change
  useEffect(() => {
    setProjectsPerPage(isMobile ? 3 : 6);
  }, [isMobile]);

  // Get unique locations and inverter sizes for filters
  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(projects.map((p) => p.location))];
    return uniqueLocations.sort();
  }, [projects]);

  const inverterSizes = useMemo(() => {
    const sizes = projects
      .map((p) => {
        const match = p.system.match(/(\d+)(kW)/i);
        return match ? `${match[1]}kW` : null;
      })
      .filter((size): size is string => size !== null);
    const uniqueSizes = [...new Set(sizes)];
    return uniqueSizes.sort((a, b) => {
      const aNum = parseInt(a.replace("kW", ""));
      const bNum = parseInt(b.replace("kW", ""));
      return aNum - bNum;
    });
  }, [projects]);

  // Sort projects by most recent date first
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Apply filters to sorted projects
  const filteredProjects = useMemo(() => {
    return sortedProjects.filter((project) => {
      const matchesSearch =
        searchTerm === "" ||
        project.system.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.specification.some((spec) =>
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesLocation =
        selectedLocation === "" || project.location === selectedLocation;

      const matchesInverterSize =
        selectedInverterSize === "" ||
        project.system.includes(selectedInverterSize);

      return matchesSearch && matchesLocation && matchesInverterSize;
    });
  }, [sortedProjects, searchTerm, selectedLocation, selectedInverterSize]);

  // Calculate pagination for filtered projects
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedLocation, selectedInverterSize, projectsPerPage]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, [currentPage]);

  // Summary stats (based on filtered projects)
  const totalHomes = filteredProjects.length;
  const totalInverterKW = filteredProjects.reduce((sum, p) => {
    const match = p.system.match(/(\d+)(kW)/i);
    return sum + (match ? parseInt(match[1], 10) : 0);
  }, 0);
  const totalSolarKW = filteredProjects.reduce((sum, p) => {
    // Find all specs that mention "panel" (case-insensitive)
    const panelSpecs = p.specification.filter((s) => /panel/i.test(s));
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
  const totalBatteryKWh = filteredProjects.reduce((sum, p) => {
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
  const totalCO2 = filteredProjects.length * 700; // Example: 700kg per project

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLocation("");
    setSelectedInverterSize("");
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950">
      <div className="container mx-auto px-4 py-20">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-white/80">
            <li>
              <Link to="/" className="flex items-center hover:text-blue-400">
                <Home className="mr-2" size={16} />
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={16} className="mx-1" />
              <span className="text-blue-400">Projects</span>
            </li>
          </ol>
        </nav>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Our Hybrid Solar Installations Across the Philippines
          </h1>
          <p className="text-white/80 text-lg mb-6">
            Sunphil Solar delivers high-performance hybrid solar systems for
            homes and businesses across the Philippines. From city rooftops to
            provincial estates, we provide turnkey solutions using premium
            brands like Deye, Canadian Solar, and LiFePO₄ batteries. Experience
            reliable savings and energy independence—start your solar journey
            with Sunphil today!
          </p>
          <Link
            to="/installation-map"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            <MapPin className="w-5 h-5" />
            View Installation Map
          </Link>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex flex-col items-center border border-white/20">
            <Home className="w-6 h-6 text-blue-400 mb-1" />
            <div className="text-2xl font-bold text-white">
              {totalHomes.toLocaleString()}
            </div>
            <div className="text-xs text-white/60 mt-1">Total Homes</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex flex-col items-center border border-white/20">
            <Zap className="w-6 h-6 text-yellow-400 mb-1" />
            <div className="text-2xl font-bold text-white">
              {totalInverterKW.toLocaleString()} kW
            </div>
            <div className="text-xs text-white/60 mt-1">Total Inverter kW</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex flex-col items-center border border-white/20">
            <Sun className="w-6 h-6 text-orange-400 mb-1" />
            <div className="text-2xl font-bold text-white">
              {totalSolarKW.toFixed(2)} kW
            </div>
            <div className="text-xs text-white/60 mt-1">
              Total Solar Panel kW
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex flex-col items-center border border-white/20">
            <BatteryCharging className="w-6 h-6 text-purple-400 mb-1" />
            <div className="text-2xl font-bold text-white">
              {totalBatteryKWh.toFixed(1)} kWh
            </div>
            <div className="text-xs text-white/60 mt-1">Total Battery kWh</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex flex-col items-center border border-white/20">
            <Leaf className="w-6 h-6 text-green-400 mb-1" />
            <div className="text-2xl font-bold text-white">
              {(totalCO2 / 1000).toFixed(1)} tons
            </div>
            <div className="text-xs text-white/60 mt-1">
              Total CO₂ Reduction
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Filter */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* Location Filter */}
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-3 px-4 text-white appearance-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" className="text-black">
                  All Locations
                </option>
                {locations.map((location) => (
                  <option
                    key={location}
                    value={location}
                    className="text-black"
                  >
                    {location}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            {/* Inverter Size Filter */}
            <div className="relative">
              <select
                value={selectedInverterSize}
                onChange={(e) => setSelectedInverterSize(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-3 px-4 text-white appearance-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" className="text-black">
                  All Sizes
                </option>
                {inverterSizes.map((size) => (
                  <option key={size} value={size} className="text-black">
                    {size}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
          {/* Clear Filters Button */}
          {(searchTerm || selectedLocation || selectedInverterSize) && (
            <div className="flex justify-end mt-4">
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Project Cards Grid */}
        {currentProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {currentProjects.map((project) => (
              <a
                key={project.id}
                href={`/solarprojects/${project.id}`}
                className="group block bg-white/10 backdrop-blur-lg rounded-xl shadow-md overflow-hidden border border-white/20 transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-blue-400 cursor-pointer"
                style={{ textDecoration: "none" }}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.system}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-sm text-blue-400 font-semibold mb-2">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-blue-400">
                    {project.system}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-white/60 mb-3">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.date).toLocaleDateString()}
                  </div>
                  <ul className="text-white/80 text-sm mb-4 space-y-2">
                    {project.specification.slice(0, 3).map((spec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="inline-block mt-1">
                          {i === 0 ? (
                            <Zap className="w-4 h-4 text-blue-400" />
                          ) : i === 1 ? (
                            <Sun className="w-4 h-4 text-yellow-400" />
                          ) : (
                            <BatteryCharging className="w-4 h-4 text-purple-400" />
                          )}
                        </span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                  {project.benefits && (
                    <div className="mt-auto mb-3">
                      <div className="text-green-400 text-xs font-semibold mb-1">
                        Client Review:
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-lg">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="text-blue-400 font-medium inline-flex items-center transition-transform duration-300 group-hover:translate-x-1 mt-2">
                    Read more →
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <Search className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No projects found
              </h3>
              <p className="text-white/60 mb-4">
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                currentPage === 1
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-white/10 backdrop-blur-lg text-white hover:bg-white/20"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white/10 backdrop-blur-lg text-white hover:bg-white/20"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                currentPage === totalPages
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-white/10 backdrop-blur-lg text-white hover:bg-white/20"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
