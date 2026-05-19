import { Metadata } from "next";
import React from "react";
import AppShell from "@/components/layout/AppShell";
import { counsellorNav } from "@/config/navigation";

export const metadata: Metadata = {
  title: 'Counsellor Console | Counselling Portal',
  robots: 'noindex, nofollow',
};

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell navigation={counsellorNav}>
      {children}
    </AppShell>
  );
}
