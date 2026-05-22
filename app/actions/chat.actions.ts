"use server";

import { createAnonymousSession, sendAnonymousMessage, getSessionMessages } from "@/services/chat.service";
import { requireAuth } from "@/lib/auth/session";
import { createAuditLog } from "@/services/audit.service";
import prisma from "@/lib/prisma";

export async function startChatAction() {
  try {
    const session = await createAnonymousSession();
    return { success: true, token: session.token };
  } catch (err) {
    return { success: false };
  }
}

export async function sendMessageAction(token: string, content: string) {
  try {
    const msg = await sendAnonymousMessage(token, content, "ANONYMOUS");
    
    // Check if severity escalated to update client immediately
    const session = await prisma.anonymousSession.findUnique({ where: { token }});

    return { success: true, severity: session?.crisisSeverity };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function loadMessagesAction(token: string) {
  try {
    const data = await getSessionMessages(token);
    return { success: true, messages: data.messages, session: data.session };
  } catch {
    return { success: false };
  }
}

export async function staffLoadSessionAction(sessionId: string) {
  try {
    const auth = await requireAuth();
    if (auth.role !== "COUNSELLOR" && auth.role !== "ADMIN") return { success: false, error: "Unauthorized" };

    const session = await prisma.anonymousSession.findUnique({ where: { id: sessionId } });
    if (!session) return { success: false, error: "Session not found" };

    await createAuditLog({ userId: auth.id, action: "SENSITIVE_RECORD_VIEWED", resourceType: "AnonymousSession", resourceId: sessionId });

    const data = await getSessionMessages(session.token);
    return { success: true, messages: data.messages, session: data.session };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function staffReplyAction(sessionId: string, content: string) {
  try {
    const auth = await requireAuth();
    if (auth.role !== "COUNSELLOR" && auth.role !== "ADMIN") return { success: false, error: "Unauthorized" };

    const session = await prisma.anonymousSession.findUnique({ where: { id: sessionId } });
    if (!session) return { success: false, error: "Session not found" };

    await sendAnonymousMessage(session.token, content, "COUNSELLOR");
    await prisma.anonymousSession.update({
      where: { id: sessionId },
      data: { counsellorId: (await prisma.counsellorProfile.findUnique({ where: { userId: auth.id } }))?.id ?? undefined }
    });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function closeCrisisSessionAction(sessionId: string) {
  try {
    const auth = await requireAuth();
    if (auth.role !== "COUNSELLOR" && auth.role !== "ADMIN") return { success: false, error: "Unauthorized" };

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
