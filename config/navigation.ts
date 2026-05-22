import {
  Home, Calendar, Users, FileText, Settings, ShieldAlert, Activity,
  BookOpen, MessageCircle, Building2, ClipboardList, CalendarDays,
  HeartHandshake, UserCheck, Bell,
} from "lucide-react";

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
  { title: "Dashboard", href: "/student/dashboard", icon: Home },
  { title: "Request Support", href: "/student/services", icon: HeartHandshake },
  { title: "My Requests", href: "/student/requests", icon: ClipboardList },
  { title: "Programs", href: "/student/programs", icon: CalendarDays },
  { title: "Counsellors", href: "/student/counsellors", icon: Users },
  { title: "Resources", href: "/student/resources", icon: BookOpen },
  { title: "Notifications", href: "/student/notifications", icon: Bell },
  { title: "Profile", href: "/student/profile", icon: Settings },
];

export const counsellorNav: NavItem[] = [
  { title: "Dashboard", href: "/staff", icon: Activity },
  { title: "My Cases", href: "/staff/cases", icon: ClipboardList },
  { title: "Reports", href: "/staff/reports", icon: FileText },
  { title: "Follow-ups", href: "/staff/follow-ups", icon: Calendar },
  { title: "Referrals", href: "/staff/referrals", icon: UserCheck },
  { title: "Notifications", href: "/staff/notifications", icon: Bell },
  { title: "Profile", href: "/staff/profile", icon: Settings },
];

export const adminNav: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: Activity },
  { title: "Cases", href: "/admin/cases", icon: ClipboardList },
  { title: "Counsellors", href: "/admin/counsellors", icon: UserCheck },
  { title: "Institutions", href: "/admin/institutions", icon: Building2 },
  { title: "Students", href: "/admin/students", icon: Users },
  { title: "Programs", href: "/admin/programs", icon: CalendarDays },
  { title: "Resources", href: "/admin/resources", icon: BookOpen },
  { title: "Audit Logs", href: "/admin/audit", icon: ShieldAlert },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];
