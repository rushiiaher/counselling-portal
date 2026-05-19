import React from 'react';

export default function DashboardCard({ children, title, action }: { children: React.ReactNode, title?: string, action?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
      {(title || action) && (
        <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center bg-white/50">
          {title && <h3 className="font-semibold text-slate-800">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6 flex-1">
        {children}
      </div>
    </div>
  );
}
