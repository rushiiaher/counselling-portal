import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string | number;
    isPositive: boolean;
  };
}

export default function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-sm font-medium text-slate-500">{title}</h4>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>
      <div className="mt-auto">
        <span className="text-3xl font-bold text-slate-800">{value}</span>
        {trend && (
          <div className={`text-xs mt-2 font-medium flex items-center ${trend.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </div>
        )}
      </div>
    </div>
  );
}
