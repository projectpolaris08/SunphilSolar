import { WeatherData } from "../../types/weather";

export const fetchWeatherData = async (
  city?: string,
  apiKey?: string
): Promise<WeatherData> => {
  try {
    const WEATHER_API_KEY = apiKey || import.meta.env.VITE_WEATHER_API_KEY;
    const location = city || "Manila";

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location}&aqi=no`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    const hasThunder = data.current.condition.text
      .toLowerCase()
      .includes("thunder");

    return {
      location: data.location.name,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      icon: data.current.condition.icon.startsWith("//")
        ? `https:${data.current.condition.icon}`
        : data.current.condition.icon,
      alerts: hasThunder ? ["Thunderstorm warning"] : undefined,
      coordinates: {
        lat: data.location.lat,
        lng: data.location.lon,
      },
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const fetchWeatherByCoords = async (
  lat: number,
  lng: number,
  apiKey?: string
): Promise<WeatherData> => {
  try {
    const WEATHER_API_KEY = apiKey || import.meta.env.VITE_WEATHER_API_KEY;
    const query = `${lat},${lng}`;

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${query}&aqi=no`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data by coordinates");
    }

    const data = await response.json();
    const hasThunder = data.current.condition.text
      .toLowerCase()
      .includes("thunder");

    return {
      location: data.location.name,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      icon: data.current.condition.icon.startsWith("//")
        ? `https:${data.current.condition.icon}`
        : data.current.condition.icon,
      alerts: hasThunder ? ["Thunderstorm warning"] : undefined,
      coordinates: {
        lat: data.location.lat,
        lng: data.location.lon,
      },
    };
  } catch (error) {
    console.error("Error fetching weather by coordinates:", error);
    return fetchWeatherData(undefined, apiKey);
  }
};

export const reverseGeocode = async (
  lat: number,
  lng: number,
  googleApiKey: string
): Promise<string> => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleApiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status === "OK" && data.results.length > 0) {
    // Try to find the city/locality in address_components
    for (const result of data.results) {
      const locality = result.address_components.find((component: any) =>
        component.types.includes("locality")
      );
      if (locality) {
        return locality.long_name;
      }
    }
    // Fallback: use the formatted address (less accurate)
    return data.results[0].formatted_address;
  }

  throw new Error("Reverse geocoding failed");
};
