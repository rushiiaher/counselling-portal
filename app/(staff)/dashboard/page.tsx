import React from "react";
import PageContainer from "@/components/shared/PageContainer";
import { requireAuth } from "@/lib/auth/session";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Link from "next/link";
import { format } from "date-fns";

import prisma from "@/lib/prisma";

export default async function StaffDashboardPage() {
  const session = await requireAuth();

  const counsellorProfile = await prisma.counsellorProfile.findUnique({
    where: { userId: session.id },
    include: {
      assignedPatients: {
        include: { patient: true }
      }
    }
  });

  if (!counsellorProfile) return <div>No profile found.</div>;

  const assigned = counsellorProfile.assignedPatients;

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Counsellor Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your active patients and operational queues.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <DashboardCard title="Active Patients">
          <div className="text-3xl font-bold text-slate-900">{assigned.length}</div>
        </DashboardCard>
        <DashboardCard title="Follow-ups Due">
          <div className="text-3xl font-bold text-rose-600">0</div>
        </DashboardCard>
        <DashboardCard title="Unread Notifications">
          <div className="text-3xl font-bold text-blue-600">0</div>
        </DashboardCard>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <DashboardCard title="Assigned Patients Workspace">
          {assigned.length === 0 ? (
            <p className="text-slate-500 text-sm">No patients assigned yet.</p>
          ) : (
            <div className="space-y-3">
              {assigned.map(a => (
                <Link key={a.id} href={`/staff/patients/${a.patient.id}`} className="block p-4 border border-slate-100 rounded-lg bg-slate-50 hover:bg-slate-100 transition shadow-sm hover:shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-slate-800">{a.patient.firstName} {a.patient.lastName}</h4>
                      <p className="text-xs text-slate-500 mt-1">Assigned: {format(new Date(a.assignedAt), "MMM d, yyyy")}</p>
                    </div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Workspace &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </DashboardCard>

        <DashboardCard title="Operational Queues">
          <div className="space-y-4">
             <Link href="/staff/crisis-queue" className="block p-5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 transition shadow-sm hover:shadow">
                <h4 className="font-bold text-rose-800 text-sm">Crisis Triage Queue</h4>
                <p className="text-xs text-rose-600 mt-1">Review escalated anonymous cases requiring immediate attention.</p>
             </Link>
             <Link href="/staff/follow-ups" className="block p-5 rounded-lg border border-yellow-200 bg-yellow-50 hover:bg-yellow-100 transition shadow-sm hover:shadow">
                <h4 className="font-bold text-yellow-800 text-sm">Follow-up Pending</h4>
                <p className="text-xs text-yellow-700 mt-1">Review assigned patients needing routine check-ins.</p>
             </Link>
          </div>
        </DashboardCard>
      </div>
    </PageContainer>
  );
}
