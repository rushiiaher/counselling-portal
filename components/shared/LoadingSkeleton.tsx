import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="w-full animate-pulse flex flex-col gap-4 p-4">
      <div className="h-8 bg-slate-200 rounded w-1/3"></div>
      <div className="h-32 bg-slate-200 rounded w-full"></div>
      <div className="h-32 bg-slate-200 rounded w-full"></div>
    </div>
  );
}
