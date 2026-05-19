import React from "react";
import PageContainer from "@/components/shared/PageContainer";
import { verifyAdminAccess, getAggregateOperationalMetrics } from "@/services/admin.service";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { ShieldAlert, Users, Calendar, Activity, MessageSquare } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  await verifyAdminAccess(); // Enforce access

  const metrics = await getAggregateOperationalMetrics();

  return (
    <PageContainer>
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-800">Operational Governance</h1>
        <p className="text-slate-500 text-sm mt-2 font-medium">Privacy-safe aggregate metrics and system oversight.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Active Crises" className={metrics.unresolvedCrises > 0 ? "border-rose-300 bg-rose-50" : ""}>
          <div className="flex items-center justify-between">
            <div className={`text-4xl font-extrabold ${metrics.unresolvedCrises > 0 ? "text-rose-600" : "text-emerald-500"}`}>
              {metrics.unresolvedCrises}
            </div>
            <ShieldAlert className={`w-8 h-8 ${metrics.unresolvedCrises > 0 ? "text-rose-400" : "text-emerald-300"}`} />
          </div>
          {metrics.unresolvedCrises > 0 && (
            <Link href="/admin/crisis" className="text-xs font-bold text-rose-700 mt-4 inline-block hover:underline">
              Resolve immediately &rarr;
            </Link>
          )}
        </DashboardCard>
        
        <DashboardCard title="Counsellors Online">
          <div className="flex items-center justify-between">
            <div className="text-4xl font-extrabold text-slate-800">{metrics.activeCounsellors}</div>
            <Users className="w-8 h-8 text-blue-400" />
          </div>
          <Link href="/admin/staff" className="text-xs font-bold text-blue-600 mt-4 inline-block hover:underline">Manage Staff &rarr;</Link>
        </DashboardCard>

        <DashboardCard title="Appointments (30d)">
          <div className="flex items-center justify-between">
            <div className="text-4xl font-extrabold text-slate-800">{metrics.appointments30d}</div>
            <Calendar className="w-8 h-8 text-indigo-400" />
          </div>
          <p className="text-xs text-slate-500 mt-4 font-medium">System healthy</p>
        </DashboardCard>

        <DashboardCard title="Anon Chats (30d)">
          <div className="flex items-center justify-between">
            <div className="text-4xl font-extrabold text-slate-800">{metrics.anonymousChats30d}</div>
            <MessageSquare className="w-8 h-8 text-teal-400" />
          </div>
          <p className="text-xs text-slate-500 mt-4 font-medium">Public engagement</p>
        </DashboardCard>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 text-lg">System Oversight Links</h3>
          <div className="space-y-3">
             <Link href="/admin/audit" className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition">
               <span className="font-medium text-slate-700">Audit Log Explorer</span>
               <span className="text-xs font-bold text-slate-400 uppercase">Secure</span>
             </Link>
             <Link href="/admin/crisis" className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition">
               <span className="font-medium text-slate-700">Crisis Operations Console</span>
               <span className="text-xs font-bold text-rose-500 uppercase">Priority</span>
             </Link>
             <Link href="/admin/resources" className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition">
               <span className="font-medium text-slate-700">Resource Moderation</span>
               <span className="text-xs font-bold text-slate-400 uppercase">Content</span>
             </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
