"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";
import { submitSupportRequestAction } from "@/app/actions/support-request.actions";
import { Feedback } from "@/lib/feedback";
import { ArrowRight, ArrowLeft, CheckCircle2, Briefcase, BookOpen, HeartPulse, Users, Zap, Home, MessageCircle, AlertTriangle } from "lucide-react";

const SERVICES = [
  { id: "CAREER_COUNSELLING", label: "Career Counselling", desc: "Career paths, job guidance, professional development", icon: <Briefcase className="w-5 h-5" /> },
  { id: "EDUCATIONAL_GUIDANCE", label: "Educational Guidance", desc: "Academic support, subject help, learning challenges", icon: <BookOpen className="w-5 h-5" /> },
  { id: "MENTAL_WELLNESS", label: "Mental Wellness", desc: "Stress, anxiety, emotional well-being", icon: <HeartPulse className="w-5 h-5" /> },
  { id: "YOUTH_GUIDANCE", label: "Youth Guidance", desc: "Life skills, peer pressure, identity, relationships", icon: <Users className="w-5 h-5" /> },
  { id: "SKILL_DEVELOPMENT", label: "Skill Development", desc: "Vocational skills, personality, communication", icon: <Zap className="w-5 h-5" /> },
  { id: "FAMILY_COUNSELLING", label: "Family Counselling", desc: "Family conflicts, parent-child relations", icon: <Home className="w-5 h-5" /> },
  { id: "PERSONAL_COUNSELLING", label: "Personal Counselling", desc: "Personal issues, self-esteem, life challenges", icon: <MessageCircle className="w-5 h-5" /> },
  { id: "CRISIS_SUPPORT", label: "Crisis Support", desc: "Immediate help for serious distress or danger", icon: <AlertTriangle className="w-5 h-5" /> },
];

const URGENCY_OPTIONS = [
  { value: "LOW", label: "Not urgent", desc: "Happy to wait a few days" },
  { value: "MEDIUM", label: "Somewhat urgent", desc: "Would like help within a week" },
  { value: "HIGH", label: "Urgent", desc: "Need help soon, within 1-2 days" },
  { value: "CRITICAL", label: "Crisis — needs immediate help", desc: "I need help right now" },
];

export default function StudentServicesPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("MEDIUM");
  const [language, setLanguage] = useState("en");
  const [submitting, setSubmitting] = useState(false);

  const toggleService = (id: string) => setSelected((prev) =>
    prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
  );

  const handleSubmit = async () => {
    if (!description.trim()) return Feedback.error("Please describe your situation");
    setSubmitting(true);
    try {
      const res = await submitSupportRequestAction({
        serviceCategories: selected as any[],
        description,
        urgency: urgency as any,
        preferredLanguage: language,
      });
      if (res.success) {
        setStep(3);
      } else {
        Feedback.error(res.error ?? "Failed to submit request");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 3) {
    return (
      <PageContainer>
        <div className="max-w-lg mx-auto py-16 text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Request Submitted!</h1>
          <p className="text-slate-500">
            Your request has been received. Our team will review it and assign a counsellor.
            You'll be notified once a counsellor is assigned.
          </p>
          <div className="flex gap-3 justify-center pt-4">
            <button onClick={() => router.push("/student/requests")}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800">
              View My Requests
            </button>
            <button onClick={() => { setStep(1); setSelected([]); setDescription(""); setUrgency("MEDIUM"); }}
              className="border border-slate-200 text-slate-700 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50">
              Submit Another
            </button>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8 space-y-6">
        {/* Progress */}
        <div className="flex items-center gap-2 text-sm">
          {["Choose Service", "Describe Situation", "Review"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"}`}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span className={step === i + 1 ? "font-medium text-slate-800" : "text-slate-400"}>{label}</span>
              {i < 2 && <div className="w-8 h-0.5 bg-slate-200" />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">What kind of support do you need?</h1>
              <p className="text-slate-500 text-sm mt-1">Select one or more. All services are free and confidential.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {SERVICES.map((s) => (
                <button key={s.id} type="button" onClick={() => toggleService(s.id)}
                  className={`text-left p-4 rounded-xl border-2 transition ${selected.includes(s.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-100 bg-white hover:border-slate-300"}`}>
                  <div className="flex items-start gap-3">
                    <span className={`flex-shrink-0 mt-0.5 ${selected.includes(s.id) ? "text-white" : "text-slate-500"}`}>{s.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{s.label}</p>
                      <p className={`text-xs mt-0.5 ${selected.includes(s.id) ? "text-slate-300" : "text-slate-400"}`}>{s.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button onClick={() => setStep(2)} disabled={selected.length === 0}
                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-40">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Describe your situation</h1>
              <p className="text-slate-500 text-sm mt-1">This is private and will only be seen by assigned counsellors and admin.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                What would you like help with? *
              </label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="Share as much or as little as you're comfortable with..."
                rows={6}
                className="w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-slate-900 outline-none resize-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">How urgent is this?</label>
              <div className="space-y-2">
                {URGENCY_OPTIONS.map((u) => (
                  <label key={u.value}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition ${urgency === u.value ? "border-slate-900 bg-slate-50" : "border-slate-100 hover:border-slate-200"}`}>
                    <input type="radio" name="urgency" value={u.value} checked={urgency === u.value}
                      onChange={() => setUrgency(u.value)} className="sr-only" />
                    <div className={`w-3 h-3 rounded-full border-2 ${urgency === u.value ? "border-slate-900 bg-slate-900" : "border-slate-300"}`} />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{u.label}</p>
                      <p className="text-xs text-slate-400">{u.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Preferred language</label>
              <div className="flex gap-3">
                {[{ v: "en", l: "English" }, { v: "ur", l: "اردو (Urdu)" }].map(({ v, l }) => (
                  <button key={v} type="button" onClick={() => setLanguage(v)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition ${language === v ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-700 hover:border-slate-300"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)}
                className="flex items-center gap-2 border border-slate-200 text-slate-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={handleSubmit} disabled={submitting || !description.trim()}
                className="flex-1 bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-50">
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
