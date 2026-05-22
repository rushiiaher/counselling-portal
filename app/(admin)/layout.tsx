import { Metadata } from "next";
import React from "react";
import AdminShell from "@/components/layout/AdminShell";

export const metadata: Metadata = {
  title: 'Admin Console | Counselling Portal',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
