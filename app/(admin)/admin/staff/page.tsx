import React from "react";
import PageContainer from "@/components/shared/PageContainer";
import { verifyAdminAccess } from "@/services/admin.service";
import { Users } from "lucide-react";
import prisma from "@/lib/prisma";
import AdminStaffTable from "@/components/admin/AdminStaffTable";

export default async function AdminStaffPage() {
  await verifyAdminAccess();

  const counsellors = await prisma.counsellorProfile.findMany({
    include: {
      user: { select: { id: true, name: true, email: true, isActive: true } },
      _count: { select: { assignedPatients: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  const data = counsellors.map(c => ({
    id: c.id,
    userId: c.user.id,
    name: c.user.name,
    email: c.user.email,
    isActive: c.user.isActive,
    isVerified: c.isVerified,
    assignedPatients: c._count.assignedPatients,
  }));

  return (
    <PageContainer>
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-800">Staff Management</h1>
        <p className="text-slate-500 text-sm mt-2 flex items-center gap-1.5 font-medium">
          <Users className="w-4 h-4 text-blue-500" /> Monitor workloads and verify credentials.
        </p>
      </div>
      <AdminStaffTable counsellors={data} />
    </PageContainer>
  );
}
