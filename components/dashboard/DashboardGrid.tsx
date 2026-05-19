import React from 'react';

export default function DashboardGrid({ children, columns = 3 }: { children: React.ReactNode, columns?: 1 | 2 | 3 | 4 }) {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid gap-4 md:gap-6 ${gridClasses[columns]}`}>
      {children}
    </div>
  );
}
