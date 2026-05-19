export const ROUTES = {
  PUBLIC: {
    HOME: "/",
    LOGIN: "/login",
    SIGNUP: "/signup",
    FORGOT_PASSWORD: "/forgot-password",
    UNAUTHORIZED: "/unauthorized",
    RESOURCES: "/resources",
    ANON_CHAT: "/chat/anonymous",
  },
  STUDENT: {
    DASHBOARD: "/student",
    APPOINTMENTS: "/student/appointments",
    RESOURCES: "/student/resources",
    ASSESSMENTS: "/student/assessments",
    PROFILE: "/student/profile",
  },
  STAFF: {
    DASHBOARD: "/staff",
    SCHEDULE: "/staff/schedule",
    PATIENTS: "/staff/patients",
    NOTES: "/staff/notes",
  },
  ADMIN: {
    DASHBOARD: "/admin",
    USERS: "/admin/users",
    RESOURCES: "/admin/resources",
    CRISIS: "/admin/crisis",
    AUDIT: "/admin/audit",
    SETTINGS: "/admin/settings",
  }
} as const;
