"use client";

import React from "react";
import AppShell from "./AppShell";
import { studentNav } from "@/config/navigation";

export default function StudentShell({ children }: { children: React.ReactNode }) {
  return <AppShell navigation={studentNav}>{children}</AppShell>;
}
