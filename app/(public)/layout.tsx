import React from "react";
import SiteNavbar from "@/components/layout/SiteNavbar";
import GovAnimations from "@/components/shared/GovAnimations";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
      <GovAnimations />
      <SiteNavbar />
      <main className="flex-1 focus:outline-none" tabIndex={-1} id="main-content">
        {children}
      </main>
    </div>
  );
}
