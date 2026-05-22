"use client";

import { useEffect, useState } from "react";
import PageContainer from "@/components/shared/PageContainer";
import { getProgramsAction, registerForProgramAction } from "@/app/actions/program.actions";
import { Feedback } from "@/lib/feedback";
import { CalendarDays, MapPin, Users, CheckCircle2 } from "lucide-react";

const TYPE_COLORS: Record<string, string> = {
  SEMINAR: "bg-blue-100 text-blue-700",
  WORKSHOP: "bg-green-100 text-green-700",
  WEBINAR: "bg-purple-100 text-purple-700",
  CAMP: "bg-orange-100 text-orange-700",
};

export default function StudentProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState<string | null>(null);
  const [registered, setRegistered] = useState<Set<string>>(new Set());

  useEffect(() => {
    getProgramsAction().then((r) => {
      const pub = (r.data ?? []).filter((p: any) =>
        p.isPublic && ["SCHEDULED", "ONGOING"].includes(p.status)
      );
      setPrograms(pub);
      setLoading(false);
    });
  }, []);

  const handleRegister = async (programId: string) => {
    setRegistering(programId);
    const res = await registerForProgramAction(programId);
    if (res.success) {
      Feedback.success("Registered!");
      setRegistered((prev) => new Set([...prev, programId]));
    } else {
      Feedback.error(res.error ?? "Failed to register");
    }
    setRegistering(null);
  };

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Awareness Programs</h1>
          <p className="text-slate-500 text-sm mt-0.5">Seminars, workshops, and webinars open for registration</p>
        </div>

        {loading ? (
          <div className="text-slate-400 text-sm py-8">Loading...</div>
        ) : programs.length === 0 ? (
          <div className="text-center py-16 space-y-2">
            <CalendarDays className="w-12 h-12 text-slate-200 mx-auto" />
            <p className="text-slate-500">No upcoming programs right now. Check back soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {programs.map((p) => {
              const isRegistered = registered.has(p.id) || p.isRegistered;
              const isFull = p.maxParticipants && (p._count?.participants ?? 0) >= p.maxParticipants;
              const pastDeadline = p.registrationDeadline && new Date(p.registrationDeadline) < new Date();

              return (
                <div key={p.id} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${TYPE_COLORS[p.programType] ?? "bg-gray-100 text-gray-600"}`}>
                      {p.programType}
                    </span>
                    {isRegistered && (
                      <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Registered
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">{p.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{p.serviceCategory.replace(/_/g, " ")}</p>
                  </div>

                  {p.description && (
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{p.description}</p>
                  )}

                  <div className="space-y-1 text-xs text-slate-500">
                    <p className="flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {new Date(p.scheduledDate).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                      {" · "}
                      {new Date(p.scheduledDate).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    {p.venue && (
                      <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{p.venue}</p>
                    )}
                    <p className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {p._count?.participants ?? 0} registered
                      {p.maxParticipants ? ` / ${p.maxParticipants} seats` : ""}
                    </p>
                    {p.registrationDeadline && (
                      <p className={`${pastDeadline ? "text-red-400" : "text-slate-400"}`}>
                        Registration closes {new Date(p.registrationDeadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </p>
                    )}
                  </div>

                  {!isRegistered && (
                    <button
                      disabled={!!registering || !!isFull || !!pastDeadline}
                      onClick={() => handleRegister(p.id)}
                      className="mt-auto w-full bg-slate-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-40 transition">
                      {registering === p.id ? "Registering..." : isFull ? "Full" : pastDeadline ? "Closed" : "Register"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
