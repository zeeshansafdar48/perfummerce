import React from "react";

interface FilterBarProps {
  children: React.ReactNode;
}

const FilterBar: React.FC<FilterBarProps> = ({ children }) => (
  <div className="flex flex-wrap gap-4 mb-4 items-center bg-gray-50 p-3 rounded-lg shadow">
    {children}
  </div>
);

export default FilterBar;
