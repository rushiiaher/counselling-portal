export const ROLES = {
  STUDENT: "STUDENT",
  PARENT: "PARENT",
  COUNSELLOR: "COUNSELLOR",
  ADMIN: "ADMIN",
} as const;

export type UserRole = keyof typeof ROLES;
