"use server";

import { requireAuth } from "@/lib/auth/session";
import { generateSlots, bookAppointmentTransaction } from "@/services/scheduling.service";
import { SessionMode } from "@prisma/client";

export async function fetchAvailableSlots(counsellorId: string, dateIsoString: string) {
  try {
    const date = new Date(dateIsoString);
    const slots = await generateSlots(counsellorId, date);
    return { success: true, slots: slots.map(s => ({ start: s.start.toISOString(), end: s.end.toISOString() })) };
  } catch (error: any) {
    return { success: false, error: "Failed to fetch slots" };
  }
}

export async function bookSlotAction(data: { counsellorId: string, startTime: string, endTime: string, mode: SessionMode }) {
  try {
    const session = await requireAuth();
    if (session.role !== "STUDENT") return { success: false, error: "Unauthorized" };

    const appointment = await bookAppointmentTransaction({
      studentId: session.id,
      counsellorId: data.counsellorId,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      mode: data.mode,
    });

    return { success: true, id: appointment.id };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to book slot" };
  }
}
