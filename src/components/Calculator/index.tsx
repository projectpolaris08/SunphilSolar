import React, { useState } from "react";
import { Plus } from "lucide-react";
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

  const generateId = () => `appliance-${Date.now()}`;
  const addAppliance = () => {
    const defaultName = commonAppliancesList[0] || "";
    const defaultWatts = applianceWattages[defaultName] || 0;

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

  const removeAppliance = (id: string) =>
    setAppliances(appliances.filter((a) => a.id !== id));

  const updateAppliance = (
    id: string,
    field: keyof Appliance,
    value: string | number
  ) =>
    setAppliances(
      appliances.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );

  const calculateTotalWattage = () =>
    appliances.reduce((sum, a) => sum + a.watts * a.quantity, 0);

  const calculateDailyEnergyUse = () => {
    const totalWattHours = appliances.reduce(
      (sum, a) => sum + a.watts * a.quantity * a.hoursPerDay,
      0
    );
    return parseFloat((totalWattHours / 1000).toFixed(2));
  };

  const calculateRecommendedSystem = (): CalculationResults => {
    const totalWattage = calculateTotalWattage();
    const dailyEnergyUse = calculateDailyEnergyUse();

    let batteryChargingWattage = 0;
    if (batteryConfig.type === "51.2v 280AH") {
      batteryChargingWattage = 3500 * batteryConfig.quantity;
    } else if (batteryConfig.type === "51.2v 314AH") {
      batteryChargingWattage = 4000 * batteryConfig.quantity;
    }

    const totalSystemWattage = totalWattage + batteryChargingWattage;

    const recommendedSystems: RecommendedSystem[] = [];

    let inverterSize = 0;
    let systemsNeeded = 1;
    let inverterLabel = "";

    if (totalSystemWattage <= 3510) {
      inverterSize = 3000;
      inverterLabel = "3kW";
    } else if (totalSystemWattage <= 7995) {
      inverterSize = 6000;
      inverterLabel = "6kW";
    } else if (totalSystemWattage <= 11070) {
      inverterSize = 8000;
      inverterLabel = "8kW";
    } else if (totalSystemWattage <= 14760) {
      inverterSize = 12000;
      inverterLabel = "12kW";
    } else if (totalSystemWattage <= 20000) {
      inverterSize = 16000;
      inverterLabel = "16kW";
    } else if (totalSystemWattage <= 24000) {
      inverterSize = 12000;
      inverterLabel = "2× 12kW";
      systemsNeeded = 2;
    } else if (totalSystemWattage <= 32000) {
      inverterSize = 16000;
      inverterLabel = "2× 16kW";
      systemsNeeded = 2;
    } else {
      inverterSize = 16000;
      systemsNeeded = Math.ceil(totalSystemWattage / 20000);
      inverterLabel = `${systemsNeeded}× 16kW`;
    }

    const panelWattage = 615;
    const requiredPanels = Math.ceil(totalSystemWattage / panelWattage);
    const totalSolarCapacity = (requiredPanels * panelWattage) / 1000;

    const batteryText =
      batteryConfig.type !== "none"
        ? `${batteryConfig.type} × ${batteryConfig.quantity}`
        : "None";

    const batteryCap =
      batteryConfig.type !== "none"
        ? (
            (batteryConfig.type === "51.2v 314AH" ? 16.08 : 14.34) *
            batteryConfig.quantity
          ).toFixed(2) + " kWh"
        : "None";

    recommendedSystems.push({
      inverterModel: `${inverterLabel} Hybrid Inverter`,
      inverterSize,
      maxLoadCapacity: inverterSize * systemsNeeded,
      battery: batteryText,
      batteryCapacity: batteryCap,
      solarPanels: requiredPanels,
      solarCapacity: totalSolarCapacity.toFixed(2) + " kW",
      quantity: systemsNeeded,
      note:
        systemsNeeded > 1
          ? `Multiple systems required for ${totalSystemWattage.toLocaleString()}W load`
          : undefined,
    });

    return {
      totalWattage,
      dailyEnergyUse,
      batteryChargingWattage,
      totalSystemWattage,
      recommendedSystems,
    };
  };

  const handleCalculate = () => setShowResults(true);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        💡 Appliance Calculator
      </h1>

      {appliances.map((appliance) => (
        <div key={appliance.id} className="mb-4">
          <ApplianceInput
            appliance={appliance}
            onUpdate={updateAppliance}
            onRemove={removeAppliance}
          />
        </div>
      ))}

      <button
        onClick={addAppliance}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        <Plus size={18} /> Add Appliance
      </button>

      <div className="mt-6">
        <label className="block mb-2 font-medium">Battery Type</label>
        <select
          value={batteryConfig.type}
          onChange={(e) =>
            setBatteryConfig({
              ...batteryConfig,
              type: e.target.value as BatteryType,
              quantity: e.target.value === "none" ? 0 : batteryConfig.quantity,
            })
          }
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="none">None</option>
          <option value="51.2v 280AH">51.2v 280AH</option>
          <option value="51.2v 314AH">51.2v 314AH</option>
        </select>

        {batteryConfig.type !== "none" && (
          <div className="mt-3">
            <label className="block mb-1 font-medium">Battery Quantity</label>
            <input
              type="number"
              min={1}
              max={10}
              value={batteryConfig.quantity}
              onChange={(e) =>
                setBatteryConfig({
                  ...batteryConfig,
                  quantity: Math.max(1, parseInt(e.target.value) || 1),
                })
              }
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-green-700"
        >
          Calculate Solar Requirements
        </button>
      </div>

      {showResults && <CalculatorResults {...calculateRecommendedSystem()} />}
    </div>
  );
};

export default Calculator;
