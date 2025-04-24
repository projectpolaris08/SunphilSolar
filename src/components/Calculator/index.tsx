import React, { useState } from "react";
import { Plus, Sun, Battery } from "lucide-react";
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

type BatteryType = "51.2v 280AH" | "51.2v 314AH" | "none";

interface BatteryConfig {
  type: BatteryType;
  quantity: number;
}

interface SystemConfig {
  name: string;
  maxWattage: number;
  maxLoadCapacity: number;
  maxPanels: number;
  panelWattage: number;
  maxBatteries: number;
  batteryType: string;
  batteryCapacity: number;
  maxBatteryWattage: number;
}

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

interface CalculationResults {
  totalWattage: number;
  dailyEnergyUse: number;
  batteryChargingWattage: number;
  totalSystemWattage: number;
  recommendedSystems: RecommendedSystem[];
}

const Calculator: React.FC = () => {
  // Default appliances for initial state
  const defaultAppliances: Appliance[] = [
    { id: "1", name: "Refrigerator", watts: 150, quantity: 1, hoursPerDay: 24 },
    { id: "2", name: "LED TV", watts: 100, quantity: 1, hoursPerDay: 4 },
    {
      id: "3",
      name: "Air Conditioner",
      watts: 1500,
      quantity: 2,
      hoursPerDay: 12,
    },
  ];

  const [appliances, setAppliances] = useState<Appliance[]>(defaultAppliances);
  const [showResults, setShowResults] = useState(false);
  const [batteryConfig, setBatteryConfig] = useState<BatteryConfig>({
    type: "none",
    quantity: 1,
  });

  // Generate a unique ID for new appliances
  const generateId = () => `appliance-${Date.now()}`;

  // Add a new appliance row
  const addAppliance = () => {
    const defaultName =
      commonAppliancesList.length > 0 ? commonAppliancesList[0] : "";
    const defaultWatts =
      defaultName in applianceWattages ? applianceWattages[defaultName] : 0;

    setAppliances([
      ...appliances,
      {
        id: generateId(),
        name: defaultName,
        watts: defaultWatts,
        quantity: 1,
        hoursPerDay: 1,
      },
    ]);
  };

  // Remove an appliance by ID
  const removeAppliance = (id: string) => {
    setAppliances(appliances.filter((appliance) => appliance.id !== id));
  };

  // Update an appliance property
  const updateAppliance = (
    id: string,
    field: keyof Appliance,
    value: string | number
  ) => {
    setAppliances(
      appliances.map((appliance) =>
        appliance.id === id ? { ...appliance, [field]: value } : appliance
      )
    );
  };

  // Calculate total wattage
  const calculateTotalWattage = () => {
    return appliances.reduce((total, appliance) => {
      return total + appliance.watts * appliance.quantity;
    }, 0);
  };

  // Calculate daily energy use in kWh
  const calculateDailyEnergyUse = () => {
    const wattHours = appliances.reduce((total, appliance) => {
      return (
        total + appliance.watts * appliance.quantity * appliance.hoursPerDay
      );
    }, 0);
    return parseFloat((wattHours / 1000).toFixed(2)); // Convert to kWh
  };

  // Calculate the complete recommended system
  const calculateRecommendedSystem = (): CalculationResults => {
    const totalApplianceWattage = calculateTotalWattage();
    const dailyEnergyUse = calculateDailyEnergyUse();

    // Calculate battery charging wattage
    let batteryChargingWattage = 0;
    if (batteryConfig.type === '51.2v 314AH') {
      batteryChargingWattage = 4000 * batteryConfig.quantity;
    } else if (batteryConfig.type === '51.2v 280AH') {
      batteryChargingWattage = 3500 * batteryConfig.quantity;
    }

    const totalSystemWattage = totalApplianceWattage + batteryChargingWattage;

    // Define your system configurations
    const systemConfigs: SystemConfig[] = [
      {
        name: "3kW LVPTOPSUN",
        maxWattage: 3000,
        maxLoadCapacity: 3510,
        maxPanels: 6,
        panelWattage: 585,
        maxBatteries: 1,
        batteryType: "24v 280AH",
        batteryCapacity: 6.72,
        maxBatteryWattage: 3500,
      },
      {
        name: "6kW Deye",
        maxWattage: 6000,
        maxLoadCapacity: 8000,
        maxPanels: 13,
        panelWattage: 615,
        maxBatteries: 1,
        batteryType: "51.2v 314AH",
        batteryCapacity: 16.08,
        maxBatteryWattage: 4000,
      },
      {
        name: "8kW Deye",
        maxWattage: 8000,
        maxLoadCapacity: 12000,
        maxPanels: 18,
        panelWattage: 615,
        maxBatteries: 2,
        batteryType: "51.2v 314AH",
        batteryCapacity: 16.08,
        maxBatteryWattage: 8000,
      },
      {
        name: "12kW Deye",
        maxWattage: 12000,
        maxLoadCapacity: 15000,
        maxPanels: 24,
        panelWattage: 615,
        maxBatteries: 3,
        batteryType: "51.2v 314AH",
        batteryCapacity: 16.08,
        maxBatteryWattage: 12000,
      },
      {
        name: "16kW Deye",
        maxWattage: 16000,
        maxLoadCapacity: 20000,
        maxPanels: 32,
        panelWattage: 615,
        maxBatteries: 4,
        batteryType: "51.2v 314AH",
        batteryCapacity: 16.08,
        maxBatteryWattage: 16000,
      },
    ];

    const recommendedSystems: RecommendedSystem[] = [];

    for (let i = 0; i < systemConfigs.length; i++) {
      const config = systemConfigs[i];

      // Calculate panels needed to match or slightly exceed total system wattage
      const requiredPanelCount = Math.ceil(totalSystemWattage / config.panelWattage);

      const canHandleBatteries =
        batteryConfig.type === "none" ||
        (batteryConfig.quantity <= config.maxBatteries &&
          batteryChargingWattage <= config.maxBatteryWattage);

      const canHandleLoad = totalSystemWattage <= config.maxLoadCapacity;
      const canHandlePanels = requiredPanelCount <= config.maxPanels;

      if (canHandleBatteries && canHandleLoad && canHandlePanels) {
        recommendedSystems.push({
          inverterModel: `${config.name} Hybrid Inverter`,
          inverterSize: config.maxWattage,
          maxLoadCapacity: config.maxLoadCapacity,
          battery: batteryConfig.type !== "none"
            ? `${batteryConfig.type} × ${batteryConfig.quantity}`
            : "None",
          batteryCapacity: batteryConfig.type !== "none"
            ? (batteryConfig.type === "51.2v 314AH"
              ? (16.08 * batteryConfig.quantity).toFixed(2)
              : (14.34 * batteryConfig.quantity).toFixed(2)) + " kWh"
            : "None",
          solarPanels: requiredPanelCount,
          solarCapacity: ((requiredPanelCount * config.panelWattage) / 1000).toFixed(2) + " kW",
          quantity: 1,
        });
        break;
      }

      if (i === systemConfigs.length - 1) {
        const maxPossiblePanels = Math.min(config.maxPanels, requiredPanelCount);
        const maxPossibleBatteries = Math.min(config.maxBatteries, batteryConfig.quantity);

        recommendedSystems.push({
          inverterModel: `${config.name} Hybrid Inverter`,
          inverterSize: config.maxWattage,
          maxLoadCapacity: config.maxLoadCapacity,
          battery: batteryConfig.type !== "none"
            ? `${batteryConfig.type} × ${maxPossibleBatteries}`
            : "None",
          batteryCapacity: batteryConfig.type !== "none"
            ? (batteryConfig.type === "51.2v 314AH"
              ? (16.08 * maxPossibleBatteries).toFixed(2)
              : (14.34 * maxPossibleBatteries).toFixed(2)) + " kWh"
            : "None",
          solarPanels: maxPossiblePanels,
          solarCapacity: ((maxPossiblePanels * config.panelWattage) / 1000).toFixed(2) + " kW",
          quantity: Math.ceil(totalSystemWattage / config.maxLoadCapacity),
          note: "System requirements exceed single inverter capacity. Multiple systems recommended.",
        });
      }
    }

    return {
      totalWattage: totalApplianceWattage,
      dailyEnergyUse,
      batteryChargingWattage,
      totalSystemWattage,
      recommendedSystems,
    };
  };

  // Handle calculation and show results
  const handleCalculate = () => {
    setShowResults(true);
  };

  // Handle battery type change
  const handleBatteryTypeChange = (type: BatteryType) => {
    setBatteryConfig({
      ...batteryConfig,
      type,
      quantity: type === "none" ? 0 : 1,
    });
  };

  // Handle battery quantity change
  const handleBatteryQuantityChange = (quantity: number) => {
    setBatteryConfig({
      ...batteryConfig,
      quantity: Math.max(1, Math.min(10, quantity)),
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-2">
        Solar System Calculator
      </h1>
      <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>

      <p className="text-center text-lg mb-8">
        Calculate your energy needs and determine the right Deye Hybrid Inverter
        and number of solar panels required for your home or business.
      </p>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="bg-primary-600 p-4 flex items-center">
          <div className="bg-white p-2 rounded-md mr-3">
            <Sun className="h-6 w-6 text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-white">
            Solar System Calculator
          </h2>
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

          {/* Battery Selection Section */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">
              Battery Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Battery className="h-5 w-5 mr-2 text-primary-600" />
                <select
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  value={batteryConfig.type}
                  onChange={(e) =>
                    handleBatteryTypeChange(e.target.value as BatteryType)
                  }
                >
                  <option value="none">No Battery</option>
                  <option value="51.2v 280AH">
                    51.2V 280AH (3.5kW charging per battery)
                  </option>
                  <option value="51.2v 314AH">
                    51.2V 314AH (4kW charging per battery)
                  </option>
                </select>
              </div>

              {batteryConfig.type !== "none" && (
                <div className="flex items-center">
                  <span className="mr-3 text-gray-600">Quantity:</span>
                  <select
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                    value={batteryConfig.quantity}
                    onChange={(e) =>
                      handleBatteryQuantityChange(parseInt(e.target.value))
                    }
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {batteryConfig.type !== "none"
                ? `Each ${batteryConfig.type} battery requires ${
                    batteryConfig.type === "51.2v 280AH" ? "3.5kW" : "4kW"
                  } of solar for charging`
                : "Select battery type and quantity if needed"}
            </p>
          </div>

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

      {showResults && <CalculatorResults {...calculateRecommendedSystem()} />}
    </div>
  );
};

export default Calculator;