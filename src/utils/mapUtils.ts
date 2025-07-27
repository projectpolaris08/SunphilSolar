// Utility functions for Google Maps debugging and validation

export const validateGoogleMapsApiKey = (apiKey: string): boolean => {
  if (!apiKey) return false;
  if (apiKey === "YOUR_GOOGLE_MAPS_API_KEY") return false;
  if (apiKey.length < 20) return false;

  // Basic format validation for Google Maps API key
  const apiKeyPattern = /^AIza[0-9A-Za-z-_]{35}$/;
  return apiKeyPattern.test(apiKey);
};

export const testGoogleMapsApiKey = async (
  apiKey: string
): Promise<boolean> => {
  try {
    // Test the API key with a simple geocoding request
    const testUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=Manila,Philippines&key=${apiKey}`;
    const response = await fetch(testUrl);
    const data = await response.json();

    return data.status === "OK";
  } catch (error) {
    return false;
  }
};

export const getApiKeyStatus = (): {
  isSet: boolean;
  isValid: boolean;
  value: string;
  error?: string;
} => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return {
      isSet: false,
      isValid: false,
      value: "",
      error: "API key not found in environment variables",
    };
  }

  if (apiKey === "YOUR_GOOGLE_MAPS_API_KEY") {
    return {
      isSet: true,
      isValid: false,
      value: apiKey,
      error: "Using default placeholder value",
    };
  }

  const isValid = validateGoogleMapsApiKey(apiKey);

  return {
    isSet: true,
    isValid,
    value: apiKey,
    error: isValid ? undefined : "API key format appears invalid",
  };
};

export const logMapDebugInfo = () => {
  const status = getApiKeyStatus();
  // Debug info function kept for potential future use but without console logs
  return status;
};
