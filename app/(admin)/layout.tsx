import { Metadata } from "next";
import React from "react";
import AppShell from "@/components/layout/AppShell";
import { adminNav } from "@/config/navigation";

export const metadata: Metadata = {
  title: 'Admin Console | Counselling Portal',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell navigation={adminNav}>
      {children}
    </AppShell>
  );
}
