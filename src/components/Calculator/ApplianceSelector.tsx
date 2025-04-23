import React, { useState, useEffect } from 'react';

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
  const [selectedType, setSelectedType] = useState<string>(
    commonAppliances.includes(value) ? value : 'Other'
  );
  const [customValue, setCustomValue] = useState<string>(
    commonAppliances.includes(value) ? '' : value
  );

  useEffect(() => {
    if (selectedType === 'Other') {
      onChange(customValue);
    } else {
      onChange(selectedType);
    }
  }, [selectedType, customValue, onChange]);

  return (
    <div className="flex flex-col space-y-2 w-full">
      <select
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
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
          onChange={(e) => setCustomValue(e.target.value)}
        />
      )}
    </div>
  );
};