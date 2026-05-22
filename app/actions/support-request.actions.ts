"use server";

import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/session";
import { ServiceCategory, RequestUrgency, RequestStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

// ─── Student: Submit new support request ──────────────────────────────────────

export async function submitSupportRequestAction(data: {
  serviceCategories: ServiceCategory[];
  description: string;
  urgency: RequestUrgency;
  preferredLanguage: string;
  attachments?: string[];
}) {
  try {
    const session = await requireAuth();
    if (session.role !== "STUDENT") return { success: false, error: "Students only" };

    const profile = await prisma.studentProfile.findUnique({ where: { userId: session.id } });
    if (!profile) return { success: false, error: "Student profile not found" };

    const request = await prisma.supportRequest.create({
      data: {
        studentId: profile.id,
        serviceCategories: data.serviceCategories,
        description: data.description,
        urgency: data.urgency,
        preferredLanguage: data.preferredLanguage,
        attachments: data.attachments ?? [],
        status: "SUBMITTED",
      },
    });

    // Notify all admins
    const admins = await prisma.user.findMany({ where: { role: "ADMIN", isActive: true } });
    await prisma.notification.createMany({
      data: admins.map((admin) => ({
        userId: admin.id,
        type: "REQUEST_SUBMITTED" as any,
        channel: "IN_APP",
        title: "New Support Request",
        body: `${profile.firstName} submitted a ${data.serviceCategories[0].replace(/_/g, " ")} request`,
        metadata: { requestId: request.id },
      })),
    });

    revalidatePath("/student/requests");
    return { success: true, data: request };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── Student: Get own requests ─────────────────────────────────────────────────

export async function getMyRequestsAction() {
  try {
    const session = await requireAuth();
    const profile = await prisma.studentProfile.findUnique({ where: { userId: session.id } });
    if (!profile) return { success: false, error: "Profile not found" };

    const requests = await prisma.supportRequest.findMany({
      where: { studentId: profile.id },
      include: {
        assignedCounsellor: {
          include: { user: { select: { name: true } } },
        },
        _count: { select: { guidanceReports: true, followUps: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: requests };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── Student: Get single request detail ────────────────────────────────────────

export async function getRequestDetailAction(requestId: string) {
  try {
    const session = await requireAuth();
    const profile = await prisma.studentProfile.findUnique({ where: { userId: session.id } });

    const request = await prisma.supportRequest.findUnique({
      where: { id: requestId },
      include: {
        student: { include: { user: { select: { name: true, email: true } } } },
        assignedCounsellor: {
          include: { user: { select: { name: true } } },
        },
        assignments: {
          include: { counsellor: { include: { user: { select: { name: true } } } } },
          orderBy: { assignedAt: "desc" },
        },
        followUps: { orderBy: { scheduledDate: "asc" } },
        referrals: { include: { institution: true } },
        _count: { select: { guidanceReports: true } },
      },
    });

    if (!request) return { success: false, error: "Request not found" };

    // Students can only see their own
    if (session.role === "STUDENT" && profile && request.studentId !== profile.id) {
      return { success: false, error: "Unauthorized" };
    }

    return { success: true, data: request };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── Admin: Get all requests ───────────────────────────────────────────────────

export async function getAllRequestsAction(filters?: {
  status?: RequestStatus;
  urgency?: RequestUrgency;
  serviceCategory?: ServiceCategory;
  district?: string;
  unassignedOnly?: boolean;
}) {
  try {
    const session = await requireAuth();
    if (session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

    const requests = await prisma.supportRequest.findMany({
      where: {
        ...(filters?.status && { status: filters.status }),
        ...(filters?.urgency && { urgency: filters.urgency }),
        ...(filters?.serviceCategory && { serviceCategories: { has: filters.serviceCategory } }),
        ...(filters?.unassignedOnly && { assignedCounsellorId: null, status: "SUBMITTED" }),
        ...(filters?.district && {
          student: { district: { contains: filters.district, mode: "insensitive" } },
        }),
      },
      include: {
        student: {
          include: {
            user: { select: { name: true } },
            institution: { select: { name: true, type: true } },
          },
        },
        assignedCounsellor: { include: { user: { select: { name: true } } } },
        _count: { select: { guidanceReports: true, followUps: true } },
      },
      orderBy: [
        { urgency: "desc" },
        { createdAt: "asc" },
      ],
    });

    return { success: true, data: requests };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── Admin: Assign counsellor ──────────────────────────────────────────────────

export async function assignCounsellorAction(requestId: string, counsellorProfileId: string) {
  try {
    const session = await requireAuth();
    if (session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

    // Mark any existing pending assignments as REASSIGNED
    await prisma.requestAssignment.updateMany({
      where: { requestId, status: { in: ["PENDING_ACCEPTANCE", "ACCEPTED"] } },
      data: { status: "REASSIGNED" },
    });

    // Create new assignment
    const assignment = await prisma.requestAssignment.create({
      data: {
        requestId,
        counsellorId: counsellorProfileId,
        assignedById: session.id,
        status: "PENDING_ACCEPTANCE",
      },
      include: { counsellor: { include: { user: true } } },
    });

    // Update request status + assignedCounsellorId
    await prisma.supportRequest.update({
      where: { id: requestId },
      data: {
        status: "COUNSELLOR_ASSIGNED",
        assignedCounsellorId: counsellorProfileId,
      },
    });

    // Notify counsellor
    await prisma.notification.create({
      data: {
        userId: assignment.counsellor.userId,
        type: "REQUEST_ASSIGNED" as any,
        channel: "IN_APP",
        title: "New Case Assigned",
        body: "You have been assigned a new student support case. Please review and accept or reject.",
        metadata: { requestId },
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.id,
        action: "COUNSELLOR_ASSIGNED",
        resourceType: "SupportRequest",
        resourceId: requestId,
        details: `Assigned counsellor ${assignment.counsellor.user.name} to request`,
      },
    });

    revalidatePath("/admin/cases");
    revalidatePath(`/admin/cases/${requestId}`);
    revalidatePath("/staff/cases");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── Admin: Escalate / update status ──────────────────────────────────────────

export async function updateRequestStatusAction(requestId: string, status: RequestStatus, reason?: string) {
  try {
    const session = await requireAuth();
    if (session.role !== "ADMIN" && session.role !== "COUNSELLOR") {
      return { success: false, error: "Unauthorized" };
    }

    const updated = await prisma.supportRequest.update({
      where: { id: requestId },
      data: {
        status,
        ...(status === "RESOLVED" && { resolvedAt: new Date() }),
      },
      include: { student: { include: { user: true } } },
    });

    // Notify student
    await prisma.notification.create({
      data: {
        userId: updated.student.userId,
        type: status === "RESOLVED" ? ("CASE_RESOLVED" as any) : ("CASE_ESCALATED" as any),
        channel: "IN_APP",
        title: status === "RESOLVED" ? "Your request has been resolved" : "Your request has been escalated",
        body: reason ?? `Your support request status has been updated to ${status.replace(/_/g, " ")}`,
        metadata: { requestId },
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.id,
        action: `REQUEST_STATUS_${status}`,
        resourceType: "SupportRequest",
        resourceId: requestId,
        details: reason,
      },
    });

    revalidatePath("/admin/cases");
    revalidatePath(`/admin/cases/${requestId}`);
    revalidatePath("/staff/cases");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── Counsellor: Get assigned cases ───────────────────────────────────────────

export async function getMyCasesAction() {
  try {
    const session = await requireAuth();
    if (session.role !== "COUNSELLOR" && session.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    const counsellorProfile = await prisma.counsellorProfile.findUnique({
      where: { userId: session.id },
    });
    if (!counsellorProfile) return { success: false, error: "Counsellor profile not found" };

    const cases = await prisma.supportRequest.findMany({
      where: { assignedCounsellorId: counsellorProfile.id },
      include: {
        student: {
          include: {
            user: { select: { name: true } },
            institution: { select: { name: true, type: true } },
          },
        },
        assignments: {
          where: { counsellorId: counsellorProfile.id, status: "PENDING_ACCEPTANCE" },
          take: 1,
        },
        _count: { select: { guidanceReports: true, followUps: true } },
      },
      orderBy: [{ urgency: "desc" }, { createdAt: "asc" }],
    });

    return { success: true, data: cases };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── Counsellor: Accept / Reject assignment ────────────────────────────────────

export async function respondToAssignmentAction(
  assignmentId: string,
  response: "ACCEPTED" | "REJECTED",
  rejectionReason?: string
) {
  try {
    const session = await requireAuth();
    const counsellorProfile = await prisma.counsellorProfile.findUnique({
      where: { userId: session.id },
    });
    if (!counsellorProfile) return { success: false, error: "Counsellor profile not found" };

    const assignment = await prisma.requestAssignment.findUnique({
      where: { id: assignmentId },
      include: { request: { include: { student: { include: { user: true } } } } },
    });
    if (!assignment) return { success: false, error: "Assignment not found" };
    if (assignment.counsellorId !== counsellorProfile.id) return { success: false, error: "Unauthorized" };

    await prisma.requestAssignment.update({
      where: { id: assignmentId },
      data: { status: response, rejectionReason, respondedAt: new Date() },
    });

    if (response === "ACCEPTED") {
      await prisma.supportRequest.update({
        where: { id: assignment.requestId },
        data: { status: "IN_PROGRESS" },
      });
    } else {
      // Return to admin pool
      await prisma.supportRequest.update({
        where: { id: assignment.requestId },
        data: { status: "UNDER_REVIEW", assignedCounsellorId: null },
      });

      // Notify admins of rejection
      const admins = await prisma.user.findMany({ where: { role: "ADMIN", isActive: true } });
      await prisma.notification.createMany({
        data: admins.map((admin) => ({
          userId: admin.id,
          type: "ASSIGNMENT_REJECTED" as any,
          channel: "IN_APP",
          title: "Counsellor rejected assignment",
          body: `Reassignment needed for ${assignment.request.student.firstName}'s ${assignment.request.serviceCategories[0].replace(/_/g, " ")} request`,
          metadata: { requestId: assignment.requestId },
        })),
      });
    }

    revalidatePath("/staff/cases");
    revalidatePath(`/staff/cases/${assignment.requestId}`);
    revalidatePath("/admin/cases");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── Admin: Get counsellors for assignment (filtered by specialization) ────────

export async function getCounsellorsForAssignmentAction(serviceCategories: ServiceCategory[]) {
  try {
    const session = await requireAuth();
    if (session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

    const counsellors = await prisma.counsellorProfile.findMany({
      where: {
        isVerified: true,
        acceptingPatients: true,
        deletedAt: null,
        user: { isActive: true },
      },
      include: {
        user: { select: { name: true, email: true } },
        _count: {
          select: {
            assignedRequests: {
              where: { status: { notIn: ["RESOLVED", "ESCALATED"] } },
            },
          },
        },
      },
      orderBy: { yearsOfExperience: "desc" },
    });

    // Sort: specialization match first, then by active case count (ascending)
    const sorted = counsellors.sort((a, b) => {
      const aMatch = serviceCategories.some(
        (cat) => a.serviceCategories.includes(cat) || a.specializations.some((s) => s.includes(cat))
      );
      const bMatch = serviceCategories.some(
        (cat) => b.serviceCategories.includes(cat) || b.specializations.some((s) => s.includes(cat))
      );
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return a._count.assignedRequests - b._count.assignedRequests;
    });

    return { success: true, data: sorted };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
