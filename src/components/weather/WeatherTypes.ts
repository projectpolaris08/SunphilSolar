export interface WeatherData {
    location: string;
    temperature: number;
    condition: string;
    icon: string;
    alerts?: string[];
  }
  
  export interface WeatherWidgetProps {
    className?: string;
    city?: string;
  }