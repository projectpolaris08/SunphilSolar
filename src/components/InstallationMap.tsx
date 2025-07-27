import React, { useState, useMemo, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Sun, Calendar } from "lucide-react";
import { projects } from "../data/projects";

interface InstallationMapProps {
  apiKey: string;
  showMarkers?: boolean;
  height?: string;
}

// System size categories for legend
interface SystemCategory {
  name: string;
  minSize: number;
  maxSize: number;
  color: string;
  label: string;
}

const SYSTEM_CATEGORIES: SystemCategory[] = [
  {
    name: "small",
    minSize: 0,
    maxSize: 9,
    color: "#3B82F6",
    label: "Small Systems (≤9kW)",
  },
  {
    name: "medium",
    minSize: 10,
    maxSize: 19,
    color: "#F59E0B",
    label: "Medium Systems (10-19kW)",
  },
  {
    name: "large",
    minSize: 20,
    maxSize: 999,
    color: "#EF4444",
    label: "Large Systems (≥20kW)",
  },
];

interface InstallationLocation {
  id: string;
  image: string; // Add missing image property
  location: string;
  system: string;
  date: string;
  clientType?: string;
  specification: string[];
  benefits?: string[];
  description?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  systemSize: number; // Extracted from system string for heatmap intensity
}

// Philippine cities coordinates mapping
const locationCoordinates: { [key: string]: { lat: number; lng: number } } = {
  // Existing coordinates
  "Tanza, Cavite, Philippines": { lat: 14.3943, lng: 120.8533 },
  "Urbiztondo, Pangasinan, Philippines": { lat: 15.8227, lng: 120.3294 },
  "Samal, Bataan, Philippines": { lat: 14.7681, lng: 120.5421 },
  "Naic, Cavite, Philippines": { lat: 14.3183, lng: 120.7669 },
  "Sun Valley, Parañaque City, Metro Manila, Philippines": {
    lat: 14.4791,
    lng: 121.0433,
  },
  "Sampaloc, Manila, Philippines": { lat: 14.5995, lng: 121.0 },
  "Antipolo, Rizal, Philippines": { lat: 14.6255, lng: 121.1245 },
  "Sta. Lucia, Novaliches, Quezon City, Metro Manila, Philippines": {
    lat: 14.676,
    lng: 121.0437,
  },
  "Vista Verde, North Caloocan, Metro Manila, PH": {
    lat: 14.7547,
    lng: 121.0444,
  },
  "Sariaya, Quezon, PH": { lat: 13.9624, lng: 121.5263 },
  "Goa, Camarines Sur, PH": { lat: 13.6978, lng: 123.4892 },
  "Cabanatuan City, Nueva Ecija, PH": { lat: 15.4909, lng: 120.9689 },
  "Porac, Pampanga, PH": { lat: 15.0711, lng: 120.5423 },
  "BIR Village, Quezon City, Metro Manila, PH": { lat: 14.676, lng: 121.0437 },
  "Lubao, Pampanga, PH": { lat: 14.9405, lng: 120.6011 },
  "Umingan, Pangasinan, PH": { lat: 15.9, lng: 120.8333 },
  "Pandacan, Manila, NCR, PH": { lat: 14.5995, lng: 121.0 },
  "Iba, Zambales, PH": { lat: 15.3276, lng: 119.978 },
  "Taytay, Rizal, PH": { lat: 14.5692, lng: 121.1325 },
  "Batasan, Quezon City, Metro Manila, PH": { lat: 14.676, lng: 121.0437 },
  "San Mateo, Rizal, PH": { lat: 14.6969, lng: 121.1219 },
  "Balagtas, Bulacan, PH": { lat: 14.8147, lng: 120.9086 },
  "Congressional, Quezon City, Metro Manila, Philippines": {
    lat: 14.676,
    lng: 121.0437,
  },
  "San Antonio, Quezon, PH": { lat: 13.9624, lng: 121.5263 },
  "Siruma, Camarines Sur, PH": { lat: 14.0, lng: 123.25 },

  // Additional coordinates for missing locations
  "Buenavista I, General Trias, Cavite, Philippines": {
    lat: 14.3833,
    lng: 120.8833,
  },
  "Grace Park, Caloocan City, Metro Manila, Philippines": {
    lat: 14.6547,
    lng: 120.9844,
  },
  "Parañaque City, Metro Manila, Philippines": { lat: 14.4791, lng: 121.0433 },
  "Batangas Province, Philippines": { lat: 13.7565, lng: 121.0583 },
  "North Fairview, Quezon City, Philippines": { lat: 14.676, lng: 121.0437 },
  "Batas Silang, Cavite, Philippines": { lat: 14.2333, lng: 120.9667 },
  "Bagong Ilog, Pasig City, Metro Manila, Philippines": {
    lat: 14.5764,
    lng: 121.0851,
  },
  "Sangandaan, South Caloocan, Metro Manila, Philippines": {
    lat: 14.6547,
    lng: 120.9844,
  },
  "Marilao, Bulacan, Philippines": { lat: 14.7581, lng: 120.9481 },
  "Montalban (Rodriguez), Rizal, Philippines": { lat: 14.7167, lng: 121.1167 },
  "San Pascual, Batangas, Philippines": { lat: 13.8, lng: 121.0167 },
  "Brgy. Commonwealth, Quezon City, Metro Manila": {
    lat: 14.676,
    lng: 121.0437,
  },
  "Bacoor, Cavite, PH (Rescue)": { lat: 14.4583, lng: 120.9583 },
  "Bagumbong, North Caloocan, Metro Manila, PH": {
    lat: 14.7547,
    lng: 121.0444,
  },
  "Lemery, Batangas, PH": { lat: 13.8833, lng: 120.9167 },
  "Alisha, Nueva Ecija, PH": { lat: 15.4909, lng: 120.9689 },
  "Binangonan, Rizal, PH": { lat: 14.4667, lng: 121.1833 },
  "Upper Bicutan, Taguig City, Metro Manila, PH": { lat: 14.5167, lng: 121.05 },
  "San Fernando, Pampanga, PH": { lat: 15.0333, lng: 120.6833 },
  "Dasmariñas, Cavite, PH": { lat: 14.3294, lng: 120.9369 },
  "Marikina City, Metro Manila, Philippines": { lat: 14.65, lng: 121.1 },
  "Las Piñas, Metro Manila, Philippines": { lat: 14.45, lng: 120.9833 },
  "Porac, Pampanga, Philippines": { lat: 15.0711, lng: 120.5423 },
  "Taytay, Rizal, Philippines": { lat: 14.5692, lng: 121.1325 },
  "Bulacan, Bulacan, Philippines": { lat: 14.7944, lng: 120.8792 },
  "Sta. Rosa, Laguna, Philippines": { lat: 14.3167, lng: 121.1167 },
  "Barangay Greater Lagro, Quezon City, Philippines": {
    lat: 14.676,
    lng: 121.0437,
  },
  "Malolos, Bulacan, Philippines": { lat: 14.8444, lng: 120.8106 },
  "Bacoor, Cavite, Philippines": { lat: 14.4583, lng: 120.9583 },
};

