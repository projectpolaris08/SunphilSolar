import React from "react";
import { Trash2 } from "lucide-react";
import { ApplianceSelector } from "./ApplianceSelector";
import { commonAppliancesList, applianceWattages } from "./CommonAppliances";
import { motion } from "framer-motion"; // <- install framer-motion if not yet

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
  const handleApplianceChange = (value: string) => {
    onUpdate(appliance.id, "name", value);

    if (
      (appliance.watts === 0 || !appliance.watts) &&
      value in applianceWattages
    ) {
      onUpdate(appliance.id, "watts", applianceWattages[value]);
    }
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Appliance Name */}
      <div className="md:col-span-4">
        <ApplianceSelector
          value={appliance.name}
          onChange={handleApplianceChange}
          commonAppliances={commonAppliancesList}
        />
      </div>

      {/* Watts Input */}
      <div className="md:col-span-2 flex">
        <input
          type="number"
          className="w-full min-w-[80px] border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
          placeholder="Watts"
          value={appliance.watts || ""}
          onChange={(e) =>
            onUpdate(appliance.id, "watts", parseInt(e.target.value) || 0)
          }
        />
        <span
          className="bg-gray-100 border border-l-0 border-gray-300 rounded-r px-2 py-2 text-gray-500 flex items-center cursor-help"
          title="Power consumption in Watts"
        >
          W
        </span>
      </div>

      {/* Quantity Input */}
      <div className="md:col-span-2 flex">
        <input
          type="number"
          className="w-full min-w-[80px] border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
          placeholder="Qty"
          value={appliance.quantity}
          onChange={(e) =>
            onUpdate(appliance.id, "quantity", parseInt(e.target.value) || 1)
          }
          min="1"
        />
        <span
          className="bg-gray-100 border border-l-0 border-gray-300 rounded-r px-2 py-2 text-gray-500 flex items-center cursor-help"
          title="Number of units"
        >
          Qty
        </span>
      </div>

      {/* Hours Input */}
      <div className="md:col-span-2 flex">
        <input
          type="number"
          className="w-full min-w-[80px] border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
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
        <span
          className="bg-gray-100 border border-l-0 border-gray-300 rounded-r px-2 py-2 text-gray-500 flex items-center cursor-help"
          title="Hours used per day"
        >
          hrs
        </span>
      </div>

      {/* Remove Button */}
      <div className="md:col-span-2 flex justify-center">
        <button
          onClick={() => onRemove(appliance.id)}
          className="text-red-500 hover:text-red-700"
          aria-label="Remove appliance"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
};