import React from "react";
import PageContainer from "@/components/shared/PageContainer";
import Link from "next/link";
import { AssessmentRegistry } from "@/lib/assessments/registry";

export default function AssessmentsDirectoryPage() {
  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Mental Health Screenings</h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Self-guided clinical screening tools. These assessments can help you understand your symptoms, 
          but they are not a substitute for a professional clinical diagnosis.
        </p>

        <div className="grid gap-4">
          {Object.values(AssessmentRegistry).map((assessment) => (
            <Link key={assessment.type} href={`/assessments/${assessment.type.toLowerCase()}`} className="block p-6 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition">
              <h3 className="text-lg font-bold text-slate-800 mb-1">{assessment.name}</h3>
              <p className="text-sm text-slate-500 mb-4">{assessment.clinicalPurpose}</p>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md">
                {assessment.estimatedMinutes} min. completion time
              </span>
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
