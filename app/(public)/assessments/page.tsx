import React from "react";
import Link from "next/link";

const assessments = [
  {
    type: "phq9",
    title: "Mental Wellbeing",
    subtitle: "PHQ-9 Screening",
    desc: "Clinically-validated depression & emotional wellbeing screening. Trusted by WHO and health systems worldwide.",
    badge: "Most Popular",
    badgeColor: "text-emerald-700 bg-emerald-100",
    accentBar: "bg-emerald-500",
    cardBorder: "border-emerald-100 hover:border-emerald-300",
    titleColor: "text-emerald-700",
  },
  {
    type: "gad7",
    title: "Anxiety Check",
    subtitle: "GAD-7 Screening",
    desc: "Assess generalized anxiety levels with this 7-question standardized tool. Widely used in clinical and campus health settings.",
    badge: null,
    badgeColor: "",
    accentBar: "bg-[#1a3a6b]",
    cardBorder: "border-blue-100 hover:border-blue-300",
    titleColor: "text-[#1a3a6b]",
  },
  {
    type: "career",
    title: "Career Readiness",
    subtitle: "Aptitude Assessment",
    desc: "Discover your strengths, interests and career aptitude. Get personalized suggestions aligned with your natural abilities and goals.",
    badge: "New",
    badgeColor: "text-amber-700 bg-amber-100",
    accentBar: "bg-amber-500",
    cardBorder: "border-amber-100 hover:border-amber-300",
    titleColor: "text-amber-700",
  },
];

export default function AssessmentsDirectoryPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* HERO BANNER */}
      <section className="relative overflow-hidden">
        <img
          src="/muslim.jpg"
          alt="Self Assessments"
          className="w-full h-80 object-cover object-center"
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
      <section className="bg-[#f7f8fa] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Take a Test</span>
          <div className="text-left">
            <h2 className="block w-fit bg-[#424242] text-white text-base md:text-lg lg:text-xl font-bold uppercase tracking-wide mt-2 mb-10 px-6 py-2.5 rounded-lg shadow-md border-b-4 border-[#c07a2a]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              Choose Your <em className="italic">Assessment</em>
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {assessments.map((a) => (
              <Link
                key={a.type}
                href={`/assessments/${a.type}`}
                className={`group relative bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col ${a.cardBorder}`}
              >
                {/* Colored top accent bar */}
                <div className={`h-1.5 w-full ${a.accentBar}`} />

                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  {/* Badge */}
                  {a.badge && (
                    <span className={`self-start text-xs font-semibold px-2.5 py-0.5 rounded-full mb-4 ${a.badgeColor}`}>
                      {a.badge}
                    </span>
                  )}
                  {!a.badge && <div className="mb-4 h-5" />}

                  {/* Title block */}
                  <div className="mb-3">
                    <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${a.titleColor}`}>{a.subtitle}</p>
                    <h3 className="font-bold text-[#1a2e4a] text-xl leading-snug">{a.title}</h3>
                  </div>

                  {/* Divider */}
                  <div className="w-8 h-0.5 bg-gray-200 rounded-full mb-4" />

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{a.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Anonymous notice */}
          <div className="mt-10 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-4 flex items-start gap-2 sm:gap-3 max-w-2xl mx-auto">
            <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
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
