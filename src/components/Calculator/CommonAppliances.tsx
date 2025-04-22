import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Appliance } from '../../types';

interface CommonAppliancesProps {
  addCommonAppliance: (appliance: Appliance) => void;
}

export const CommonAppliances: React.FC<CommonAppliancesProps> = ({ addCommonAppliance }) => {
  const [isOpen, setIsOpen] = useState(false);

  const commonItems = [
    { name: 'Refrigerator', wattage: 150, quantity: 1, hoursPerDay: 24 },
    { name: 'Freezer', wattage: 200, quantity: 1, hoursPerDay: 24 },
    { name: 'LED TV (50")', wattage: 100, quantity: 1, hoursPerDay: 4 },
    { name: 'Laptop', wattage: 50, quantity: 1, hoursPerDay: 4 },
    { name: 'Desktop Computer', wattage: 200, quantity: 1, hoursPerDay: 4 },
    { name: 'LED Light Bulb', wattage: 10, quantity: 1, hoursPerDay: 5 },
    { name: 'Ceiling Fan', wattage: 75, quantity: 1, hoursPerDay: 8 },
    { name: 'Air Conditioner (1 ton)', wattage: 1000, quantity: 1, hoursPerDay: 8 },
    { name: 'Washing Machine', wattage: 500, quantity: 1, hoursPerDay: 1 },
    { name: 'Microwave Oven', wattage: 1000, quantity: 1, hoursPerDay: 0.5 },
    { name: 'Electric Kettle', wattage: 1500, quantity: 1, hoursPerDay: 0.5 },
    { name: 'Water Heater', wattage: 3000, quantity: 1, hoursPerDay: 1 },
    { name: 'Dishwasher', wattage: 1200, quantity: 1, hoursPerDay: 1 },
    { name: 'Toaster', wattage: 850, quantity: 1, hoursPerDay: 0.2 },
    { name: 'Hair Dryer', wattage: 1500, quantity: 1, hoursPerDay: 0.2 },
    { name: 'Iron', wattage: 1100, quantity: 1, hoursPerDay: 0.5 },
    { name: 'Vacuum Cleaner', wattage: 1200, quantity: 1, hoursPerDay: 0.5 },
    { name: 'WiFi Router', wattage: 10, quantity: 1, hoursPerDay: 24 },
  ];

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-4 border border-secondary-200 rounded-lg overflow-hidden">
      <button
        onClick={toggleOpen}
        className="w-full flex justify-between items-center p-4 bg-secondary-50 hover:bg-secondary-100 transition-colors"
      >
        <span className="font-medium text-secondary-800">Common Household Appliances</span>
        {isOpen ? (
          <ChevronUp className="text-secondary-500" />
        ) : (
          <ChevronDown className="text-secondary-500" />
        )}
      </button>
      
      {isOpen && (
        <div className="p-4 max-h-64 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {commonItems.map((item, index) => (
              <button
                key={index}
                onClick={() => addCommonAppliance(item)}
                className="text-left px-3 py-2 rounded hover:bg-primary-50 transition-colors flex justify-between items-center group"
              >
                <span className="text-secondary-700">{item.name}</span>
                <span className="text-secondary-500 text-sm group-hover:text-primary-600">
                  {item.wattage}W
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};