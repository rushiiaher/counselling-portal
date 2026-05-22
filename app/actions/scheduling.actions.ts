"use server";

import { requireAuth } from "@/lib/auth/session";
import { generateSlots, bookAppointmentTransaction } from "@/services/scheduling.service";
import { SessionMode } from "@prisma/client";
import prisma from "@/lib/prisma";
import { createAuditLog } from "@/services/audit.service";

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

export async function cancelAppointmentAction(appointmentId: string) {
  try {
    const session = await requireAuth();

    const apt = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { student: { select: { userId: true } } }
    });

    if (!apt) return { success: false, error: "Not found" };

    const isStudent = apt.student.userId === session.id;
    const isCounsellor = session.role === "COUNSELLOR" || session.role === "ADMIN";
    if (!isStudent && !isCounsellor) return { success: false, error: "Unauthorized" };

    if (!["PENDING", "CONFIRMED"].includes(apt.status)) {
      return { success: false, error: "Cannot cancel a completed or already cancelled appointment" };
    }

    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: "CANCELLED" }
    });

    await createAuditLog({ userId: session.id, action: "APPOINTMENT_CANCELLED", resourceType: "Appointment", resourceId: appointmentId });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to cancel" };
  }
}
