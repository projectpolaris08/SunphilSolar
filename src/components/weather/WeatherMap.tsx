import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

interface WeatherMapProps {
  apiKey: string;
  weatherApiKey?: string;
  onLocationSelect?: (coords: { lat: number; lng: number }) => void;
}

export const WeatherMap: React.FC<WeatherMapProps> = ({ 
  apiKey, 
  onLocationSelect 
}) => {
  const [center, setCenter] = useState({
    lat: 14.5995, // Default to Manila
    lng: 120.9842
  });

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newCenter = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setCenter(newCenter);
      onLocationSelect?.(newCenter);
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={handleMapClick}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};