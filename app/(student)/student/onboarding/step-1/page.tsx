"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentOnboardingSchema, StudentOnboardingInput } from "@/lib/validations/profile.schema";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";
import { saveStudentOnboardingAction } from "@/app/actions/profile.actions";
import { getInstitutionsAction } from "@/app/actions/institution.actions";
import { Feedback } from "@/lib/feedback";

export default function OnboardingStep1() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [institutions, setInstitutions] = useState<any[]>([]);

  useEffect(() => {
    getInstitutionsAction().then((r) => { if (r.success) setInstitutions(r.data ?? []); });
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<StudentOnboardingInput>({
    resolver: zodResolver(studentOnboardingSchema),
    defaultValues: { preferredLanguage: "en" },
  });

  const onSubmit = async (data: StudentOnboardingInput) => {
    setIsLoading(true);
    try {
      const res = await saveStudentOnboardingAction(data);
      if (res.success) {
        Feedback.success("Profile saved.");
        router.push("/student/onboarding/step-consent");
      } else {
        Feedback.error(res.error || "Failed to save profile.");
      }
    } catch {
      Feedback.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer className="flex items-center justify-center min-h-[80vh]">
      <div className="max-w-lg w-full p-8 bg-white border border-slate-100 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Welcome</h1>
        <p className="text-slate-500 mb-6 text-sm">Tell us a little about yourself to get started.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
              <input {...register("firstName")} type="text" placeholder="e.g. Ayesha" disabled={isLoading}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-sm" />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Age Range *</label>
              <select {...register("ageRange")} disabled={isLoading}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-sm">
                <option value="">Select...</option>
                <option value="13-17">13 – 17</option>
                <option value="18-24">18 – 24</option>
                <option value="25+">25+</option>
              </select>
              {errors.ageRange && <p className="text-red-500 text-xs mt-1">{errors.ageRange.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
              <select {...register("gender")} disabled={isLoading}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-sm">
                <option value="">Prefer not to say</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="NON_BINARY">Non-binary</option>
                <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Grade / Class</label>
              <input {...register("grade")} type="text" placeholder="e.g. 10th, BA-1" disabled={isLoading}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Institution / School / College</label>
            <select {...register("institutionId")} disabled={isLoading}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-sm">
              <option value="">Select institution (optional)</option>
              {institutions.map((inst) => (
                <option key={inst.id} value={inst.id}>{inst.name} ({inst.type})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">District</label>
              <input {...register("district")} type="text" placeholder="e.g. Lahore" disabled={isLoading}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mobile (optional)</label>
              <input {...register("mobile")} type="tel" placeholder="03xx-xxxxxxx" disabled={isLoading}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Language</label>
            <div className="flex gap-3">
              {[{ v: "en", l: "English" }, { v: "ur", l: "اردو (Urdu)" }].map(({ v, l }) => (
                <label key={v} className="flex items-center gap-2 cursor-pointer">
                  <input {...register("preferredLanguage")} type="radio" value={v} className="accent-slate-900" />
                  <span className="text-sm text-slate-700">{l}</span>
                </label>
              ))}
            </div>
            {errors.preferredLanguage && <p className="text-red-500 text-xs mt-1">{errors.preferredLanguage.message}</p>}
          </div>

          <button type="submit" disabled={isLoading}
            className="w-full bg-slate-900 text-white py-2.5 rounded-lg shadow hover:bg-slate-800 transition disabled:opacity-70 mt-2 text-sm font-medium">
            {isLoading ? "Saving..." : "Continue"}
          </button>
        </form>
      </div>
    </PageContainer>
  );
}
