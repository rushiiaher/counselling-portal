"use server";

import { verifyAdminAccess } from "@/services/admin.service";
import { createAuditLog } from "@/services/audit.service";
import { requireAuth } from "@/lib/auth/session";
import prisma from "@/lib/prisma";

export async function toggleUserActiveAction(userId: string, isActive: boolean) {
  try {
    const auth = await requireAuth();
    await verifyAdminAccess();

    if (userId === auth.id) return { success: false, error: "Cannot deactivate yourself" };

    await prisma.user.update({ where: { id: userId }, data: { isActive } });
    await createAuditLog({ userId: auth.id, action: isActive ? "USER_ACTIVATED" : "USER_DEACTIVATED", resourceType: "User", resourceId: userId });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function toggleCounsellorVerifiedAction(counsellorProfileId: string, isVerified: boolean) {
  try {
    const auth = await requireAuth();
    await verifyAdminAccess();

    await prisma.counsellorProfile.update({ where: { id: counsellorProfileId }, data: { isVerified } });
    await createAuditLog({ userId: auth.id, action: isVerified ? "COUNSELLOR_VERIFIED" : "COUNSELLOR_UNVERIFIED", resourceType: "CounsellorProfile", resourceId: counsellorProfileId });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function resolveCrisisSessionAction(sessionId: string) {
  try {
    const auth = await requireAuth();
    await verifyAdminAccess();

    await prisma.anonymousSession.update({
      where: { id: sessionId },
      data: { status: "CLOSED", isActive: false, endedAt: new Date() }
    });

    await createAuditLog({ userId: auth.id, action: "CRISIS_RESOLVED", resourceType: "AnonymousSession", resourceId: sessionId });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
