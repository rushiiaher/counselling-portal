import { Metadata } from "next";
import React from "react";
import StaffShell from "@/components/layout/StaffShell";

export const metadata: Metadata = {
  title: 'Counsellor Console | Counselling Portal',
  robots: 'noindex, nofollow',
};

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return <StaffShell>{children}</StaffShell>;
}
