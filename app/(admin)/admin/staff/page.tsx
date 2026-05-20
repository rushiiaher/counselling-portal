import React from "react";
import PageContainer from "@/components/shared/PageContainer";
import { verifyAdminAccess } from "@/services/admin.service";
import { Users, CheckCircle, XCircle } from "lucide-react";

import prisma from "@/lib/prisma";

export default async function AdminStaffPage() {
  await verifyAdminAccess();

  const counsellors = await prisma.counsellorProfile.findMany({
    include: {
      user: { select: { name: true, email: true, isActive: true } },
      _count: { select: { assignedPatients: true, anonymousSessions: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <PageContainer>
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-800">Staff Management</h1>
        <p className="text-slate-500 text-sm mt-2 flex items-center gap-1.5 font-medium">
          <Users className="w-4 h-4 text-blue-500" /> Monitor workloads and verify credentials.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Counsellor</th>
              <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Status</th>
              <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Verified</th>
              <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Assigned Workload</th>
              <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {counsellors.map(c => (
              <tr key={c.id} className="hover:bg-slate-50 transition">
                <td className="p-5">
                  <div className="font-bold text-slate-800">{c.user.name}</div>
                  <div className="text-xs text-slate-500 font-mono mt-1">{c.user.email}</div>
                </td>
                <td className="p-5">
                  {c.user.isActive ? (
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md shadow-sm">Active</span>
                  ) : (
                    <span className="text-xs font-bold bg-slate-200 text-slate-600 px-2.5 py-1 rounded-md shadow-sm">Deactivated</span>
                  )}
                </td>
                <td className="p-5">
                  {c.isVerified ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  )}
                </td>
                <td className="p-5 text-sm font-medium text-slate-700">
                  <span className="bg-slate-100 px-3 py-1 rounded font-bold text-slate-800">{c._count.assignedPatients}</span> active patients
                </td>
                <td className="p-5">
                  <button className="text-xs font-bold text-blue-600 hover:underline mr-5 transition">Edit Scope</button>
                  <button className="text-xs font-bold text-rose-600 hover:underline transition">Revoke Access</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}
