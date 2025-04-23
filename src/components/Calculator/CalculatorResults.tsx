import React from 'react';
import { Battery, Sun } from 'lucide-react';

interface CalculatorResultsProps {
  totalWattage: number;
  dailyEnergyUse: number;
  recommendedInverterSize: number;
  recommendedPanels: number;
}

export const CalculatorResults: React.FC<CalculatorResultsProps> = ({
  totalWattage,
  dailyEnergyUse,
  recommendedInverterSize,
  recommendedPanels
}) => {
  const getInverterModel = (wattage: number) => {
    if (wattage <= 3000) return "LVTOPSUN 3kW Hybrid Inverter";
    if (wattage <= 6000) return "Deye 6kW Hybrid Inverter";
    if (wattage <= 8000) return "Deye 8kW Hybrid Inverter";
    if (wattage <= 12000) return "Deye 12kW Hybrid Inverter";
    return "Deye 12kW+ Hybrid Inverter";
  };

  return (
    <div>
      <h4 className="text-xl font-semibold text-secondary-900 mb-6">Your Results</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-secondary-50 rounded-lg p-6">
          <h5 className="text-lg font-medium text-secondary-900 mb-4">Power Usage</h5>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-secondary-200">
              <span className="text-secondary-600">Total Power Usage:</span>
              <span className="text-xl font-semibold text-secondary-900">{totalWattage.toLocaleString()} Watts</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-secondary-200">
              <span className="text-secondary-600">Daily Energy Consumption:</span>
              <span className="text-xl font-semibold text-secondary-900">{dailyEnergyUse} kWh</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-secondary-600">Monthly Energy Consumption:</span>
              <span className="text-xl font-semibold text-secondary-900">{(dailyEnergyUse * 30).toFixed(2)} kWh</span>
            </div>
          </div>
        </div>
        
        <div className="bg-primary-50 rounded-lg p-6">
          <h5 className="text-lg font-medium text-secondary-900 mb-4">Recommended System</h5>
          <div className="space-y-4">
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-primary-100 p-2 rounded-full">
                  <Battery className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div>
                <div className="text-secondary-600 mb-1">Recommended Inverter:</div>
                <div className="text-xl font-semibold text-secondary-900">{getInverterModel(recommendedInverterSize)}</div>
                <div className="text-primary-600 text-sm">{(recommendedInverterSize/1000).toFixed(1)}kW capacity</div>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-primary-100 p-2 rounded-full">
                  <Sun className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div>
                <div className="text-secondary-600 mb-1">Recommended Solar Panels:</div>
                <div className="text-xl font-semibold text-secondary-900">{recommendedPanels} Panels</div>
                <div className="text-primary-600 text-sm">{(recommendedPanels * 615/1000).toFixed(2)}kW total capacity (615W per panel)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-secondary-100 rounded-lg text-sm text-secondary-600">
        <p className="mb-2"><strong>Note:</strong> This calculator provides estimates based on the information you've provided.</p>
        <p>For a detailed assessment and customized solution, please <a href="#contact" className="text-primary-600 hover:underline">contact our team</a> for a free consultation.</p>
      </div>
    </div>
  );
};