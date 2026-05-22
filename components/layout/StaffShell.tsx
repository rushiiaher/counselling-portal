"use client";

import React from "react";
import AppShell from "./AppShell";
import { counsellorNav } from "@/config/navigation";

export default function StaffShell({ children }: { children: React.ReactNode }) {
  return <AppShell navigation={counsellorNav}>{children}</AppShell>;
}
