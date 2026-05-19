import React from "react";

export default function PageContainer({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <main className={`container mx-auto px-4 py-8 max-w-7xl min-h-screen ${className}`}>
      {children}
    </main>
  );
}
