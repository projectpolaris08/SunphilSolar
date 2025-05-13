import React, { useState } from "react";
import { Plus } from "lucide-react";
import { ApplianceInput } from "./ApplianceInput";
import { CalculatorResults } from "./CalculatorResults";
import { commonAppliancesList, applianceWattages } from "./CommonAppliances";
import { useNavigate } from "react-router-dom";

interface Appliance {
  id: string;
  name: string;
  watts: number;
  quantity: number;
  hoursPerDay: number;
  period: "AM" | "PM";
}

type BatteryType = "51.2v 280AH" | "51.2v 314AH" | "24v 280AH" | "none";

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
    {
      id: "1",
      name: "Refrigerator",
      watts: 150,
      quantity: 1,
      hoursPerDay: 24,
      period: "AM",
    },
    {
      id: "2",
      name: "Air Conditioner",
      watts: 1500,
      quantity: 2,
      hoursPerDay: 12,
      period: "AM",
    },
    {
      id: "3",
      name: "LED TV",
      watts: 100,
      quantity: 1,
      hoursPerDay: 4,
      period: "PM",
    },
    {
      id: "4",
      name: "Air Conditioner",
      watts: 1500,
      quantity: 2,
      hoursPerDay: 12,
      period: "PM",
    },
  ];

  const [appliances, setAppliances] = useState<Appliance[]>(defaultAppliances);
  const [showResults, setShowResults] = useState(false);
  const [batteryConfig, setBatteryConfig] = useState<BatteryConfig>({
    type: "none",
    quantity: 1,
  });
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState(false);
  const [privacyPolicyError, setPrivacyPolicyError] = useState("");
  const navigate = useNavigate();

  const generateId = () => `appliance-${Date.now()}`;

  // Only include AM appliances in calculations
  const amAppliances = appliances.filter((a) => a.period === "AM");
  const pmAppliances = appliances.filter((a) => a.period === "PM");

  // Add appliance for AM or PM
  const addApplianceWithPeriod = (period: "AM" | "PM") => {
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
        period,
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
    amAppliances.reduce((sum, a) => sum + a.watts * a.quantity, 0);

  const calculateDailyEnergyUse = () => {
    const totalWattHours = amAppliances.reduce(
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
    } else if (batteryConfig.type === "24v 280AH") {
      batteryChargingWattage = 2000 * batteryConfig.quantity;
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

    const panelWattage = inverterSize === 3000 ? 585 : 600;
    const requiredPanels = Math.ceil(totalSystemWattage / panelWattage);
    const totalSolarCapacity = (requiredPanels * panelWattage) / 1000;

    const batteryText =
      batteryConfig.type !== "none"
        ? `${batteryConfig.type} × ${batteryConfig.quantity}`
        : "None";

    const batteryCap =
      batteryConfig.type !== "none"
        ? (
            (batteryConfig.type === "51.2v 314AH"
              ? 16.08
              : batteryConfig.type === "51.2v 280AH"
              ? 14.34
              : 6.72) * batteryConfig.quantity
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

  const handleCalculate = () => setShowEmailPrompt(true);

  // Send estimate to backend
  const sendEstimate = async (email: string, calculationData: any) => {
    setIsSending(true);
    setMessageSent(false);
    try {
      const response = await fetch(
        "https://api.sunphilsolar.com/api/send-estimate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            calculation_data: calculationData,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setMessageSent(true);
        setUserEmail("");
        setTimeout(() => {
          setShowEmailPrompt(false);
          setMessageSent(false);
          navigate("/contact");
        }, 2000);
      } else {
        alert("Failed to send email: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      alert("Network error: " + err.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        💡 Appliance Calculator
      </h1>

      {/* AM Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">AM</h2>
        {amAppliances.length === 0 && (
          <div className="text-gray-500 mb-2">No AM appliances added.</div>
        )}
        {amAppliances.map((appliance) => (
          <div key={appliance.id} className="mb-4">
            <ApplianceInput
              appliance={appliance}
              onUpdate={updateAppliance}
              onRemove={removeAppliance}
            />
          </div>
        ))}
        <button
          onClick={() => addApplianceWithPeriod("AM")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus size={18} /> Add AM Appliance
        </button>
      </div>

      {/* PM Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">PM</h2>
        {pmAppliances.length === 0 && (
          <div className="text-gray-500 mb-2">No PM appliances added.</div>
        )}
        {pmAppliances.map((appliance) => (
          <div key={appliance.id} className="mb-4">
            <ApplianceInput
              appliance={appliance}
              onUpdate={updateAppliance}
              onRemove={removeAppliance}
            />
          </div>
        ))}
        <button
          onClick={() => addApplianceWithPeriod("PM")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus size={18} /> Add PM Appliance
        </button>
      </div>

      <div className="mt-6">
        <label className="block mb-2 font-medium">Battery Type</label>
        <select
          value={batteryConfig.type}
          onChange={(e) =>
            setBatteryConfig({
              type: e.target.value as BatteryType,
              quantity: e.target.value === "none" ? 0 : 1,
            })
          }
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="none">None</option>
          <option value="51.2v 280AH">51.2v 280AH</option>
          <option value="51.2v 314AH">51.2v 314AH</option>
          <option value="24v 280AH">24v 280AH</option>
        </select>

        {batteryConfig.type !== "none" && (
          <div className="mt-3">
            <label className="block mb-1 font-medium">Battery Quantity</label>
            <select
              value={batteryConfig.quantity}
              onChange={(e) =>
                setBatteryConfig({
                  ...batteryConfig,
                  quantity: parseInt(e.target.value),
                })
              }
              className="border border-gray-300 rounded px-3 py-2 w-full"
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

      <div className="mt-6">
        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-green-700"
        >
          Calculate Solar Requirements
        </button>
      </div>

      {/* Email Prompt Modal/Card */}
      {showEmailPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          {/* Fixed Gradient Border Wrapper */}
          <div
            className="relative p-1 rounded-2xl overflow-hidden"
            style={{
              width: "100%",
              maxWidth: "420px",
              background: "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)",
            }}
          >
            {/* Static Gradient Border */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)",
                zIndex: 1,
                filter: "blur(2px)",
              }}
            />
            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-lg p-8 z-10">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
                onClick={() => setShowEmailPrompt(false)}
                aria-label="Close"
              >
                &times;
              </button>
              {isSending ? (
                <div className="flex flex-col items-center py-6">
                  <svg
                    className="animate-spin h-10 w-10 text-blue-600 mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  <span className="text-blue-600">Sending...</span>
                </div>
              ) : messageSent ? (
                <div className="flex flex-col items-center py-6">
                  <svg
                    className="w-12 h-12 text-green-500 mb-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-green-600 font-semibold">
                    Message Sent!
                  </span>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold mb-4 text-center">
                    Enter your email
                  </h2>
                  <p className="mb-4 text-gray-600 text-center">
                    We'll send your solar system estimation results to your
                    email address.
                  </p>
                  <input
                    type="email"
                    className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary-400"
                    placeholder="your@email.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  <div className="flex items-start mb-4">
                    <div className="flex items-center h-5">
                      <input
                        id="privacyPolicyEmail"
                        name="privacyPolicyEmail"
                        type="checkbox"
                        checked={privacyPolicyAgreed}
                        onChange={(e) => {
                          setPrivacyPolicyAgreed(e.target.checked);
                          setPrivacyPolicyError("");
                        }}
                        className={`h-4 w-4 rounded border ${
                          privacyPolicyError
                            ? "border-red-500"
                            : "border-gray-300"
                        } text-primary-600 focus:ring-primary-500`}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="privacyPolicyEmail"
                        className="text-gray-700"
                      >
                        I agree to the{" "}
                        <a
                          href="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 underline"
                        >
                          Privacy Policy
                        </a>
                        *
                      </label>
                      {privacyPolicyError && (
                        <p className="mt-1 text-sm text-red-500">
                          {privacyPolicyError}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => {
                      if (!privacyPolicyAgreed) {
                        setPrivacyPolicyError(
                          "You must agree to the Privacy Policy"
                        );
                        return;
                      }
                      sendEstimate(userEmail, {
                        ...calculateRecommendedSystem(),
                        appliances,
                      });
                    }}
                    disabled={!userEmail}
                  >
                    Send Results
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Results are hidden until email is sent */}
      {/* {showResults && <CalculatorResults {...calculateRecommendedSystem()} />} */}
    </div>
  );
};

export default Calculator;
