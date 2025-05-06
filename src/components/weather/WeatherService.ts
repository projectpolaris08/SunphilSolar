import { WeatherData } from './WeatherTypes';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


export const fetchWeatherData = async (city: string = 'San Jose del Monte'): Promise<WeatherData> => {
  try {
    // Using WeatherAPI.com
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    
    const data = await response.json();
    
    // Check for thunder conditions in the text
    const hasThunder = data.current.condition.text.toLowerCase().includes('thunder');
    
    return {
      location: data.location.name,
      temperature: Math.round(data.current.temp_c),
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
      alerts: hasThunder ? ['Thunder nearby'] : undefined
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    // For development/testing - return mock data if API call fails
    return {
      location: 'San Jose del Monte',
      temperature: 29,
      condition: 'Partly Cloudy',
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      alerts: Math.random() > 0.5 ? ['Thunder nearby'] : undefined
    };
  }
};