import React from 'react';
import { Appliance } from '../../types';

interface ApplianceInputProps {
  appliance: Appliance;
  updateAppliance: (appliance: Appliance) => void;
}

export const ApplianceInput: React.FC<ApplianceInputProps> = ({ 
  appliance, 
  updateAppliance 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let parsedValue: string | number = value;
    
    // Convert numeric fields to numbers
    if (name === 'wattage' || name === 'quantity' || name === 'hoursPerDay') {
      parsedValue = value === '' ? 0 : Math.max(0, parseFloat(value));
    }
    
    updateAppliance({
      ...appliance,
      [name]: parsedValue
    });
  };

  return (
    <div className="grid grid-cols-12 gap-3 flex-grow">
      <div className="col-span-4">
        <input
          type="text"
          name="name"
          value={appliance.name}
          onChange={handleChange}
          placeholder="Appliance name"
          className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
      <div className="col-span-3">
        <div className="relative">
          <input
            type="number"
            name="wattage"
            min="0"
            value={appliance.wattage || ''}
            onChange={handleChange}
            placeholder="Watts"
            className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-secondary-500">
            W
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <input
          type="number"
          name="quantity"
          min="1"
          value={appliance.quantity}
          onChange={handleChange}
          placeholder="Qty"
          className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
      <div className="col-span-3">
        <div className="relative">
          <input
            type="number"
            name="hoursPerDay"
            min="0"
            max="24"
            step="0.5"
            value={appliance.hoursPerDay}
            onChange={handleChange}
            placeholder="Hours/day"
            className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-secondary-500">
            hrs
          </div>
        </div>
      </div>
    </div>
  );
};