const defaultCenter = {
  lat: 14.5995, // Manila
  lng: 120.9842,
};

// Function to get system category based on system size
const getSystemCategory = (systemSize: number): SystemCategory => {
  return (
    SYSTEM_CATEGORIES.find(
      (category) =>
        systemSize >= category.minSize && systemSize <= category.maxSize
    ) || SYSTEM_CATEGORIES[0]
  ); // Default to small if no match
};

export const InstallationMap: React.FC<InstallationMapProps> = ({
  apiKey,
  showMarkers = false,
  height = "600px",
}) => {
  const [selectedInstallation, setSelectedInstallation] =
    useState<InstallationLocation | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "small",
    "medium",
    "large",
  ]);

  // Process projects data to include coordinates and system size
  const installations = useMemo(() => {
    const processed = projects
      .map((project) => {
        let coordinates = locationCoordinates[project.location];
        if (!coordinates) {
          // Fallback: try to find a similar location or use Manila as default
          const fallbackCoordinates = {
            Manila: { lat: 14.5995, lng: 121.0 },
            Cavite: { lat: 14.3294, lng: 120.9369 },
            Batangas: { lat: 13.7565, lng: 121.0583 },
            Bulacan: { lat: 14.7944, lng: 120.8792 },
            Rizal: { lat: 14.5692, lng: 121.1325 },
            Pampanga: { lat: 15.0333, lng: 120.6833 },
            Pangasinan: { lat: 15.8227, lng: 120.3294 },
            "Nueva Ecija": { lat: 15.4909, lng: 120.9689 },
            Zambales: { lat: 15.3276, lng: 119.978 },
            Quezon: { lat: 13.9624, lng: 121.5263 },
            "Camarines Sur": { lat: 13.6978, lng: 123.4892 },
            Laguna: { lat: 14.3167, lng: 121.1167 },
          };

          // Try to find a fallback based on province name
          for (const [province, coords] of Object.entries(
            fallbackCoordinates
          )) {
            if (project.location.includes(province)) {
              coordinates = coords;
              break;
            }
          }

          if (!coordinates) {
            // Use Manila as fallback instead of returning null
            coordinates = { lat: 14.5995, lng: 121.0 };
          }
        }

        // Extract system size from system string (e.g., "6kW" -> 6)
        const systemSizeMatch = project.system.match(/(\d+)kW/i);
        const systemSize = systemSizeMatch
          ? parseInt(systemSizeMatch[1], 10)
          : 0;

        return {
          ...project,
          coordinates,
          systemSize,
        };
      })
      .filter((installation): installation is InstallationLocation => {
        return installation !== null && installation.coordinates !== undefined;
      });

    return processed;
  }, [projects]); // Add projects as dependency

  // Filter installations based on selected categories
  const filteredInstallations = useMemo(() => {
    return installations.filter((installation) => {
      const category = getSystemCategory(installation.systemSize);
      return selectedCategories.includes(category.name);
    });
  }, [installations, selectedCategories]);

  const onUnmount = useCallback(() => {
    // Cleanup function
  }, []);

  const handleMarkerClick = (installation: InstallationLocation) => {
    setSelectedInstallation(installation);
  };

  const handleInfoWindowClose = () => {
    setSelectedInstallation(null);
  };

  // Removed getMarkerIcon function to avoid Google Maps API conflicts

  // Validate API key for production
  const isValidApiKey =
    apiKey &&
    apiKey !== "YOUR_GOOGLE_MAPS_API_KEY" &&
    apiKey.length > 20 &&
    apiKey.startsWith("AIza");

  // Handle map load error
  const handleMapError = useCallback(() => {
    setMapError(
      "Google Maps failed to load. This could be due to an invalid API key, domain restrictions, or API quota limits."
    );
    setIsLoading(false);
  }, []);

  // Handle map load success
  const handleMapLoad = useCallback(
    (map: google.maps.Map) => {
      setMapError(null);
      setIsLoading(false);
      setGoogleLoaded(true);

      // Fit bounds to show all installations
      if (installations.length > 0) {
        try {
          const bounds = new google.maps.LatLngBounds();
          installations.forEach((installation) => {
            bounds.extend(installation.coordinates);
          });
          map.fitBounds(bounds);
        } catch (error) {
          // If bounds fitting fails, just center on Manila
          map.setCenter(defaultCenter);
          map.setZoom(6);
        }
      } else {
        // If no installations, center on Manila
        map.setCenter(defaultCenter);
        map.setZoom(6);
      }
    },
    [installations]
  );

  if (!isValidApiKey) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-red-500 text-6xl mb-4">🗺️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Google Maps Configuration Required
          </h3>
          <p className="text-gray-600 mb-4">
            The map requires a valid Google Maps API key to function properly.
          </p>
          <div className="bg-gray-200 p-3 rounded text-sm font-mono text-left">
            <p>
              <strong>For Production:</strong>
            </p>
            <p>1. Set environment variable: VITE_GOOGLE_MAPS_API_KEY</p>
            <p>2. Enable Google Maps JavaScript API in Google Cloud Console</p>
            <p>3. Add your domain to API key restrictions</p>
          </div>
          <div className="mt-4 p-3 bg-yellow-100 rounded text-sm">
            <strong>Current Status:</strong>
            <br />
            API Key provided: {!!apiKey ? "Yes" : "No"}
            <br />
            API Key format:{" "}
            {apiKey && apiKey.startsWith("AIza") ? "Valid" : "Invalid"}
            <br />
            Environment: {import.meta.env.MODE}
          </div>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Map Loading Error
          </h3>
          <p className="text-gray-600 mb-4">{mapError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      {/* Legend */}
      <div className="absolute top-2 right-2 z-20 bg-white/95 p-3 rounded-lg shadow-lg">
        <h3 className="font-semibold text-sm mb-2">System Size Legend</h3>
        <div className="space-y-2">
          {SYSTEM_CATEGORIES.map((category) => (
            <label
              key={category.name}
              className="flex items-center space-x-2 text-xs cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.name)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories([
                      ...selectedCategories,
                      category.name,
                    ]);
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter((c) => c !== category.name)
                    );
                  }
                }}
                className="rounded"
              />
              <div
                className="w-4 h-4 rounded-full border-2 border-gray-300"
                style={{ backgroundColor: category.color }}
              ></div>
              <span>{category.label}</span>
            </label>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      <LoadScript
        googleMapsApiKey={apiKey}
        onError={handleMapError}
        onLoad={() => {
          setIsLoading(false);
          setGoogleLoaded(true);
        }}
        loadingElement={<div>Loading...</div>}
        preventGoogleFontsLoading={true}
        version="weekly"
      >
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: height,
            position: "relative",
          }}
          center={defaultCenter}
          zoom={6}
          onLoad={handleMapLoad}
          onUnmount={onUnmount}
          options={{
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true,
          }}
        >
          {/* Regular markers - Show filtered installations based on showMarkers prop */}
          {showMarkers &&
            googleLoaded &&
            filteredInstallations.map((installation, index) => {
              if (!installation || !installation.coordinates) {
                return null;
              }

              const category = getSystemCategory(installation.systemSize);

              return (
                <Marker
                  key={`marker-${installation.id}-${index}`}
                  position={installation.coordinates}
                  title={`${installation.location} - ${installation.system} (${category.label})`}
                  onClick={() => handleMarkerClick(installation)}
                  options={{
                    icon: {
                      path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
                      fillColor: category.color,
                      fillOpacity: 1,
                      strokeColor: "#FFFFFF",
                      strokeWeight: 1,
                      scale: 1.2,
                    },
                  }}
                />
              );
            })}

          {/* Fallback markers if no installations are loaded */}
          {showMarkers && googleLoaded && installations.length === 0 && (
            <>
              <Marker
                position={{ lat: 14.5995, lng: 121.0 }}
                title="Manila - Sample Installation"
              />
              <Marker
                position={{ lat: 14.3294, lng: 120.9369 }}
                title="Cavite - Sample Installation"
              />
              <Marker
                position={{ lat: 13.7565, lng: 121.0583 }}
                title="Batangas - Sample Installation"
              />
            </>
          )}

          {/* Info Window */}
          {selectedInstallation && selectedInstallation.coordinates && (
            <InfoWindow
              position={selectedInstallation.coordinates}
              onCloseClick={handleInfoWindowClose}
              options={{
                pixelOffset: new google.maps.Size(0, -40),
                maxWidth: 500,
              }}
            >
              <div className="p-4 bg-white rounded-xl shadow-2xl border border-gray-100 w-96">
                {/* Header with gradient background */}
                <div
                  className="p-4 text-white relative overflow-hidden rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${
                      getSystemCategory(selectedInstallation.systemSize).color
                    } 0%, ${
                      getSystemCategory(selectedInstallation.systemSize).color
                    }dd 100%)`,
                  }}
                >
                  <div className="absolute inset-0 bg-black opacity-10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-white shadow-lg flex items-center justify-center">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: getSystemCategory(
                                selectedInstallation.systemSize
                              ).color,
                            }}
                          ></div>
                        </div>
                        <h3 className="font-bold text-lg text-white drop-shadow-sm">
                          {selectedInstallation.location}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                          <Sun className="text-yellow-300" size={16} />
                          <span className="font-semibold text-white text-sm">
                            {selectedInstallation.system}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                          <Calendar className="text-green-300" size={14} />
                          <span className="text-white text-sm font-medium">
                            {new Date(
                              selectedInstallation.date
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
