import CryptoJS from "crypto-js";

import prisma from "@/lib/prisma";

interface AuditLogPayload {
  userId?: string;
  action: string;
  resource?: string; // Legacy format "Type:Id"
  resourceType?: string;
  resourceId?: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: any;
}

export async function createAuditLog(payload: AuditLogPayload) {
  try {
    let rt = payload.resourceType;
    let ri = payload.resourceId;
    
    if (payload.resource && !rt) {
      const parts = payload.resource.split(":");
      rt = parts[0];
      if (parts.length > 1) ri = parts.slice(1).join(":");
    }

    const ipHash = payload.ipAddress ? CryptoJS.SHA256(payload.ipAddress).toString() : undefined;
    const userAgentHash = payload.userAgent ? CryptoJS.SHA256(payload.userAgent).toString() : undefined;

    return await prisma.auditLog.create({
      data: {
        userId: payload.userId,
        action: payload.action,
        resourceType: rt,
        resourceId: ri,
        details: payload.details,
        ipHash,
        userAgentHash,
        metadata: payload.metadata || {}
      },
    });
  } catch (error) {
    console.error("Failed to create audit log:", error);
  }
}
