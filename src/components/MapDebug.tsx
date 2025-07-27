import React, { useState } from "react";
import { getApiKeyStatus } from "../utils/mapUtils";

interface MapDebugProps {
  apiKey?: string;
}

export const MapDebug: React.FC<MapDebugProps> = ({ apiKey }) => {
  const isDev = import.meta.env.DEV;
  const [testResult, setTestResult] = useState<boolean | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  if (!isDev) {
    return null; // Only show in development
  }

  const status = getApiKeyStatus();
  const apiKeyPreview = status.value
    ? `${status.value.substring(0, 10)}...${status.value.substring(
        status.value.length - 4
      )}`
    : "Not set";

  const handleTestApiKey = async () => {
    if (!apiKey || apiKey === "YOUR_GOOGLE_MAPS_API_KEY") return;

    setIsTesting(true);

    try {
      // Simple test - check if google object exists
      if (typeof google !== "undefined" && google.maps) {
        setTestResult(true);
      } else {
        setTestResult(false);
      }

      setIsTesting(false);
    } catch (error) {
      setTestResult(false);
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-sm z-50 max-w-sm">
      <h4 className="font-bold mb-2">🔧 Map Debug Info</h4>
      <div className="space-y-1 text-xs">
        <div>
          <strong>Environment:</strong> {import.meta.env.MODE}
        </div>
        <div>
          <strong>API Key Set:</strong> {status.isSet ? "✅" : "❌"}
        </div>
        <div>
          <strong>API Key Valid:</strong> {status.isValid ? "✅" : "❌"}
        </div>
        <div>
          <strong>API Key Preview:</strong> {apiKeyPreview}
        </div>
        {status.error && (
          <div className="text-red-400">
            <strong>Error:</strong> {status.error}
          </div>
        )}
        {testResult !== null && (
          <div className={testResult ? "text-green-400" : "text-red-400"}>
            <strong>API Test:</strong> {testResult ? "✅ Passed" : "❌ Failed"}
          </div>
        )}
      </div>

      {status.isValid && (
        <button
          onClick={handleTestApiKey}
          disabled={isTesting}
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-3 py-1 rounded text-xs"
        >
          {isTesting ? "Testing..." : "Test API Key"}
        </button>
      )}

      <div className="mt-3 pt-2 border-t border-white/20">
        <p className="text-xs text-gray-300">
          This debug info only shows in development mode.
        </p>
      </div>
    </div>
  );
};
