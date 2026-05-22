"use server";

import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/session";
import { encrypt, decrypt } from "@/lib/encryption";
import { SupportReferralTarget, RequestUrgency, FollowUpStatus, StudentProgress } from "@prisma/client";
import { revalidatePath } from "next/cache";

// ─── Guidance Reports ──────────────────────────────────────────────────────────

export async function createGuidanceReportAction(data: {
  requestId: string;
  sessionDate: string;
  concerns: string;
  observations: string;
  supportProvided: string;
  recommendations: string;
  followUpRequired: boolean;
  followUpDate?: string;
  escalationRequired: boolean;
  escalationReason?: string;
  referralRequired: boolean;
}) {
  try {
    const session = await requireAuth();
    if (session.role !== "COUNSELLOR" && session.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    const counsellor = await prisma.counsellorProfile.findUnique({ where: { userId: session.id } });
    if (!counsellor) return { success: false, error: "Counsellor profile not found" };

    const request = await prisma.supportRequest.findUnique({
      where: { id: data.requestId },
      include: { student: { include: { user: true } } },
    });
    if (!request) return { success: false, error: "Request not found" };

    const report = await prisma.guidanceReport.create({
      data: {
        requestId: data.requestId,
        counsellorId: counsellor.id,
        studentId: request.studentId,
        sessionDate: new Date(data.sessionDate),
        concernsEncrypted: encrypt(data.concerns),
        observationsEncrypted: encrypt(data.observations),
        supportEncrypted: encrypt(data.supportProvided),
        recommendationsEncrypted: encrypt(data.recommendations),
        followUpRequired: data.followUpRequired,
        followUpDate: data.followUpDate ? new Date(data.followUpDate) : null,
        escalationRequired: data.escalationRequired,
        escalationReason: data.escalationReason,
        referralRequired: data.referralRequired,
      },
    });

    // Auto-update request status based on report flags
    const newStatus = data.escalationRequired
      ? "ESCALATED"
      : data.followUpRequired
      ? "FOLLOW_UP_REQUIRED"
      : request.status;

    if (newStatus !== request.status) {
      await prisma.supportRequest.update({
        where: { id: data.requestId },
        data: { status: newStatus as any },
      });
    }

    await prisma.auditLog.create({
      data: {
        userId: session.id,
        action: "GUIDANCE_REPORT_CREATED",
        resourceType: "GuidanceReport",
        resourceId: report.id,
        details: `Report for request ${data.requestId}`,
      },
    });

    revalidatePath(`/staff/cases/${data.requestId}`);
    revalidatePath("/staff/reports");
    return { success: true, data: report };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getGuidanceReportsAction(requestId: string) {
  try {
    await requireAuth();

    const reports = await prisma.guidanceReport.findMany({
      where: { requestId },
      include: {
        counsellor: { include: { user: { select: { name: true } } } },
      },
      orderBy: { sessionDate: "desc" },
    });

    const decrypted = reports.map((r) => ({
      ...r,
      concerns: decrypt(r.concernsEncrypted),
      observations: decrypt(r.observationsEncrypted),
      supportProvided: decrypt(r.supportEncrypted),
      recommendations: decrypt(r.recommendationsEncrypted),
    }));

    return { success: true, data: decrypted };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getMyCounsellorReportsAction() {
  try {
    const session = await requireAuth();
    const counsellor = await prisma.counsellorProfile.findUnique({ where: { userId: session.id } });
    if (!counsellor) return { success: false, error: "Profile not found" };

    const reports = await prisma.guidanceReport.findMany({
      where: { counsellorId: counsellor.id },
      include: {
        request: { select: { id: true, serviceCategories: true, status: true } },
        student: { include: { user: { select: { name: true } } } },
      },
      orderBy: { sessionDate: "desc" },
      take: 50,
    });

    const decrypted = reports.map((r) => ({
      ...r,
      recommendations: r.recommendationsEncrypted ? decrypt(r.recommendationsEncrypted) : "",
    }));

    return { success: true, data: decrypted };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── Follow-Ups ────────────────────────────────────────────────────────────────

export async function createFollowUpAction(data: {
  requestId: string;
  scheduledDate: string;
  purpose: string;
}) {
  try {
    const session = await requireAuth();
    const counsellor = await prisma.counsellorProfile.findUnique({ where: { userId: session.id } });
    if (!counsellor) return { success: false, error: "Counsellor profile not found" };

    const followUp = await prisma.supportFollowUp.create({
      data: {
        requestId: data.requestId,
        counsellorId: counsellor.id,
        scheduledDate: new Date(data.scheduledDate),
        purpose: data.purpose,
        status: "PENDING",
      },
    });

    await prisma.supportRequest.update({
      where: { id: data.requestId },
      data: { status: "FOLLOW_UP_REQUIRED" },
    });

    revalidatePath("/staff/follow-ups");
    revalidatePath(`/staff/cases/${data.requestId}`);
    return { success: true, data: followUp };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function completeFollowUpAction(
  followUpId: string,
  data: {
    progressNote: string;
    studentProgress: StudentProgress;
    nextFollowUpRequired: boolean;
    nextFollowUpDate?: string;
  }
) {
  try {
    const session = await requireAuth();

    const followUp = await prisma.supportFollowUp.update({
      where: { id: followUpId },
      data: {
        status: "COMPLETED",
        progressNoteEncrypted: encrypt(data.progressNote),
        studentProgress: data.studentProgress,
        nextFollowUpRequired: data.nextFollowUpRequired,
        nextFollowUpDate: data.nextFollowUpDate ? new Date(data.nextFollowUpDate) : null,
        completedAt: new Date(),
      },
    });

    // If no more follow-ups needed and student improving → suggest resolution
    if (!data.nextFollowUpRequired && data.studentProgress === "RESOLVED") {
      await prisma.supportRequest.update({
        where: { id: followUp.requestId },
        data: { status: "IN_PROGRESS" },
      });
    }

    revalidatePath("/staff/follow-ups");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getMyFollowUpsAction() {
  try {
    const session = await requireAuth();
    const counsellor = await prisma.counsellorProfile.findUnique({ where: { userId: session.id } });
    if (!counsellor) return { success: false, error: "Profile not found" };

    const followUps = await prisma.supportFollowUp.findMany({
      where: {
        counsellorId: counsellor.id,
        status: { in: ["PENDING", "RESCHEDULED"] },
      },
      include: {
        request: {
          include: {
            student: { include: { user: { select: { name: true } } } },
          },
        },
      },
      orderBy: { scheduledDate: "asc" },
    });

    const now = new Date();
    const categorized = {
      overdue: followUps.filter((f) => f.scheduledDate < now),
      today: followUps.filter((f) => {
        const d = f.scheduledDate;
        return d >= now && d.toDateString() === now.toDateString();
      }),
      thisWeek: followUps.filter((f) => {
        const d = f.scheduledDate;
        const weekEnd = new Date(now);
        weekEnd.setDate(now.getDate() + 7);
        return d > now && d <= weekEnd && d.toDateString() !== now.toDateString();
      }),
      upcoming: followUps.filter((f) => {
        const weekEnd = new Date(now);
        weekEnd.setDate(now.getDate() + 7);
        return f.scheduledDate > weekEnd;
      }),
    };

    return { success: true, data: categorized };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── Referrals ─────────────────────────────────────────────────────────────────

export async function createSupportReferralAction(data: {
  requestId: string;
  referredTo: SupportReferralTarget;
  institutionId?: string;
  details: string;
  urgency: RequestUrgency;
}) {
  try {
    const session = await requireAuth();
    const counsellor = await prisma.counsellorProfile.findUnique({ where: { userId: session.id } });
    if (!counsellor) return { success: false, error: "Counsellor profile not found" };

    const referral = await prisma.supportReferral.create({
      data: {
        requestId: data.requestId,
        counsellorId: counsellor.id,
        referredTo: data.referredTo,
        institutionId: data.institutionId,
        details: data.details,
        urgency: data.urgency,
        status: "PENDING",
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.id,
        action: "SUPPORT_REFERRAL_CREATED",
        resourceType: "SupportReferral",
        resourceId: referral.id,
        details: `Referred to ${data.referredTo} for request ${data.requestId}`,
      },
    });

    revalidatePath("/staff/referrals");
    revalidatePath(`/staff/cases/${data.requestId}`);
    return { success: true, data: referral };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getMyReferralsAction() {
  try {
    const session = await requireAuth();
    const counsellor = await prisma.counsellorProfile.findUnique({ where: { userId: session.id } });
    if (!counsellor) return { success: false, error: "Profile not found" };

    const referrals = await prisma.supportReferral.findMany({
      where: { counsellorId: counsellor.id },
      include: {
        request: {
          include: { student: { include: { user: { select: { name: true } } } } },
        },
        institution: { select: { name: true, type: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: referrals };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateReferralStatusAction(
  referralId: string,
  status: "PENDING" | "ACCEPTED" | "COMPLETED" | "CANCELLED",
  notes?: string
) {
  try {
    const session = await requireAuth();
    await prisma.supportReferral.update({
      where: { id: referralId },
      data: { status: status as any, notes },
    });
    revalidatePath("/staff/referrals");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
