import { ClinicalNoteType } from "@prisma/client";
import { encryptWithVersion, decryptMessage } from "./encryption.service";
import { createAuditLog } from "./audit.service";
import { logger } from "./logger.service";
import prisma from "@/lib/prisma";

export async function verifyClinicalAccess(counsellorUserId: string, patientProfileId: string) {
  // Explicitly select to reduce memory/network overhead
  const counsellorProfile = await prisma.counsellorProfile.findUnique({ 
    where: { userId: counsellorUserId },
    select: { id: true, userId: true }
  });
  if (!counsellorProfile) throw new Error("Counsellor profile not found");

  const assignment = await prisma.counsellorPatientAssignment.findUnique({
    where: { counsellorId_patientId: { counsellorId: counsellorProfile.id, patientId: patientProfileId } },
    select: { id: true }
  });

  if (assignment) return { hasAccess: true, counsellorProfileId: counsellorProfile.id };

  const patientProfile = await prisma.studentProfile.findUnique({ 
    where: { id: patientProfileId },
    select: { userId: true }
  });
  if (!patientProfile) throw new Error("Patient profile not found");

  const appointment = await prisma.appointment.findFirst({
    where: { counsellorId: counsellorProfile.userId, studentId: patientProfile.userId },
    select: { id: true }
  });

  if (appointment) {
    await prisma.counsellorPatientAssignment.create({
      data: { counsellorId: counsellorProfile.id, patientId: patientProfileId, assignedBy: "SYSTEM_APPOINTMENT_FALLBACK" }
    });
    return { hasAccess: true, counsellorProfileId: counsellorProfile.id };
  }

  throw new Error("Unauthorized access to clinical records. Assignment required.");
}

export async function getPatientTimeline(counsellorUserId: string, patientProfileId: string) {
  const auth = await verifyClinicalAccess(counsellorUserId, patientProfileId);

  await createAuditLog({
    userId: counsellorUserId,
    action: "PATIENT_VIEWED",
    resourceType: "StudentProfile",
    resourceId: patientProfileId
  });

  const startTime = Date.now();

  // Parallel fetching with highly selective fields to avoid N+1 and massive memory bloat
  const [notes, assessments, patientProfile] = await Promise.all([
    prisma.clinicalNote.findMany({
      where: { patientId: patientProfileId, counsellorId: auth.counsellorProfileId },
      select: { id: true, noteType: true, requiresElevatedAccess: true, contentEncrypted: true, encryptionKeyVersion: true, createdAt: true, editedAt: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.assessmentResult.findMany({
      where: { patientId: patientProfileId },
      select: { id: true, assessmentType: true, score: true, severity: true, triggeredCrisis: true, createdAt: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.studentProfile.findUnique({
      where: { id: patientProfileId },
      select: { userId: true }
    })
  ]);

  const appointments = patientProfile?.userId ? await prisma.appointment.findMany({
    where: { studentId: patientProfile.userId },
    select: { id: true, status: true, startTime: true, meetingLink: true, createdAt: true },
    orderBy: { startTime: "desc" }
  }) : [];

  // Transform and interleave into a single chronologically sorted timeline
  const timelineEvents = [
    ...notes.map(n => ({
      id: n.id,
      type: "NOTE" as const,
      timestamp: n.createdAt.toISOString(),
      data: {
        noteType: n.noteType,
        elevated: n.requiresElevatedAccess,
        content: decryptMessage(n.contentEncrypted, n.encryptionKeyVersion),
        editedAt: n.editedAt
      }
    })),
    ...assessments.map(a => ({
      id: a.id,
      type: "ASSESSMENT" as const,
      timestamp: a.createdAt.toISOString(),
      data: {
        assessmentType: a.assessmentType,
        score: a.score,
        severity: a.severity,
        triggeredCrisis: a.triggeredCrisis
      }
    })),
    ...appointments.map(a => ({
      id: a.id,
      type: "APPOINTMENT" as const,
      timestamp: a.startTime.toISOString(),
      data: {
        status: a.status,
        meetingLink: a.meetingLink
      }
    }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  logger.performance("Timeline aggregation complete", Date.now() - startTime, { patientProfileId });

  return timelineEvents;
}

export async function createClinicalNote(counsellorUserId: string, patientProfileId: string, content: string, type: ClinicalNoteType, elevated: boolean) {
  const auth = await verifyClinicalAccess(counsellorUserId, patientProfileId);
  
  const { ciphertext, version } = encryptWithVersion(content);

  const note = await prisma.clinicalNote.create({
    data: {
      patientId: patientProfileId,
      counsellorId: auth.counsellorProfileId,
      contentEncrypted: ciphertext,
      encryptionKeyVersion: version,
      noteType: type,
      requiresElevatedAccess: elevated
    }
  });

  await createAuditLog({
    userId: counsellorUserId,
    action: "CLINICAL_NOTE_CREATED",
    resourceType: "ClinicalNote",
    resourceId: note.id
  });

  return note;
}

export async function editClinicalNote(counsellorUserId: string, noteId: string, newContent: string) {
  const counsellorProfile = await prisma.counsellorProfile.findUnique({ 
    where: { userId: counsellorUserId },
    select: { id: true }
  });
  
  const note = await prisma.clinicalNote.findUnique({ 
    where: { id: noteId },
    select: { counsellorId: true, id: true }
  });
  
  if (!note || !counsellorProfile || note.counsellorId !== counsellorProfile.id) {
    throw new Error("Unauthorized to edit note");
  }

  const { ciphertext, version } = encryptWithVersion(newContent);
  
  const updated = await prisma.clinicalNote.update({
    where: { id: noteId },
    data: { contentEncrypted: ciphertext, encryptionKeyVersion: version, editedAt: new Date() }
  });

  await createAuditLog({
    userId: counsellorUserId,
    action: "CLINICAL_NOTE_EDITED",
    resourceType: "ClinicalNote",
    resourceId: note.id
  });

  return updated;
}
