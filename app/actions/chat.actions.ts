"use server";

import { createAnonymousSession, sendAnonymousMessage, getSessionMessages } from "@/services/chat.service";

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
