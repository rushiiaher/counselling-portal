import { PrismaClient, Prisma, AppointmentStatus, SessionMode } from "@prisma/client";
import { createAuditLog } from "./audit.service";
import { emitEvent } from "./event.service";

import prisma from "@/lib/prisma";

/**
 * Generates available slots dynamically without storing them in the DB.
 */
export async function generateSlots(counsellorId: string, date: Date) {
  const dayOfWeek = date.getDay();
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999);

  // 1. Fetch weekly templates
  const availabilities = await prisma.counsellorAvailability.findMany({
    where: { counsellorId, dayOfWeek, isActive: true }
  });

  // 2. Fetch blocked times
  const blockedSlots = await prisma.counsellorBlockedSlot.findMany({
    where: { 
      counsellorId,
      startsAt: { lte: endOfDay },
      endsAt: { gte: startOfDay }
    }
  });

  // 3. Fetch existing appointments
  const appointments = await prisma.appointment.findMany({
    where: { 
      counsellorId,
      status: { in: ['PENDING', 'CONFIRMED'] },
      startTime: { gte: startOfDay, lte: endOfDay }
    }
  });

  const generatedSlots: { start: Date; end: Date }[] = [];

  for (const av of availabilities) {
    const [startH, startM] = av.startTime.split(':').map(Number);
    const [endH, endM] = av.endTime.split(':').map(Number);
    
    let currentSlotStart = new Date(startOfDay);
    currentSlotStart.setUTCHours(startH, startM, 0, 0);

    const periodEnd = new Date(startOfDay);
    periodEnd.setUTCHours(endH, endM, 0, 0);

    while (currentSlotStart.getTime() + (av.slotDuration * 60000) <= periodEnd.getTime()) {
      const currentSlotEnd = new Date(currentSlotStart.getTime() + (av.slotDuration * 60000));
      
      // Check overlaps
      const isBlocked = blockedSlots.some(b => 
        (currentSlotStart >= b.startsAt && currentSlotStart < b.endsAt) ||
        (currentSlotEnd > b.startsAt && currentSlotEnd <= b.endsAt)
      );

      const isBooked = appointments.some(a => 
        (currentSlotStart >= a.startTime && currentSlotStart < a.endTime) ||
        (currentSlotEnd > a.startTime && currentSlotEnd <= a.endTime)
      );

      // Check constraints (e.g. slot must be in the future, maybe +1 hour buffer)
      const bufferTime = new Date();
      bufferTime.setHours(bufferTime.getHours() + 1);

      if (!isBlocked && !isBooked && currentSlotStart > bufferTime) {
        generatedSlots.push({
          start: new Date(currentSlotStart),
          end: new Date(currentSlotEnd)
        });
      }

      currentSlotStart = new Date(currentSlotEnd);
    }
  }

  return generatedSlots;
}

/**
 * Safely books an appointment inside a strict Database Transaction to prevent race conditions.
 */
export async function bookAppointmentTransaction(data: { studentId: string, counsellorId: string, startTime: Date, endTime: Date, mode: SessionMode }) {
  return await prisma.$transaction(async (tx) => {
    // 1. Recheck if slot is blocked
    const blocked = await tx.counsellorBlockedSlot.findFirst({
      where: {
        counsellorId: data.counsellorId,
        startsAt: { lt: data.endTime },
        endsAt: { gt: data.startTime }
      }
    });
    if (blocked) throw new Error("Slot is blocked or unavailable");

    // 2. Recheck if slot is already booked (Concurrency Protection)
    const existing = await tx.appointment.findFirst({
      where: {
        counsellorId: data.counsellorId,
        status: { in: ['PENDING', 'CONFIRMED'] },
        startTime: { lt: data.endTime },
        endTime: { gt: data.startTime }
      }
    });
    if (existing) throw new Error("Slot has already been booked");

    // 3. Create appointment atomically
    const roomPrefix = `counselling-${data.studentId}-${Date.now().toString(36)}`;
    const appointment = await tx.appointment.create({
      data: {
        studentId: data.studentId,
        counsellorId: data.counsellorId,
        startTime: data.startTime,
        endTime: data.endTime,
        mode: data.mode,
        jitsiRoom: data.mode === "VIDEO" ? roomPrefix : null,
        status: "PENDING"
      }
    });

    await createAuditLog({
      userId: data.studentId,
      action: "APPOINTMENT_BOOKED",
      resource: `Appointment:${appointment.id}`,
    });

    // 4. Hook triggers via Event architecture
    emitEvent("appointment.booked", { appointmentId: appointment.id });

    return appointment;
  }, {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable
  });
}

export async function getCounsellorSchedule(counsellorId: string, start: Date, end: Date) {
  return prisma.appointment.findMany({
    where: {
      counsellorId,
      startTime: { gte: start },
      endTime: { lte: end },
    },
    include: {
      student: { select: { name: true, email: true, studentProfile: true } }
    },
    orderBy: { startTime: 'asc' }
  });
}
