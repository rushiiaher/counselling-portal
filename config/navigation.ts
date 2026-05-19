import { Home, Calendar, Users, FileText, Settings, ShieldAlert, Activity, BookOpen, MessageCircle } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: any;
  permissions?: string[];
};

export const publicNav: NavItem[] = [
  { title: "Home", href: "/", icon: Home },
  { title: "Resources", href: "/resources", icon: BookOpen },
  { title: "Anonymous Chat", href: "/chat/anonymous", icon: MessageCircle },
];

export const studentNav: NavItem[] = [
  { title: "Dashboard", href: "/student", icon: Home },
  { title: "Appointments", href: "/student/appointments", icon: Calendar },
  { title: "Resources", href: "/student/resources", icon: BookOpen },
  { title: "Self-Assessments", href: "/student/assessments", icon: Activity },
  { title: "Profile", href: "/student/profile", icon: Settings },
];

export const counsellorNav: NavItem[] = [
  { title: "Console", href: "/staff", icon: Activity },
  { title: "Schedule", href: "/staff/schedule", icon: Calendar },
  { title: "Patients", href: "/staff/patients", icon: Users },
  { title: "Clinical Notes", href: "/staff/notes", icon: FileText },
];

export const adminNav: NavItem[] = [
  { title: "Overview", href: "/admin", icon: Activity },
  { title: "User Management", href: "/admin/users", icon: Users },
  { title: "Resource Manager", href: "/admin/resources", icon: BookOpen },
  { title: "Crisis Alerts", href: "/admin/crisis", icon: ShieldAlert },
  { title: "Audit Logs", href: "/admin/audit", icon: FileText },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];
