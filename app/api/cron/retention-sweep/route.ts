import { NextResponse } from "next/server";
import { RETENTION_POLICIES } from "@/config/retention";
import { createAuditLog } from "@/services/audit.service";
import { logger } from "@/services/logger.service";

import prisma from "@/lib/prisma";
import { env } from "@/lib/env";

export async function GET(request: Request) {
  // Validate cron secret to prevent unauthorized execution
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${env.CRON_SECRET}` && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  logger.info("Starting automated retention sweep");
  let deletedSessionsCount = 0;
  let deletedAuditLogsCount = 0;

  try {
    // 1. Purge expired anonymous sessions (Cascade deletes messages)
    const expiredSessions = await prisma.anonymousSession.deleteMany({
      where: {
        expiresAt: { lte: new Date() } // We already explicitly calculate expiresAt when creating sessions
      }
    });
    deletedSessionsCount = expiredSessions.count;

    // 2. Purge old audit logs
    const oneYearAgo = new Date();
    oneYearAgo.setDate(oneYearAgo.getDate() - RETENTION_POLICIES.AUDIT_LOG_DAYS);

    const oldLogs = await prisma.auditLog.deleteMany({
      where: { createdAt: { lte: oneYearAgo } }
    });
    deletedAuditLogsCount = oldLogs.count;

    // 3. Log the sweep outcome securely
    await createAuditLog({
      action: "RETENTION_SWEEP_COMPLETED",
      details: `Hard deleted ${deletedSessionsCount} expired anonymous sessions. Purged ${deletedAuditLogsCount} old audit logs.`
    });

    logger.info("Retention sweep completed successfully", { deletedSessionsCount, deletedAuditLogsCount });

    return NextResponse.json({ success: true, deletedSessionsCount, deletedAuditLogsCount });
  } catch (error) {
    logger.error("Retention sweep failed", error);
    return NextResponse.json({ error: "Sweep failed" }, { status: 500 });
  }
}
