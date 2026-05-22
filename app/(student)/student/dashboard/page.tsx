import { requireAuth } from "@/lib/auth/session";
import PageContainer from "@/components/shared/PageContainer";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { HeartHandshake, ClipboardList, CalendarDays, ArrowRight, CheckCircle2, Clock } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  SUBMITTED: "bg-yellow-100 text-yellow-700",
  UNDER_REVIEW: "bg-orange-100 text-orange-700",
  COUNSELLOR_ASSIGNED: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-purple-100 text-purple-700",
  FOLLOW_UP_REQUIRED: "bg-amber-100 text-amber-700",
  RESOLVED: "bg-green-100 text-green-700",
  ESCALATED: "bg-red-100 text-red-700",
};

export default async function StudentDashboardPage() {
  const session = await requireAuth();

  const profile = await prisma.studentProfile.findUnique({
    where: { userId: session.id },
    include: {
      user: { select: { name: true } },
      institution: { select: { name: true } },
    },
  });

  if (!profile) {
    return (
      <PageContainer>
        <div className="max-w-lg mx-auto py-16 text-center space-y-4">
          <p className="text-slate-500">Complete your profile to get started.</p>
          <Link href="/student/onboarding/step-1"
            className="inline-block bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800">
            Set Up Profile
          </Link>
        </div>
      </PageContainer>
    );
  }

  const [activeRequests, recentResolved, upcomingPrograms, unreadCount] = await Promise.all([
    prisma.supportRequest.findMany({
      where: { studentId: profile.id, status: { notIn: ["RESOLVED", "ESCALATED"] } },
      include: {
        assignedCounsellor: { include: { user: { select: { name: true } } } },
      },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.supportRequest.count({
      where: { studentId: profile.id, status: "RESOLVED" },
    }),
    prisma.awarenessProgram.findMany({
      where: {
        isPublic: true,
        status: { in: ["SCHEDULED", "ONGOING"] },
        scheduledDate: { gte: new Date() },
      },
      orderBy: { scheduledDate: "asc" },
      take: 3,
    }),
    prisma.notification.count({
      where: { userId: session.id, isRead: false },
    }),
  ]);

  const firstName = profile.user?.name?.split(" ")[0] ?? "Student";

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8 space-y-6">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Hello, {firstName}</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {profile.institution?.name ?? profile.district ?? "Your support hub"}
            {unreadCount > 0 && (
              <> · <Link href="/student/notifications" className="text-blue-600 hover:underline">{unreadCount} new notification{unreadCount > 1 ? "s" : ""}</Link></>
            )}
          </p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: HeartHandshake, label: "Request Support", href: "/student/services", color: "bg-blue-50 text-blue-700 border-blue-100" },
            { icon: ClipboardList, label: "My Requests", href: "/student/requests", color: "bg-slate-50 text-slate-700 border-slate-100" },
            { icon: CalendarDays, label: "Programs", href: "/student/programs", color: "bg-purple-50 text-purple-700 border-purple-100" },
          ].map(({ icon: Icon, label, href, color }) => (
            <Link key={href} href={href}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center hover:shadow-sm transition ${color}`}>
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium leading-tight">{label}</span>
            </Link>
          ))}
        </div>

        {/* Active cases */}
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-500" /> Active Requests
            </h2>
            <Link href="/student/requests" className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {activeRequests.length === 0 ? (
            <div className="py-10 text-center space-y-2">
              <CheckCircle2 className="w-7 h-7 text-slate-200 mx-auto" />
              <p className="text-slate-400 text-sm">No active requests</p>
              <Link href="/student/services"
                className="inline-block text-xs bg-slate-900 text-white px-4 py-1.5 rounded-lg hover:bg-slate-800">
                Request Support
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {activeRequests.map((r) => (
                <Link key={r.id} href={`/student/requests/${r.id}`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition group">
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex flex-wrap gap-1">
                      {r.serviceCategories.slice(0, 2).map((cat) => (
                        <span key={cat} className="text-xs text-slate-600">{cat.replace(/_/g, " ")}</span>
                      ))}
                    </div>
                    {r.assignedCounsellor ? (
                      <p className="text-xs text-slate-400">Counsellor: {r.assignedCounsellor.user?.name}</p>
                    ) : (
                      <p className="text-xs text-slate-400">Awaiting assignment</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${STATUS_COLORS[r.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {r.status.replace(/_/g, " ")}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Resolved count + programs */}
        <div className="grid md:grid-cols-2 gap-4">
          {recentResolved > 0 && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-green-800">{recentResolved} resolved</p>
                <p className="text-xs text-green-600">cases successfully closed</p>
              </div>
            </div>
          )}

          {upcomingPrograms.length > 0 && (
            <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
                <h2 className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 text-purple-500" /> Upcoming Programs
                </h2>
                <Link href="/student/programs" className="text-xs text-slate-400 hover:text-slate-600">Register</Link>
              </div>
              <div className="divide-y divide-slate-50">
                {upcomingPrograms.map((p) => (
                  <div key={p.id} className="px-4 py-2.5">
                    <p className="text-sm font-medium text-slate-800">{p.title}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(p.scheduledDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      {" · "}{p.programType}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
