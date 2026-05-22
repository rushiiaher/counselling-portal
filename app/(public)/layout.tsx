import React from "react";
import TopNavbar from "@/components/layout/TopNavbar";
import CrisisButton from "@/components/shared/CrisisButton";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      <TopNavbar />
      <main className="flex-1 overflow-y-auto focus:outline-none" tabIndex={-1} id="main-content">
        {children}
      </main>
      <CrisisButton />
    </div>
  );
}
