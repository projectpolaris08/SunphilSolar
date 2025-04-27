// CalculatorResults.tsx
import React from "react";
import { Sun, Battery, Zap } from "lucide-react";

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
}

export const CalculatorResults: React.FC<CalculatorResultsProps> = ({
  totalWattage,
  dailyEnergyUse,
  batteryChargingWattage,
  totalSystemWattage,
  recommendedSystems,
}) => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
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
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
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
              • Solar Panels: {system.solarPanels} × 615W
            </p>
            <p className="text-gray-800">
              • Total Solar Capacity: {system.solarCapacity}
            </p>
            <p className="text-gray-800">• System Quantity: {system.quantity}</p>
            {system.note && (
              <p className="text-sm text-red-500 mt-2">{system.note}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
