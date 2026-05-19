import { Session } from "next-auth";

export const Role = {
  STUDENT: "STUDENT",
  PARENT: "PARENT",
  COUNSELLOR: "COUNSELLOR",
  ADMIN: "ADMIN",
} as const;

type UserRole = keyof typeof Role;

export function isAdmin(user?: { role?: string }) {
  return user?.role === Role.ADMIN;
}

export function isCounsellor(user?: { role?: string }) {
  return user?.role === Role.COUNSELLOR;
}

export function isStaff(user?: { role?: string }) {
  return isAdmin(user) || isCounsellor(user);
}

export function isStudent(user?: { role?: string }) {
  return user?.role === Role.STUDENT;
}

export function isParent(user?: { role?: string }) {
  return user?.role === Role.PARENT;
}

export function canAccessPatient(user: { role: string; id: string }, patientId: string) {
  if (isAdmin(user) || isCounsellor(user)) return true;
  if (isStudent(user) && user.id === patientId) return true;
  return false;
}
