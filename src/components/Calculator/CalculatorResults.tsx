import React, { useState } from "react";
import { Sun, Battery, Zap } from "lucide-react";
import { Link } from "react-router-dom";

interface RecommendedSystem {
  inverterModel: string;
  inverterSize: number;
  maxLoadCapacity: number;
  battery: string;
  batteryCapacity: string;
  solarPanels: number;
  solarCapacity: string;
  quantity: number;
  note?: string;
}

interface CalculatorResultsProps {
  totalWattage: number;
  dailyEnergyUse: number;
  batteryChargingWattage: number;
  totalSystemWattage: number;
  recommendedSystems: RecommendedSystem[];
  onPrivacyPolicyAgree?: (agreed: boolean) => void;
}

export const CalculatorResults: React.FC<CalculatorResultsProps> = ({
  totalWattage,
  dailyEnergyUse,
  batteryChargingWattage,
  totalSystemWattage,
  recommendedSystems,
  onPrivacyPolicyAgree,
}) => {
  const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState(false);
  const [privacyPolicyError, setPrivacyPolicyError] = useState("");

  const handlePrivacyPolicyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const agreed = e.target.checked;
    setPrivacyPolicyAgreed(agreed);
    setPrivacyPolicyError("");
    if (onPrivacyPolicyAgree) {
      onPrivacyPolicyAgree(agreed);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center md:text-left">
        ⚡ Solar System Estimation Results
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col items-center">
          <Zap className="text-yellow-500 h-6 w-6 mb-1" />
          <p className="text-sm text-gray-600">Total Load</p>
          <p className="font-bold text-lg">{totalWattage} W</p>
        </div>
        <div className="flex flex-col items-center">
          <Sun className="text-orange-500 h-6 w-6 mb-1" />
          <p className="text-sm text-gray-600">Daily Usage</p>
          <p className="font-bold text-lg">{dailyEnergyUse} kWh</p>
        </div>
        <div className="flex flex-col items-center">
          <Battery className="text-blue-500 h-6 w-6 mb-1" />
          <p className="text-sm text-gray-600">Battery Charging Load</p>
          <p className="font-bold text-lg">{batteryChargingWattage} W</p>
        </div>
        <div className="flex flex-col items-center">
          <Zap className="text-green-600 h-6 w-6 mb-1" />
          <p className="text-sm text-gray-600">Total System Load</p>
          <p className="font-bold text-lg">{totalSystemWattage} W</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center md:text-left">
          🔧 Recommended Solar System
        </h3>
        {recommendedSystems.map((system, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-8 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 transform hover:-translate-y-2"
          >
            <p className="font-semibold text-gray-800">
              Inverter: {system.inverterModel}
            </p>
            <p className="text-gray-800">
              • Max Load Capacity: {system.maxLoadCapacity} W
            </p>
            <p className="text-gray-800">• Battery: {system.battery}</p>
            <p className="text-gray-800">
              • Battery Capacity: {system.batteryCapacity}
            </p>
            <p className="text-gray-800">
              • Solar Panels: {system.solarPanels} ×{" "}
              {system.inverterModel.includes("3kW") ? "585W" : "600W"}
            </p>
            <p className="text-gray-800">
              • Total Solar Capacity: {system.solarCapacity}
            </p>
            <p className="text-gray-800">
              • System Quantity: {system.quantity}
            </p>

            {/* Battery Note */}
            {system.battery.toLowerCase().includes("24v 280ah") && (
              <p className="text-sm text-red-500 mt-2">
                This Battery supports 3kW system only
              </p>
            )}

            {system.note && (
              <p className="text-sm text-red-500 mt-2">{system.note}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-start mt-6">
        <div className="flex items-center h-5">
          <input
            id="privacyPolicy"
            name="privacyPolicy"
            type="checkbox"
            checked={privacyPolicyAgreed}
            onChange={handlePrivacyPolicyChange}
            className={`h-4 w-4 rounded border ${
              privacyPolicyError ? "border-error-500" : "border-secondary-300"
            } text-primary-600 focus:ring-primary-500`}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="privacyPolicy" className="text-secondary-700">
            I agree to the{" "}
            <Link
              to="/privacy-policy"
              className="text-primary-600 hover:text-primary-700"
            >
              Privacy Policy
            </Link>
            *
          </label>
          {privacyPolicyError && (
            <p className="mt-1 text-sm text-error-500">{privacyPolicyError}</p>
          )}
        </div>
      </div>
    </div>
  );
};
