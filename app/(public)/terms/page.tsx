import React from "react";
import PageContainer from "@/components/shared/PageContainer";

export default function TermsOfServicePage() {
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto py-12 prose prose-slate">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-6">Terms of Service</h1>
        <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-8">Last Updated: May 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Scope of Service</h2>
          <p className="text-slate-600 mb-4">
            This platform provides access to mental health resources, anonymous triage support, and scheduled clinical counselling. It is NOT a replacement for emergency medical services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Medical Emergencies</h2>
          <p className="text-slate-600 mb-4 text-rose-700 font-bold bg-rose-50 p-4 rounded-lg">
            If you are experiencing a medical emergency or are in immediate danger of harming yourself or others, please call your local emergency services (e.g., 112) immediately. Do not rely solely on this platform for immediate emergency intervention.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Account Integrity</h2>
          <p className="text-slate-600 mb-4">
            You agree to provide accurate information during registration (if not using the anonymous pathway). You are responsible for maintaining the confidentiality of your account credentials.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
