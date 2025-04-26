import React, { useState } from 'react';

interface ApplianceSelectorProps {
  value: string;
  onChange: (value: string) => void;
  commonAppliances: string[];
}

export const ApplianceSelector: React.FC<ApplianceSelectorProps> = ({
  value,
  onChange,
  commonAppliances
}) => {
  // Initialize state based on initial props
  const [selectedType, setSelectedType] = useState<string>(
    commonAppliances.includes(value) ? value : 'Other'
  );
  const [customValue, setCustomValue] = useState<string>(
    commonAppliances.includes(value) ? '' : value
  );

  // Only call onChange when the user actively changes something
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setSelectedType(newType);
    onChange(newType === 'Other' ? customValue : newType);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCustomValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      <select
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
        value={selectedType}
        onChange={handleTypeChange}
      >
        {commonAppliances.map((appliance) => (
          <option key={appliance} value={appliance}>
            {appliance}
          </option>
        ))}
        <option value="Other">Other...</option>
      </select>
      
      {selectedType === 'Other' && (
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
          placeholder="Enter custom appliance"
          value={customValue}
          onChange={handleCustomChange}
        />
      )}
    </div>
  );
};