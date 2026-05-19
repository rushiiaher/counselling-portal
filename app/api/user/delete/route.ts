import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/session";
import { createAuditLog } from "@/services/audit.service";
import { logger } from "@/services/logger.service";

import prisma from "@/lib/prisma";

export async function POST() {
  try {
    const session = await requireAuth();

    // SOFT DELETE Strategy
    // We do not hard delete the user immediately because clinical records, 
    // assignments, and audit logs depend on this ID for compliance.
    
    // First, verify the user is active
    const user = await prisma.user.findUnique({ where: { id: session.id } });
    if (!user || !user.isActive) {
      return NextResponse.json({ error: "User not found or already deleted" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: session.id },
      data: {
        deletedAt: new Date(),
        isActive: false,
        name: "Anonymized User",
        email: `deleted-${session.id}@anonymized.local`,
        password: "", // Remove auth credentials permanently
        image: null,
      }
    });

    // Anonymize profiles depending on role
    if (session.role === "STUDENT") {
      await prisma.studentProfile.update({
        where: { userId: session.id },
        data: {
          firstName: "Anonymized",
          lastName: "Patient",
          guardianPhone: null,
          deletedAt: new Date()
        }
      });
    }

    await createAuditLog({
      userId: session.id,
      action: "USER_SOFT_DELETED",
      details: "User initiated account deletion. Data anonymized, clinical integrity preserved."
    });

    logger.info("User initiated soft deletion and anonymization", { userId: session.id });

    // Client is responsible for calling signOut() after this 200 response

    return NextResponse.json({ success: true });
  } catch (err) {
    logger.error("Failed to process account deletion", err);
    return NextResponse.json({ error: "Failed to process deletion" }, { status: 500 });
  }
}
