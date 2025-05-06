import React, { useEffect, useState } from 'react';
import { WeatherData, WeatherWidgetProps } from './WeatherTypes';
import { fetchWeatherData } from './WeatherService';

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ className = '' }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setLoading(true);
        const data = await fetchWeatherData();
        setWeather(data);
        setError(null);
      } catch (err) {
        setError('Unable to fetch weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
    const intervalId = setInterval(getWeatherData, 30 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Comment this out when using real API
  useEffect(() => {
    setWeather({
      location: 'San Jose del Monte',
      temperature: 29,
      condition: 'Partly Cloudy',
      icon: 'https://openweathermap.org/img/wn/02d@2x.png',
      alerts: ['Thunder nearby']
    });
    setLoading(false);
  }, []);

  const renderWeatherIcon = () => {
    if (weather?.icon) {
      return (
        <img
          src={weather.icon.startsWith('//') ? `https:${weather.icon}` : weather.icon}
          alt={weather.condition}
          className="w-8 h-8"
        />
      );
    }
    return (
      <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    );
  };

  if (loading) {
    return (
      <div className={`flex items-center space-x-2 text-white animate-pulse ${className}`}>
        <div className="rounded-full bg-blue-600 h-6 w-6"></div>
        <div className="h-4 bg-blue-600 rounded w-20"></div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className={`flex items-center space-x-2 text-white text-sm ${className}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Weather unavailable</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-white ${className}`}>
      <div className="flex items-center gap-2">
        {renderWeatherIcon()}
        <div className="flex flex-col leading-tight">
          <div className="text-lg font-semibold">{weather.temperature}°C</div>
          <div className="text-sm text-white/80">{weather.location}</div>
          {weather.alerts?.[0] && (
            <div className="flex items-center text-yellow-300 text-sm mt-1">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              {weather.alerts[0]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
