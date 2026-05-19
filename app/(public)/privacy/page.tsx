import React from "react";
import PageContainer from "@/components/shared/PageContainer";

export default function PrivacyPolicyPage() {
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto py-12 prose prose-slate">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-6">Privacy Policy</h1>
        <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-8">Last Updated: May 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Information We Collect</h2>
          <p className="text-slate-600 mb-4">
            We collect the minimum amount of information necessary to provide clinical support. This includes:
            Account information (Email, Name), Onboarding demographics (Age Range, District), and Clinical Data (Assessments, Notes, Chat Logs).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Anonymous Support</h2>
          <p className="text-slate-600 mb-4">
            Our anonymous chat feature generates a temporary session token. No IP addresses or browser fingerprints are permanently associated with these sessions. Anonymous chats are permanently deleted after 30 days of inactivity.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Data Encryption & Security</h2>
          <p className="text-slate-600 mb-4">
            All clinical notes, referrals, and chat transcripts are encrypted at rest using AES-256 military-grade encryption. Even database administrators cannot read your clinical records without the active encryption key.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Crisis Escalation & Duty to Warn</h2>
          <p className="text-slate-600 mb-4">
            While we prioritize confidentiality, our staff has a legal and ethical <strong>Duty to Warn</strong>. If an assessment or chat interaction indicates immediate, severe risk of harm to yourself or others, we reserve the right to escalate the case to emergency services or designated administrative staff.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
