import React from "react";
import { Trash2 } from "lucide-react";
import { ApplianceSelector } from "./ApplianceSelector";
import { commonAppliancesList, applianceWattages } from "./CommonAppliances";

interface Appliance {
  id: string;
  name: string;
  watts: number;
  quantity: number;
  hoursPerDay: number;
}

interface ApplianceInputProps {
  appliance: Appliance;
  onUpdate: (
    id: string,
    field: keyof Appliance,
    value: string | number
  ) => void;
  onRemove: (id: string) => void;
}

export const ApplianceInput: React.FC<ApplianceInputProps> = ({
  appliance,
  onUpdate,
  onRemove,
}) => {
  // Handle appliance name change and auto-fill wattage if available
  const handleApplianceChange = (value: string) => {
    onUpdate(appliance.id, "name", value);

    // Auto-fill the wattage if it's a common appliance
    if (
      (appliance.watts === 0 || !appliance.watts) &&
      value in applianceWattages
    ) {
      onUpdate(appliance.id, "watts", applianceWattages[value]);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-3 items-center">
      <div className="col-span-4">
        <ApplianceSelector
          value={appliance.name}
          onChange={handleApplianceChange}
          commonAppliances={commonAppliancesList}
        />
      </div>
      <div className="col-span-2">
        <div className="flex">
          <input
            type="number"
            className="w-full border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
            placeholder="Watts"
            value={appliance.watts || ""}
            onChange={(e) =>
              onUpdate(appliance.id, "watts", parseInt(e.target.value) || 0)
            }
          />
          <span className="bg-gray-100 border border-l-0 border-gray-300 rounded-r px-3 py-2 text-gray-500">
            W
          </span>
        </div>
      </div>
      <div className="col-span-2">
        <input
          type="number"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
          placeholder="Quantity"
          value={appliance.quantity}
          onChange={(e) =>
            onUpdate(appliance.id, "quantity", parseInt(e.target.value) || 1)
          }
          min="1"
        />
      </div>
      <div className="col-span-3">
        <div className="flex">
          <input
            type="number"
            className="w-full border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
            placeholder="Hours"
            value={appliance.hoursPerDay}
            onChange={(e) =>
              onUpdate(
                appliance.id,
                "hoursPerDay",
                parseInt(e.target.value) || 0
              )
            }
            min="0"
            max="24"
          />
          <span className="bg-gray-100 border border-l-0 border-gray-300 rounded-r px-3 py-2 text-gray-500">
            hrs
          </span>
        </div>
      </div>
      <div className="col-span-1 flex justify-center">
        <button
          onClick={() => onRemove(appliance.id)}
          className="text-red-500 hover:text-red-700"
          aria-label="Remove appliance"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};