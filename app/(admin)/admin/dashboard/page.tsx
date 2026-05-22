import PageContainer from "@/components/shared/PageContainer";
import { requireAuth } from "@/lib/auth/session";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { AlertTriangle, Clock, Users, Building2, CalendarDays, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";

const URGENCY_ORDER: Record<string, number> = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };

export default async function AdminDashboardPage() {
  await requireAuth();

  const [
    totalActive, totalUnassigned, totalEscalated,
    unassignedRequests, escalatedRequests,
    counsellors, upcomingPrograms, requestsByCategory,
  ] = await Promise.all([
    prisma.supportRequest.count({ where: { status: { notIn: ["RESOLVED", "ESCALATED"] } } }),
    prisma.supportRequest.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW"] } } }),
    prisma.supportRequest.count({ where: { status: "ESCALATED" } }),
    prisma.supportRequest.findMany({
      where: { status: { in: ["SUBMITTED", "UNDER_REVIEW"] } },
      include: {
        student: {
          include: {
            user: { select: { name: true } },
            institution: { select: { name: true } },
          },
        },
      },
      orderBy: [{ urgency: "desc" }, { createdAt: "asc" }],
      take: 8,
    }),
    prisma.supportRequest.findMany({
      where: { status: "ESCALATED" },
      include: {
        student: { include: { user: { select: { name: true } } } },
        assignedCounsellor: { include: { user: { select: { name: true } } } },
      },
      take: 5,
    }),
    prisma.counsellorProfile.findMany({
      where: { isVerified: true, deletedAt: null, user: { isActive: true } },
      include: {
        user: { select: { name: true } },
        _count: {
          select: { assignedRequests: { where: { status: { notIn: ["RESOLVED", "ESCALATED"] } } } },
        },
      },
      orderBy: { createdAt: "asc" },
    }),
    prisma.awarenessProgram.findMany({
      where: { scheduledDate: { gte: new Date() }, status: { in: ["SCHEDULED", "ONGOING"] } },
      orderBy: { scheduledDate: "asc" },
      take: 3,
    }),
    prisma.supportRequest.groupBy({
      by: ["serviceCategories"],
      where: { status: { notIn: ["RESOLVED"] } },
      _count: true,
    }),
  ]);

  const statCards = [
    { label: "Active Cases", value: totalActive, color: "bg-blue-50 text-blue-700", href: "/admin/cases" },
    { label: "Pending Assignment", value: totalUnassigned, color: totalUnassigned > 0 ? "bg-yellow-50 text-yellow-700" : "bg-slate-50 text-slate-600", href: "/admin/cases" },
    { label: "Escalated", value: totalEscalated, color: totalEscalated > 0 ? "bg-red-50 text-red-700" : "bg-slate-50 text-slate-600", href: "/admin/cases" },
    { label: "Counsellors", value: counsellors.length, color: "bg-green-50 text-green-700", href: "/admin/counsellors" },
  ];

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto py-8 space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">Operations Dashboard</h1>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map(({ label, value, color, href }) => (
            <Link key={label} href={href} className={`rounded-xl p-4 ${color} hover:opacity-90 transition`}>
              <p className="text-3xl font-bold">{value}</p>
              <p className="text-sm font-medium opacity-80 mt-0.5">{label}</p>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Unassigned requests */}
          <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-500" /> Pending Assignment
              </h2>
              <Link href="/admin/cases" className="text-xs text-slate-400 hover:text-slate-600">View all</Link>
            </div>
            {unassignedRequests.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-sm">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-2 opacity-40" />
                All requests assigned
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {unassignedRequests.map((r) => (
                  <Link key={r.id} href={`/admin/cases/${r.id}`}
                    className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition group">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{r.student?.user?.name}</p>
                      <p className="text-xs text-slate-400">
                        {(r as any).student?.institution?.name ?? "—"} · {r.serviceCategories[0]?.replace(/_/g, " ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${r.urgency === "CRITICAL" ? "text-red-600" : r.urgency === "HIGH" ? "text-orange-500" : "text-slate-400"}`}>
                        {r.urgency}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-slate-600" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Counsellor workload */}
          <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" /> Counsellor Workload
              </h2>
              <Link href="/admin/counsellors" className="text-xs text-slate-400 hover:text-slate-600">Manage</Link>
            </div>
            {counsellors.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-sm">No verified counsellors</div>
            ) : (
              <div className="divide-y divide-slate-50">
                {counsellors.map((c) => {
                  const cases = c._count.assignedRequests;
                  const barW = Math.min(100, (cases / 15) * 100);
                  return (
                    <div key={c.id} className="px-5 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-slate-800">{c.user?.name}</p>
                        <span className={`text-xs font-medium ${cases >= 12 ? "text-red-600" : cases >= 8 ? "text-orange-500" : "text-slate-500"}`}>
                          {cases} cases
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${cases >= 12 ? "bg-red-400" : cases >= 8 ? "bg-orange-400" : "bg-green-400"}`}
                          style={{ width: `${barW}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Escalated + Programs row */}
        <div className="grid md:grid-cols-2 gap-6">
          {escalatedRequests.length > 0 && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-5">
              <h2 className="font-semibold text-red-800 flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4" /> Escalated Cases
              </h2>
              <div className="space-y-2">
                {escalatedRequests.map((r) => (
                  <Link key={r.id} href={`/admin/cases/${r.id}`}
                    className="flex items-center justify-between bg-white rounded-lg px-3 py-2 hover:shadow-sm transition text-sm">
                    <p className="font-medium text-slate-800">{r.student?.user?.name}</p>
                    <span className="text-xs text-slate-400">{r.serviceCategories[0]?.replace(/_/g, " ")}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-purple-500" /> Upcoming Programs
              </h2>
              <Link href="/admin/programs" className="text-xs text-slate-400 hover:text-slate-600">View all</Link>
            </div>
            {upcomingPrograms.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-sm">No upcoming programs</div>
            ) : (
              <div className="divide-y divide-slate-50">
                {upcomingPrograms.map((p) => (
                  <Link key={p.id} href={`/admin/programs/${p.id}`}
                    className="px-5 py-3 hover:bg-slate-50 transition block">
                    <p className="text-sm font-medium text-slate-800">{p.title}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(p.scheduledDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · {p.programType}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Institutions", href: "/admin/institutions", icon: Building2 },
            { label: "Students", href: "/admin/students", icon: Users },
            { label: "Resources", href: "/admin/resources", icon: TrendingUp },
            { label: "Audit Logs", href: "/admin/audit", icon: CheckCircle2 },
          ].map(({ label, href, icon: Icon }) => (
            <Link key={label} href={href}
              className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl p-4 text-sm font-medium text-slate-700 hover:shadow-sm transition">
              <Icon className="w-4 h-4 text-slate-400" /> {label}
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
