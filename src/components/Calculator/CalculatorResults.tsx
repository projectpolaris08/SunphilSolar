import React from 'react';
import { Battery } from 'lucide-react';

interface CalculatorResultsProps {
  totalWattage: number;
  dailyEnergyUse: number;
  batteryChargingWattage: number;
  totalSystemWattage: number;
  recommendedSystems: {
    inverterModel: string;
    inverterSize: number;
    battery: string;
    batteryCapacity: string;
    solarPanels: number;
    solarCapacity: string;
    quantity: number;
    note?: string;
  }[];
}

export const CalculatorResults: React.FC<CalculatorResultsProps> = ({
  totalWattage,
  dailyEnergyUse,
  batteryChargingWattage,
  totalSystemWattage,
  recommendedSystems
}) => {
  return (
    <div>
      <h4 className="text-xl font-semibold text-secondary-900 mb-6">Your Results</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-secondary-50 rounded-lg p-6">
          <h5 className="text-lg font-medium text-secondary-900 mb-4">Power Analysis</h5>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-secondary-200">
              <span className="text-secondary-600">Appliance Load:</span>
              <span className="font-semibold">{totalWattage.toLocaleString()} W</span>
            </div>
            {batteryChargingWattage > 0 && (
              <>
                <div className="flex justify-between items-center py-2 border-b border-secondary-200">
                  <span className="text-secondary-600">Battery Charging Load:</span>
                  <span className="font-semibold">{batteryChargingWattage.toLocaleString()} W</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-secondary-200">
                  <span className="text-secondary-600">Total System Load:</span>
                  <span className="font-semibold">{totalSystemWattage.toLocaleString()} W</span>
                </div>
              </>
            )}
            <div className="flex justify-between items-center py-2">
              <span className="text-secondary-600">Daily Energy Use:</span>
              <span className="font-semibold">{dailyEnergyUse} kWh</span>
            </div>
          </div>
        </div>
        
        <div className="bg-primary-50 rounded-lg p-6">
          <h5 className="text-lg font-medium text-secondary-900 mb-4">Recommended System</h5>
          <div className="space-y-6">
            {recommendedSystems.map((system, index) => (
              <div key={index} className="border-b border-primary-100 pb-4 last:border-0">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary-100 p-2 rounded-full">
                      <Battery className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-secondary-600 mb-1">
                          {system.quantity > 1 ? `${system.quantity} × ` : ''}
                          {system.inverterModel}
                        </div>
                        <div className="text-lg font-semibold text-secondary-900">
                          {(system.inverterSize * system.quantity / 1000).toFixed(1)}kW Total Capacity
                        </div>
                      </div>
                      <div className="text-primary-600 text-sm">
                        {system.solarPanels} × {system.inverterModel.includes('3kW') ? '585W' : '615W'} Panels
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {system.battery !== "undefined × 0" && (
                        <div>
                          <div className="text-sm text-secondary-600">Battery:</div>
                          <div className="text-sm font-medium">
                            {system.battery} ({system.batteryCapacity})
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="text-sm text-secondary-600">Solar Capacity:</div>
                        <div className="text-sm font-medium">
                          {system.solarCapacity}
                        </div>
                      </div>
                    </div>

                    {system.note && (
                      <div className="mt-2 text-sm text-yellow-600">
                        {system.note}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
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