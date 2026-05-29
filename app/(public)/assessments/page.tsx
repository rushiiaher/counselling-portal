import React from "react";
import Link from "next/link";

const assessments = [
  {
    type: "phq9",
    title: "Mental Wellbeing (PHQ-9)",
    desc: "Clinically-validated depression & emotional wellbeing screening. 9 questions. Trusted by WHO and health systems worldwide.",
    minutes: 3,
    questions: 9,
    badge: "Most Popular",
    badgeColor: "text-emerald-600 bg-emerald-50 border border-emerald-200",
    icon: (
      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    iconBg: "bg-emerald-50",
  },
  {
    type: "gad7",
    title: "Anxiety Check (GAD-7)",
    desc: "Assess generalized anxiety levels with this 7-question standardized tool. Widely used in clinical settings and campus health programs globally.",
    minutes: 2,
    questions: 7,
    badge: null,
    badgeColor: "",
    icon: (
      <svg className="w-6 h-6 text-[#1a2e4a]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    iconBg: "bg-slate-100",
  },
  {
    type: "career",
    title: "Career Readiness",
    desc: "Discover your strengths, interests and career aptitude. Get personalized suggestions aligned with your natural abilities and goals.",
    minutes: 5,
    questions: 12,
    badge: "New",
    badgeColor: "text-amber-600 bg-amber-50 border border-amber-200",
    icon: (
      <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    iconBg: "bg-amber-50",
  },
];

export default function AssessmentsDirectoryPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* HERO BANNER */}
      <section className="relative overflow-hidden">
        <img
          src="/self.jpg"
          alt="Self Assessments"
          className="w-full h-[420px] object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-[#1a3a6b]/65" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Self Assessment</span>
            </div>
            <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Free &amp; Anonymous</span>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4 leading-tight">
              How Are You <em className="italic">Really Feeling?</em>
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
              Clinically-validated assessments in 3–5 minutes. Completely anonymous — no registration required.
            </p>
          </div>
        </div>
      </section>

      {/* CHOOSE YOUR ASSESSMENT */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Take a Test</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a2e4a] mt-2 mb-2">
            Choose Your <em className="italic">Assessment</em>
          </h2>
          <div className="w-16 h-[2px] bg-[#c07a2a] rounded-full mb-10" />

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {assessments.map((a) => (
              <Link
                key={a.type}
                href={`/assessments/${a.type}`}
                className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200 flex flex-col gap-4"
              >
                {/* Badge */}
                {a.badge && (
                  <span className={`absolute top-4 right-4 text-xs font-semibold px-2.5 py-0.5 rounded-full ${a.badgeColor}`}>
                    {a.badge}
                  </span>
                )}

                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl ${a.iconBg} flex items-center justify-center`}>
                  {a.icon}
                </div>

                {/* Title */}
                <h3 className="font-bold text-[#1a2e4a] text-base leading-snug">{a.title}</h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{a.desc}</p>

                {/* Meta */}
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-1">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{a.minutes} minutes · {a.questions} questions</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Anonymous notice */}
          <div className="mt-8 bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-4 flex items-start gap-3 max-w-2xl mx-auto">
            <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <p className="text-sm text-emerald-800 leading-relaxed">
              <strong>100% Anonymous.</strong> Responses are never stored with your identity. No login required.{' '}
              This is a self-help tool, not a medical diagnosis.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
