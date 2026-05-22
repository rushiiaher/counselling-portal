import React from "react";
import PageContainer from "@/components/shared/PageContainer";
import { verifyAdminAccess } from "@/services/admin.service";
import { Users } from "lucide-react";
import prisma from "@/lib/prisma";
import AdminStaffTable from "@/components/admin/AdminStaffTable";

export default async function AdminCounsellorsPage() {
  await verifyAdminAccess();

  const counsellors = await prisma.counsellorProfile.findMany({
    include: {
      user: { select: { id: true, name: true, email: true, isActive: true } },
      _count: {
        select: {
          assignedRequests: { where: { status: { notIn: ["RESOLVED", "ESCALATED"] } } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const data = counsellors.map((c) => ({
    id: c.id,
    userId: c.user.id,
    name: c.user.name,
    email: c.user.email,
    isActive: c.user.isActive,
    isVerified: c.isVerified,
    assignedPatients: c._count.assignedRequests,
  }));

  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto py-8 space-y-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          <h1 className="text-2xl font-bold text-slate-800">Counsellors</h1>
          <span className="text-sm text-slate-400 ml-1">{data.length} registered</span>
        </div>
        <AdminStaffTable counsellors={data} />
      </div>
    </PageContainer>
  );
}
