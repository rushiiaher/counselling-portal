import { PrismaClient, NotificationType, NotificationChannel } from "@prisma/client";
import { sendEmail } from "../providers/resend.provider";
import { buildAppointmentBookedEmail } from "../notifications/templates/email.templates";
import { createAuditLog } from "./audit.service";
import { format } from "date-fns";

import prisma from "@/lib/prisma";

export async function createInAppNotification(userId: string, type: NotificationType, title: string, body: string, metadata?: any) {
  return prisma.notification.create({
    data: {
      userId,
      type,
      channel: "IN_APP",
      title,
      body,
      metadata: metadata || {},
    }
  });
}

// Event Handlers
export async function handleAppointmentBooked(payload: { appointmentId: string }) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: payload.appointmentId },
    include: {
      student: { select: { id: true, email: true, name: true } },
      counsellor: { select: { id: true, name: true } },
    }
  });

  if (!appointment) return;

  const dateStr = format(new Date(appointment.startTime), "PPP 'at' p");

  // 1. In-App Notification
  await createInAppNotification(
    appointment.studentId,
    "APPOINTMENT_BOOKED",
    "Session Confirmed",
    `Your session with ${appointment.counsellor.name} is scheduled for ${dateStr}.`,
    { appointmentId: appointment.id }
  );

  // 2. Check Preferences for Email
  const prefs = await prisma.notificationPreference.findUnique({ where: { userId: appointment.studentId }});
  
  if (!prefs || prefs.appointmentEmails) {
    const html = buildAppointmentBookedEmail(appointment.student.name || "Student", dateStr, appointment.counsellor.name || "Counsellor");
    await sendEmail(appointment.student.email!, "Appointment Confirmed - Peace Portal", html);
    
    await createAuditLog({
      userId: appointment.studentId,
      action: "EMAIL_SENT",
      resource: `Notification:AppointmentBooked:${appointment.id}`
    });
  }
}

export async function getUnreadNotifications(userId: string) {
  return prisma.notification.findMany({
    where: { userId, isRead: false },
    orderBy: { createdAt: "desc" }
  });
}

export async function getUnreadNotificationCount(userId: string) {
  return prisma.notification.count({
    where: { userId, isRead: false }
  });
}

export async function markNotificationRead(id: string, userId: string) {
  return prisma.notification.update({
    where: { id, userId },
    data: { isRead: true }
  });
}

export async function handleCrisisEscalation(payload: { sessionId: string, severity: string }) {
  // Find on-duty admins or counsellors (MVP: just create a SYSTEM notification for the first ADMIN)
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) return;

  await createInAppNotification(
    admin.id,
    "CRISIS_ALERT",
    `Crisis Escalation: ${payload.severity}`,
    `An anonymous session has been escalated to ${payload.severity} severity. Please review immediately.`,
    { sessionId: payload.sessionId }
  );
  
  // In a real scenario, this would send an SMS or Emergency Email to the on-call staff
}
