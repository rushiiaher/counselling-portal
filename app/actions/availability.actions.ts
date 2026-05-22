"use server";

import { requireAuth } from "@/lib/auth/session";
import prisma from "@/lib/prisma";

const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export async function getAvailabilityAction() {
  try {
    const auth = await requireAuth();
    const profile = await prisma.counsellorProfile.findUnique({ where: { userId: auth.id } });
    if (!profile) return { success: false, error: "No profile" };

    const slots = await prisma.counsellorAvailability.findMany({
      where: { counsellorId: profile.id },
      orderBy: { dayOfWeek: "asc" }
    });

    return { success: true, slots };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function saveAvailabilityAction(slots: {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  slotDuration: number;
  isActive: boolean;
}[]) {
  try {
    const auth = await requireAuth();
    if (auth.role !== "COUNSELLOR") return { success: false, error: "Unauthorized" };

    const profile = await prisma.counsellorProfile.findUnique({ where: { userId: auth.id } });
    if (!profile) return { success: false, error: "No counsellor profile" };

    await prisma.$transaction([
      prisma.counsellorAvailability.deleteMany({ where: { counsellorId: profile.id } }),
      prisma.counsellorAvailability.createMany({
        data: slots.map(s => ({ ...s, counsellorId: profile.id }))
      })
    ]);

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function blockDatesAction(startsAt: string, endsAt: string, reason?: string) {
  try {
    const auth = await requireAuth();
    if (auth.role !== "COUNSELLOR") return { success: false, error: "Unauthorized" };

    const profile = await prisma.counsellorProfile.findUnique({ where: { userId: auth.id } });
    if (!profile) return { success: false, error: "No profile" };

    await prisma.counsellorBlockedSlot.create({
      data: { counsellorId: profile.id, startsAt: new Date(startsAt), endsAt: new Date(endsAt), reason }
    });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
