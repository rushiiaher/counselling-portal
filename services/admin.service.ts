import { PrismaClient, AdminScope } from "@prisma/client";
import { requireAuth } from "@/lib/auth/session";
import { createAuditLog } from "./audit.service";

import prisma from "@/lib/prisma";

export async function verifyAdminAccess(requiredScope?: AdminScope) {
  const session = await requireAuth();
  if (session.role !== "ADMIN") throw new Error("Unauthorized: Not an admin");

  const adminProfile = await prisma.adminProfile.findUnique({ where: { userId: session.id } });
  if (!adminProfile) throw new Error("Unauthorized: Admin profile not found");

  if (requiredScope && adminProfile.scope !== "SUPER_ADMIN" && adminProfile.scope !== requiredScope) {
    throw new Error(`Unauthorized: Requires ${requiredScope} scope`);
  }

  return adminProfile;
}

export async function getAggregateOperationalMetrics() {
  // Aggregate queries only to protect clinical timelines
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    appointments30d,
    activeCounsellors,
    unresolvedCrises,
    anonymousChats30d,
    assessmentsCompleted
  ] = await Promise.all([
    prisma.appointment.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.counsellorProfile.count({ where: { acceptingPatients: true, user: { isActive: true } } }),
    prisma.anonymousSession.count({ where: { status: "ESCALATED", crisisSeverity: { in: ["HIGH", "CRITICAL"] } } }),
    prisma.anonymousSession.count({ where: { startedAt: { gte: thirtyDaysAgo } } }),
    prisma.assessmentResult.count({ where: { createdAt: { gte: thirtyDaysAgo } } })
  ]);

  return {
    appointments30d,
    activeCounsellors,
    unresolvedCrises,
    anonymousChats30d,
    assessmentsCompleted
  };
}

export async function getAuditLogs(filters?: { action?: string, userId?: string }, take = 100) {
  return prisma.auditLog.findMany({
    where: {
      action: filters?.action,
      userId: filters?.userId,
    },
    orderBy: { createdAt: "desc" },
    take,
    include: {
      user: { select: { email: true, role: true } }
    }
  });
}
