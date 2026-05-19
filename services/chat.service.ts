import { PrismaClient, CrisisSeverity } from "@prisma/client";
import { encryptMessage, decryptMessage } from "./encryption.service";
import { detectCrisisSeverity } from "../lib/crisis-detector";
import { emitEvent } from "./event.service";
import { createAuditLog } from "./audit.service";
import { v4 as uuidv4 } from "uuid";

import prisma from "@/lib/prisma";

export async function createAnonymousSession(topic?: string, language: string = "en") {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // Hardcoded 30-day Retention Policy

  const session = await prisma.anonymousSession.create({
    data: {
      token: uuidv4(), // Unguessable token
      topic,
      language,
      expiresAt,
    }
  });

  await createAuditLog({ action: "ANON_CHAT_STARTED", resource: `Session:${session.id}` });
  return session;
}

export async function sendAnonymousMessage(sessionToken: string, content: string, sender: "ANONYMOUS" | "COUNSELLOR" | "SYSTEM") {
  const session = await prisma.anonymousSession.findUnique({ where: { token: sessionToken }});
  if (!session || !session.isActive) throw new Error("Session invalid or closed");

  // Only run crisis detector on user input
  const severity = sender === "ANONYMOUS" ? detectCrisisSeverity(content) : "LOW";
  
  let currentSeverity = session.crisisSeverity;
  let status = session.status;

  // Escalate severity if detected
  if (severity === "CRITICAL" || (severity === "HIGH" && currentSeverity !== "CRITICAL")) {
    currentSeverity = severity;
    status = "ESCALATED";
    
    await prisma.anonymousSession.update({
      where: { id: session.id },
      data: { crisisSeverity: currentSeverity, status, lastActivityAt: new Date() }
    });
    
    // Hook: Dispatch crisis event to notification infrastructure
    await emitEvent("crisis.escalation", { sessionId: session.id, severity: currentSeverity });
    await createAuditLog({ action: "CRISIS_FLAGGED", resource: `Session:${session.id}` });
  } else {
    await prisma.anonymousSession.update({
      where: { id: session.id },
      data: { lastActivityAt: new Date() }
    });
  }

  // Encrypt content at rest before saving
  const encryptedContent = encryptMessage(content);

  const message = await prisma.anonymousMessage.create({
    data: {
      sessionId: session.id,
      sender,
      content: encryptedContent,
      expiresAt: session.expiresAt
    }
  });

  await createAuditLog({ action: "MESSAGE_SENT", resource: `Message:${message.id}` });

  // Trigger Supabase realtime broadcast via webhook or event loop later
  await emitEvent("chat.message_sent", { sessionId: session.id, messageId: message.id, content, sender });

  return { id: message.id, content, sender, createdAt: message.createdAt };
}

export async function getSessionMessages(sessionToken: string) {
  const session = await prisma.anonymousSession.findUnique({
    where: { token: sessionToken },
    include: { messages: { orderBy: { createdAt: "asc" } } }
  });

  if (!session) return { messages: [], session: null };

  const decryptedMessages = session.messages.map(msg => ({
    id: msg.id,
    sender: msg.sender,
    content: decryptMessage(msg.content),
    createdAt: msg.createdAt
  }));

  return { messages: decryptedMessages, session };
}
