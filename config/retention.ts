export const RETENTION_POLICIES = {
  ANONYMOUS_SESSION_DAYS: 30, // Hard delete to protect privacy
  AUDIT_LOG_DAYS: 365,        // Hard delete for compliance
  EXPORTED_FILE_HOURS: 24,    // Signed URLs/Exports decay
  INACTIVE_USER_MONTHS: 24,   // Soft delete / anonymize
};
