import React from "react";

interface StatisticsCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
    {icon && <div className="text-2xl text-gray-500">{icon}</div>}
    <div>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  </div>
);

export default StatisticsCard;
