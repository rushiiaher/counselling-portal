"use server";

import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/session";
import { ServiceCategory, ProgramType, ProgramStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createProgramAction(data: {
  title: string;
  description: string;
  serviceCategory: ServiceCategory;
  programType: ProgramType;
  targetDistrict?: string;
  scheduledDate: string;
  durationMinutes: number;
  venue?: string;
  maxParticipants?: number;
  isPublic: boolean;
  registrationDeadline?: string;
  facilitatorIds: string[];
  institutionIds: string[];
}) {
  try {
    const session = await requireAuth();
    if (session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

    const program = await prisma.awarenessProgram.create({
      data: {
        title: data.title,
        description: data.description,
        serviceCategory: data.serviceCategory,
        programType: data.programType,
        targetDistrict: data.targetDistrict,
        scheduledDate: new Date(data.scheduledDate),
        durationMinutes: data.durationMinutes,
        venue: data.venue,
        maxParticipants: data.maxParticipants,
        isPublic: data.isPublic,
        registrationDeadline: data.registrationDeadline ? new Date(data.registrationDeadline) : null,
        status: "SCHEDULED",
        createdByAdminId: session.id,
        facilitators: {
          create: data.facilitatorIds.map((counsellorId) => ({ counsellorId })),
        },
        institutions: {
          create: data.institutionIds.map((institutionId) => ({ institutionId })),
        },
      },
    });

    revalidatePath("/admin/programs");
    revalidatePath("/student/programs");
    return { success: true, data: program };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getProgramsAction(filters?: {
  status?: ProgramStatus;
  serviceCategory?: ServiceCategory;
  isPublic?: boolean;
  upcoming?: boolean;
}) {
  try {
    const programs = await prisma.awarenessProgram.findMany({
      where: {
        ...(filters?.status && { status: filters.status }),
        ...(filters?.serviceCategory && { serviceCategory: filters.serviceCategory }),
        ...(filters?.isPublic !== undefined && { isPublic: filters.isPublic }),
        ...(filters?.upcoming && { scheduledDate: { gte: new Date() }, status: { in: ["SCHEDULED", "ONGOING"] } }),
      },
      include: {
        facilitators: {
          include: { counsellor: { include: { user: { select: { name: true } } } } },
        },
        institutions: {
          include: { institution: { select: { name: true, type: true } } },
        },
        _count: { select: { participants: true } },
      },
      orderBy: { scheduledDate: "asc" },
    });

    return { success: true, data: programs };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getProgramAction(id: string) {
  try {
    const program = await prisma.awarenessProgram.findUnique({
      where: { id },
      include: {
        facilitators: {
          include: { counsellor: { include: { user: { select: { name: true } } } } },
        },
        institutions: {
          include: { institution: true },
        },
        participants: {
          include: { student: { include: { user: { select: { name: true } } } } },
        },
        createdByAdmin: { select: { name: true } },
      },
    });

    if (!program) return { success: false, error: "Program not found" };
    return { success: true, data: program };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function registerForProgramAction(programId: string) {
  try {
    const session = await requireAuth();
    if (session.role !== "STUDENT") return { success: false, error: "Students only" };

    const profile = await prisma.studentProfile.findUnique({ where: { userId: session.id } });
    if (!profile) return { success: false, error: "Profile not found" };

    const existing = await prisma.programParticipation.findFirst({
      where: { programId, studentId: profile.id },
    });
    if (existing) return { success: false, error: "Already registered" };

    await prisma.programParticipation.create({
      data: { programId, studentId: profile.id },
    });

    await prisma.notification.create({
      data: {
        userId: session.id,
        type: "PROGRAM_REGISTERED" as any,
        channel: "IN_APP",
        title: "Program Registration Confirmed",
        body: "You have been registered for the awareness program.",
        metadata: { programId },
      },
    });

    revalidatePath("/student/programs");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateProgramStatusAction(id: string, status: ProgramStatus) {
  try {
    const session = await requireAuth();
    if (session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

    await prisma.awarenessProgram.update({ where: { id }, data: { status } });
    revalidatePath("/admin/programs");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function markAttendanceAction(programId: string, studentIds: string[]) {
  try {
    const session = await requireAuth();

    await prisma.programParticipation.updateMany({
      where: { programId, studentId: { in: studentIds } },
      data: { attended: true },
    });

    revalidatePath(`/admin/programs/${programId}`);
    revalidatePath(`/staff/programs`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
