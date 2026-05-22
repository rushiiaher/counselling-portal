"use client";

import React from "react";
import AppShell from "./AppShell";
import { adminNav } from "@/config/navigation";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return <AppShell navigation={adminNav}>{children}</AppShell>;
}
