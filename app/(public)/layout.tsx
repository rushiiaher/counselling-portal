import React from "react";
import SiteNavbar from "@/components/layout/SiteNavbar";
import CrisisButton from "@/components/shared/CrisisButton";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
      <SiteNavbar />
      <main className="flex-1 overflow-y-auto focus:outline-none" tabIndex={-1} id="main-content">
        {children}
      </main>
      <CrisisButton />
    </div>
  );
}
