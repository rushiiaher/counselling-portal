import { getProgramsAction } from "@/app/actions/program.actions";
import PageContainer from "@/components/shared/PageContainer";
import Link from "next/link";
import { CalendarDays, Plus, Users, MapPin } from "lucide-react";

const TYPE_COLORS: Record<string, string> = {
  SEMINAR: "bg-blue-100 text-blue-700", WORKSHOP: "bg-green-100 text-green-700",
  WEBINAR: "bg-purple-100 text-purple-700", CAMP: "bg-orange-100 text-orange-700",
};
const STATUS_COLORS: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-600", SCHEDULED: "bg-blue-100 text-blue-700",
  ONGOING: "bg-green-100 text-green-700", COMPLETED: "bg-slate-100 text-slate-600",
  CANCELLED: "bg-red-100 text-red-700",
};

export default async function AdminProgramsPage() {
  const res = await getProgramsAction();
  const programs = res.data ?? [];

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Awareness Programs</h1>
          <Link href="/admin/programs/new"
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition text-sm font-medium">
            <Plus className="w-4 h-4" /> Create Program
          </Link>
        </div>

        {programs.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No programs yet. Create seminars, workshops, or webinars for students.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map((p) => (
              <Link key={p.id} href={`/admin/programs/${p.id}`}
                className="bg-white border border-slate-100 rounded-xl p-5 hover:shadow-md transition group">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${TYPE_COLORS[p.programType] ?? "bg-gray-100 text-gray-600"}`}>
                    {p.programType}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[p.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {p.status}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-slate-900">{p.title}</h3>
                <p className="text-xs text-slate-500 mb-3">{p.serviceCategory.replace(/_/g, " ")}</p>
                <div className="space-y-1 text-xs text-slate-500">
                  <p className="flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    {new Date(p.scheduledDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                  {p.targetDistrict && (
                    <p className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.targetDistrict}</p>
                  )}
                  <p className="flex items-center gap-1">
                    <Users className="w-3 h-3" />{(p as any)._count?.participants ?? 0} registered
                    {p.maxParticipants ? ` / ${p.maxParticipants}` : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
