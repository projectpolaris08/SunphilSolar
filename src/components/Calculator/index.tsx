import React, { useState } from "react";
import { Plus, Sun } from "lucide-react";
import { ApplianceInput } from "./ApplianceInput";
import { CalculatorResults } from "./CalculatorResults";
import { commonAppliancesList, applianceWattages } from "./CommonAppliances";

interface Appliance {
  id: string;
  name: string;
  watts: number;
  quantity: number;
  hoursPerDay: number;
}

const Calculator: React.FC = () => {
  // Default appliances for initial state
  const defaultAppliances: Appliance[] = [
    { id: '1', name: 'Refrigerator', watts: 150, quantity: 1, hoursPerDay: 24 },
    { id: '2', name: 'LED TV', watts: 100, quantity: 1, hoursPerDay: 4 },
    { id: '3', name: 'Air Conditioner', watts: 1500, quantity: 2, hoursPerDay: 12 }
  ];

  const [appliances, setAppliances] = useState<Appliance[]>(defaultAppliances);
  const [showResults, setShowResults] = useState(false);

  // Generate a unique ID for new appliances
  const generateId = () => `appliance-${Date.now()}`;

  // Add a new appliance row
  const addAppliance = () => {
    // Use the first appliance from the common list as default, or empty if list is empty
    const defaultName = commonAppliancesList.length > 0 ? commonAppliancesList[0] : "";
    const defaultWatts = defaultName in applianceWattages ? applianceWattages[defaultName] : 0;
    
    setAppliances([
      ...appliances,
      { 
        id: generateId(), 
        name: defaultName, 
        watts: defaultWatts, 
        quantity: 1, 
        hoursPerDay: 1 
      }
    ]);
  };

  // Remove an appliance by ID
  const removeAppliance = (id: string) => {
    setAppliances(appliances.filter(appliance => appliance.id !== id));
  };

  // Update an appliance property
  const updateAppliance = (id: string, field: keyof Appliance, value: string | number) => {
    setAppliances(appliances.map(appliance => 
      appliance.id === id ? { ...appliance, [field]: value } : appliance
    ));
  };

  // Calculate total wattage
  const calculateTotalWattage = () => {
    return appliances.reduce((total, appliance) => {
      return total + (appliance.watts * appliance.quantity);
    }, 0);
  };

  // Calculate daily energy use in kWh
  const calculateDailyEnergyUse = () => {
    const wattHours = appliances.reduce((total, appliance) => {
      return total + (appliance.watts * appliance.quantity * appliance.hoursPerDay);
    }, 0);
    return parseFloat((wattHours / 1000).toFixed(2)); // Convert to kWh
  };

  // Calculate recommended inverter size (with 20% safety margin)
  const calculateRecommendedInverterSize = () => {
    const totalWattage = calculateTotalWattage();
    return Math.ceil(totalWattage * 1.2 / 500) * 500; // Round up to nearest 500W
  };

  // Calculate recommended number of solar panels
  const calculateRecommendedPanels = () => {
    const dailyEnergy = calculateDailyEnergyUse();
    const averageSunHours = 5; // Assume 5 hours of peak sunlight
    const panelWattage = 615; // Assume 615W panels
    const systemEfficiency = 0.75; // System efficiency factor
    
    const dailyEnergyNeeded = dailyEnergy / systemEfficiency;
    const panelsNeeded = Math.ceil((dailyEnergyNeeded * 1000) / (panelWattage * averageSunHours));
    
    return Math.max(1, panelsNeeded); // Minimum 1 panel
  };

  // Handle calculation and show results
  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-2">Solar System Calculator</h1>
      <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
      
      <p className="text-center text-lg mb-8">
        Calculate your energy needs and determine the right Deye Hybrid Inverter and number of
        solar panels required for your home or business.
      </p>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="bg-primary-600 p-4 flex items-center">
          <div className="bg-white p-2 rounded-md mr-3">
            <Sun className="h-6 w-6 text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-white">Appliance Wattage Calculator</h2>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Enter Your Appliances</h3>
          
          <div className="space-y-4">
            {appliances.map((appliance) => (
              <ApplianceInput
                key={appliance.id}
                appliance={appliance}
                onUpdate={updateAppliance}
                onRemove={removeAppliance}
              />
            ))}
          </div>
          
          <button
            onClick={addAppliance}
            className="mt-4 flex items-center text-primary-600 hover:text-primary-800"
          >
            <Plus className="h-5 w-5 mr-1" /> Add Appliance
          </button>
          
          <div className="mt-8">
            <button
              onClick={handleCalculate}
              className="w-full bg-primary-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Calculate System Requirements
            </button>
          </div>
        </div>
      </div>
      
      {showResults && (
        <CalculatorResults
          totalWattage={calculateTotalWattage()}
          dailyEnergyUse={calculateDailyEnergyUse()}
          recommendedInverterSize={calculateRecommendedInverterSize()}
          recommendedPanels={calculateRecommendedPanels()}
        />
      )}
    </div>
  );
};

export default Calculator;