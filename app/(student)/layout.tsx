import { Metadata } from "next";
import React from "react";
import StudentShell from "@/components/layout/StudentShell";

export const metadata: Metadata = {
  title: 'Dashboard | Counselling Portal',
};

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <StudentShell>{children}</StudentShell>;
}
