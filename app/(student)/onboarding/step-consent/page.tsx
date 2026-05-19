"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";
import { acceptComplianceAction } from "@/app/actions/profile.actions";
import { Feedback } from "@/lib/feedback";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function OnboardingConsentStep() {
  const router = useRouter();
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedClinical, setAgreedClinical] = useState(false);

  const isFormValid = agreedTerms && agreedPrivacy && agreedClinical;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    try {
      const res = await acceptComplianceAction();
      if (res.success) {
        Feedback.success("Welcome to your dashboard!");
        await update(); // Sync profileCompleted = true to client session
        router.push("/student");
      } else {
        Feedback.error("Failed to save consent.");
      }
    } catch (err) {
      Feedback.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer className="flex items-center justify-center min-h-[80vh]">
      <div className="max-w-xl w-full p-8 bg-white border border-slate-100 rounded-xl shadow-sm">
        <div className="mb-6 flex justify-center">
          <div className="bg-emerald-100 p-4 rounded-full">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-2">Review & Consent</h1>
        <p className="text-slate-500 mb-8 text-sm text-center">Before you access your clinical services, please review and accept our policies.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <label className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition">
            <input 
              type="checkbox" 
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900" 
              disabled={isLoading}
            />
            <div className="text-sm">
              <span className="font-bold text-slate-800 block mb-1">Terms of Service</span>
              <span className="text-slate-600">I agree to the <Link href="/terms" target="_blank" className="text-blue-600 underline">Terms of Service</Link> and understand this platform is not for immediate medical emergencies.</span>
            </div>
          </label>

          <label className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition">
            <input 
              type="checkbox" 
              checked={agreedPrivacy}
              onChange={(e) => setAgreedPrivacy(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900" 
              disabled={isLoading}
            />
            <div className="text-sm">
              <span className="font-bold text-slate-800 block mb-1">Privacy Policy</span>
              <span className="text-slate-600">I agree to the <Link href="/privacy" target="_blank" className="text-blue-600 underline">Privacy Policy</Link> and understand how my data is encrypted and retained.</span>
            </div>
          </label>

          <label className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition">
            <input 
              type="checkbox" 
              checked={agreedClinical}
              onChange={(e) => setAgreedClinical(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900" 
              disabled={isLoading}
            />
            <div className="text-sm">
              <span className="font-bold text-slate-800 block mb-1">Clinical Consent</span>
              <span className="text-slate-600">I consent to clinical staff reviewing my assessment scores and notes to provide care. I understand the "Duty to Warn" escalation policy.</span>
            </div>
          </label>

          <button 
            type="submit" 
            disabled={isLoading || !isFormValid}
            className="w-full bg-slate-900 text-white py-3 rounded-lg shadow hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm mt-4"
          >
            {isLoading ? "Saving..." : "I Accept & Continue"}
          </button>
        </form>
      </div>
    </PageContainer>
  );
}
