import { NextResponse } from "next/server";
import { verifyAdminAccess } from "@/services/admin.service";
import { createAuditLog } from "@/services/audit.service";
import { requireAuth } from "@/lib/auth/session";

import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await requireAuth();
    await verifyAdminAccess("SUPER_ADMIN"); // Only super admin can export raw immutable logs

    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 1000 // Limit for safety and memory
    });

    // Record the export action in the audit log itself
    await createAuditLog({
      userId: session.id,
      action: "AUDIT_LOG_EXPORTED",
      details: "Exported 1000 latest audit logs to CSV format for compliance review"
    });

    const csvRows = [
      ["Timestamp", "Action", "ActorID", "ResourceType", "ResourceID", "IPHash", "UserAgentHash", "Details"],
      ...logs.map(log => [
        log.createdAt.toISOString(),
        log.action,
        log.userId || "",
        log.resourceType || "",
        log.resourceId || "",
        log.ipHash || "",
        log.userAgentHash || "",
        `"${(log.details || "").replace(/"/g, '""')}"`
      ])
    ];

    const csvContent = csvRows.map(e => e.join(",")).join("\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="audit_export_${Date.now()}.csv"`,
      },
    });

  } catch (error: any) {
    return NextResponse.json({ error: "Unauthorized or missing SUPER_ADMIN scope" }, { status: 403 });
  }
}
