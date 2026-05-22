"use server";

import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/session";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function createCounsellorAction(data: {
  name: string;
  email: string;
  password: string;
  bio?: string;
  languages: string[];
  serviceCategories: string[];
  yearsOfExperience?: number;
  designation?: string;
}) {
  try {
    const session = await requireAuth();
    if (session.role !== "ADMIN") return { success: false, error: "Admins only" };

    const email = data.email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (existing) return { success: false, error: "Email already registered" };

    const hashed = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name: data.name.trim(),
        password: hashed,
        role: "COUNSELLOR",
        isActive: true,
        profileCompleted: true,
      },
    });

    await prisma.counsellorProfile.create({
      data: {
        userId: user.id,
        bio: data.bio ?? null,
        languages: data.languages,
        serviceCategories: data.serviceCategories as any[],
        yearsOfExperience: data.yearsOfExperience ?? null,
        isVerified: false,
        acceptingPatients: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.id,
        action: "COUNSELLOR_CREATED",
        resourceType: "User",
        resourceId: user.id,
        details: `Created counsellor account: ${email}`,
      },
    });

    revalidatePath("/admin/counsellors");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateCounsellorProfileAction(
  counsellorProfileId: string,
  data: {
    bio?: string;
    languages: string[];
    serviceCategories: string[];
    yearsOfExperience?: number;
    acceptingPatients: boolean;
    isVerified: boolean;
  }
) {
  try {
    const session = await requireAuth();
    if (session.role !== "ADMIN") return { success: false, error: "Admins only" };

    await prisma.counsellorProfile.update({
      where: { id: counsellorProfileId },
      data: {
        bio: data.bio ?? null,
        languages: data.languages,
        serviceCategories: data.serviceCategories as any[],
        yearsOfExperience: data.yearsOfExperience ?? null,
        acceptingPatients: data.acceptingPatients,
        isVerified: data.isVerified,
      },
    });

    revalidatePath("/admin/counsellors");
    revalidatePath(`/admin/counsellors/${counsellorProfileId}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getCounsellorDetailAction(counsellorProfileId: string) {
  try {
    await requireAuth();

    const c = await prisma.counsellorProfile.findUnique({
      where: { id: counsellorProfileId },
      include: {
        user: { select: { id: true, name: true, email: true, isActive: true, createdAt: true } },
        _count: {
          select: {
            assignedRequests: { where: { status: { notIn: ["RESOLVED", "ESCALATED"] } } },
            guidanceReports: true,
          },
        },
      },
    });

    if (!c) return { success: false, error: "Not found" };
    return { success: true, data: c };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
