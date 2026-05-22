import { requireAuth } from "@/lib/auth/session";
import PageContainer from "@/components/shared/PageContainer";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ClipboardList, Calendar, UserCheck, ArrowRight, AlertTriangle } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  COUNSELLOR_ASSIGNED: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-purple-100 text-purple-700",
  FOLLOW_UP_REQUIRED: "bg-amber-100 text-amber-700",
  ESCALATED: "bg-red-100 text-red-700",
};

export default async function StaffDashboardPage() {
  const session = await requireAuth();

  const profile = await prisma.counsellorProfile.findUnique({
    where: { userId: session.id },
    include: { user: { select: { name: true } } },
  });

  if (!profile) {
    return (
      <PageContainer>
        <div className="p-8 text-slate-500 text-sm">Counsellor profile not found. Contact admin.</div>
      </PageContainer>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekEnd = new Date(today);
  weekEnd.setDate(weekEnd.getDate() + 7);

  const [activeCases, pendingAssignments, overdueFollowUps, todayFollowUps, recentReports, unreadCount] = await Promise.all([
    prisma.supportRequest.findMany({
      where: {
        assignedCounsellorId: profile.id,
        status: { notIn: ["RESOLVED", "ESCALATED"] },
      },
      include: {
        student: {
          include: {
            user: { select: { name: true } },
            institution: { select: { name: true } },
          },
        },
      },
      orderBy: [{ urgency: "desc" }, { updatedAt: "desc" }],
      take: 6,
    }),
    prisma.requestAssignment.count({
      where: { counsellorId: profile.id, status: "PENDING_ACCEPTANCE" },
    }),
    prisma.supportFollowUp.count({
      where: {
        counsellorId: profile.id,
        status: "PENDING",
        scheduledDate: { lt: today },
      },
    }),
    prisma.supportFollowUp.findMany({
      where: {
        counsellorId: profile.id,
        status: "PENDING",
        scheduledDate: { gte: today, lt: weekEnd },
      },
      include: {
        request: {
          include: {
            student: { include: { user: { select: { name: true } } } },
          },
        },
      },
      orderBy: { scheduledDate: "asc" },
      take: 5,
    }),
    prisma.guidanceReport.count({
      where: { counsellorId: profile.id },
    }),
    prisma.notification.count({
      where: { userId: session.id, isRead: false },
    }),
  ]);

  const totalActive = activeCases.length;
  const firstName = profile.user?.name?.split(" ")[0] ?? "Counsellor";

  const statCards = [
    { label: "Active Cases", value: totalActive, color: "bg-blue-50 text-blue-700", href: "/staff/cases" },
    { label: "Pending Accept", value: pendingAssignments, color: pendingAssignments > 0 ? "bg-yellow-50 text-yellow-700" : "bg-slate-50 text-slate-600", href: "/staff/cases" },
    { label: "Overdue Follow-ups", value: overdueFollowUps, color: overdueFollowUps > 0 ? "bg-red-50 text-red-700" : "bg-slate-50 text-slate-600", href: "/staff/follow-ups" },
    { label: "Total Reports", value: recentReports, color: "bg-green-50 text-green-700", href: "/staff/reports" },
  ];

  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Good day, {firstName}</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {unreadCount > 0 && (
              <Link href="/staff/notifications" className="text-blue-600 hover:underline">{unreadCount} new notification{unreadCount > 1 ? "s" : ""}</Link>
            )}
            {unreadCount === 0 && "Your caseload overview"}
          </p>
        </div>

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
          {/* Active cases */}
          <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-blue-500" /> Active Cases
              </h2>
              <Link href="/staff/cases" className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">
                All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {activeCases.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-sm">No active cases</div>
            ) : (
              <div className="divide-y divide-slate-50">
                {activeCases.map((c) => (
                  <Link key={c.id} href={`/staff/cases/${c.id}`}
                    className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition group">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{c.student?.user?.name}</p>
                      <p className="text-xs text-slate-400">
                        {c.serviceCategories[0]?.replace(/_/g, " ") ?? "—"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${STATUS_COLORS[c.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {c.status.replace(/_/g, " ")}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-slate-600" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Follow-ups this week */}
          <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500" /> Follow-ups This Week
              </h2>
              <Link href="/staff/follow-ups" className="text-xs text-slate-400 hover:text-slate-600">View all</Link>
            </div>
            {overdueFollowUps > 0 && (
              <div className="flex items-center gap-2 px-5 py-2 bg-red-50 border-b border-red-100 text-red-700 text-xs">
                <AlertTriangle className="w-3.5 h-3.5" />
                {overdueFollowUps} overdue — <Link href="/staff/follow-ups" className="underline">review now</Link>
              </div>
            )}
            {todayFollowUps.length === 0 && overdueFollowUps === 0 ? (
              <div className="py-8 text-center text-slate-400 text-sm">No follow-ups this week</div>
            ) : (
              <div className="divide-y divide-slate-50">
                {todayFollowUps.map((f) => (
                  <div key={f.id} className="px-5 py-3">
                    <p className="text-sm font-medium text-slate-800">{f.request?.student?.user?.name}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(f.scheduledDate).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: "Add Report", href: "/staff/cases", icon: ClipboardList },
            { label: "Follow-ups", href: "/staff/follow-ups", icon: Calendar },
            { label: "Referrals", href: "/staff/referrals", icon: UserCheck },
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
