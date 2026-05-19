"use server";

import { requireAuth } from "@/lib/auth/session";
import { markNotificationRead, getUnreadNotifications, getUnreadNotificationCount } from "@/services/notification.service";

export async function fetchUnreadAction() {
  try {
    const session = await requireAuth();
    const notifications = await getUnreadNotifications(session.id);
    return { success: true, notifications };
  } catch {
    return { success: false, notifications: [] };
  }
}

export async function fetchUnreadCountAction() {
  try {
    const session = await requireAuth();
    const count = await getUnreadNotificationCount(session.id);
    return { success: true, count };
  } catch {
    return { success: false, count: 0 };
  }
}

export async function markReadAction(id: string) {
  try {
    const session = await requireAuth();
    await markNotificationRead(id, session.id);
    return { success: true };
  } catch {
    return { success: false };
  }
}
