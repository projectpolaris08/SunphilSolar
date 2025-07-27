import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { MapPin, Home, ChevronRight } from "lucide-react";
import { InstallationMap } from "../components/InstallationMap";
import { MapDebug } from "../components/MapDebug";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

interface InstallationMapPageProps {
  googleMapsApiKey?: string;
}

const InstallationMapPage: React.FC<InstallationMapPageProps> = ({
  googleMapsApiKey = "YOUR_GOOGLE_MAPS_API_KEY",
}) => {
  const [showMarkers, setShowMarkers] = useState(false);
  const mapHeight = "600px";

  // Calculate statistics from actual project data
  const totalHomes = projects.length;
  const totalInverterKW = projects.reduce((sum, p) => {
    const match = p.system.match(/(\d+)(kW)/i);
    return sum + (match ? parseInt(match[1], 10) : 0);
  }, 0);
  const totalPanelKW = projects.reduce((sum, p) => {
    const panelSpecs = p.specification.filter((s) => /panel/i.test(s));
    let projectTotal = 0;
    for (const spec of panelSpecs) {
      let match = spec.match(/(\d+)\s*[×x]\s*(\d+(?:\.\d+)?)\s*(W|watt)/i);
      if (match) {
        const count = parseInt(match[1], 10);
        const watt = parseFloat(match[2]);
        projectTotal += (count * watt) / 1000;
        continue;
      }
      match = spec.match(/(\d+(?:\.\d+)?)\s*(W|watt)/i);
      if (match) {
        const watt = parseFloat(match[1]);
        projectTotal += watt / 1000;
      }
    }
    return sum + projectTotal;
  }, 0);

  const toggleMarkers = () => {
    setShowMarkers(!showMarkers);
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950">
      <Helmet>
        <title>Solar Installation Map - Sunphil Solar</title>
        <meta
          name="description"
          content="Interactive map showing all Sunphil Solar installations across the Philippines. View installation locations, system details, and heat map of solar energy distribution."
        />
        <meta
          name="keywords"
          content="solar installation map, Philippines solar projects, solar energy distribution, solar panel locations"
        />
      </Helmet>

      {/* Header Section */}
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
              <span className="text-blue-400">Installation Map</span>
            </li>
          </ol>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Solar Installation Map
          </h1>
          <p className="text-white/80 text-lg mb-6">
            Explore our solar installations across the Philippines. Click on
            markers to view detailed information about each project.
          </p>
        </div>

        {/* Map Controls */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="text-blue-400" size={20} />
                <span className="text-white font-semibold">
                  Small Systems (≤9kW)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-yellow-400" size={20} />
                <span className="text-white font-semibold">
                  Medium Systems (10-19kW)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-red-400" size={20} />
                <span className="text-white font-semibold">
                  Large Systems (≥20kW)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleMarkers}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                {showMarkers ? (
                  <>
                    <MapPin size={20} />
                    <span>Hide Markers</span>
                  </>
                ) : (
                  <>
                    <MapPin size={20} />
                    <span>Show Markers</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
          <InstallationMap
            apiKey={googleMapsApiKey}
            showMarkers={showMarkers}
            height={mapHeight}
          />
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">
              {totalHomes.toLocaleString()}
            </div>
            <div className="text-white/60">Total Installations</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">
              {totalInverterKW.toLocaleString()} kW
            </div>
            <div className="text-white/60">Total Inverter Capacity</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">
              {totalPanelKW.toFixed(2)} kW
            </div>
            <div className="text-white/60">Total Solar Panel Capacity</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Map Features
          </h2>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="text-blue-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">
                    Interactive Markers
                  </h3>
                </div>
                <p className="text-white/80">
                  Click on any marker to view detailed information about the
                  solar installation including system specifications and
                  completion date.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="text-yellow-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">
                    System Classification
                  </h3>
                </div>
                <p className="text-white/80">
                  Color-coded markers indicate system size: Blue for small
                  systems, Yellow for medium, and Red for large installations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Join Our Solar Community?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              See how we're powering homes and businesses across the
              Philippines. Get your free solar consultation and join our growing
              network of satisfied customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
              >
                Get Free Quote
              </a>
              <a
                href="/solarprojects"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                View All Projects
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Debug component - only shows in development */}
      <MapDebug apiKey={googleMapsApiKey} />
    </div>
  );
};

export default InstallationMapPage;
