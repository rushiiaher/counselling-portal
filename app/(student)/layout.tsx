import { Metadata } from "next";
import React from "react";
import AppShell from "@/components/layout/AppShell";
import { studentNav } from "@/config/navigation";

export const metadata: Metadata = {
  title: 'Dashboard | Counselling Portal',
};

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell navigation={studentNav}>
      {children}
    </AppShell>
  );
}
