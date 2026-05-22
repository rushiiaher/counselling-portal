import React from "react";
import PageContainer from "@/components/shared/PageContainer";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { requireAuth } from "@/lib/auth/session";
import { format } from "date-fns";
import prisma from "@/lib/prisma";
import ScheduleActions from "@/components/staff/ScheduleActions";

export default async function StaffSchedulePage() {
  const session = await requireAuth();

  const profile = await prisma.counsellorProfile.findUnique({ where: { userId: session.id } });

  if (!profile) return (
    <PageContainer>
      <div className="p-6 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg">
        No counsellor profile found. Contact administrator.
      </div>
    </PageContainer>
  );

  const upcoming = await prisma.appointment.findMany({
    where: { counsellorId: profile.id, startTime: { gte: new Date() }, status: { not: "CANCELLED" } },
    include: { student: { select: { name: true } } },
    orderBy: { startTime: "asc" }
  });

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">My Schedule</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your availability and upcoming sessions.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <DashboardCard title="Upcoming Sessions">
            {upcoming.length === 0 ? (
              <p className="text-slate-500 text-sm">No upcoming sessions scheduled.</p>
            ) : (
              <div className="space-y-4">
                {upcoming.map(app => (
                  <div key={app.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg bg-slate-50">
                    <div>
                      <h4 className="font-bold text-slate-800">{app.student.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {format(new Date(app.startTime), "MMM d, yyyy 'at' h:mm a")} · {app.mode}
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      app.status === "CONFIRMED" ? "bg-emerald-100 text-emerald-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </DashboardCard>
        </div>

        <div>
          <DashboardCard title="Quick Actions">
            <ScheduleActions />
          </DashboardCard>
        </div>
      </div>
    </PageContainer>
  );
}
