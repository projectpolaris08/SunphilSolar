import React, { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon, Plus, Trash2, PanelTop } from 'lucide-react';
import { ApplianceInput } from './ApplianceInput';
import { CalculatorResults } from './CalculatorResults';
import { CommonAppliances } from './CommonAppliances';
import { Appliance } from '../../types';

export const Calculator: React.FC = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([
    { id: 1, name: 'Refrigerator', wattage: 150, quantity: 1, hoursPerDay: 24 },
    { id: 2, name: 'LED TV', wattage: 100, quantity: 1, hoursPerDay: 4 },
  ]);
  const [nextId, setNextId] = useState(3);
  const [totalWattage, setTotalWattage] = useState(0);
  const [dailyEnergyUse, setDailyEnergyUse] = useState(0);
  const [recommendedInverterSize, setRecommendedInverterSize] = useState(0);
  const [recommendedPanels, setRecommendedPanels] = useState(0);

  useEffect(() => {
    // Calculate instantaneous wattage (all appliances running at once)
    const instantTotal = appliances.reduce(
      (sum, appliance) => sum + appliance.wattage * appliance.quantity,
      0
    );
    setTotalWattage(instantTotal);

    // Calculate daily energy usage in kWh
    const dailyTotal = appliances.reduce(
      (sum, appliance) => sum + (appliance.wattage * appliance.quantity * appliance.hoursPerDay) / 1000,
      0
    );
    setDailyEnergyUse(parseFloat(dailyTotal.toFixed(2)));

    // Recommend inverter size (25% overhead)
    const inverterSize = instantTotal * 1.25;
    setRecommendedInverterSize(Math.ceil(inverterSize / 1000) * 1000); // Round up to nearest 1000W

    // Calculate recommended solar panels (615W per panel)
    // Assume 4.5 hours of peak sunlight per day on average
    const solarPanels = Math.ceil((dailyTotal / 4.5) / 0.615);
    setRecommendedPanels(Math.max(1, solarPanels));
  }, [appliances]);

  const addAppliance = () => {
    setAppliances([
      ...appliances,
      { id: nextId, name: '', wattage: 0, quantity: 1, hoursPerDay: 1 },
    ]);
    setNextId(nextId + 1);
  };

  const removeAppliance = (id: number) => {
    setAppliances(appliances.filter(appliance => appliance.id !== id));
  };

  const updateAppliance = (updatedAppliance: Appliance) => {
    setAppliances(
      appliances.map(appliance => 
        appliance.id === updatedAppliance.id ? updatedAppliance : appliance
      )
    );
  };

  const addCommonAppliance = (appliance: Appliance) => {
    const newAppliance = { 
      ...appliance, 
      id: nextId 
    };
    setAppliances([...appliances, newAppliance]);
    setNextId(nextId + 1);
  };

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
            Solar System Calculator
          </h2>
          <div className="h-1 w-20 bg-primary-500 mx-auto rounded mb-6"></div>
          <p className="text-lg text-secondary-600">
            Calculate your energy needs and determine the right Deye Hybrid Inverter and number of 
            solar panels required for your home or business.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-elevation-2 overflow-hidden max-w-4xl mx-auto">
          <div className="bg-primary-600 px-6 py-4 flex items-center">
            <CalculatorIcon className="text-white mr-3" />
            <h3 className="text-xl font-semibold text-white">Appliance Wattage Calculator</h3>
          </div>

          <div className="p-6">
            <h4 className="text-lg font-medium text-secondary-900 mb-4">Enter Your Appliances</h4>
            
            <div className="space-y-4 mb-6">
              {appliances.map(appliance => (
                <div key={appliance.id} className="flex items-center space-x-4">
                  <ApplianceInput 
                    appliance={appliance} 
                    updateAppliance={updateAppliance} 
                  />
                  <button 
                    onClick={() => removeAppliance(appliance.id)}
                    className="p-2 text-secondary-400 hover:text-error-500 transition-colors"
                    aria-label="Remove appliance"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <button 
              onClick={addAppliance}
              className="inline-flex items-center px-4 py-2 border border-primary-500 rounded-md text-primary-600 bg-primary-50 hover:bg-primary-100 transition-colors mb-8"
            >
              <Plus size={18} className="mr-2" /> Add Appliance
            </button>
            
            <CommonAppliances addCommonAppliance={addCommonAppliance} />
            
            <div className="mt-8 pt-8 border-t border-secondary-200">
              <CalculatorResults 
                totalWattage={totalWattage}
                dailyEnergyUse={dailyEnergyUse}
                recommendedInverterSize={recommendedInverterSize}
                recommendedPanels={recommendedPanels}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};