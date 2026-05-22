"use server";

import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/session";
import { InstitutionType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getInstitutionsAction(filters?: {
  type?: InstitutionType;
  district?: string;
  isActive?: boolean;
}) {
  try {
    const institutions = await prisma.institution.findMany({
      where: {
        ...(filters?.type && { type: filters.type }),
        ...(filters?.district && { district: { contains: filters.district, mode: "insensitive" } }),
        isActive: filters?.isActive ?? true,
      },
      orderBy: [{ type: "asc" }, { name: "asc" }],
      include: {
        _count: { select: { students: true } },
      },
    });
    return { success: true, data: institutions };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getInstitutionAction(id: string) {
  try {
    const institution = await prisma.institution.findUnique({
      where: { id },
      include: {
        _count: { select: { students: true, supportReferrals: true, programs: true } },
      },
    });
    if (!institution) return { success: false, error: "Institution not found" };
    return { success: true, data: institution };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function createInstitutionAction(data: {
  name: string;
  type: InstitutionType;
  district: string;
  area?: string;
  address?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  principalName?: string;
}) {
  try {
    const session = await requireAuth();
    if (session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

    const institution = await prisma.institution.create({ data });

    await prisma.auditLog.create({
      data: {
        userId: session.id,
        action: "INSTITUTION_CREATED",
        resourceType: "Institution",
        resourceId: institution.id,
        details: `Created institution: ${institution.name}`,
      },
    });

    revalidatePath("/admin/institutions");
    return { success: true, data: institution };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateInstitutionAction(
  id: string,
  data: Partial<{
    name: string;
    type: InstitutionType;
    district: string;
    area: string;
    address: string;
    contactPerson: string;
    contactPhone: string;
    contactEmail: string;
    principalName: string;
    isActive: boolean;
  }>
) {
  try {
    const session = await requireAuth();
    if (session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

    const institution = await prisma.institution.update({ where: { id }, data });

    await prisma.auditLog.create({
      data: {
        userId: session.id,
        action: "INSTITUTION_UPDATED",
        resourceType: "Institution",
        resourceId: id,
        details: `Updated institution: ${institution.name}`,
      },
    });

    revalidatePath("/admin/institutions");
    revalidatePath(`/admin/institutions/${id}`);
    return { success: true, data: institution };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function toggleInstitutionActiveAction(id: string, isActive: boolean) {
  try {
    const session = await requireAuth();
    if (session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

    await prisma.institution.update({ where: { id }, data: { isActive } });
    revalidatePath("/admin/institutions");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
