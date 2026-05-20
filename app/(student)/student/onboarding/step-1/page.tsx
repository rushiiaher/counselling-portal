"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentOnboardingSchema, StudentOnboardingInput } from "@/lib/validations/profile.schema";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";
import { saveStudentOnboardingAction } from "@/app/actions/profile.actions";
import { Feedback } from "@/lib/feedback";
import { useSession } from "next-auth/react";

export default function OnboardingStep1() {
  const router = useRouter();
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<StudentOnboardingInput>({
    resolver: zodResolver(studentOnboardingSchema),
    defaultValues: { preferredLanguage: "en" }
  });

  const onSubmit = async (data: StudentOnboardingInput) => {
    setIsLoading(true);
    try {
      const res = await saveStudentOnboardingAction(data);
      if (res.success) {
        Feedback.success("Profile demographics saved.");
        router.push("/student/onboarding/step-consent");
      } else {
        Feedback.error(res.error || "Failed to save profile.");
      }
    } catch (err) {
      Feedback.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer className="flex items-center justify-center min-h-[80vh]">
      <div className="max-w-md w-full p-8 bg-white border border-slate-100 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome to Peace Portal</h1>
        <p className="text-slate-500 mb-6 text-sm">Please answer three quick questions to help us personalize your experience.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">First Name (or preferred name)</label>
            <input 
              {...register("firstName")}
              type="text"
              placeholder="e.g. Ayesha"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-slate-900 outline-none"
              disabled={isLoading}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Age Range</label>
            <select 
              {...register("ageRange")}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-slate-900 outline-none"
              disabled={isLoading}
            >
              <option value="">Select your age range</option>
              <option value="13-17">13 - 17</option>
              <option value="18-24">18 - 24</option>
              <option value="25+">25+</option>
            </select>
            {errors.ageRange && <p className="text-red-500 text-xs mt-1">{errors.ageRange.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Language</label>
            <select 
              {...register("preferredLanguage")}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-slate-900 outline-none"
              disabled={isLoading}
            >
              <option value="en">English</option>
              <option value="ur">اردو</option>
            </select>
            {errors.preferredLanguage && <p className="text-red-500 text-xs mt-1">{errors.preferredLanguage.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-slate-900 text-white py-2.5 rounded shadow hover:bg-slate-800 transition disabled:opacity-70 mt-2"
          >
            {isLoading ? "Saving..." : "Continue to Dashboard"}
          </button>
        </form>
      </div>
    </PageContainer>
  );
}
