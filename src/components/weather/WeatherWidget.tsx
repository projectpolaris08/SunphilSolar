import React, { useState, useEffect, useCallback } from "react";
import {
  fetchWeatherData,
  fetchWeatherByCoords,
  reverseGeocode,
} from "./WeatherService";
import { WeatherData } from "../../types/weather";

interface Props {
  apiKey?: string;
  googleMapsApiKey?: string;
  city?: string;
}

const WeatherWidget: React.FC<Props> = ({ apiKey, googleMapsApiKey, city }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (city) {
        const data = await fetchWeatherData(city, apiKey);
        setWeather(data);
        setAddress(null);
      } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const data = await fetchWeatherByCoords(latitude, longitude, apiKey);
          setWeather(data);
          if (googleMapsApiKey) {
            try {
              const addr = await reverseGeocode(
                latitude,
                longitude,
                googleMapsApiKey
              );
              setAddress(addr);
            } catch (e) {
              setAddress(null);
            }
          } else {
            setAddress(null);
          }
        });
      } else {
        setError("Geolocation is not supported.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load weather data.");
    } finally {
      setLoading(false);
    }
  }, [apiKey, city, googleMapsApiKey]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  if (loading) return <div>Loading weather...</div>;
  if (error) return <div>{error}</div>;
  if (!weather) return <div>No weather data.</div>;

  return (
    <div className="text-white">
      <div className="font-bold text-lg leading-tight mb-0.5">
        {weather.location}
      </div>
      {address && (
        <div className="text-xs text-secondary-200 mb-2 italic truncate max-w-[220px]">
          {address}
        </div>
      )}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base">{weather.temperature}°C</span>
        <img src={weather.icon} alt={weather.condition} className="h-7 w-7" />
        <span className="text-sm text-secondary-100">{weather.condition}</span>
      </div>
      {weather.alerts && (
        <p className="text-white text-xs bg-red-600 bg-opacity-70 rounded px-2 py-1 mt-1 inline-block">
          {weather.alerts[0]}
        </p>
      )}
    </div>
  );
};

export default WeatherWidget;
