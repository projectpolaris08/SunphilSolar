import { WeatherData } from './WeatherTypes';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

/**
 * Fetches weather data for a given location.
 * The `locationQuery` can be a city name (e.g., "Manila") or coordinates (e.g., "14.5995,120.9842").
 */
export const fetchWeatherData = async (locationQuery: string = 'San Jose del Monte'): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(locationQuery)}&aqi=no`
    );

    if (!response.ok) {
      throw new Error('Weather data not available');
    }

    const data = await response.json();
    const hasThunder = data.current.condition.text.toLowerCase().includes('thunder');

    return {
      location: data.location.name,
      temperature: Math.round(data.current.temp_c),
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
      alerts: hasThunder ? ['Thunder nearby'] : undefined,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);

    // Fallback mock data
    return {
      location: 'San Jose del Monte',
      temperature: 29,
      condition: 'Partly Cloudy',
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      alerts: Math.random() > 0.5 ? ['Thunder nearby'] : undefined,
    };
  }
};
