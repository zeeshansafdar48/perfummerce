import React from "react";

interface StatusDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ value, options, onChange }) => (
  <select
    className="border rounded px-2 py-1 bg-white"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    {options.map((opt) => (
      <option key={opt} value={opt}>{opt}</option>
    ))}
  </select>
);

export default StatusDropdown;
