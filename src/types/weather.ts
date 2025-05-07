export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  alerts?: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface WeatherWidgetProps {
  className?: string;
  city?: string;
  useMap?: boolean;
  apiKey: string;
  googleMapsApiKey?: string;
  onLocationChange?: (coords: { lat: number; lng: number }) => void;
}