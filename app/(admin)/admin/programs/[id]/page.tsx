import { getProgramAction, updateProgramStatusAction } from "@/app/actions/program.actions";
import PageContainer from "@/components/shared/PageContainer";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin, Users } from "lucide-react";
import { notFound } from "next/navigation";
import ProgramStatusButton from "./ProgramStatusButton";

const TYPE_COLORS: Record<string, string> = {
  SEMINAR: "bg-blue-100 text-blue-700", WORKSHOP: "bg-green-100 text-green-700",
  WEBINAR: "bg-purple-100 text-purple-700", CAMP: "bg-orange-100 text-orange-700",
};
const STATUS_COLORS: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-600", SCHEDULED: "bg-blue-100 text-blue-700",
  ONGOING: "bg-green-100 text-green-700", COMPLETED: "bg-slate-100 text-slate-600",
  CANCELLED: "bg-red-100 text-red-700",
};

export default async function AdminProgramDetailPage({ params }: { params: { id: string } }) {
  const res = await getProgramAction(params.id);
  if (!res.success || !res.data) notFound();
  const p = res.data as any;

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8 space-y-6">
        <Link href="/admin/programs" className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm">
          <ArrowLeft className="w-4 h-4" /> Programs
        </Link>

        <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex gap-2">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${TYPE_COLORS[p.programType] ?? "bg-gray-100 text-gray-600"}`}>{p.programType}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[p.status] ?? "bg-gray-100 text-gray-600"}`}>{p.status}</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-800">{p.title}</h1>
              <p className="text-sm text-slate-500">{p.serviceCategory.replace(/_/g, " ")}</p>
            </div>
            <ProgramStatusButton programId={p.id} currentStatus={p.status} />
          </div>

          {p.description && <p className="text-sm text-slate-700 leading-relaxed">{p.description}</p>}

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-600">
                <CalendarDays className="w-4 h-4 text-slate-400" />
                {new Date(p.scheduledDate).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                {" · "}{new Date(p.scheduledDate).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </div>
              <p className="text-slate-500 text-xs ml-6">Duration: {p.durationMinutes} minutes</p>
              {p.venue && (
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400" /> {p.venue}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-600">
                <Users className="w-4 h-4 text-slate-400" />
                {p._count?.participants ?? 0} registered
                {p.maxParticipants ? ` / ${p.maxParticipants} max` : ""}
              </div>
              {p.targetDistrict && <p className="text-slate-500 text-xs">District: {p.targetDistrict}</p>}
              {p.registrationDeadline && (
                <p className="text-slate-500 text-xs">
                  Registration closes: {new Date(p.registrationDeadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </p>
              )}
              <p className="text-xs text-slate-400">{p.isPublic ? "Public program" : "Private (admin-managed)"}</p>
            </div>
          </div>
        </div>

        {p.institutions?.length > 0 && (
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-slate-800 mb-3">Target Institutions</h2>
            <div className="flex flex-wrap gap-2">
              {p.institutions.map((inst: any) => (
                <span key={inst.id} className="bg-slate-50 text-slate-700 text-xs px-3 py-1 rounded-lg">
                  {inst.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
